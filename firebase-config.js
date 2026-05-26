/* ═══════════════════════════════════════════════
   KASALKO — Firebase Configuration & Cloud Sync
   ═══════════════════════════════════════════════

   ⚠️  SETUP — 3 values to fill in below.

   Steps:
   1. Go to console.firebase.google.com
   2. Click on "weddingthings"
   3. ⚙️ Project Settings → scroll to "Your apps"
   4. Click your web app → copy the firebaseConfig
   5. Paste apiKey, messagingSenderId, appId below
   ═══════════════════════════════════════════════ */

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyBAYda6M_n4BwVcMwN0V4PaC4g5POiiaBs",
  authDomain:        "weddingthings.firebaseapp.com",
  projectId:         "weddingthings",
  storageBucket:     "weddingthings.firebasestorage.app",
  messagingSenderId: "732042029649",
  appId:             "1:732042029649:web:21bbe63214e8b36770e670",
};

/* ── INIT ─────────────────────────────────────── */
const _fbReady = !FIREBASE_CONFIG.apiKey.includes('PASTE');
if (_fbReady) {
  try { firebase.initializeApp(FIREBASE_CONFIG); } catch(e) {}
}

const AUTH = _fbReady ? firebase.auth()      : null;
const DB   = _fbReady ? firebase.firestore() : null;

/* ── AUTH STATE ──────────────────────────────── */
let CURRENT_USER = null;
window.CURRENT_USER = null;

if (AUTH) {
  AUTH.onAuthStateChanged(user => {
    CURRENT_USER = user;
    window.CURRENT_USER = user;
    updateAuthUI(user);
    if (user) {
      // If a DIFFERENT account signed in on this device (without explicit sign-out),
      // wipe local data and do a hard reload so the page starts completely clean.
      const storedUid = localStorage.getItem('kasalko_uid');
      if (storedUid && storedUid !== user.uid) {
        localStorage.removeItem('kasalko_data');
        localStorage.setItem('kasalko_uid', user.uid);
        window.location.reload();
        return;
      }
      localStorage.setItem('kasalko_uid', user.uid);
      cloudLoadWedding();
      if (window._pendingEnter && typeof enterApp === 'function') {
        window._pendingEnter = false;
        setTimeout(() => enterApp(), 400);
      }
    } else {
      // Signed out — refresh overview to show sign-in prompt
      if (typeof renderOverview === 'function' && WED && WED.activeTab === 'overview') renderOverview();
    }
  });
}

/* ── HEADER AUTH BUTTON ──────────────────────── */
function updateAuthUI(user) {
  const btn = document.getElementById('auth-header-btn');
  if (!btn) return;
  if (user) {
    const name = user.displayName || user.email.split('@')[0];
    const initials = name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
    btn.innerHTML = `<span style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#c9a96e,#7a6045);display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;flex-shrink:0">${initials}</span><span style="font-size:11.5px;font-weight:700;color:var(--tan-dark);max-width:64px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${name.split(' ')[0]}</span>`;
    btn.title = user.email;
  } else {
    btn.innerHTML = `☁️ <span style="font-size:11.5px;font-weight:700;color:var(--tan-dark)">Sign In</span>`;
    btn.title = 'Sync your plans to the cloud';
  }
  // Refresh overview cloud section
  if (typeof renderOverview === 'function' && WED && WED.activeTab === 'overview') renderOverview();
}

/* ── CLOUD SAVE ──────────────────────────────── */
let _cloudSaveTimer = null;

function cloudSave() {
  if (!CURRENT_USER || !DB) return;
  clearTimeout(_cloudSaveTimer);
  _cloudSaveTimer = setTimeout(_doCloudSave, 2500);
}

function cloudSaveNow() {
  if (!CURRENT_USER || !DB) { showToast('⚠️ Sign in to sync'); return; }
  clearTimeout(_cloudSaveTimer);
  _doCloudSave();
}

async function _doCloudSave() {
  if (!CURRENT_USER || !DB) return;
  try {
    const snap = {
      couple:    WED.couple,    date:      WED.date,
      venue:     WED.venue,     budget:    WED.budget,
      guests:    WED.guests,    expenses:  WED.expenses,
      checklist: WED.checklist, schedule:  WED.schedule,
      furniture: WED.furniture, vendors:   WED.vendors,
      nextFurnitureId: WED.nextFurnitureId,
      nextGuestId:     WED.nextGuestId,
      nextVendorId:    WED.nextVendorId,
      _savedAt:  new Date().toISOString(),
      _version:  1,
    };
    await DB.collection('users').doc(CURRENT_USER.uid)
            .collection('data').doc('wedding').set(snap);
    _cloudIndicator('☁️ Saved', 'var(--green-deep)', 2500);
  } catch(e) {
    _cloudIndicator('⚠️ Sync failed', 'var(--pink-deep)', 3000);
    console.warn('Cloud save error:', e);
  }
}

function _cloudIndicator(text, color, ttl) {
  const el = document.getElementById('cloud-save-indicator');
  if (!el) return;
  el.textContent = text;
  el.style.color   = color;
  el.style.opacity = '1';
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.opacity = '0'; }, ttl);
}

/* ── CLOUD LOAD ──────────────────────────────── */
async function cloudLoadWedding() {
  if (!CURRENT_USER || !DB) return;
  try {
    const doc = await DB.collection('users').doc(CURRENT_USER.uid)
                        .collection('data').doc('wedding').get();
    if (!doc.exists) {
      // No Firestore data yet for this account.
      // Only push local data up if it was created by THIS user (pre-login usage),
      // not if we just cleared and reloaded for an account switch (localStorage is empty).
      const hasLocalData = !!localStorage.getItem('kasalko_data');
      if (hasLocalData) cloudSave();
      return;
    }
    const cloudData = doc.data();
    // Cloud is always authoritative for signed-in users — apply immediately,
    // no conflict dialog. Local data is just a session cache.
    _applyCloudData(cloudData);
  } catch(e) { console.warn('Cloud load error:', e); }
}

function _applyCloudData(data) {
  const { _savedAt, _version, ...wedData } = data;
  Object.assign(WED, wedData);
  if (!WED._customPhases) WED._customPhases = [];
  if (!WED.vendors)       WED.vendors       = [];
  if (!WED.nextVendorId)  WED.nextVendorId  = 1;
  saveState();
  if (typeof wedTab === 'function') wedTab(WED.activeTab || 'overview');
  showToast('☁️ Plans synced from cloud!');
  // Pull RSVP responses and update guest statuses
  setTimeout(syncRSVPsFromCloud, 800);
}
window._applyCloudData = _applyCloudData;

/* ── SYNC RSVP RESPONSES → GUEST LIST ───────── */
async function syncRSVPsFromCloud() {
  if (!DB) return;
  const coupleKey = ((WED.couple.p1 || 'unknown') + '_' + (WED.couple.p2 || 'unknown'))
    .toLowerCase().replace(/[^a-z0-9]/g, '_');
  try {
    const snap = await DB.collection('kasalko_rsvp').doc(coupleKey).collection('responses').get();
    if (snap.empty) return;
    let updated = 0;
    snap.forEach(doc => {
      const r = doc.data();
      // Match by guestId first, then fall back to name match
      let guest = null;
      if (r.guestId) {
        const gid = parseInt(r.guestId, 10);
        guest = WED.guests.find(g => g.id === gid);
      }
      if (!guest && r.guestName) {
        guest = WED.guests.find(g => g.name.toLowerCase() === (r.guestName || '').toLowerCase());
      }
      if (!guest) return;
      const rsvpMap = { yes: 'attending', no: 'declined', maybe: 'pending' };
      const newRsvp = rsvpMap[r.attendance] || 'pending';
      if (guest.rsvp !== newRsvp) {
        guest.rsvp = newRsvp;
        updated++;
      }
      // Also sync meal if provided
      if (r.meal) guest.meal = r.meal;
    });
    if (updated > 0) {
      saveState();
      if (typeof renderGuests === 'function') renderGuests();
      if (typeof renderOverview === 'function' && WED.activeTab === 'overview') renderOverview();
      showToast(`💌 ${updated} RSVP response${updated>1?'s':''} synced!`);
    }
  } catch(e) {
    console.warn('RSVP sync error:', e);
  }
}
window.syncRSVPsFromCloud = syncRSVPsFromCloud;


/* ── TEMPLATE PUBLISH (Seller flow) ─────────── */
function _buildSaveSellCard() {
  return `
  <div style="margin-top:10px;padding:14px 16px;border-radius:var(--r-md);background:linear-gradient(135deg,rgba(245,230,200,0.65),rgba(252,232,238,0.5));border:1px solid rgba(201,169,110,0.22)">
    <div style="font-size:13px;font-weight:800;color:var(--tan-dark);margin-bottom:5px">💰 Save &amp; Sell Your Wedding Plan</div>
    <div style="font-size:11.5px;color:var(--ink-3);line-height:1.6;margin-bottom:10px">
      Couples on TikTok always ask — <em>"What's your budget?"</em> <em>"Who did your florals?"</em><br>
      Publish your complete plan and earn from it.
    </div>
    <div id="save-sell-action">
      <button onclick="openPublishTemplate()"
        style="padding:8px 16px;border-radius:var(--r-md);background:linear-gradient(135deg,var(--tan),var(--tan-dark));border:none;color:var(--ivory);font-size:12.5px;font-weight:700;cursor:pointer;font-family:var(--f)">
        💰 Publish My Plan →
      </button>
    </div>
  </div>`;
}

function _refreshSaveSellCard() {
  const el = document.getElementById('save-sell-action');
  if (!el || !window.CURRENT_USER || typeof DB === 'undefined' || !DB) return;
  DB.collection('kasalko_templates')
    .where('sellerUid','==', window.CURRENT_USER.uid).limit(1).get()
    .then(snap => {
      const actionEl = document.getElementById('save-sell-action');
      if (!actionEl || snap.empty) return;
      const t    = snap.docs[0].data();
      const code = snap.docs[0].id;
      const statusColor = t.status==='active' ? '#3a7a54' : t.status==='rejected' ? '#c07068' : '#8C6640';
      actionEl.innerHTML = `
        <div style="padding:10px 12px;border-radius:10px;background:rgba(255,252,247,0.75);border:1px solid rgba(201,169,110,0.22)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">
            <span style="font-family:monospace;font-size:17px;font-weight:800;color:var(--ink);letter-spacing:2px">VP-${code}</span>
            <span style="font-size:10px;font-weight:700;color:${statusColor};border:1px solid currentColor;border-radius:10px;padding:2px 8px">${(t.status||'?').toUpperCase()}</span>
          </div>
          ${t.status==='active'
            ? `<div style="font-size:11px;color:var(--ink-3)">🛒 ${t.salesCount||0} sale${(t.salesCount||0)!==1?'s':''} · ₱${Number(t.totalEarned||0).toLocaleString()} earned</div>`
            : t.status==='pending'
            ? `<div style="font-size:11px;color:var(--ink-3)">Awaiting admin review — usually 24–48 hrs.</div>`
            : `<div style="font-size:11px;color:#c07068">${t.adminNote||'Rejected. Contact support.'}</div>`}
        </div>`;
    }).catch(() => {});
}

function openPublishTemplate() {
  if (!window.CURRENT_USER) { openAuthModal(); return; }
  document.getElementById('publish-tpl-sheet')?.remove();
  const td = {
    expenses:  (typeof WED !== 'undefined' && WED.expenses)  || [],
    checklist: (typeof WED !== 'undefined' && WED.checklist) || [],
    vendors:   (typeof WED !== 'undefined' && WED.vendors)   || [],
    schedule:  (typeof WED !== 'undefined' && WED.schedule)  || [],
  };
  const taskCount = td.checklist.reduce((a,p) => a + (p.items?.length||0), 0);
  const el = document.createElement('div');
  el.id = 'publish-tpl-sheet';
  el.className = 'modal-overlay';
  el.onclick = e => { if (e.target === el) el.remove(); };
  el.innerHTML = `
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div style="font-size:15px;font-weight:800;color:var(--ink);margin-bottom:4px">💰 Publish Your Wedding Plan</div>
      <div style="font-size:11.5px;color:var(--ink-3);line-height:1.5;margin-bottom:14px">Help other couples plan — and earn from it.</div>
      <div style="padding:10px 12px;border-radius:10px;background:rgba(245,230,200,0.4);border:1px solid rgba(201,169,110,0.2);margin-bottom:14px;font-size:11.5px;color:var(--ink-3)">
        <b style="color:var(--ink)">What buyers will receive:</b><br>
        💸 ${td.expenses.length} expenses · ✅ ${taskCount} tasks · 🤝 ${td.vendors.length} vendors · 📅 ${td.schedule.length} events
      </div>
      <div class="input-group">
        <div class="input-label">Title <span style="color:var(--rose)">*</span></div>
        <input id="ptl-title" class="glass-input" placeholder="e.g. Metro Manila Garden Wedding ₱500K" maxlength="80">
      </div>
      <div class="input-group">
        <div class="input-label">Description <span style="color:var(--rose)">*</span></div>
        <textarea id="ptl-desc" class="glass-input" rows="3" placeholder="Describe your wedding — venue type, theme, budget breakdown, what makes it helpful for other couples…" maxlength="300" style="resize:vertical"></textarea>
      </div>
      <div class="input-group">
        <div class="input-label">Price <span style="color:var(--rose)">*</span></div>
        <input id="ptl-price" class="glass-input" type="number" min="0" max="9999" placeholder="e.g. 199" style="font-size:18px;font-weight:700">
        <div style="font-size:10.5px;color:var(--ink-4);margin-top:4px">₱0 = free · Suggested ₱99–₱499 · You keep 85%</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div class="input-group" style="margin-bottom:0">
          <div class="input-label">TikTok URL</div>
          <input id="ptl-tiktok" class="glass-input" placeholder="https://tiktok.com/@you">
        </div>
        <div class="input-group" style="margin-bottom:0">
          <div class="input-label">Instagram URL</div>
          <input id="ptl-ig" class="glass-input" placeholder="https://instagram.com/you">
        </div>
      </div>
      <div id="ptl-err" style="display:none;margin-top:10px;padding:8px 12px;border-radius:8px;background:rgba(192,112,104,0.1);border:1px solid rgba(192,112,104,0.22);font-size:12px;color:#c07068;font-weight:600"></div>
      <button id="ptl-submit-btn" onclick="submitPublishTemplate()" class="cta-btn" style="margin-top:16px">Submit for Review →</button>
      <div style="font-size:10.5px;color:var(--ink-4);text-align:center;margin-top:8px;line-height:1.5">Admin reviews within 24–48 hrs. You'll receive your VP-XXXX code when approved.</div>
    </div>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('open'));
}

async function submitPublishTemplate() {
  const title  = (document.getElementById('ptl-title')?.value  || '').trim();
  const desc   = (document.getElementById('ptl-desc')?.value   || '').trim();
  const price  = parseInt(document.getElementById('ptl-price')?.value || '0') || 0;
  const tiktok = (document.getElementById('ptl-tiktok')?.value || '').trim();
  const ig     = (document.getElementById('ptl-ig')?.value     || '').trim();
  const errEl  = document.getElementById('ptl-err');
  const showErr = msg => { if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; } };

  if (!title) { showErr('Please add a title.'); return; }
  if (!desc)  { showErr('Please add a description.'); return; }
  if (!window.CURRENT_USER || typeof DB === 'undefined' || !DB) { showErr('Sign in first.'); return; }

  const btn = document.getElementById('ptl-submit-btn');
  if (btn) { btn.textContent = 'Submitting…'; btn.disabled = true; }

  try {
    const existing = await DB.collection('kasalko_templates')
      .where('sellerUid','==', window.CURRENT_USER.uid).limit(1).get();
    if (!existing.empty) {
      showErr('You already have a template submitted. Check your VP code in the Save & Sell card.');
      if (btn) { btn.textContent = 'Submit for Review →'; btn.disabled = false; }
      return;
    }
    const code = await _generateUniqueTemplateCode();
    await DB.collection('kasalko_templates').doc(code).set({
      sellerUid:    window.CURRENT_USER.uid,
      sellerName:   window.CURRENT_USER.displayName || window.CURRENT_USER.email.split('@')[0],
      sellerEmail:  window.CURRENT_USER.email,
      sellerTikTok: tiktok,
      sellerIG:     ig,
      title, description: desc, price,
      status:       'pending',
      salesCount:   0,
      totalEarned:  0,
      templateData: {
        budget:         (typeof WED!=='undefined' && WED.budget)         || 0,
        expenses:       (typeof WED!=='undefined' && WED.expenses)       || [],
        checklist:      (typeof WED!=='undefined' && WED.checklist)      || [],
        vendors:        (typeof WED!=='undefined' && WED.vendors)        || [],
        schedule:       (typeof WED!=='undefined' && WED.schedule)       || [],
        nextVendorId:   (typeof WED!=='undefined' && WED.nextVendorId)   || 1,
        planningMonths: (typeof WED!=='undefined' && WED.planningMonths) || null,
      },
      publishedAt:  firebase.firestore.FieldValue.serverTimestamp(),
      adminNote:    '',
    });
    document.getElementById('publish-tpl-sheet')?.remove();
    // Success sheet
    const s = document.createElement('div');
    s.id = 'tpl-success-sheet'; s.className = 'modal-overlay open';
    s.onclick = e => { if (e.target === s) { s.remove(); if (typeof renderOverview==='function') renderOverview(); } };
    s.innerHTML = `
      <div class="modal-sheet" style="text-align:center;padding:30px 20px">
        <div style="font-size:48px;margin-bottom:12px">🎉</div>
        <div style="font-size:18px;font-weight:800;color:var(--ink);margin-bottom:8px">Submitted!</div>
        <div style="font-size:12.5px;color:var(--ink-3);line-height:1.6;margin-bottom:16px">Pending admin review.<br>Usually 24–48 hours.</div>
        <div style="padding:14px 16px;border-radius:12px;background:rgba(245,230,200,0.55);border:1.5px solid rgba(201,169,110,0.28);margin-bottom:16px">
          <div style="font-size:10px;font-weight:700;color:var(--ink-4);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Your Template Code</div>
          <div style="font-size:26px;font-weight:800;color:var(--ink);letter-spacing:3px;font-family:monospace">VP-${code}</div>
          <div style="font-size:11px;color:var(--ink-3);margin-top:4px">Share this on TikTok/IG once approved</div>
        </div>
        <button onclick="this.closest('.modal-overlay').remove();if(typeof renderOverview==='function')renderOverview();" class="cta-btn">Done!</button>
      </div>`;
    document.body.appendChild(s);
    if (typeof renderOverview === 'function') renderOverview();
  } catch(e) {
    showErr('Error: ' + e.message);
    if (btn) { btn.textContent = 'Submit for Review →'; btn.disabled = false; }
  }
}

async function _generateUniqueTemplateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I
  for (let i = 0; i < 10; i++) {
    const code = Array.from({length:4}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const doc  = await DB.collection('kasalko_templates').doc(code).get();
    if (!doc.exists) return code;
  }
  throw new Error('Could not generate unique code — please try again');
}

/* ── TEMPLATE EXPORT (Save & Sell) ──────────── */
// Only shareable fields: budget, expenses, checklist, vendors, schedule.
// Personal info (couple names, date, venue, guests, seating) is NOT included —
// buyers should fill in their own couple details.
function exportTemplate() {
  const payload = {
    _type:       'kasalko-template',
    _version:    2,
    _exportedAt: new Date().toISOString(),
    _author:     CURRENT_USER ? (CURRENT_USER.displayName || CURRENT_USER.email) : 'Anonymous',
    // ── Shareable planning data ──────────────────
    budget:    WED.budget,
    expenses:  WED.expenses,
    checklist: WED.checklist,
    vendors:   WED.vendors,
    schedule:  WED.schedule,
    nextVendorId: WED.nextVendorId,
    // ── NOT included: couple, date, venue, guests, furniture (personal info)
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), {
    href: url,
    download: `dtti-wedding-plan-${Date.now()}.json`,
  });
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('📦 Plan exported — ready to sell!');
}

/* ── TEMPLATE IMPORT ─────────────────────────── */
function triggerImportTemplate() {
  let inp = document.getElementById('_tpl_import_inp');
  if (!inp) {
    inp = Object.assign(document.createElement('input'), {
      id:'_tpl_import_inp', type:'file', accept:'.json,application/json',
    });
    inp.style.display = 'none';
    inp.onchange = e => { if (e.target.files[0]) importTemplate(e.target.files[0]); };
    document.body.appendChild(inp);
  }
  inp.value = ''; inp.click();
}

function importTemplate(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data._type !== 'kasalko-template') { showToast('⚠️ Not a valid Vows & Petals template'); return; }
      const byline = data._author ? ` by ${data._author}` : '';
      const label  = data.title || 'Wedding Plan';
      if (!confirm(`Import "${label}"${byline}?\n\nThis will merge the plan's budget, checklist, suppliers and schedule into your current data.`)) return;
      // v2 templates only carry shareable fields — merge without touching personal info
      const { _type, _version, _exportedAt, _author, title, ...planData } = data;
      if (planData.budget    != null)  WED.budget    = planData.budget;
      if (planData.expenses)           WED.expenses  = planData.expenses;
      if (planData.checklist)          WED.checklist = planData.checklist;
      if (planData.vendors)            WED.vendors   = planData.vendors;
      if (planData.schedule)           WED.schedule  = planData.schedule;
      if (planData.nextVendorId != null) WED.nextVendorId = planData.nextVendorId;
      if (!WED._customPhases) WED._customPhases = [];
      if (!WED.vendors)       WED.vendors       = [];
      if (!WED.nextVendorId)  WED.nextVendorId  = 1;
      saveState();
      if (CURRENT_USER) cloudSave();
      if (typeof wedTab === 'function') wedTab(WED.activeTab || 'overview');
      showToast('📦 Plan imported!');
    } catch(err) { showToast('⚠️ Invalid template file'); }
  };
  reader.readAsText(file);
}

/* ── AUTH MODAL HELPERS ──────────────────────── */
let _authMode = 'signin';

function openAuthModal() {
  if (!_fbReady) {
    showToast('⚠️ Firebase not configured yet — see firebase-config.js');
    return;
  }
  if (CURRENT_USER) { openUserMenu(); return; }
  _setAuthTab('signin');
  openModal('auth-modal');
}

function setAuthMode(mode) {
  _setAuthTab(mode);
}

function _setAuthTab(mode) {
  _authMode = mode;
  const signinTab  = document.getElementById('auth-tab-signin');
  const regTab     = document.getElementById('auth-tab-register');
  const signinForm = document.getElementById('auth-form-signin');
  const regForm    = document.getElementById('auth-form-register');
  if (!signinTab) return;
  const activeStyle   = 'background:rgba(255,253,248,0.95);color:var(--tan-dark);box-shadow:0 1px 4px rgba(44,31,14,0.1);';
  const inactiveStyle = 'background:transparent;color:var(--ink-4);box-shadow:none;';
  signinTab.style.cssText  += mode === 'signin'   ? activeStyle : inactiveStyle;
  regTab.style.cssText     += mode === 'register' ? activeStyle : inactiveStyle;
  signinForm.style.display  = mode === 'signin'   ? 'block' : 'none';
  regForm.style.display     = mode === 'register' ? 'block' : 'none';
}

function submitAuthSignIn() {
  if (!AUTH) return;
  const email = document.getElementById('auth-email')?.value.trim();
  const pass  = document.getElementById('auth-password')?.value;
  if (!email || !pass) { showToast('⚠️ Enter email and password'); return; }
  AUTH.signInWithEmailAndPassword(email, pass)
    .then(() => { closeModal('auth-modal'); showToast('👋 Welcome back!'); })
    .catch(err => showToast('⚠️ ' + _authErrMsg(err.code)));
}

function submitAuthRegister() {
  if (!AUTH) return;
  const name  = document.getElementById('auth-reg-name')?.value.trim();
  const email = document.getElementById('auth-reg-email')?.value.trim();
  const pass  = document.getElementById('auth-reg-pass')?.value;
  if (!email || !pass) { showToast('⚠️ Enter email and password'); return; }
  if (pass.length < 6) { showToast('⚠️ Password needs at least 6 characters'); return; }
  AUTH.createUserWithEmailAndPassword(email, pass)
    .then(cred => name ? cred.user.updateProfile({ displayName: name }) : null)
    .then(() => { closeModal('auth-modal'); showToast('🎉 Account created! Plans will sync automatically.'); })
    .catch(err => showToast('⚠️ ' + _authErrMsg(err.code)));
}

function signInWithGoogle() {
  if (!AUTH) return;
  AUTH.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(() => { closeModal('auth-modal'); showToast('👋 Signed in with Google!'); })
    .catch(err => showToast('⚠️ ' + _authErrMsg(err.code)));
}

function _authErrMsg(code) {
  return ({
    'auth/user-not-found':       'No account with that email.',
    'auth/wrong-password':       'Wrong password.',
    'auth/email-already-in-use': 'Email already in use.',
    'auth/invalid-email':        'Invalid email address.',
    'auth/weak-password':        'Password too weak (min 6 chars).',
    'auth/popup-closed-by-user': 'Sign-in cancelled.',
    'auth/network-request-failed': 'Network error — check your connection.',
    'auth/invalid-credential':   'Wrong email or password.',
  })[code] || code;
}

/* ── USER MENU (signed in) ───────────────────── */
function openUserMenu() {
  const old = document.getElementById('user-menu-sheet');
  if (old) { old.remove(); return; }
  if (!CURRENT_USER) { openAuthModal(); return; }
  const user = CURRENT_USER;
  const name = user.displayName || user.email.split('@')[0];
  const initials = name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
  const ov = document.createElement('div');
  ov.id = 'user-menu-sheet';
  ov.style.cssText = 'position:fixed;inset:0;z-index:1000;background:rgba(44,31,14,0.25);display:flex;align-items:flex-end;justify-content:center;';
  ov.innerHTML = `
    <div style="width:100%;max-width:440px;background:var(--cream);border-radius:22px 22px 0 0;padding:24px 16px 44px;box-shadow:0 -8px 40px rgba(44,31,14,0.2)">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(201,169,110,0.15)">
        <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--tan),var(--tan-dark));display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:white;flex-shrink:0">${initials}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;font-weight:700;color:var(--ink)">${name}</div>
          <div style="font-size:11px;color:var(--ink-4);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${user.email}</div>
          <div style="font-size:10.5px;font-weight:700;color:var(--green-deep);margin-top:2px">☁️ Cloud Sync Active — auto-saves on every change</div>
        </div>
        <button onclick="document.getElementById('user-menu-sheet').remove()" style="width:28px;height:28px;border-radius:50%;border:none;background:rgba(44,31,14,0.07);font-size:16px;cursor:pointer;flex-shrink:0">×</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="padding:14px 16px;border-radius:var(--r-md);border:1px solid rgba(201,169,110,0.25);background:linear-gradient(135deg,rgba(245,230,200,0.6),rgba(252,232,238,0.45));text-align:left">
          <div style="font-size:12.5px;font-weight:800;color:var(--tan-dark);margin-bottom:4px">💰 Save &amp; Sell Your Wedding Plan</div>
          <div style="font-size:11.5px;color:var(--ink-3);line-height:1.55">Couples on TikTok always ask about your budget, suppliers &amp; planning. Publish your plan and earn from it.</div>
          <button onclick="document.getElementById('user-menu-sheet').remove();openPublishTemplate();" style="margin-top:8px;padding:8px 16px;border-radius:20px;background:linear-gradient(135deg,var(--tan),var(--gold));border:none;font-size:12px;font-weight:700;color:#fff;cursor:pointer;font-family:var(--f)">💰 Publish My Plan →</button>
        </div>
        <button onclick="kasalkoSignOut();document.getElementById('user-menu-sheet').remove()"
          style="width:100%;padding:12px 16px;border-radius:var(--r-md);border:1px solid rgba(224,120,152,0.25);background:rgba(252,232,238,0.55);font-size:13px;font-weight:700;color:var(--pink-deep);cursor:pointer;font-family:var(--f);text-align:left">
          🚪 Sign Out</button>
        <div id="flush-confirm-wrap">
          <button onclick="_showFlushConfirm()"
            style="width:100%;padding:10px 16px;border-radius:var(--r-md);border:1px solid rgba(180,60,60,0.2);background:rgba(255,235,235,0.5);font-size:12.5px;font-weight:700;color:#b43c3c;cursor:pointer;font-family:var(--f);text-align:left">
            🗑️ Start Fresh — Delete All My Data</button>
        </div>
      </div>
    </div>`;
  ov.addEventListener('click', e => { if (e.target === ov) ov.remove(); });
  document.body.appendChild(ov);
}

function kasalkoSignOut() {
  if (!AUTH) return;
  AUTH.signOut().then(() => {
    // Wipe this account's local cache so the next user who signs in
    // on this device starts completely clean.
    localStorage.removeItem('kasalko_data');
    localStorage.removeItem('kasalko_uid');
    // Hard reload → landing page shows (it's visible by default in HTML),
    // WED resets to defaults, no stale data in memory.
    showToast('👋 Signed out');
    setTimeout(() => window.location.reload(), 700);
  });
}

/* ── START FRESH / FLUSH ─────────────────────── */
function _showFlushConfirm() {
  const wrap = document.getElementById('flush-confirm-wrap');
  if (!wrap) return;
  wrap.innerHTML = `
    <div style="padding:12px 14px;border-radius:var(--r-md);border:1.5px solid rgba(180,60,60,0.35);background:rgba(255,235,235,0.7)">
      <div style="font-size:12.5px;font-weight:800;color:#b43c3c;margin-bottom:4px">⚠️ This will delete everything</div>
      <div style="font-size:11.5px;color:#8a3030;line-height:1.55;margin-bottom:10px">All guests, expenses, checklist, vendors, seating, and cloud data for this account will be permanently erased. This cannot be undone.</div>
      <div style="display:flex;gap:8px">
        <button onclick="_showFlushConfirm2()"
          style="flex:1;padding:9px 12px;border-radius:10px;border:none;background:#b43c3c;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:var(--f)">
          Yes, delete everything</button>
        <button onclick="document.getElementById('flush-confirm-wrap').innerHTML='<button onclick=\\'_showFlushConfirm()\\'style=\\'width:100%;padding:10px 16px;border-radius:var(--r-md);border:1px solid rgba(180,60,60,0.2);background:rgba(255,235,235,0.5);font-size:12.5px;font-weight:700;color:#b43c3c;cursor:pointer;font-family:var(--f);text-align:left\\'>🗑️ Start Fresh — Delete All My Data</button>'"
          style="flex:1;padding:9px 12px;border-radius:10px;border:1px solid rgba(44,31,14,0.15);background:rgba(255,252,247,0.8);color:var(--ink-3);font-size:12px;font-weight:600;cursor:pointer;font-family:var(--f)">
          Cancel</button>
      </div>
    </div>`;
}

function _showFlushConfirm2() {
  const wrap = document.getElementById('flush-confirm-wrap');
  if (!wrap) return;
  wrap.innerHTML = `
    <div style="padding:12px 14px;border-radius:var(--r-md);border:1.5px solid rgba(180,60,60,0.35);background:rgba(255,235,235,0.7)">
      <div style="font-size:12px;font-weight:700;color:#8a3030;margin-bottom:8px">Type <b>DELETE</b> to confirm:</div>
      <input id="flush-type-input" class="glass-input" placeholder="Type DELETE here" autocomplete="off"
        style="text-transform:uppercase;font-weight:700;letter-spacing:1px;margin-bottom:8px"
        oninput="document.getElementById('flush-go-btn').disabled=this.value.toUpperCase().trim()!=='DELETE'">
      <button id="flush-go-btn" onclick="flushAllData()" disabled
        style="width:100%;padding:9px 12px;border-radius:10px;border:none;background:#b43c3c;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:var(--f);opacity:0.5"
        onmouseenter="if(!this.disabled)this.style.opacity='1'" onmouseleave="if(!this.disabled)this.style.opacity='0.85'">
        🗑️ Delete Everything Now</button>
    </div>`;
  // Watch the input to toggle button opacity
  const inp = document.getElementById('flush-type-input');
  if (inp) {
    inp.addEventListener('input', () => {
      const btn = document.getElementById('flush-go-btn');
      if (!btn) return;
      const ok = inp.value.toUpperCase().trim() === 'DELETE';
      btn.disabled = !ok;
      btn.style.opacity = ok ? '1' : '0.5';
      btn.style.cursor  = ok ? 'pointer' : 'not-allowed';
    });
    setTimeout(() => inp.focus(), 100);
  }
}

async function flushAllData() {
  const btn = document.getElementById('flush-go-btn');
  if (btn) { btn.textContent = 'Deleting…'; btn.disabled = true; }
  try {
    // 1. Delete Firestore cloud data for this account
    if (CURRENT_USER && DB) {
      await DB.collection('users').doc(CURRENT_USER.uid)
               .collection('data').doc('wedding').delete();
    }
  } catch(e) { /* ignore — local clear still happens */ }
  // 2. Wipe localStorage
  localStorage.removeItem('kasalko_data');
  localStorage.removeItem('kasalko_uid');
  // 3. Show toast then reload → landing page, blank WED
  showToast('🗑️ All data deleted — starting fresh');
  setTimeout(() => window.location.reload(), 900);
}

/* ── OVERVIEW CLOUD SECTION ──────────────────── */
// _saveSellCard replaced by _buildSaveSellCard() — dynamic with real publish button

function renderCloudSection() {
  const sellCard = _buildSaveSellCard();

  if (!_fbReady) {
    return `
      <div style="padding:16px;border-radius:18px;margin-top:12px" class="glass">
        <span class="sec-title">☁️ Cloud &amp; Backup</span>
        <div style="font-size:12px;color:var(--ink-4);margin-bottom:4px;line-height:1.5">Create a free account to keep your plans safe and synced across all your devices.</div>
        ${sellCard}
      </div>`;
  }

  if (window.CURRENT_USER) {
    const user = window.CURRENT_USER;
    const name = user.displayName || user.email.split('@')[0];
    setTimeout(_refreshSaveSellCard, 200); // async-update seller status chip
    return `
      <div style="padding:16px;border-radius:18px;margin-top:12px" class="glass">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <span class="sec-title" style="margin-bottom:0">☁️ Cloud Sync</span>
          <span style="font-size:10.5px;font-weight:700;padding:3px 8px;border-radius:8px;background:rgba(90,171,122,0.12);color:var(--green-deep);border:1px solid rgba(90,171,122,0.2)">● Live</span>
        </div>
        <div style="font-size:12px;color:var(--ink-3);line-height:1.5">Signed in as <b>${name}</b> — your plan auto-saves to the cloud on every change.</div>
        <div style="display:flex;gap:8px;margin-top:10px">
          <button onclick="openUserMenu()" style="flex:1;padding:10px 14px;border-radius:var(--r-md);font-size:12.5px;font-weight:700;cursor:pointer;font-family:var(--f);text-align:left;border:1px solid rgba(201,169,110,0.25);background:rgba(245,230,200,0.55);color:var(--tan-dark)">👤 Account &amp; Settings</button>
          <button onclick="syncRSVPsFromCloud()" style="padding:10px 14px;border-radius:var(--r-md);font-size:12.5px;font-weight:700;cursor:pointer;font-family:var(--f);border:1px solid rgba(224,120,152,0.25);background:rgba(252,232,238,0.55);color:var(--pink-deep);white-space:nowrap">💌 Sync RSVPs</button>
        </div>
        ${sellCard}
      </div>`;
  }

  // Not signed in
  return `
    <div style="padding:16px;border-radius:18px;margin-top:12px" class="glass-pink">
      <span class="sec-title">☁️ Cloud Sync</span>
      <div style="font-size:12px;color:var(--ink-3);margin-bottom:14px;line-height:1.5">Sign in to save your plans to the cloud and keep everything synced across all your devices — for free.</div>
      <button onclick="openAuthModal()" class="cta-btn">☁️ Sign In / Create Account</button>
      ${sellCard}
    </div>`;
}

/* ── PUBLIC INVITE SETTINGS ──────────────────── */
/* Firestore rule needed:
   match /kasalko_invite/{coupleKey} { allow read: if true; allow write: if request.auth != null; } */
function saveInvitePublic() {
  if (!DB || !CURRENT_USER || !WED || !WED.inviteSettings) return;
  const coupleKey = ((WED.couple?.p1 || 'unknown') + '_' + (WED.couple?.p2 || 'unknown'))
    .toLowerCase().replace(/[^a-z0-9]/g, '_');
  // NOTE: card images (base64) are intentionally omitted — they exceed Firestore's 1MB doc limit.
  // Invitation card visuals live in localStorage only (WED._invitationImg / _invitationImg2).
  DB.collection('kasalko_invite').doc(coupleKey).set({
    ...WED.inviteSettings,
    p1: WED.couple?.p1 || '',
    p2: WED.couple?.p2 || '',
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  }).catch(() => {});
}

/* ── WINDOW EXPORTS ──────────────────────────── */
window.cloudSave              = cloudSave;
window.saveInvitePublic       = saveInvitePublic;
window.cloudSaveNow           = cloudSaveNow;
window.cloudLoadWedding       = cloudLoadWedding;
window.exportTemplate         = exportTemplate;
window.triggerImportTemplate  = triggerImportTemplate;
window.importTemplate         = importTemplate;
window.openAuthModal          = openAuthModal;
window.setAuthMode            = setAuthMode;
window.submitAuthSignIn       = submitAuthSignIn;
window.submitAuthRegister     = submitAuthRegister;
window.signInWithGoogle       = signInWithGoogle;
window.openUserMenu           = openUserMenu;
window.kasalkoSignOut         = kasalkoSignOut;
window.renderCloudSection     = renderCloudSection;
window.updateAuthUI           = updateAuthUI;
window.openPublishTemplate    = openPublishTemplate;
window.submitPublishTemplate  = submitPublishTemplate;
window._refreshSaveSellCard   = _refreshSaveSellCard;
window._showFlushConfirm      = _showFlushConfirm;
window._showFlushConfirm2     = _showFlushConfirm2;
window.flushAllData           = flushAllData;
