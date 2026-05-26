/* ═══════════════════════════════════════════════
   KASALKO — Standalone Wedding Planner JS
   Self-contained; no dependency on AnoTara
   ═══════════════════════════════════════════════ */

/* ── INVITATION DESIGN THEMES ───────────────── */
const INVITE_THEMES = [
  { name:'Ivory & Gold',  swatch:['#fef6e8','#c9a96e'], bg:['#fef6e8','#fce8ee','#e8f5ed'], border:'rgba(201,169,110,0.35)', accent:'#c9a96e', ink:'#2c1f0e', sub:'#7a6045', dark:'#4a3520', circleA:'#c9a96e', circleB:'#e07898', btn:['#c9a96e','#a07840'], florals:['🌸','🌿'], div:'rgba(201,169,110,0.4)', bg2:['#e8f5ed','#fef6e8','#fce8ee'], border2:'rgba(106,142,112,0.4)', accent2:'#6a8e70' },
  { name:'Rose Garden',   swatch:['#fff0f5','#d4457a'], bg:['#fff0f5','#fde8f0','#fad5e8'], border:'rgba(212,69,122,0.22)', accent:'#d4457a', ink:'#1e0614', sub:'#8c2050', dark:'#5a0a30', circleA:'#e87aaa', circleB:'#c23068', btn:['#d4457a','#8c2050'], florals:['🌹','💐'], div:'rgba(212,69,122,0.35)', bg2:['#fad5e8','#fff0f5','#fde0ec'], border2:'rgba(212,69,122,0.28)', accent2:'#8c2050' },
  { name:'Sage & White',  swatch:['#f0f5ee','#4a7055'], bg:['#f5f8f4','#eef4ec','#e8f0e6'], border:'rgba(106,142,112,0.3)', accent:'#4a7055', ink:'#0e1f14', sub:'#3d6048', dark:'#1a3820', circleA:'#6a9e70', circleB:'#4a7055', btn:['#5a8e68','#3d6048'], florals:['🌿','🍃'], div:'rgba(74,112,85,0.4)', bg2:['#e8f0e6','#f5f8f4','#eaefea'], border2:'rgba(74,112,85,0.35)', accent2:'#3d6048' },
  { name:'Navy & Gold',   swatch:['#eaeff8','#1a2a6e'], bg:['#eaeff8','#e0e8f5','#dce5f2'], border:'rgba(26,42,110,0.22)', accent:'#2c3e9e', ink:'#0a0e28', sub:'#1a2a6e', dark:'#0a1450', circleA:'#3a5abf', circleB:'#c9a96e', btn:['#2c3e9e','#1a2a6e'], florals:['✨','🌟'], div:'rgba(44,62,158,0.35)', bg2:['#dce5f2','#eaeff8','#e4eaf5'], border2:'rgba(44,62,158,0.3)', accent2:'#c9a96e' },
  { name:'Lavender',      swatch:['#f5eeff','#7c4da8'], bg:['#fdf7ff','#f5eeff','#ede0fa'], border:'rgba(124,77,168,0.22)', accent:'#9b5dc8', ink:'#1e0832', sub:'#7c4da8', dark:'#4a1e78', circleA:'#b880e8', circleB:'#7c4da8', btn:['#9b5dc8','#7c4da8'], florals:['💜','🌸'], div:'rgba(124,77,168,0.35)', bg2:['#ede0fa','#fdf7ff','#f0e5fd'], border2:'rgba(124,77,168,0.3)', accent2:'#7c4da8' },
  { name:'Terracotta',    swatch:['#fdf4ec','#b5522b'], bg:['#fdf4ec','#f5e8d8','#f0dfc8'], border:'rgba(181,82,43,0.25)', accent:'#b5522b', ink:'#280e00', sub:'#8b3a1a', dark:'#5c2008', circleA:'#d4622e', circleB:'#c9a96e', btn:['#c45c30','#8b3a1a'], florals:['🌾','🍂'], div:'rgba(181,82,43,0.38)', bg2:['#f0dfc8','#fdf4ec','#f5e8d8'], border2:'rgba(181,82,43,0.3)', accent2:'#8b3a1a' },
  { name:'Emerald',       swatch:['#e4f4e8','#1b5e20'], bg:['#ecf8ee','#e4f4e8','#ddf0e2'], border:'rgba(27,94,32,0.25)', accent:'#2e7d32', ink:'#061409', sub:'#1b5e20', dark:'#0a3210', circleA:'#388e3c', circleB:'#c9a96e', btn:['#2e7d32','#1b5e20'], florals:['🌳','🍃'], div:'rgba(46,125,50,0.4)', bg2:['#ddf0e2','#ecf8ee','#e0f2e4'], border2:'rgba(46,125,50,0.3)', accent2:'#1b5e20' },
  { name:'Blush & Berry', swatch:['#fdeef4','#7b1040'], bg:['#fff5f8','#fdeef4','#fbdfe9'], border:'rgba(123,16,64,0.2)', accent:'#c0315a', ink:'#1e0010', sub:'#7b1040', dark:'#480020', circleA:'#e05888', circleB:'#7b1040', btn:['#c0315a','#7b1040'], florals:['🌷','🫐'], div:'rgba(192,49,90,0.38)', bg2:['#fbdfe9','#fff5f8','#f8d8e8'], border2:'rgba(123,16,64,0.28)', accent2:'#7b1040' },
];
function _getInviteTheme() { return INVITE_THEMES[WED.inviteTheme || 0] || INVITE_THEMES[0]; }

/* ── STATE ───────────────────────────────────── */
const WED = {
  couple:   { p1: '', p2: '' },
  date:     '',
  venue:    '',
  budget:   0,
  activeTab: 'overview',
  customCardImage: null,
  _invitationImg: null,
  _invitationImg2: null,
  hashtag: '',
  guests:   [],
  expenses: [],
  checklist: [
    { phase:'12 Months Out', items:[
      { id:'c1',  text:'Set wedding date',                  done:false },
      { id:'c2',  text:'Book the venue',                    done:false },
      { id:'c3',  text:'Set overall budget',                done:false },
      { id:'c4',  text:'Create initial guest list',         done:false },
      { id:'c5',  text:'Hire wedding coordinator',          done:false },
    ]},
    { phase:'6 Months Out', items:[
      { id:'c6',  text:'Book photographer & videographer',  done:false },
      { id:'c7',  text:'Book catering',                     done:false },
      { id:'c8',  text:'Choose & order wedding attire',     done:false },
      { id:'c9',  text:'Send save-the-dates',               done:false },
      { id:'c10', text:'Book live band or DJ',              done:false },
    ]},
    { phase:'3 Months Out', items:[
      { id:'c11', text:'Send formal invitations',           done:false },
      { id:'c12', text:'Finalize menu with caterer',        done:false },
      { id:'c13', text:'Book hair & makeup',                done:false },
      { id:'c14', text:'Order wedding cake',                done:false },
      { id:'c15', text:'Arrange accommodations for guests', done:false },
    ]},
    { phase:'1 Month Out', items:[
      { id:'c16', text:'Confirm all vendors',               done:false },
      { id:'c17', text:'Finalize seating arrangement',      done:false },
      { id:'c18', text:'Submit final headcount to caterer', done:false },
      { id:'c19', text:'Pick up wedding attire',            done:false },
      { id:'c20', text:'Prepare payments & envelopes',      done:false },
    ]},
    { phase:'Week Of', items:[
      { id:'c21', text:'Wedding rehearsal',                 done:false },
      { id:'c22', text:'Confirm vendors one last time',     done:false },
      { id:'c23', text:'Pack for honeymoon',                done:false },
      { id:'c24', text:'Prepare emergency kit',             done:false },
    ]},
    { phase:'Day Of', items:[
      { id:'c25', text:'Hair & makeup',                     done:false },
      { id:'c26', text:'Bride/groom gets dressed',          done:false },
      { id:'c27', text:'Ceremony',                          done:false },
      { id:'c28', text:'Reception',                         done:false },
      { id:'c29', text:'Send-off / exit',                   done:false },
    ]},
  ],
  schedule:  [],
  furniture: [],
  dragging:  null,
  dragOffX:  0,
  dragOffY:  0,
  selectedFurniture: null,
  nextFurnitureId: 1,
  nextGuestId: 1,
  nextVendorId: 1,
  vendors: [],
  _customPhases: [],
  planningMonths: null,
  _collapsedPhases: [],
  entourage: [],
  _nextEntourageId: 1,
  notes: { general: '', budget: '', venue: '', vendors: '', themes: '' },
  noteCategories: [],
  notePhotos: [],
  allTags: [],
  _nextPhotoId: 1,
  guestGroups: ["Bride's Side", "Groom's Side", "Friends", "Colleagues", "VIP", "Others"],
  inviteSettings: { heroPhoto: null, dressCode: '', giftsNote: '', specialNote: '', showProgram: false, attirePhotoA: null, attirePhotoB: null, attireLabelA: "Bride's Attire", attireLabelB: "Groom's Attire" },
  inviteTheme: 0,
  expenseCategories: [], // custom categories: [{key, icon, label}]
};

/* ── PER-GUEST INVITE STATE ──────────────────── */
let _rsvpGuestId = null; // set when opening RSVP card for a specific guest

function _rsvpCoupleKey() {
  return ((WED.couple.p1 || 'unknown') + '_' + (WED.couple.p2 || 'unknown'))
    .toLowerCase().replace(/[^a-z0-9]/g, '_');
}

/* ── PERSISTENCE ─────────────────────────────── */
const STORE_KEY = 'kasalko_data';

function saveState() {
  try {
    const snapshot = {
      couple: WED.couple,
      date:   WED.date,
      venue:  WED.venue,
      budget: WED.budget,
      customCardImage:  WED.customCardImage,
      _invitationImg:   WED._invitationImg,
      _invitationImg2:  WED._invitationImg2,
      hashtag:          WED.hashtag,
      inviteTheme:        WED.inviteTheme,
      expenseCategories:  WED.expenseCategories,
      guests:    WED.guests,
      expenses:  WED.expenses,
      checklist: WED.checklist,
      schedule:  WED.schedule,
      furniture: WED.furniture,
      nextFurnitureId: WED.nextFurnitureId,
      nextGuestId:     WED.nextGuestId,
      nextVendorId:    WED.nextVendorId,
      vendors:         WED.vendors,
      planningMonths:   WED.planningMonths,
      _collapsedPhases: WED._collapsedPhases,
      entourage:        WED.entourage,
      _nextEntourageId: WED._nextEntourageId,
      notes:            WED.notes,
      noteCategories:   WED.noteCategories,
      notePhotos:       WED.notePhotos,
      allTags:          WED.allTags,
      _nextPhotoId:     WED._nextPhotoId,
      guestGroups:      WED.guestGroups,
      inviteSettings:   WED.inviteSettings,
    };
    localStorage.setItem(STORE_KEY, JSON.stringify(snapshot));
  } catch(e) {}
  // Cloud sync — debounced, only when signed in (cloudSave defined in firebase-config.js)
  if (typeof cloudSave === 'function' && window.CURRENT_USER) cloudSave();
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return;
    const d = JSON.parse(raw);
    Object.assign(WED, d);
    if (!WED._customPhases)    WED._customPhases    = [];
    if (!WED.vendors)          WED.vendors          = [];
    if (!WED.nextVendorId)     WED.nextVendorId     = 1;
    if (WED.planningMonths === undefined) WED.planningMonths = null;
    if (!WED._collapsedPhases)  WED._collapsedPhases  = [];
    if (!WED.entourage)         WED.entourage         = [];
    if (!WED._nextEntourageId)  WED._nextEntourageId  = 1;
    if (!WED.notes)             WED.notes             = { general: '', budget: '', venue: '', vendors: '', themes: '' };
    if (!WED.noteCategories)    WED.noteCategories    = [];
    if (!WED.notePhotos)        WED.notePhotos        = [];
    if (!WED.allTags)           WED.allTags           = [];
    if (!WED._nextPhotoId)      WED._nextPhotoId      = 1;
    if (!WED.guestGroups)       WED.guestGroups       = ["Bride's Side", "Groom's Side", "Friends", "Colleagues", "VIP", "Others"];
    if (!WED.inviteSettings)    WED.inviteSettings    = { heroPhoto: null, dressCode: '', giftsNote: '', specialNote: '', showProgram: false, attirePhotoA: null, attirePhotoB: null, attireLabelA: "Bride's Attire", attireLabelB: "Groom's Attire" };
    if (!WED.inviteSettings.attireLabelA) WED.inviteSettings.attireLabelA = "Bride's Attire";
    if (!WED.inviteSettings.attireLabelB) WED.inviteSettings.attireLabelB = "Groom's Attire";
    if (WED.hashtag === undefined)  WED.hashtag  = '';
    if (WED._invitationImg2 === undefined) WED._invitationImg2 = null;
    if (WED.inviteTheme === undefined) WED.inviteTheme = 0;
    if (!WED.expenseCategories) WED.expenseCategories = [];
    WED.guests.forEach(g => { if (g.group === undefined) g.group = ''; });
  } catch(e) {}
}

/* ── TOAST ───────────────────────────────────── */
let _toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ── MODAL HELPERS ───────────────────────────── */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}
function closeModalOutside(ev, id) {
  if (ev.target === ev.currentTarget) closeModal(id);
}

/* ── COUNTDOWN ───────────────────────────────── */
function getCountdown() {
  if (!WED.date) return '— days to go';
  const diff = new Date(WED.date) - new Date();
  if (diff <= 0) return '🎊 The big day is here!';
  const days = Math.floor(diff / 86400000);
  if (days > 365) return `${Math.floor(days/365)}y ${Math.floor((days%365)/30)}mo to go`;
  if (days > 30)  return `${Math.floor(days/30)} months, ${days%30} days to go`;
  return `${days} days to go`;
}

/* ── TAB SWITCH ──────────────────────────────── */
function wedTab(name) {
  WED.activeTab = name;
  ['overview','budget','guests','suppliers','seating','checklist','schedule','entourage','notes','gallery'].forEach(t => {
    const panel = document.getElementById('panel-'+t);
    const tab   = document.getElementById('tab-'+t);
    if (panel) panel.style.display = t === name ? 'block' : 'none';
    if (tab)   tab.classList.toggle('active', t === name);
  });
  if (name === 'seating')   initCanvas();
  if (name === 'guests')    renderGuests();
  if (name === 'budget')    renderBudget();
  if (name === 'checklist') renderChecklist();
  if (name === 'schedule')  renderSchedule();
  if (name === 'overview')  renderOverview();
  if (name === 'suppliers') renderSuppliers();
  if (name === 'entourage') renderEntourage();
  if (name === 'notes')     renderNotes();
  if (name === 'gallery')   renderGallery();
}

/* ── HERO UPDATE ─────────────────────────────── */
function updateHero() {
  const namesEl    = document.getElementById('wed-hero-names');
  const dateBadge  = document.getElementById('wed-hero-date');
  const venueBadge = document.getElementById('wed-hero-venue');
  const countdownEl= document.getElementById('wed-hero-countdown');
  const ofLabel    = document.getElementById('wed-hero-of-label');

  if (ofLabel) ofLabel.style.opacity = (WED.couple.p1 || WED.couple.p2) ? '0.8' : '0.3';

  if (namesEl) {
    namesEl.innerHTML =
      `<span class="hero-name-line">${WED.couple.p1 || '—'}</span>` +
      `<span class="wedding-amp">&amp;</span>` +
      `<span class="hero-name-line">${WED.couple.p2 || '—'}</span>`;
  }
  if (dateBadge) {
    if (WED.date) {
      const d = new Date(WED.date + 'T12:00:00');
      const weekday = d.toLocaleDateString('en-PH', { weekday: 'long' });
      const month   = d.toLocaleDateString('en-PH', { month: 'short' }).toUpperCase();
      const day     = d.getDate();
      const year    = d.getFullYear();
      dateBadge.style.display = 'block';
      dateBadge.innerHTML =
        `<span class="hero-date-weekday">${weekday},</span>`
        + `<span class="hero-date-month">${month}</span>`
        + `<span class="hero-date-day">${day}</span>`
        + `<span class="hero-date-year">${year}</span>`;
    } else {
      dateBadge.style.display = 'none';
    }
  }
  if (venueBadge) {
    if (WED.venue) {
      venueBadge.style.display = 'block';
      venueBadge.textContent = WED.venue;
    } else {
      venueBadge.style.display = 'none';
    }
  }
  if (countdownEl) countdownEl.textContent = getCountdown();
}

/* ── OVERVIEW ────────────────────────────────── */
function renderOverview() {
  const el = document.getElementById('wed-overview-content');
  if (!el) return;
  updateHero();

  if (!WED.couple.p1 && !WED.couple.p2) {
    el.innerHTML = `<div class="empty-state">
      <div class="empty-emoji">💍</div>
      <div class="empty-title">Start Planning Your Wedding</div>
      <div class="empty-sub">Add your names, date, venue, and budget<br>to begin your planning journey.</div>
      <button onclick="openSetupModal()" class="cta-btn" style="max-width:260px;margin:0 auto">✏️ Set Up Wedding Details</button>
    </div>`;
    return;
  }

  const totalDone  = WED.checklist.reduce((a,p)=>a+p.items.filter(i=>i.done).length,0);
  const totalItems = WED.checklist.reduce((a,p)=>a+p.items.length,0);
  const pct        = totalItems ? Math.round((totalDone/totalItems)*100) : 0;
  const totalSpent = WED.expenses.reduce((a,e)=>a+e.amount,0);
  const paid       = WED.expenses.filter(e=>e.paid).reduce((a,e)=>a+e.amount,0);
  const attending  = WED.guests.filter(g=>g.rsvp==='attending').length;

  el.innerHTML = `
    <div style="display:flex;justify-content:flex-end;gap:8px;margin-bottom:10px">
      <button onclick="openSetupModal()" class="icon-btn">✏️ Edit Details</button>
    </div>

    <!-- ── COMBINED EVENT OVERVIEW CARD ── -->
    <div style="padding:20px;border-radius:20px;margin-bottom:16px" class="glass">
      <!-- Couple names + date/venue headline -->
      <div style="text-align:center;margin-bottom:16px">
        <div style="font-family:var(--f2);font-size:28px;font-style:italic;font-weight:600;color:var(--ink);line-height:1.15">${WED.couple.p1} &amp; ${WED.couple.p2}</div>
        ${WED.date ? `<div style="font-size:13px;font-weight:600;color:var(--tan-dark);margin-top:4px">📅 ${new Date(WED.date).toLocaleDateString('en-PH',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</div>` : ''}
        ${WED.venue ? `<div style="font-size:12px;color:var(--ink-3);margin-top:2px">📍 ${WED.venue}</div>` : ''}
      </div>

      <!-- 4-stat row -->
      <div class="ev-stat-row">
        <div class="ev-stat">
          <span class="ev-stat-val">${getCountdown().replace(' to go','').replace(/ days?/,'d').replace(/ months?,\s*/,'mo ')}</span>
          <span class="ev-stat-lbl">To the Day</span>
        </div>
        <div class="ev-stat">
          <span class="ev-stat-val">${attending} / ${WED.guests.length}</span>
          <span class="ev-stat-lbl">Guests</span>
        </div>
        <div class="ev-stat">
          <span class="ev-stat-val">₱${totalSpent >= 1000 ? (totalSpent/1000).toFixed(0)+'k' : totalSpent.toLocaleString()}</span>
          <span class="ev-stat-lbl">Committed</span>
        </div>
        <div class="ev-stat">
          <span class="ev-stat-val">${pct}%</span>
          <span class="ev-stat-lbl">Planned</span>
        </div>
      </div>

      <!-- Progress bar -->
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <div class="progress-bar-wrap" style="flex:1">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <span style="font-size:12px;font-weight:700;color:var(--tan-dark);white-space:nowrap">${totalDone}/${totalItems} tasks</span>
      </div>

      <!-- Budget row -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-radius:12px;background:rgba(255,252,247,0.65);border:1px solid rgba(184,145,106,0.18)">
        <div>
          <div style="font-size:11px;color:var(--ink-4);font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Budget</div>
          <div style="font-family:var(--f);font-size:19px;font-style:normal;font-weight:800;color:var(--ink);letter-spacing:-0.3px">₱${WED.budget.toLocaleString()}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:11px;color:var(--ink-4)">Committed: <b style="color:var(--ink)">₱${totalSpent.toLocaleString()}</b></div>
          <div style="font-size:11px;margin-top:2px;font-weight:700;color:${(WED.budget-totalSpent)>=0?'var(--green-deep)':'var(--pink-deep)'}">
            ${(WED.budget-totalSpent)>=0?'₱'+(WED.budget-totalSpent).toLocaleString()+' remaining':'₱'+Math.abs(WED.budget-totalSpent).toLocaleString()+' over budget'}
          </div>
        </div>
      </div>
    </div>

    <!-- ── INVITATION BUILDER ── -->
    <div style="padding:16px;border-radius:18px;margin-bottom:12px" class="glass">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <span class="sec-title" style="margin-bottom:0">💌 Invitation Builder</span>
        <button onclick="downloadInviteTemplate()" style="padding:5px 10px;border-radius:8px;background:rgba(245,230,200,0.65);border:1px solid rgba(201,169,110,0.28);font-size:11px;font-weight:700;color:var(--tan-dark);cursor:pointer">⬇ Template</button>
      </div>

      <!-- Theme picker -->
      <div style="margin-bottom:14px">
        <div style="font-size:10px;font-weight:700;color:var(--ink-3);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px">Design Theme</div>
        <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none">
          ${INVITE_THEMES.map((t, i) => {
            const active = (WED.inviteTheme||0) === i;
            return `<button class="inv-theme-swatch" onclick="selectInviteTheme(${i})" title="${t.name}"
              style="flex:0 0 auto;width:40px;height:40px;border-radius:50%;border:2.5px solid ${active ? t.accent : 'transparent'};box-shadow:${active ? `0 0 0 2px ${t.accent}55` : 'none'};background:linear-gradient(135deg,${t.swatch[0]} 50%,${t.swatch[1]} 50%);cursor:pointer;padding:0;transition:border 0.15s,box-shadow 0.15s" title="${t.name}"></button>`;
          }).join('')}
        </div>
        <div style="font-size:11px;color:var(--tan-dark);font-weight:600;margin-top:4px">${INVITE_THEMES[WED.inviteTheme||0].name}</div>
      </div>

      <!-- Two-column page grid -->
      <div class="inv-builder-grid">

        <!-- ── PAGE 1 ── -->
        <div style="padding:14px;border-radius:14px;background:rgba(252,232,238,0.25);border:1px solid rgba(224,120,152,0.2)">
          <div style="font-size:10px;font-weight:700;color:var(--pink-deep);letter-spacing:0.09em;text-transform:uppercase;margin-bottom:10px">Page 1 — Invitation Card</div>
          ${(WED.customCardImage || WED._invitationImg)
            ? `<img id="inv-page1-img" src="${WED.customCardImage || WED._invitationImg}" class="inv-card-img" style="border-radius:12px;margin-bottom:10px">`
            : `<img id="inv-page1-img" style="display:none;border-radius:12px;margin-bottom:10px" class="inv-card-img">
               <div id="inv-page1-placeholder" style="display:flex;align-items:center;justify-content:center;height:140px;border-radius:12px;border:1.5px dashed rgba(224,120,152,0.4);background:rgba(252,232,238,0.3);margin-bottom:10px;cursor:pointer" onclick="refreshCard1()">
                 <div style="text-align:center"><div style="font-size:28px;margin-bottom:4px">💌</div><div style="font-size:11.5px;color:var(--ink-3)">Tap to generate invitation card</div></div>
               </div>`}
          <!-- Hashtag -->
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px">
            <span style="font-size:17px;color:var(--gold);font-weight:800;line-height:1">#</span>
            <input type="text" id="inv-hashtag-input"
                   value="${(WED.hashtag||'').replace(/^#/,'')}"
                   placeholder="${(WED.couple.p1||'Name').replace(/\s/g,'')}And${(WED.couple.p2||'Name').replace(/\s/g,'')}"
                   oninput="saveWedHashtag(this.value)"
                   class="glass-input" style="flex:1;font-size:13px;padding:7px 10px">
          </div>
          <!-- Custom upload -->
          <button onclick="toggleInvUploadSpec()" style="width:100%;padding:8px 12px;border-radius:10px;background:rgba(252,232,238,0.65);border:1px solid rgba(224,120,152,0.25);font-size:12.5px;font-weight:700;color:var(--pink-deep);cursor:pointer;text-align:center">
            📎 ${WED.customCardImage ? 'Replace Custom Design' : 'Upload Custom Design'}
          </button>
          <div id="inv-upload-spec" style="display:none;margin-top:8px;padding:12px;border-radius:10px;background:rgba(255,248,238,0.9);border:1px solid rgba(201,169,110,0.3);font-size:11.5px;color:var(--ink-3)">
            <div style="font-weight:700;color:var(--tan-dark);margin-bottom:6px">📐 Canvas Specifications</div>
            <div style="line-height:1.7">Canvas size: <b>380 × 520 px</b><br>QR code zone: horizontally centered at <b>y = 408 px</b><br>QR size: <b>96 × 96 px</b> (+ 8px white padding around)</div>
            <div style="margin-top:6px;color:var(--pink-deep);font-weight:600">⚠ Keep that area clear in your design — the QR is overlaid automatically when sharing to a guest.</div>
            <label style="display:block;margin-top:10px;padding:8px;border-radius:8px;background:var(--pink-deep);color:white;font-size:12px;font-weight:700;cursor:pointer;text-align:center">
              Choose File <input type="file" accept="image/*" style="display:none" onchange="uploadCustomCard(event)">
            </label>
            ${WED.customCardImage ? `<button onclick="clearCustomCard()" style="display:block;width:100%;margin-top:6px;padding:7px;border-radius:8px;background:transparent;border:1px solid rgba(224,120,152,0.4);color:var(--pink-deep);font-size:11.5px;cursor:pointer">✕ Remove Custom Design</button>` : ''}
          </div>
        </div>

        <!-- ── PAGE 2 ── -->
        <div style="padding:14px;border-radius:14px;background:rgba(232,245,237,0.25);border:1px solid rgba(106,142,112,0.2)">
          <div style="font-size:10px;font-weight:700;color:var(--green-deep);letter-spacing:0.09em;text-transform:uppercase;margin-bottom:10px">Page 2 — Details Card</div>
          ${WED._invitationImg2
            ? `<img id="inv-page2-img" src="${WED._invitationImg2}" class="inv-card-img" style="border-radius:12px;margin-bottom:12px">`
            : `<img id="inv-page2-img" style="display:none;border-radius:12px;margin-bottom:12px" class="inv-card-img">
               <div id="inv-page2-placeholder" style="display:flex;align-items:center;justify-content:center;height:96px;border-radius:12px;border:1.5px dashed rgba(106,142,112,0.4);background:rgba(232,245,237,0.3);margin-bottom:12px">
                 <div style="text-align:center"><div style="font-size:24px;margin-bottom:4px">📋</div><div style="font-size:11px;color:var(--ink-3)">Fill in the details below to generate</div></div>
               </div>`}
          <!-- Dress Code -->
          <div style="margin-bottom:10px">
            <div style="font-size:10px;font-weight:700;color:var(--ink-3);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px">Dress Code</div>
            <input type="text" placeholder="e.g. Semi-Formal, Sage Green &amp; Gold"
                   value="${(WED.inviteSettings.dressCode||'').replace(/"/g,'&quot;')}"
                   oninput="saveInviteField('dressCode',this.value)"
                   class="glass-input" style="width:100%;font-size:13px;padding:7px 10px;box-sizing:border-box">
          </div>
          <!-- Attire Photos -->
          <div style="margin-bottom:10px">
            <div style="font-size:10px;font-weight:700;color:var(--ink-3);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:6px">Attire Reference Photos</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <div>
                <div style="font-size:10.5px;font-weight:600;color:var(--ink-3);text-align:center;margin-bottom:4px">${WED.inviteSettings.attireLabelA||"Bride's Attire"}</div>
                ${WED.inviteSettings.attirePhotoA
                  ? `<img src="${WED.inviteSettings.attirePhotoA}" style="width:100%;height:88px;object-fit:cover;border-radius:8px;display:block;margin-bottom:4px"><button onclick="clearAttirePhoto('A')" style="width:100%;font-size:10.5px;color:var(--pink-deep);background:none;border:1px solid rgba(224,120,152,0.3);border-radius:6px;padding:3px;cursor:pointer">✕ Remove</button>`
                  : `<label style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:88px;border:1.5px dashed rgba(224,120,152,0.4);border-radius:8px;cursor:pointer;background:rgba(252,232,238,0.3)"><span style="font-size:22px">📷</span><span style="font-size:10px;color:var(--ink-4)">Upload</span><input type="file" accept="image/*" style="display:none" onchange="uploadAttirePhoto(event,'A')"></label>`}
              </div>
              <div>
                <div style="font-size:10.5px;font-weight:600;color:var(--ink-3);text-align:center;margin-bottom:4px">${WED.inviteSettings.attireLabelB||"Groom's Attire"}</div>
                ${WED.inviteSettings.attirePhotoB
                  ? `<img src="${WED.inviteSettings.attirePhotoB}" style="width:100%;height:88px;object-fit:cover;border-radius:8px;display:block;margin-bottom:4px"><button onclick="clearAttirePhoto('B')" style="width:100%;font-size:10.5px;color:var(--pink-deep);background:none;border:1px solid rgba(224,120,152,0.3);border-radius:6px;padding:3px;cursor:pointer">✕ Remove</button>`
                  : `<label style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:88px;border:1.5px dashed rgba(106,142,112,0.4);border-radius:8px;cursor:pointer;background:rgba(232,245,237,0.3)"><span style="font-size:22px">📷</span><span style="font-size:10px;color:var(--ink-4)">Upload</span><input type="file" accept="image/*" style="display:none" onchange="uploadAttirePhoto(event,'B')"></label>`}
              </div>
            </div>
          </div>
          <!-- Gifts -->
          <div style="margin-bottom:10px">
            <div style="font-size:10px;font-weight:700;color:var(--ink-3);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px">🎁 Gifts &amp; Registry</div>
            <textarea placeholder="e.g. Cash gifts via GCash 09XX-XXX-XXXX or our Lazada wishlist…"
                      oninput="saveInviteField('giftsNote',this.value)"
                      class="glass-input" rows="2" style="width:100%;font-size:12.5px;padding:7px 10px;box-sizing:border-box;resize:vertical">${WED.inviteSettings.giftsNote||''}</textarea>
          </div>
          <!-- Notes -->
          <div style="margin-bottom:10px">
            <div style="font-size:10px;font-weight:700;color:var(--ink-3);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px">📝 Special Notes</div>
            <textarea placeholder="e.g. Strictly no children. Please RSVP by June 30…"
                      oninput="saveInviteField('specialNote',this.value)"
                      class="glass-input" rows="2" style="width:100%;font-size:12.5px;padding:7px 10px;box-sizing:border-box;resize:vertical">${WED.inviteSettings.specialNote||''}</textarea>
          </div>
          <!-- Program toggle -->
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
            <input type="checkbox" ${WED.inviteSettings.showProgram?'checked':''} onchange="saveInviteField('showProgram',this.checked)" style="width:16px;height:16px;accent-color:var(--gold)">
            <span style="font-size:12.5px;font-weight:600;color:var(--ink)">Show program note on Details card</span>
          </label>
        </div>

      </div><!-- /.inv-builder-grid -->
    </div>

    ${typeof renderCloudSection === 'function' ? renderCloudSection() : `
    <div style="padding:16px;border-radius:18px;margin-top:12px" class="glass">
      <span class="sec-title">📦 Templates &amp; Backup</span>
      <div style="font-size:12px;color:var(--ink-4);margin-bottom:10px">Loading cloud features…</div>
    </div>`}`;

  // Auto-generate cards if not yet saved
  if (!WED._invitationImg && !WED.customCardImage) {
    setTimeout(() => refreshCard1(), 60);
  }
  if (!WED._invitationImg2) {
    setTimeout(() => refreshCard2(), 120);
  }
}

function uploadInvitation(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => { WED.customCardImage = e.target.result; saveState(); renderOverview(); showToast('💌 Invitation uploaded!'); };
  reader.readAsDataURL(file);
}

/* ── SETUP MODAL ─────────────────────────────── */
function openSetupModal() {
  document.getElementById('ov-p1').value    = WED.couple.p1;
  document.getElementById('ov-p2').value    = WED.couple.p2;
  document.getElementById('ov-date').value  = WED.date;
  document.getElementById('ov-venue').value = WED.venue;
  document.getElementById('ov-budget').value= WED.budget || '';
  openModal('wed-setup-modal');
}

function submitSetup() {
  WED.couple.p1 = document.getElementById('ov-p1')?.value.trim()    || WED.couple.p1;
  WED.couple.p2 = document.getElementById('ov-p2')?.value.trim()    || WED.couple.p2;
  WED.date      = document.getElementById('ov-date')?.value         || WED.date;
  WED.venue     = document.getElementById('ov-venue')?.value.trim() || WED.venue;
  WED.budget    = parseInt(document.getElementById('ov-budget')?.value) || WED.budget;
  saveState();
  closeModal('wed-setup-modal');
  renderOverview();
  showToast('✅ Wedding details updated!');
}

/* ── BUDGET ──────────────────────────────────── */
const CAT_COLORS = { venue:'glass-cream', catering:'glass-green', florals:'glass-pink', photography:'glass-cream', attire:'glass-pink', music:'glass-cream', cake:'glass-cream', invites:'glass-green' };
const CAT_EMOJIS = { venue:'🏛️', catering:'🍽️', florals:'💐', photography:'📸', attire:'👗', music:'🎵', cake:'🎂', invites:'💌' };
// Dynamic category helpers — merges built-ins with WED.expenseCategories
function allExpenseCats() {
  const builtIn = Object.keys(CAT_EMOJIS).map(k => ({ key:k, icon: CAT_EMOJIS[k], label: k.charAt(0).toUpperCase()+k.slice(1) }));
  return [...builtIn, ...(WED.expenseCategories||[])];
}
function catIcon(key) {
  if (CAT_EMOJIS[key]) return CAT_EMOJIS[key];
  const c = (WED.expenseCategories||[]).find(c=>c.key===key);
  return c ? c.icon : '🏷️';
}
function catColor(key) { return CAT_COLORS[key] || 'glass-cream'; }

function renderBudget() {
  const el = document.getElementById('wed-budget-content');
  if (!el) return;

  if (!WED.expenses.length && !WED.budget) {
    el.innerHTML = `<div class="empty-state">
      <div class="empty-emoji">💸</div>
      <div class="empty-title">No Budget Set Yet</div>
      <div class="empty-sub">Set your total budget and start<br>tracking wedding expenses.</div>
      <button onclick="openSetupModal()" class="cta-btn" style="max-width:220px;margin:0 auto">Set Budget</button>
    </div>`;
    return;
  }

  const totalSpent = WED.expenses.reduce((a,e)=>a+e.amount,0);
  const paid       = WED.expenses.filter(e=>e.paid).reduce((a,e)=>a+e.amount,0);
  const remaining  = WED.budget - totalSpent;
  const pct        = WED.budget ? Math.min(Math.round((totalSpent/WED.budget)*100),100) : 0;

  const byCat = {};
  WED.expenses.forEach(e => { byCat[e.category] = (byCat[e.category]||0)+e.amount; });

  el.innerHTML = `
    <div class="budget-hero">
      <div style="font-size:11px;font-weight:700;color:var(--ink-4);text-transform:uppercase;letter-spacing:0.8px">Total Budget</div>
      <div style="font-family:var(--f);font-size:34px;font-style:normal;font-weight:800;color:var(--ink);letter-spacing:-1px;margin:4px 0 12px">₱${WED.budget.toLocaleString()}</div>
      <div class="progress-bar-wrap" style="margin-bottom:8px">
        <div class="progress-bar-fill" style="width:${pct}%;background:linear-gradient(90deg,var(--green-accent),var(--tan))"></div>
      </div>
      <div style="display:flex;justify-content:space-between">
        <span style="font-size:12px;color:var(--ink-3)">Committed ₱${totalSpent.toLocaleString()}</span>
        <span style="font-size:12px;font-weight:700;color:${remaining>=0?'var(--green-deep)':'var(--pink-deep)'}">${remaining>=0?'₱'+remaining.toLocaleString()+' left':'₱'+Math.abs(remaining).toLocaleString()+' over'}</span>
      </div>
      <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
        <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:8px;background:rgba(90,171,122,0.15);color:var(--green-deep);border:1px solid rgba(90,171,122,0.2)">Paid ₱${paid.toLocaleString()}</span>
        <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:8px;background:rgba(224,120,152,0.12);color:var(--pink-deep);border:1px solid rgba(224,120,152,0.2)">Pending ₱${(totalSpent-paid).toLocaleString()}</span>
      </div>
    </div>

    ${Object.keys(byCat).length ? `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <span class="sec-title" style="margin-bottom:0">By Category</span>
      <button onclick="openManageCategories()" style="padding:5px 10px;border-radius:8px;border:1px solid rgba(201,169,110,0.28);background:rgba(245,230,200,0.55);font-size:11px;font-weight:700;color:var(--tan-dark);cursor:pointer">⚙️ Manage</button>
    </div>
    <div class="budget-cat-grid" data-cols="${Object.keys(byCat).length >= 4 ? 4 : Object.keys(byCat).length === 3 ? 3 : 1}">
      ${Object.entries(byCat).sort((a,b)=>b[1]-a[1]).map(([cat,amt])=>{
        const catPct = totalSpent ? Math.round((amt/totalSpent)*100) : 0;
        const budPct = WED.budget  ? Math.min(Math.round((amt/WED.budget)*100),100) : 0;
        const catLbl = allExpenseCats().find(c=>c.key===cat)?.label || cat;
        return `
        <div class="${catColor(cat)} bcat-card" style="padding:10px 12px;border-radius:var(--r-md)">
          <div class="bcat-row" style="display:flex;align-items:center;gap:6px;margin-bottom:5px">
            <span style="font-size:15px">${catIcon(cat)}</span>
            <span style="font-size:11.5px;font-weight:700;color:var(--ink);text-transform:capitalize;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${catLbl}</span>
            <span style="font-size:11px;font-weight:700;color:var(--ink);flex-shrink:0">₱${amt.toLocaleString()}</span>
            <span style="font-size:10px;color:var(--ink-4);font-weight:600;flex-shrink:0">${catPct}%</span>
          </div>
          <div style="height:4px;border-radius:2px;background:rgba(44,31,14,0.08);overflow:hidden;margin-bottom:6px">
            <div style="height:100%;width:${budPct}%;background:linear-gradient(90deg,var(--green-accent),var(--tan));border-radius:2px"></div>
          </div>
          <button onclick="generateCategoryReceipt('${cat}')" style="width:100%;padding:4px;border-radius:6px;border:1px solid rgba(201,169,110,0.22);background:rgba(255,252,247,0.7);font-size:10px;font-weight:700;color:var(--tan-dark);cursor:pointer">🧾 Receipt</button>
        </div>`;}).join('')}
    </div>` : `
    <div style="display:flex;justify-content:flex-end;margin-bottom:8px">
      <button onclick="openManageCategories()" style="padding:5px 10px;border-radius:8px;border:1px solid rgba(201,169,110,0.28);background:rgba(245,230,200,0.55);font-size:11px;font-weight:700;color:var(--tan-dark);cursor:pointer">⚙️ Manage Categories</button>
    </div>`}

    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <span class="sec-title" style="margin-bottom:0">All Expenses</span>
      <button onclick="populateExpenseCatSelect();openModal('wed-add-expense-modal')" class="icon-btn">+ Add</button>
    </div>
    ${WED.expenses.length ? WED.expenses.map((e,i)=>`
      <div class="glass" style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:var(--r-md);margin-bottom:7px">
        <div style="width:36px;height:36px;border-radius:var(--r-sm);background:rgba(245,230,200,0.6);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;border:1px solid rgba(201,169,110,0.2)">${catIcon(e.category)}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:700;color:var(--ink)">${e.label}</div>
          <div style="font-size:11px;color:var(--ink-4);text-transform:capitalize">${allExpenseCats().find(c=>c.key===e.category)?.label||e.category}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-size:14px;font-weight:700;color:var(--ink)">₱${e.amount.toLocaleString()}</div>
          <div style="font-size:10.5px;font-weight:700;padding:2px 7px;border-radius:6px;margin-top:2px;background:${e.paid?'rgba(90,171,122,0.12)':'rgba(224,120,152,0.12)'};color:${e.paid?'var(--green-deep)':'var(--pink-deep)'};">${e.paid?'Paid':'Pending'}</div>
        </div>
        <div class="expense-actions">
          <button onclick="toggleExpensePaid(${i})" style="padding:4px 7px;border-radius:7px;border:1px solid rgba(90,171,122,0.25);background:rgba(90,171,122,0.12);font-size:10px;font-weight:700;color:var(--green-deep);cursor:pointer;white-space:nowrap">${e.paid?'Unpay':'Mark Paid'}</button>
          <button onclick="openEditExpense(${i})" style="padding:4px 7px;border-radius:7px;border:1px solid rgba(184,145,106,0.25);background:rgba(245,230,200,0.55);font-size:11px;cursor:pointer;color:var(--tan-dark)">✏️</button>
          <button onclick="deleteExpense(${i})" style="padding:4px 7px;border-radius:7px;border:1px solid rgba(224,120,152,0.2);background:rgba(252,232,238,0.5);font-size:11px;cursor:pointer;color:var(--pink-deep)">🗑</button>
        </div>
      </div>`).join('') : `<div style="text-align:center;padding:24px;font-size:13px;color:var(--ink-4)">No expenses yet — click "+ Add" to start tracking.</div>`}
    <button onclick="populateExpenseCatSelect();openModal('wed-add-expense-modal')" class="cta-btn" style="margin-top:8px">+ Add Expense</button>`;
}

function populateExpenseCatSelect() {
  const sel = document.getElementById('wed-exp-category');
  if (!sel) return;
  // Remove custom options (keep built-ins which are static in HTML)
  [...sel.options].filter(o => o.dataset.custom).forEach(o => o.remove());
  // Append custom categories
  (WED.expenseCategories||[]).forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.key; opt.textContent = `${c.icon} ${c.label}`; opt.dataset.custom = '1';
    sel.appendChild(opt);
  });
}

function addWedExpense() {
  const label    = document.getElementById('wed-exp-label')?.value.trim();
  const amount   = parseFloat((document.getElementById('wed-exp-amount')?.value||'').replace(/,/g,''))||0;
  const category = document.getElementById('wed-exp-category')?.value;
  if (!label||!amount) { showToast('⚠️ Fill in all fields'); return; }
  WED.expenses.push({ id: Date.now(), category, label, amount, paid: false });
  document.getElementById('wed-exp-label').value  = '';
  document.getElementById('wed-exp-amount').value = '';
  saveState();
  closeModal('wed-add-expense-modal');
  renderBudget();
  showToast('💸 Expense added!');
}

function toggleExpensePaid(i) {
  WED.expenses[i].paid = !WED.expenses[i].paid;
  saveState();
  renderBudget();
  showToast(WED.expenses[i].paid ? '✅ Marked as paid!' : '↩ Marked unpaid');
}

function deleteExpense(i) {
  if (!confirm('Delete "'+WED.expenses[i].label+'"?')) return;
  WED.expenses.splice(i, 1);
  saveState();
  renderBudget();
  showToast('🗑 Expense removed');
}

/* ── CUSTOM EXPENSE CATEGORIES ───────────────── */
function openManageCategories() {
  document.getElementById('manage-cat-modal')?.remove();
  const el = document.createElement('div');
  el.id = 'manage-cat-modal';
  el.className = 'modal-overlay';
  el.onclick = e => { if (e.target === el) el.remove(); };
  el.innerHTML = `
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-title">⚙️ Manage Categories</div>
      <div style="font-size:11.5px;color:var(--ink-4);margin-bottom:12px">Built-in categories cannot be removed. Add your own below.</div>
      <div id="cat-list-built" style="margin-bottom:10px">
        ${Object.keys(CAT_EMOJIS).map(k=>
          `<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:9px;background:rgba(245,230,200,0.3);margin-bottom:4px">
            <span style="font-size:16px">${CAT_EMOJIS[k]}</span>
            <span style="font-size:12.5px;font-weight:600;color:var(--ink);flex:1;text-transform:capitalize">${k}</span>
            <span style="font-size:10px;font-weight:700;color:var(--ink-4);padding:2px 7px;border-radius:6px;background:rgba(201,169,110,0.12)">Built-in</span>
          </div>`).join('')}
      </div>
      <div id="cat-list-custom">
        ${(WED.expenseCategories||[]).map((c,i)=>
          `<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:9px;background:rgba(90,171,122,0.1);margin-bottom:4px;border:1px solid rgba(90,171,122,0.18)">
            <span style="font-size:16px">${c.icon}</span>
            <span style="font-size:12.5px;font-weight:600;color:var(--ink);flex:1">${c.label}</span>
            <button onclick="removeExpenseCat(${i})" style="font-size:11px;border:none;background:none;color:var(--pink-deep);cursor:pointer;padding:4px">✕</button>
          </div>`).join('')}
      </div>
      <div style="margin-top:14px;border-top:1px solid rgba(201,169,110,0.14);padding-top:14px">
        <div style="font-size:11px;font-weight:700;color:var(--ink-3);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">Add New Category</div>
        <div style="display:flex;gap:8px;margin-bottom:8px">
          <input id="new-cat-icon" class="glass-input" placeholder="🎪" style="width:60px;text-align:center;font-size:20px;padding:6px 8px">
          <input id="new-cat-label" class="glass-input" placeholder="Category name" style="flex:1" onkeydown="if(event.key==='Enter')addExpenseCat()">
        </div>
        <button class="cta-btn" onclick="addExpenseCat()">+ Add Category</button>
      </div>
    </div>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('open'));
}

function addExpenseCat() {
  const icon  = (document.getElementById('new-cat-icon')?.value  || '').trim() || '🏷️';
  const label = (document.getElementById('new-cat-label')?.value || '').trim();
  if (!label) { showToast('⚠️ Enter a category name'); return; }
  const key = 'custom_' + label.toLowerCase().replace(/[^a-z0-9]/g,'_') + '_' + Date.now();
  if (!WED.expenseCategories) WED.expenseCategories = [];
  WED.expenseCategories.push({ key, icon, label });
  saveState();
  document.getElementById('manage-cat-modal')?.remove();
  renderBudget();
  openManageCategories();
  showToast('✅ Category added: ' + label);
}

function removeExpenseCat(i) {
  const cat = WED.expenseCategories[i];
  if (!cat) return;
  // Don't delete if expenses exist in this category
  const inUse = WED.expenses.some(e => e.category === cat.key);
  if (inUse) { showToast('⚠️ Cannot remove — expenses exist in "' + cat.label + '"'); return; }
  WED.expenseCategories.splice(i, 1);
  saveState();
  document.getElementById('manage-cat-modal')?.remove();
  renderBudget();
  openManageCategories();
  showToast('🗑 Category removed');
}

function generateCategoryReceipt(catKey) {
  const catInfo  = allExpenseCats().find(c => c.key === catKey);
  const catLabel = catInfo?.label || catKey;
  const catEmoji = catInfo?.icon  || '🏷️';
  const expenses = WED.expenses.filter(e => e.category === catKey);
  if (!expenses.length) { showToast('No expenses in this category'); return; }
  const total   = expenses.reduce((a,e) => a+e.amount, 0);
  const paid    = expenses.filter(e=>e.paid).reduce((a,e) => a+e.amount, 0);
  const pending = total - paid;
  const d       = new Date().toLocaleDateString('en-PH',{year:'numeric',month:'long',day:'numeric'});

  document.getElementById('receipt-modal')?.remove();
  const el = document.createElement('div');
  el.id = 'receipt-modal';
  el.className = 'modal-overlay';
  el.onclick = e => { if (e.target === el) el.remove(); };
  el.innerHTML = `
    <div class="modal-sheet" style="max-height:85vh;overflow-y:auto">
      <div class="modal-handle"></div>
      <div style="text-align:center;padding:16px 0 12px">
        <div style="font-size:32px;margin-bottom:4px">${catEmoji}</div>
        <div style="font-family:var(--f);font-size:20px;font-style:normal;font-weight:800;color:var(--ink);letter-spacing:-0.3px">${catLabel}</div>
        <div style="font-size:11px;color:var(--ink-4);margin-top:2px">Expense Receipt · ${d}</div>
        ${WED.couple.p1 && WED.couple.p2 ? `<div style="font-size:11.5px;font-weight:700;color:var(--tan-dark);margin-top:4px">${WED.couple.p1} &amp; ${WED.couple.p2}</div>` : ''}
      </div>
      <div style="border-top:1px dashed rgba(201,169,110,0.3);margin:0 0 12px"></div>
      ${expenses.map(e => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 4px;border-bottom:1px solid rgba(201,169,110,0.1)">
          <div style="flex:1;min-width:0">
            <div style="font-size:12.5px;font-weight:600;color:var(--ink)">${e.label}</div>
            <div style="font-size:10.5px;font-weight:700;color:${e.paid?'var(--green-deep)':'var(--pink-deep)'};margin-top:1px">${e.paid?'✅ Paid':'⏳ Pending'}</div>
          </div>
          <div style="font-size:13px;font-weight:700;color:var(--ink);flex-shrink:0">₱${e.amount.toLocaleString()}</div>
        </div>`).join('')}
      <div style="border-top:1.5px solid rgba(201,169,110,0.3);margin-top:8px;padding-top:12px">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <span style="font-size:11.5px;color:var(--green-deep);font-weight:700">✅ Paid</span>
          <span style="font-size:11.5px;color:var(--green-deep);font-weight:700">₱${paid.toLocaleString()}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:10px">
          <span style="font-size:11.5px;color:var(--pink-deep);font-weight:700">⏳ Pending</span>
          <span style="font-size:11.5px;color:var(--pink-deep);font-weight:700">₱${pending.toLocaleString()}</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:10px 12px;border-radius:10px;background:rgba(245,230,200,0.5);border:1px solid rgba(201,169,110,0.22)">
          <span style="font-size:14px;font-weight:700;color:var(--ink)">Total</span>
          <span style="font-size:14px;font-weight:700;color:var(--ink)">₱${total.toLocaleString()}</span>
        </div>
      </div>
      <button onclick="window.print()" style="width:100%;margin-top:14px;padding:11px;border-radius:12px;background:rgba(245,230,200,0.7);border:1px solid rgba(201,169,110,0.3);font-size:13px;font-weight:700;color:var(--tan-dark);cursor:pointer">🖨 Print Receipt</button>
      <button onclick="document.getElementById('receipt-modal').remove()" style="width:100%;margin-top:8px;padding:10px;border-radius:12px;background:none;border:none;font-size:13px;color:var(--ink-4);cursor:pointer">Close</button>
    </div>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('open'));
}

/* ── GUESTS ──────────────────────────────────── */
let _guestSearch = '';
let _guestFilter = 'all'; // 'all' | 'attending' | 'pending' | 'declined' | 'not-sent'

function updateGuestSearch(val) {
  _guestSearch = (val || '').toLowerCase();
  renderGuests();
  // Restore focus + value after re-render
  const inp = document.getElementById('guest-search-input');
  if (inp) { inp.value = val || _guestSearch; inp.focus(); }
}

function setGuestFilter(val) {
  _guestFilter = val;
  renderGuests();
}

function _guestCard(g) {
  const chair      = WED.furniture.find(f => g._chairId === f.id);
  const initials   = g.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const bgColor    = g.rsvp==='attending'?'rgba(232,245,237,0.8)':g.rsvp==='declined'?'rgba(252,232,238,0.8)':'rgba(245,230,200,0.8)';
  const txtColor   = g.rsvp==='attending'?'var(--green-deep)':g.rsvp==='declined'?'var(--pink-deep)':'var(--tan-dark)';
  const sentAt     = g._inviteSentAt ? new Date(g._inviteSentAt).toLocaleDateString('en-PH',{month:'short',day:'numeric'}) : '';
  const rsvpEmoji  = g.rsvp==='attending'?'✅':g.rsvp==='declined'?'❌':'⏳';

  // Shared action buttons (used in both desktop col and mobile expand row)
  const sendBtn = chair
    ? `<button onclick="event.stopPropagation();shareGuestInvite(${g.id})" style="padding:5px 9px;border-radius:8px;border:1px solid rgba(201,169,110,0.28);background:rgba(252,232,238,0.7);font-size:11.5px;font-weight:700;color:var(--pink-deep);cursor:pointer;white-space:nowrap">${g._inviteSent?'💌 Resend':'💌 Send'}</button>`
    : `<button onclick="event.stopPropagation();showToast('🪑 Assign a seat first in the Seating tab')" style="padding:5px 9px;border-radius:8px;border:1px solid rgba(184,145,106,0.2);background:rgba(245,230,200,0.3);font-size:11.5px;font-weight:700;color:var(--ink-4);cursor:not-allowed;white-space:nowrap;opacity:0.5">💌 Send</button>`;
  const linkBtn = chair
    ? `<button onclick="event.stopPropagation();copyGuestLink(${g.id})" title="Copy RSVP link" style="padding:5px 9px;border-radius:8px;border:1px solid rgba(106,142,112,0.28);background:rgba(232,245,237,0.7);font-size:11.5px;font-weight:700;color:var(--green-deep);cursor:pointer">🔗</button>`
    : `<button onclick="event.stopPropagation();showToast('🪑 Assign a seat first in the Seating tab')" style="padding:5px 9px;border-radius:8px;border:1px solid rgba(184,145,106,0.18);background:rgba(245,230,200,0.25);font-size:11.5px;font-weight:700;color:var(--ink-4);cursor:not-allowed;opacity:0.45">🔗</button>`;
  const editBtn = `<button onclick="event.stopPropagation();openEditGuest(${g.id})" style="padding:5px 9px;border-radius:8px;border:none;background:rgba(245,230,200,0.7);font-size:13px;cursor:pointer;color:var(--tan-dark)">✏️</button>`;
  const delBtn  = `<button onclick="event.stopPropagation();removeGuest(${g.id})" style="padding:5px 9px;border-radius:8px;border:none;background:rgba(224,120,152,0.15);font-size:13px;cursor:pointer;color:var(--pink-deep)">🗑</button>`;
  const rsvpSel = (extraStyle='') => `<select onchange="updateGuestRSVP(${g.id},this.value)" onclick="event.stopPropagation()" style="padding:4px 8px;border-radius:8px;border:1px solid rgba(201,169,110,0.25);background:rgba(255,253,248,0.9);font-size:11px;font-weight:700;color:var(--ink-2);font-family:var(--f);cursor:pointer;outline:none${extraStyle}">
    <option value="attending" ${g.rsvp==='attending'?'selected':''}>✅ Attending</option>
    <option value="pending"   ${g.rsvp==='pending'  ?'selected':''}>⏳ Pending</option>
    <option value="declined"  ${g.rsvp==='declined' ?'selected':''}>❌ Declined</option>
  </select>`;

  return `<div class="guest-card glass" style="border-radius:var(--r-md);margin-bottom:7px;overflow:hidden" onclick="toggleGuestCard(event,this)">
    <div style="display:flex;align-items:center;gap:10px;padding:12px 14px">
      <div style="width:38px;height:38px;border-radius:10px;background:${bgColor};display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:${txtColor};flex-shrink:0;border:1px solid rgba(255,255,255,0.6)">${initials}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13.5px;font-weight:700;color:var(--ink)">${g.name}</div>
        <div class="gc-tags-row">
          ${g.group ? `<span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:6px;background:rgba(201,169,110,0.14);color:var(--tan-dark);border:1px solid rgba(201,169,110,0.22)">${g.group}</span>` : ''}
          ${chair   ? `<span style="font-size:10.5px;font-weight:700;padding:2px 7px;border-radius:6px;background:rgba(90,171,122,0.12);color:var(--green-deep);border:1px solid rgba(90,171,122,0.2)">🪑 ${chair.label}</span>` : ''}
          ${g.meal  ? `<span style="font-size:10.5px;padding:2px 7px;border-radius:6px;background:rgba(255,253,248,0.8);color:var(--ink-3);border:1px solid rgba(201,169,110,0.12)">${g.meal}</span>` : ''}
          ${g.phone ? `<a href="tel:${g.phone.replace(/\s/g,'')}" onclick="event.stopPropagation()" style="font-size:10.5px;padding:2px 7px;border-radius:6px;background:rgba(90,171,122,0.1);color:var(--green-deep);border:1px solid rgba(90,171,122,0.18);text-decoration:none;font-weight:700">📞 ${g.phone}</a>` : ''}
          ${g._inviteSent ? `<span style="font-size:10.5px;font-weight:700;padding:2px 7px;border-radius:6px;background:rgba(201,169,110,0.18);color:var(--tan-dark);border:1px solid rgba(201,169,110,0.28)">💌 Sent${sentAt?' · '+sentAt:''}</span>` : ''}
        </div>
      </div>
      <!-- Mobile only: RSVP status emoji + expand chevron -->
      <div class="gc-mobile-hint">
        <span style="font-size:16px;line-height:1">${rsvpEmoji}</span>
        <span class="gc-chevron">▾</span>
      </div>
      <!-- Desktop only: full action column -->
      <div class="guest-actions-col">
        ${rsvpSel()}
        ${sendBtn}${linkBtn}
        <button onclick="event.stopPropagation();openEditGuest(${g.id})" style="width:26px;height:26px;border-radius:7px;border:none;background:rgba(245,230,200,0.55);font-size:13px;cursor:pointer;color:var(--tan-dark);flex-shrink:0">✏️</button>
        <button onclick="event.stopPropagation();removeGuest(${g.id})" style="width:26px;height:26px;border-radius:7px;border:none;background:rgba(224,120,152,0.12);font-size:13px;cursor:pointer;color:var(--pink-deep);flex-shrink:0">🗑</button>
      </div>
    </div>
    <!-- Mobile only: expanded action row (hidden until tapped) -->
    <div class="gc-mobile-actions">
      ${rsvpSel(';font-size:12px;padding:6px 10px')}
      ${sendBtn}${linkBtn}${editBtn}${delBtn}
    </div>
  </div>`;
}

/* Toggle guest card expand on mobile */
function toggleGuestCard(event, card) {
  if (window.innerWidth >= 900) return; // desktop: cards are always fully visible
  card.classList.toggle('gc-expanded');
}

function renderGuests() {
  const el = document.getElementById('wed-guests-content');
  if (!el) return;
  const attending = WED.guests.filter(g => g.rsvp === 'attending').length;
  const pending   = WED.guests.filter(g => g.rsvp === 'pending').length;
  const declined  = WED.guests.filter(g => g.rsvp === 'declined').length;

  const q = _guestSearch.toLowerCase();
  // Apply status filter first, then text search
  const preFiltered = WED.guests.filter(g => {
    if (_guestFilter === 'attending')  return g.rsvp === 'attending';
    if (_guestFilter === 'pending')    return g.rsvp === 'pending';
    if (_guestFilter === 'declined')   return g.rsvp === 'declined';
    if (_guestFilter === 'not-sent')   return !g._inviteSent;
    return true;
  });
  const filtered = q ? preFiltered.filter(g => g.name.toLowerCase().includes(q) || (g.group||'').toLowerCase().includes(q)) : preFiltered;

  // Group filtered guests
  const groups = {};
  const ungrouped = [];
  filtered.forEach(g => {
    if (g.group) { (groups[g.group] = groups[g.group] || []).push(g); }
    else { ungrouped.push(g); }
  });

  const groupOrder = [...(WED.guestGroups || []), ...Object.keys(groups).filter(k => !(WED.guestGroups||[]).includes(k))];

  let guestHTML = '';
  groupOrder.forEach(grp => {
    const members = groups[grp];
    if (!members || !members.length) return;
    const att = members.filter(g => g.rsvp === 'attending').length;
    guestHTML += `
      <div style="margin-bottom:4px">
        <div class="guest-group-hdr">
          <span>${grp}</span>
          <span style="font-size:10.5px;font-weight:400;opacity:0.7">${members.length} guest${members.length!==1?'s':''} · ${att} attending</span>
        </div>
        ${members.map(_guestCard).join('')}
      </div>`;
  });
  if (ungrouped.length) {
    guestHTML += ungrouped.length === filtered.length
      ? ungrouped.map(_guestCard).join('')   // all ungrouped — no header
      : `<div style="margin-bottom:4px">
           <div class="guest-group-hdr"><span>Other / Ungrouped</span><span style="font-size:10.5px;font-weight:400;opacity:0.7">${ungrouped.length}</span></div>
           ${ungrouped.map(_guestCard).join('')}
         </div>`;
  }

  el.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">
      <div class="glass-green" style="padding:12px;border-radius:var(--r-md);text-align:center">
        <div style="font-size:24px;font-weight:800;color:var(--green-deep);font-family:var(--f);font-style:normal;letter-spacing:-0.5px">${attending}</div>
        <div style="font-size:10.5px;color:var(--green-deep);font-weight:700">Attending</div>
      </div>
      <div class="glass-cream" style="padding:12px;border-radius:var(--r-md);text-align:center">
        <div style="font-size:24px;font-weight:800;color:var(--tan-dark);font-family:var(--f);font-style:normal;letter-spacing:-0.5px">${pending}</div>
        <div style="font-size:10.5px;color:var(--tan-dark);font-weight:700">Pending</div>
      </div>
      <div class="glass-pink" style="padding:12px;border-radius:var(--r-md);text-align:center">
        <div style="font-size:24px;font-weight:800;color:var(--pink-deep);font-family:var(--f);font-style:normal;letter-spacing:-0.5px">${declined}</div>
        <div style="font-size:10.5px;color:var(--pink-deep);font-weight:700">Declined</div>
      </div>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:12px">
      <button onclick="openModal('wed-add-guest-modal')" style="flex:1;padding:10px;border-radius:var(--r-md);background:rgba(245,230,200,0.65);border:1px solid rgba(201,169,110,0.28);font-size:13px;font-weight:700;color:var(--tan-dark);cursor:pointer">+ Add Guest</button>
      <button onclick="renderGuestGroupModal();openModal('wed-add-guest-group-modal')" style="padding:10px 14px;border-radius:var(--r-md);background:rgba(245,230,200,0.4);border:1px solid rgba(201,169,110,0.22);font-size:12px;font-weight:700;color:var(--tan-dark);cursor:pointer" title="Manage Groups">👥 Groups</button>
    </div>
    <div style="position:relative;margin-bottom:8px">
      <input id="guest-search-input" type="search" placeholder="🔍 Search guests or groups…" value="${_guestSearch}"
        oninput="updateGuestSearch(this.value)"
        style="width:100%;padding:9px 12px;border-radius:var(--r-md);border:1px solid rgba(201,169,110,0.25);background:rgba(255,253,248,0.9);font-size:13px;color:var(--ink);font-family:var(--f);outline:none">
    </div>
    <!-- Filter pills -->
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
      ${[
        { val:'all',       label:'All',            count: WED.guests.length,                                       col:'var(--tan-dark)',   bg:'rgba(245,230,200,0.6)',  bd:'rgba(201,169,110,0.32)' },
        { val:'attending', label:'✅ Attending',   count: WED.guests.filter(g=>g.rsvp==='attending').length,       col:'var(--green-deep)', bg:'rgba(90,171,122,0.15)',  bd:'rgba(90,171,122,0.35)'  },
        { val:'pending',   label:'⏳ Pending',     count: WED.guests.filter(g=>g.rsvp==='pending').length,         col:'var(--tan-dark)',   bg:'rgba(245,230,200,0.5)',  bd:'rgba(201,169,110,0.28)' },
        { val:'declined',  label:'❌ Declined',    count: WED.guests.filter(g=>g.rsvp==='declined').length,        col:'var(--pink-deep)',  bg:'rgba(252,232,238,0.5)',  bd:'rgba(224,120,152,0.28)' },
        { val:'not-sent',  label:'💌 Not Sent',    count: WED.guests.filter(g=>!g._inviteSent).length,             col:'var(--pink-deep)',  bg:'rgba(252,232,238,0.6)',  bd:'rgba(224,120,152,0.32)' },
      ].map(f => {
        const active = _guestFilter === f.val;
        return `<button onclick="setGuestFilter('${f.val}')"
          style="padding:5px 11px;border-radius:20px;border:1.5px solid ${active ? f.bd : 'rgba(201,169,110,0.18)'};background:${active ? f.bg : 'rgba(255,253,248,0.7)'};font-size:11px;font-weight:${active?'700':'600'};color:${active ? f.col : 'var(--ink-4)'};cursor:pointer;transition:all 0.15s;white-space:nowrap">
          ${f.label} <span style="opacity:0.75">${f.count}</span>
        </button>`;
      }).join('')}
    </div>
    ${filtered.length ? guestHTML : `<div style="text-align:center;padding:28px 16px;font-size:13px;color:var(--ink-4)">${q || _guestFilter!=='all' ? 'No guests match this filter.' : 'No guests yet — click "+ Add Guest" to start.'}</div>`}`;
}

let _newGuestMeal = 'chicken';

function selectGuestMeal(btn, val) {
  _newGuestMeal = val;
  document.querySelectorAll('#guest-meal-picker .split-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function submitAddGuest() {
  const name    = (document.getElementById('new-guest-name')?.value    || '').trim();
  if (!name) { showToast('⚠️ Enter a guest name'); return; }
  const group   = (document.getElementById('new-guest-group')?.value   || '').trim();
  if (!group) { showToast('⚠️ Please select a group for this guest'); return; }
  const phone   = (document.getElementById('new-guest-phone')?.value   || '').trim();
  const dietary = (document.getElementById('new-guest-dietary')?.value || '').trim();
  WED.guests.push({ id: WED.nextGuestId++, name, rsvp:'pending', meal:_newGuestMeal, dietary, phone, group, _inviteSent: false, _inviteSentAt: null });
  document.getElementById('new-guest-name').value    = '';
  document.getElementById('new-guest-phone').value   = '';
  document.getElementById('new-guest-dietary').value = '';
  _newGuestMeal = 'chicken';
  document.querySelectorAll('#guest-meal-picker .split-btn').forEach((b,i) => b.classList.toggle('active', i===0));
  saveState();
  closeModal('wed-add-guest-modal');
  renderGuests();
  renderSeatAssignments();
  drawCanvas();
  showToast('🎉 '+name+' added!');
}

function updateGuestRSVP(id, val) {
  const g = WED.guests.find(g=>g.id===id);
  if (g) { g.rsvp = val; saveState(); renderGuests(); showToast('✅ RSVP updated for '+g.name); }
}

function removeGuest(id) {
  const g = WED.guests.find(g=>g.id===id);
  if (!g) return;
  if (!confirm('Remove '+g.name+'?')) return;
  WED.guests = WED.guests.filter(gg=>gg.id!==id);
  saveState();
  renderGuests();
  renderSeatAssignments();
  drawCanvas();
  showToast('🗑 '+g.name+' removed');
}

let _editGuestId = null;
function openEditGuest(id) {
  const g = WED.guests.find(g => g.id === id);
  if (!g) return;
  _editGuestId = id;
  // Build group options from WED.guestGroups
  const groupOpts = [...(WED.guestGroups || ['Bride\'s Side','Groom\'s Side','Friends','Colleagues','VIP','Others'])]
    .map(grp => `<option value="${grp}" ${g.group===grp?'selected':''}>${grp}</option>`).join('');
  // Meal options
  const meals = [['chicken','🍗 Chicken'],['fish','🐟 Fish'],['beef','🥩 Beef'],['vegetarian','🥦 Vegetarian']];
  // Remove existing modal if any
  document.getElementById('edit-guest-modal')?.remove();
  const el = document.createElement('div');
  el.id = 'edit-guest-modal';
  el.className = 'modal-overlay';
  el.onclick = e => { if (e.target === el) el.remove(); };
  el.innerHTML = `
    <div class="modal-sheet" style="max-height:85vh;overflow-y:auto">
      <div class="modal-handle"></div>
      <div class="modal-title">Edit Guest</div>
      <div class="input-group">
        <div class="input-label">Full Name *</div>
        <input id="edit-guest-name" class="glass-input" value="${g.name.replace(/"/g,'&quot;')}" placeholder="Full name">
      </div>
      <div class="input-group">
        <div class="input-label">Group *</div>
        <select id="edit-guest-group" class="glass-input">
          <option value="" ${!g.group?'selected':''} disabled>-- Select group --</option>
          ${groupOpts}
        </select>
      </div>
      <div class="input-group">
        <div class="input-label">Meal Preference</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${meals.map(([val,lbl])=>`<button class="split-btn${g.meal===val?' active':''}" style="flex:none;min-width:auto;padding:7px 12px" onclick="this.parentNode.querySelectorAll('.split-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');document.getElementById('edit-guest-meal').value='${val}'">${lbl}</button>`).join('')}
        </div>
        <input type="hidden" id="edit-guest-meal" value="${g.meal||'chicken'}">
      </div>
      <div class="input-group">
        <div class="input-label">Phone (optional)</div>
        <input id="edit-guest-phone" class="glass-input" type="tel" value="${(g.phone||'').replace(/"/g,'&quot;')}" placeholder="+63 912 345 6789">
      </div>
      <div class="input-group">
        <div class="input-label">Dietary Notes (optional)</div>
        <input id="edit-guest-dietary" class="glass-input" value="${(g.dietary||'').replace(/"/g,'&quot;')}" placeholder="e.g. Nut allergy">
      </div>
      <button class="cta-btn" onclick="submitEditGuest()">Save Changes ✓</button>
    </div>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('open'));
}

function submitEditGuest() {
  const g = WED.guests.find(g => g.id === _editGuestId);
  if (!g) return;
  const name  = (document.getElementById('edit-guest-name')?.value  || '').trim();
  const group = (document.getElementById('edit-guest-group')?.value || '').trim();
  if (!name)  { showToast('⚠️ Name is required');  return; }
  if (!group) { showToast('⚠️ Group is required'); return; }
  g.name    = name;
  g.group   = group;
  g.meal    = document.getElementById('edit-guest-meal')?.value    || g.meal;
  g.phone   = (document.getElementById('edit-guest-phone')?.value   || '').trim();
  g.dietary = (document.getElementById('edit-guest-dietary')?.value || '').trim();
  saveState();
  document.getElementById('edit-guest-modal')?.remove();
  renderGuests();
  renderSeatAssignments();
  showToast('✅ ' + g.name + ' updated!');
}

/* ── RSVP / INVITATION CARD ──────────────────── */
function showRSVPCard(guestId, opts = {}) {
  _rsvpGuestId = (guestId !== undefined && guestId !== null) ? guestId : null;
  const modal  = document.getElementById('rsvp-card-modal');
  const canvas = document.getElementById('rsvp-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const guest = _rsvpGuestId !== null ? WED.guests.find(g => g.id === _rsvpGuestId) : null;
  const w = canvas.width  = 380;
  const h = canvas.height = guest ? 600 : 520;

  // Build RSVP URL (guest-specific if available)
  const p1  = encodeURIComponent(WED.couple.p1 || '');
  const p2  = encodeURIComponent(WED.couple.p2 || '');
  const dt  = encodeURIComponent(WED.date       || '');
  const vn  = encodeURIComponent(WED.venue      || '');
  const ck  = encodeURIComponent(_rsvpCoupleKey());
  let rsvpUrl = `https://campingchairph.github.io/vowsandpetals/rsvp.html?p1=${p1}&p2=${p2}&date=${dt}&venue=${vn}&coupleKey=${ck}`;
  if (guest) rsvpUrl += `&guestId=${encodeURIComponent(guest.id)}&guestName=${encodeURIComponent(guest.name)}`;

  function _syncPreview() {
    const preview = document.getElementById('rsvp-preview-img');
    const dataUrl = canvas.toDataURL('image/png');
    if (preview) preview.src = dataUrl;
    if (!WED.customCardImage && !guest) {
      WED._invitationImg = dataUrl;
      saveState();
      // also update the overview builder preview
      const ovImg = document.getElementById('inv-page1-img');
      if (ovImg) { ovImg.src = dataUrl; ovImg.style.display = 'block'; }
      const p1ph = document.getElementById('inv-page1-placeholder');
      if (p1ph) p1ph.style.display = 'none';
    }
  }

  // Draw QR code onto canvas then call cb()
  function _drawQROnCanvas(qrY, cb) {
    if (typeof QRCode === 'undefined') { cb(); return; }
    const tmpDiv = document.createElement('div');
    tmpDiv.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
    document.body.appendChild(tmpDiv);
    new QRCode(tmpDiv, { text: rsvpUrl, width: 96, height: 96, colorDark:'#2c1f0e', colorLight:'#ffffff', correctLevel: QRCode.CorrectLevel.M });
    setTimeout(() => {
      const qrCanvas = tmpDiv.querySelector('canvas');
      if (qrCanvas) {
        const sz = 96, qrX = (w - sz) / 2;
        // white card behind QR
        ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.beginPath(); ctx.roundRect(qrX - 8, qrY - 8, sz + 16, sz + 16, 10); ctx.fill();
        ctx.drawImage(qrCanvas, qrX, qrY, sz, sz);
        // guest name + seat label
        if (guest) {
          const _t = _getInviteTheme();
          ctx.fillStyle = _t.sub; ctx.font = '500 10.5px Figtree,sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(`for ${guest.name}`, w / 2, qrY + sz + 18);
          const guestChair = WED.furniture.find(f => f.id === guest._chairId);
          if (guestChair) {
            ctx.fillStyle = _t.accent2 || _t.accent; ctx.font = '700 10px Figtree,sans-serif';
            ctx.fillText(`🪑 ${guestChair.label}`, w / 2, qrY + sz + 32);
          }
        }
      }
      document.body.removeChild(tmpDiv);
      cb();
    }, 120);
  }

  if (WED.customCardImage) {
    const src = new Image();
    src.onload = () => {
      ctx.drawImage(src, 0, 0, w, h);
      _syncPreview();
    };
    src.src = WED.customCardImage;
    modal.classList.add('open');
    _generateRSVPQR();
    return;
  }

  // Apply theme
  const t = _getInviteTheme();

  // gradient bg
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, t.bg[0]); grad.addColorStop(0.5, t.bg[1]); grad.addColorStop(1, t.bg[2]);
  ctx.fillStyle = grad; ctx.beginPath(); ctx.roundRect(0, 0, w, h, 24); ctx.fill();

  // deco circles
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = t.circleA; ctx.beginPath(); ctx.arc(340, 60, 90, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = t.circleB; ctx.beginPath(); ctx.arc(40, guest ? 540 : 460, 70, 0, Math.PI*2); ctx.fill();
  ctx.globalAlpha = 1;

  // border
  ctx.strokeStyle = t.border; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(8, 8, w-16, h-16, 20); ctx.stroke();

  // florals
  ctx.font = '28px serif'; ctx.textAlign = 'left';
  ctx.fillText(t.florals[0], 18, 50); ctx.fillText(t.florals[0], w-52, 50);
  ctx.fillText(t.florals[1], 12, h-22); ctx.fillText(t.florals[1], w-44, h-22);

  // header
  ctx.fillStyle = t.sub; ctx.font = '500 12.5px Figtree,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('YOU ARE CORDIALLY INVITED TO THE WEDDING OF', w/2, 80);

  // names
  const cp1 = WED.couple.p1 || 'Partner 1';
  const cp2 = WED.couple.p2 || 'Partner 2';
  ctx.fillStyle = t.ink; ctx.font = 'italic 600 38px Lora,serif';
  ctx.fillText(cp1, w/2, 130);
  ctx.fillStyle = t.accent; ctx.font = 'italic 400 22px Lora,serif';
  ctx.fillText('&', w/2, 162);
  ctx.fillStyle = t.ink; ctx.font = 'italic 600 38px Lora,serif';
  ctx.fillText(cp2, w/2, 200);

  // divider
  ctx.strokeStyle = t.div; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(60, 220); ctx.lineTo(w-60, 220); ctx.stroke();

  // date / time / venue
  const dateStr = WED.date
    ? new Date(WED.date).toLocaleDateString('en-PH', {weekday:'long', year:'numeric', month:'long', day:'numeric'})
    : '(Date TBD)';
  ctx.fillStyle = t.dark; ctx.font = '600 15px Figtree,sans-serif';
  ctx.fillText(dateStr, w/2, 252);
  ctx.fillStyle = t.sub; ctx.font = '400 13px Figtree,sans-serif';
  ctx.fillText('3:00 PM', w/2, 275);
  ctx.fillStyle = t.dark; ctx.font = '600 14px Figtree,sans-serif';
  ctx.fillText(WED.venue || '(Venue TBD)', w/2, 300);

  // divider 2
  ctx.strokeStyle = t.border;
  ctx.beginPath(); ctx.moveTo(60, 318); ctx.lineTo(w-60, 318); ctx.stroke();

  // rsvp section
  ctx.fillStyle = t.sub; ctx.font = '500 12px Figtree,sans-serif';
  ctx.fillText('KINDLY CONFIRM YOUR ATTENDANCE', w/2, 342);

  // rsvp button visual
  const btnGrad = ctx.createLinearGradient(w/2-80, 358, w/2+80, 396);
  btnGrad.addColorStop(0, t.btn[0]); btnGrad.addColorStop(1, t.btn[1]);
  ctx.fillStyle = btnGrad;
  ctx.beginPath(); ctx.roundRect(w/2-80, 358, 160, 38, 10); ctx.fill();
  ctx.fillStyle = 'white'; ctx.font = '700 14px Figtree,sans-serif';
  ctx.fillText('RSVP NOW →', w/2, 382);

  // QR code (guest-specific only) or straight to hashtag
  const hashtagY = guest ? 578 : 494;
  const _hashtag = (WED.hashtag || '').replace(/^#/,'').trim() || `${cp1}And${cp2}`;
  const drawHashtagAndSync = () => {
    ctx.fillStyle = t.accent; ctx.font = 'italic 400 13px Lora,serif'; ctx.textAlign = 'center';
    ctx.fillText(`#${_hashtag}`, w/2, hashtagY);
    _syncPreview();
  };

  if (guest) {
    _drawQROnCanvas(410, drawHashtagAndSync);
  } else {
    drawHashtagAndSync();
  }

  if (!opts.silent && modal) modal.classList.add('open');
  _generateRSVPQR();
}

/* Separate helper so both paths (custom card + default) share QR logic */
function _generateRSVPQR() {
  const qrEl = document.getElementById('rsvp-qr-target');
  if (!qrEl || typeof QRCode === 'undefined') return;
  qrEl.innerHTML = '';
  const p1  = encodeURIComponent(WED.couple.p1 || '');
  const p2  = encodeURIComponent(WED.couple.p2 || '');
  const dt  = encodeURIComponent(WED.date       || '');
  const vn  = encodeURIComponent(WED.venue      || '');
  const ck  = encodeURIComponent(_rsvpCoupleKey());
  let rsvpUrl = `https://campingchairph.github.io/vowsandpetals/rsvp.html?p1=${p1}&p2=${p2}&date=${dt}&venue=${vn}&coupleKey=${ck}`;
  if (_rsvpGuestId !== null) {
    const guest = WED.guests.find(g => g.id === _rsvpGuestId);
    if (guest) {
      rsvpUrl += `&guestId=${encodeURIComponent(guest.id)}&guestName=${encodeURIComponent(guest.name)}`;
    }
  }
  // Update the label below the QR
  const qrLabel = document.getElementById('rsvp-qr-label');
  if (qrLabel) {
    const guest = _rsvpGuestId !== null ? WED.guests.find(g => g.id === _rsvpGuestId) : null;
    qrLabel.textContent = guest ? `Scan to RSVP — for ${guest.name}` : 'Scan to RSVP';
  }
  new QRCode(qrEl, { text: rsvpUrl, width: 120, height: 120, colorDark:'#2c1f0e', colorLight:'#ffffff', correctLevel: QRCode.CorrectLevel.M });
}

/* 💌 Share personalised invite (Page 1 with QR + Page 2 details) for a specific guest */
async function shareGuestInvite(guestId) {
  const guest = WED.guests.find(g => g.id === guestId);
  if (!guest) return;

  const chair = WED.furniture.find(f => f.id === guest._chairId);
  const p1  = encodeURIComponent(WED.couple.p1 || '');
  const p2  = encodeURIComponent(WED.couple.p2 || '');
  const dt  = encodeURIComponent(WED.date       || '');
  const vn  = encodeURIComponent(WED.venue      || '');
  const ck  = encodeURIComponent(_rsvpCoupleKey());
  const seatParam = chair ? `&seat=${encodeURIComponent(chair.label)}` : '';
  const url = `https://campingchairph.github.io/vowsandpetals/rsvp.html?p1=${p1}&p2=${p2}&date=${dt}&venue=${vn}&coupleKey=${ck}&guestId=${encodeURIComponent(guest.id)}&guestName=${encodeURIComponent(guest.name)}${seatParam}`;

  showToast('💌 Generating invitation…');

  // Page 1: draw the guest card with their QR code overlaid
  showRSVPCard(guestId, { silent: true });
  // Wait for async QR render (120ms inside _drawQROnCanvas + buffer)
  await new Promise(r => setTimeout(r, 350));

  const canvas = document.getElementById('rsvp-canvas');
  const files = [];

  // Collect Page 1 file
  if (canvas) {
    try {
      const blob1 = await new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.92));
      const safe = guest.name.replace(/\s+/g,'_');
      files.push(new File([blob1], `${safe}_invite_p1.jpg`, { type:'image/jpeg' }));
    } catch(e) {}
  }

  // Collect Page 2 file — generate if not yet cached
  const _getPage2Blob = () => new Promise(resolve => {
    if (WED._invitationImg2) {
      fetch(WED._invitationImg2).then(r => r.blob()).then(resolve).catch(() => resolve(null));
    } else {
      refreshCard2((dataUrl) => {
        fetch(dataUrl).then(r => r.blob()).then(resolve).catch(() => resolve(null));
      });
    }
  });
  const blob2 = await _getPage2Blob();
  if (blob2) {
    const safe = guest.name.replace(/\s+/g,'_');
    files.push(new File([blob2], `${safe}_invite_p2.jpg`, { type:'image/jpeg' }));
  }

  let shared = false;
  if (navigator.share) {
    try {
      const canShareFiles = files.length > 0 && navigator.canShare && navigator.canShare({ files });
      await navigator.share({
        title: `Wedding Invitation — ${WED.couple.p1} & ${WED.couple.p2}`,
        text:  `Hi ${guest.name}! You're cordially invited to ${WED.couple.p1} & ${WED.couple.p2}'s wedding. RSVP here 💌`,
        url,
        ...(canShareFiles ? { files } : {}),
      });
      shared = true;
    } catch(e) {
      if (e.name === 'AbortError') return;
    }
  }

  if (!shared) {
    try {
      await navigator.clipboard.writeText(url);
      showToast('🔗 Invite link copied for ' + guest.name);
    } catch(e) {
      showToast('💌 Link: ' + url);
    }
  }

  guest._inviteSent   = true;
  guest._inviteSentAt = new Date().toISOString();
  saveState();
  renderGuests();
  if (shared) showToast('💌 Invitation sent to ' + guest.name);
}

/* ── TWO-PAGE INVITATION BUILDER ─────────────── */

/* Wrap text on canvas */
function _wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = (text || '').split(' ');
  let line = '';
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    if (ctx.measureText(testLine).width > maxWidth && i > 0) {
      ctx.fillText(line.trim(), x, y);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y);
  return y;
}

/* Re-draw Page 1 clean card (no QR) and store in WED._invitationImg */
function refreshCard1() {
  // showRSVPCard with no guest draws the clean card and calls _syncPreview
  // which updates WED._invitationImg and #inv-page1-img
  showRSVPCard(null, { silent: true });
  // For custom card, _syncPreview isn't updating _invitationImg, so update overview img manually
  if (WED.customCardImage) {
    const ovImg = document.getElementById('inv-page1-img');
    if (ovImg) { ovImg.src = WED.customCardImage; ovImg.style.display = 'block'; }
    const p1ph = document.getElementById('inv-page1-placeholder');
    if (p1ph) p1ph.style.display = 'none';
  }
}

/* Draw Page 2 details card on #invite-canvas2; store in WED._invitationImg2 */
function refreshCard2(cb) {
  const canvas2 = document.getElementById('invite-canvas2');
  if (!canvas2) { if (cb) cb(); return; }
  const ctx = canvas2.getContext('2d');
  const w = canvas2.width = 380;
  const h = canvas2.height = 520;
  const is = WED.inviteSettings || {};
  const cp1 = WED.couple.p1 || 'Partner 1';
  const cp2 = WED.couple.p2 || 'Partner 2';
  const t = _getInviteTheme();

  // gradient bg (inverted palette for variety)
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, t.bg2[0]); grad.addColorStop(0.5, t.bg2[1]); grad.addColorStop(1, t.bg2[2]);
  ctx.fillStyle = grad; ctx.beginPath(); ctx.roundRect(0, 0, w, h, 24); ctx.fill();

  // deco circles
  ctx.globalAlpha = 0.10;
  ctx.fillStyle = t.accent2 || t.accent; ctx.beginPath(); ctx.arc(40, 60, 80, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = t.circleA; ctx.beginPath(); ctx.arc(340, 460, 70, 0, Math.PI*2); ctx.fill();
  ctx.globalAlpha = 1;

  // border
  ctx.strokeStyle = t.border2 || t.border; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(8, 8, w-16, h-16, 20); ctx.stroke();

  // florals (page 2 reverses the order)
  ctx.font = '22px serif'; ctx.textAlign = 'left';
  ctx.fillText(t.florals[1], 14, 42); ctx.fillText(t.florals[0], w-46, 42);
  ctx.fillText(t.florals[0], 14, h-18); ctx.fillText(t.florals[1], w-46, h-18);

  // header
  ctx.fillStyle = t.accent2 || t.accent; ctx.font = '500 10.5px Figtree,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText(`${cp1} & ${cp2}`, w/2, 40);
  ctx.fillStyle = t.ink; ctx.font = 'italic 600 20px Lora,serif';
  ctx.fillText('Details & Information', w/2, 66);

  // divider
  ctx.strokeStyle = t.border2 || t.border; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(60, 78); ctx.lineTo(w-60, 78); ctx.stroke();

  let yPos = 96;

  // Dress Code
  if (is.dressCode) {
    ctx.fillStyle = t.accent2 || t.accent; ctx.font = '700 9.5px Figtree,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('DRESS CODE', w/2, yPos); yPos += 16;
    ctx.fillStyle = t.ink; ctx.font = '600 14px Figtree,sans-serif';
    ctx.fillText(is.dressCode, w/2, yPos); yPos += 22;
    ctx.strokeStyle = t.border2 || t.border; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(80, yPos); ctx.lineTo(w-80, yPos); ctx.stroke();
    yPos += 10;
  }

  const _drawRest = () => {
    // Gifts
    if (is.giftsNote) {
      ctx.fillStyle = t.accent; ctx.font = '700 9.5px Figtree,sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('🎁  GIFTS & REGISTRY', w/2, yPos); yPos += 15;
      ctx.fillStyle = t.dark; ctx.font = '400 11.5px Figtree,sans-serif';
      yPos = _wrapText(ctx, is.giftsNote, w/2, yPos, w-80, 15) + 18;
      ctx.strokeStyle = t.border2 || t.border; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(80, yPos-8); ctx.lineTo(w-80, yPos-8); ctx.stroke();
    }
    // Notes
    if (is.specialNote) {
      ctx.fillStyle = t.sub; ctx.font = '700 9.5px Figtree,sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('📝  NOTES', w/2, yPos); yPos += 15;
      ctx.fillStyle = t.dark; ctx.font = '400 11.5px Figtree,sans-serif';
      yPos = _wrapText(ctx, is.specialNote, w/2, yPos, w-80, 15) + 18;
      ctx.strokeStyle = t.border2 || t.border; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(80, yPos-8); ctx.lineTo(w-80, yPos-8); ctx.stroke();
    }
    // Program
    if (is.showProgram) {
      ctx.fillStyle = t.dark; ctx.font = '700 9.5px Figtree,sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('📋  PROGRAM', w/2, yPos); yPos += 15;
      ctx.fillStyle = t.sub; ctx.font = 'italic 400 11px Lora,serif';
      ctx.fillText('Full program will be shared closer to the date', w/2, yPos);
    }
    // Hashtag footer
    const tag = (WED.hashtag||'').replace(/^#/,'').trim() || `${cp1}And${cp2}`;
    ctx.fillStyle = t.accent; ctx.font = 'italic 400 12px Lora,serif'; ctx.textAlign = 'center';
    ctx.fillText(`#${tag}`, w/2, h-28);

    // Save & update preview
    const dataUrl = canvas2.toDataURL('image/jpeg', 0.92);
    WED._invitationImg2 = dataUrl;
    saveState();
    const img2 = document.getElementById('inv-page2-img');
    if (img2) { img2.src = dataUrl; img2.style.display = 'block'; }
    const p2ph = document.getElementById('inv-page2-placeholder');
    if (p2ph) p2ph.style.display = 'none';
    if (cb) cb(dataUrl);
  };

  // Attire photos (async image loading)
  const photoY = yPos;
  const photoH = 110, photoW = 140;
  let hasPhotos = is.attirePhotoA || is.attirePhotoB;
  if (!hasPhotos) { _drawRest(); return; }

  ctx.fillStyle = '#6a8e70'; ctx.font = '700 9.5px Figtree,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('ATTIRE', w/2, yPos); yPos += 14;

  const imgY = yPos;
  let loaded = 0;
  const onDone = () => { loaded++; if (loaded >= 2) { yPos = imgY + photoH + 16; _drawRest(); } };

  const _drawPhoto = (src, px, label) => {
    const img = new Image();
    img.onload = () => {
      ctx.save();
      ctx.beginPath(); ctx.roundRect(px, imgY, photoW, photoH, 8); ctx.clip();
      ctx.drawImage(img, px, imgY, photoW, photoH);
      ctx.restore();
      // label bar
      ctx.fillStyle = 'rgba(0,0,0,0.42)';
      ctx.beginPath(); ctx.roundRect(px, imgY + photoH - 20, photoW, 20, [0,0,8,8]); ctx.fill();
      ctx.fillStyle = 'white'; ctx.font = '600 9.5px Figtree,sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(label, px + photoW/2, imgY + photoH - 7);
      onDone();
    };
    img.onerror = () => {
      ctx.fillStyle = 'rgba(201,169,110,0.2)'; ctx.beginPath(); ctx.roundRect(px, imgY, photoW, photoH, 8); ctx.fill();
      ctx.fillStyle = '#7a6045'; ctx.font = '500 10px Figtree,sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(label, px + photoW/2, imgY + photoH/2);
      onDone();
    };
    img.src = src;
  };
  const _drawPhotoPlaceholder = (px, label) => {
    ctx.fillStyle = 'rgba(201,169,110,0.2)'; ctx.beginPath(); ctx.roundRect(px, imgY, photoW, photoH, 8); ctx.fill();
    ctx.fillStyle = '#7a6045'; ctx.font = '500 10px Figtree,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(label, px + photoW/2, imgY + photoH/2);
    onDone();
  };

  const pxA = (w - 2*photoW - 8) / 2;
  const pxB = pxA + photoW + 8;
  if (is.attirePhotoA) _drawPhoto(is.attirePhotoA, pxA, is.attireLabelA || "Bride's Attire");
  else _drawPhotoPlaceholder(pxA, is.attireLabelA || "Bride's Attire");
  if (is.attirePhotoB) _drawPhoto(is.attirePhotoB, pxB, is.attireLabelB || "Groom's Attire");
  else _drawPhotoPlaceholder(pxB, is.attireLabelB || "Groom's Attire");
}

/* Select an invitation design theme and refresh both cards */
function selectInviteTheme(idx) {
  WED.inviteTheme = idx;
  WED._invitationImg  = null; // force redraw
  WED._invitationImg2 = null;
  saveState();
  refreshCard1();
  setTimeout(() => refreshCard2(), 80);
  // Update swatch selection highlights without full re-render
  document.querySelectorAll('.inv-theme-swatch').forEach((el, i) => {
    const t = INVITE_THEMES[i];
    el.style.border = `2.5px solid ${i === idx ? t.accent : 'transparent'}`;
    el.style.boxShadow = i === idx ? `0 0 0 2px ${t.accent}55` : 'none';
  });
}

/* Copy RSVP link for a specific guest to clipboard */
async function copyGuestLink(guestId) {
  const guest = WED.guests.find(g => g.id === guestId);
  if (!guest) return;
  const chair = WED.furniture.find(f => f.id === guest._chairId);
  const p1 = encodeURIComponent(WED.couple.p1 || '');
  const p2 = encodeURIComponent(WED.couple.p2 || '');
  const dt = encodeURIComponent(WED.date || '');
  const vn = encodeURIComponent(WED.venue || '');
  const ck = encodeURIComponent(_rsvpCoupleKey());
  const seatParam = chair ? `&seat=${encodeURIComponent(chair.label)}` : '';
  const url = `https://campingchairph.github.io/vowsandpetals/rsvp.html?p1=${p1}&p2=${p2}&date=${dt}&venue=${vn}&coupleKey=${ck}&guestId=${encodeURIComponent(guest.id)}&guestName=${encodeURIComponent(guest.name)}${seatParam}`;
  try {
    await navigator.clipboard.writeText(url);
    showToast('🔗 RSVP link copied for ' + guest.name);
  } catch(e) {
    showToast('Link: ' + url);
  }
}

/* Save hashtag and refresh card 1 */
function saveWedHashtag(val) {
  WED.hashtag = val.replace(/^#/,'').trim();
  saveState();
  // Debounced refresh so we don't hammer canvas on every keystroke
  clearTimeout(saveWedHashtag._t);
  saveWedHashtag._t = setTimeout(() => { refreshCard1(); refreshCard2(); }, 500);
}

/* Save an invite field and refresh card 2 */
function saveInviteField(key, val) {
  if (!WED.inviteSettings) WED.inviteSettings = {};
  WED.inviteSettings[key] = val;
  saveState();
  if (typeof saveInvitePublic === 'function') saveInvitePublic();
  clearTimeout(saveInviteField._t);
  saveInviteField._t = setTimeout(() => refreshCard2(), 400);
}

/* Upload a custom Page-1 card (compressed) */
async function uploadCustomCard(event) {
  const file = event.target.files[0];
  if (!file) return;
  showToast('⏳ Compressing…');
  try {
    const dataUrl = await compressImage(file, 760, 0.88);
    WED.customCardImage = dataUrl;
    saveState();
    renderOverview();
    showToast('🖼 Custom design uploaded!');
  } catch(e) { showToast('❌ Upload failed'); }
}

/* Upload attire photo A or B */
async function uploadAttirePhoto(event, which) {
  const file = event.target.files[0];
  if (!file) return;
  showToast('⏳ Compressing…');
  try {
    const dataUrl = await compressImage(file, 600, 0.82);
    if (!WED.inviteSettings) WED.inviteSettings = {};
    if (which === 'A') WED.inviteSettings.attirePhotoA = dataUrl;
    else               WED.inviteSettings.attirePhotoB = dataUrl;
    saveState();
    renderOverview();
    setTimeout(() => refreshCard2(), 80);
    showToast('📷 Attire photo saved!');
  } catch(e) { showToast('❌ Upload failed'); }
}

/* Remove an attire photo */
function clearAttirePhoto(which) {
  if (!WED.inviteSettings) WED.inviteSettings = {};
  if (which === 'A') WED.inviteSettings.attirePhotoA = null;
  else               WED.inviteSettings.attirePhotoB = null;
  saveState();
  refreshCard2();
  renderOverview();
}

/* Toggle upload-spec panel visibility */
function toggleInvUploadSpec() {
  const spec = document.getElementById('inv-upload-spec');
  if (!spec) return;
  spec.style.display = spec.style.display === 'none' ? 'block' : 'none';
}

/* Download a wireframe template PNG showing both pages with QR zone */
function downloadInviteTemplate() {
  const PW = 380, PH = 520, GAP = 30, PAD = 16, TITLE = 36;
  const c = document.createElement('canvas');
  c.width  = PAD*2 + PW*2 + GAP;
  c.height = PAD*2 + TITLE + PH + 20;
  const ctx = c.getContext('2d');

  // Background
  ctx.fillStyle = '#f8f2e8'; ctx.fillRect(0, 0, c.width, c.height);

  // Main title
  ctx.fillStyle = '#4a3520'; ctx.font = '700 13px Figtree,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Vows & Petals — Invitation Template Guide', c.width/2, 22);
  ctx.fillStyle = '#7a6045'; ctx.font = '400 10px Figtree,sans-serif';
  ctx.fillText('Use as a base in Canva or Photoshop. Keep the QR zone clear on Page 1.', c.width/2, 34);

  const p1x = PAD, p2x = PAD + PW + GAP, py = PAD + TITLE;

  // ── Page 1 ──
  ctx.fillStyle = '#fef9f4';
  ctx.beginPath(); ctx.roundRect(p1x, py, PW, PH, 16); ctx.fill();
  ctx.strokeStyle = '#c9a96e'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(p1x, py, PW, PH, 16); ctx.stroke();

  ctx.fillStyle = '#c9a96e'; ctx.font = '700 11px Figtree,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('PAGE 1 — INVITATION CARD', p1x + PW/2, py + 22);
  ctx.fillStyle = '#7a6045'; ctx.font = '400 9px Figtree,sans-serif';
  ctx.fillText('380 × 520 px', p1x + PW/2, py + 35);

  // Zone: names
  ctx.fillStyle = 'rgba(201,169,110,0.12)'; ctx.beginPath(); ctx.roundRect(p1x+20, py+44, PW-40, 180, 6); ctx.fill();
  ctx.strokeStyle = 'rgba(201,169,110,0.35)'; ctx.lineWidth = 1; ctx.setLineDash([3,3]);
  ctx.beginPath(); ctx.roundRect(p1x+20, py+44, PW-40, 180, 6); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#7a6045'; ctx.font = '400 9px Figtree,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Couple Names & Invite Text', p1x + PW/2, py + 138);

  // Zone: date/rsvp
  ctx.fillStyle = 'rgba(201,169,110,0.08)'; ctx.beginPath(); ctx.roundRect(p1x+20, py+234, PW-40, 164, 6); ctx.fill();
  ctx.strokeStyle = 'rgba(201,169,110,0.35)'; ctx.setLineDash([3,3]);
  ctx.beginPath(); ctx.roundRect(p1x+20, py+234, PW-40, 164, 6); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#7a6045'; ctx.font = '400 9px Figtree,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Date, Venue & RSVP Button', p1x + PW/2, py + 320);

  // QR zone (exact position)
  const qrX = (PW - 96) / 2, qrY = 408;
  ctx.fillStyle = 'rgba(224,120,152,0.12)'; ctx.beginPath(); ctx.roundRect(p1x+qrX-8, py+qrY-8, 112, 112, 8); ctx.fill();
  ctx.strokeStyle = '#e07898'; ctx.lineWidth = 1.5; ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.roundRect(p1x+qrX-8, py+qrY-8, 112, 112, 8); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#e07898'; ctx.font = '700 9px Figtree,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('⚠ QR ZONE', p1x + PW/2, py+qrY+42);
  ctx.fillStyle = '#e07898'; ctx.font = '400 8px Figtree,sans-serif';
  ctx.fillText('96×96 px · centered · y=408', p1x + PW/2, py+qrY+54);
  ctx.fillText('Keep this area clear in your design', p1x + PW/2, py+qrY+65);

  ctx.fillStyle = '#7a6045'; ctx.font = 'italic 400 9px Lora,serif'; ctx.textAlign = 'center';
  ctx.fillText('#YourHashtag', p1x + PW/2, py + PH - 14);

  // ── Page 2 ──
  ctx.fillStyle = '#f4f9f5';
  ctx.beginPath(); ctx.roundRect(p2x, py, PW, PH, 16); ctx.fill();
  ctx.strokeStyle = '#6a8e70'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(p2x, py, PW, PH, 16); ctx.stroke();

  ctx.fillStyle = '#6a8e70'; ctx.font = '700 11px Figtree,sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('PAGE 2 — DETAILS CARD', p2x + PW/2, py + 22);
  ctx.fillStyle = '#7a6045'; ctx.font = '400 9px Figtree,sans-serif';
  ctx.fillText('380 × 520 px', p2x + PW/2, py + 35);

  const zones2 = [
    { y:44, h:54, col:'rgba(106,142,112,0.12)', bc:'rgba(106,142,112,0.3)', lbl:'Dress Code' },
    { y:108, h:124, col:'rgba(201,169,110,0.10)', bc:'rgba(201,169,110,0.3)', lbl:'Attire Photos (A + B)' },
    { y:242, h:82, col:'rgba(224,120,152,0.08)', bc:'rgba(224,120,152,0.25)', lbl:'Gifts & Registry Info' },
    { y:334, h:82, col:'rgba(106,142,112,0.08)', bc:'rgba(106,142,112,0.25)', lbl:'Special Notes' },
    { y:426, h:56, col:'rgba(201,169,110,0.08)', bc:'rgba(201,169,110,0.25)', lbl:'Program (optional)' },
  ];
  zones2.forEach(z => {
    ctx.fillStyle = z.col; ctx.beginPath(); ctx.roundRect(p2x+20, py+z.y, PW-40, z.h, 6); ctx.fill();
    ctx.strokeStyle = z.bc; ctx.lineWidth = 1; ctx.setLineDash([3,3]);
    ctx.beginPath(); ctx.roundRect(p2x+20, py+z.y, PW-40, z.h, 6); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#4a3520'; ctx.font = '400 9px Figtree,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(z.lbl, p2x + PW/2, py + z.y + z.h/2 + 3);
  });

  // Download
  try {
    const a = document.createElement('a');
    a.download = 'vows-and-petals-invite-template.png';
    a.href = c.toDataURL('image/png');
    a.click();
    showToast('⬇ Template downloaded!');
  } catch(e) { showToast('❌ Could not download'); }
}

/* ⬇ Download invitation image (desktop / Android) */
function downloadInvitation() {
  const canvas = document.getElementById('rsvp-canvas');
  if (!canvas) return;
  try {
    const a = document.createElement('a');
    a.download = 'wedding-invitation.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  } catch(e) {
    showToast('📱 Long-press the invitation image → Save to Photos');
  }
}

window.loadCustomCard = function(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    WED.customCardImage = e.target.result;
    saveState();
    document.getElementById('clear-card-btn').style.display = 'inline-block';
    showToast('🖼 Custom card uploaded!');
    showRSVPCard();
  };
  reader.readAsDataURL(file);
};

window.clearCustomCard = function() {
  WED.customCardImage = null;
  WED._invitationImg  = null; // force re-generation of default card
  saveState();
  showToast('↩ Showing default invitation card');
  renderOverview();
  setTimeout(() => refreshCard1(), 80);
};

/* ═══════════════════════════════════════════════
   SUPPLIERS
═══════════════════════════════════════════════ */
const SUGGESTED_SUPPLIERS = [
  { cat:'venue',          emoji:'🏛️', label:'Venue',                tip:'Book 12+ months out — venues fill fast',          link:'https://kasal.com/venues' },
  { cat:'catering',       emoji:'🍽️', label:'Catering',             tip:'Request a tasting before signing anything',        link:'https://kasal.com/caterers' },
  { cat:'photography',    emoji:'📸', label:'Photography',           tip:'Ask for full-day + 2nd shooter + album',           link:'https://kasal.com/photography' },
  { cat:'videography',    emoji:'🎥', label:'Videography',           tip:'SDE (same-day edit) is the Filipino must-have',    link:'https://kasal.com/videography' },
  { cat:'florals',        emoji:'💐', label:'Flowers & Florals',     tip:'Seasonal blooms save 20–30% on your budget',       link:'https://kasal.com/florists' },
  { cat:'attire',         emoji:'👗', label:'Attire & Accessories',  tip:'Schedule fittings at least 3 months before',      link:'https://kasal.com/attire' },
  { cat:'music',          emoji:'🎵', label:'Music & Entertainment', tip:'Hear them live at a gig before booking',           link:'https://kasal.com/entertainment' },
  { cat:'coordination',   emoji:'📋', label:'Coordination & Planning',tip:'A good coordinator is the best investment',      link:'https://kasal.com/coordinators' },
  { cat:'cake',           emoji:'🎂', label:'Cake & Desserts',       tip:'Order tasting boxes from your shortlist',          link:'https://kasal.com/cakes' },
  { cat:'invites',        emoji:'📄', label:'Invitations & Printing',tip:'Stationery sets the entire wedding tone',          link:'https://kasal.com/invitations' },
  { cat:'hair',           emoji:'💄', label:'Hair & Makeup',         tip:'Book an HMUA who specializes in your look',        link:'https://kasal.com/hairmakeup' },
  { cat:'photo-booth',    emoji:'🖼️', label:'Photo Booth',           tip:'Fun keepsake for guests — worth every peso',       link:'https://kasal.com/photobooth' },
  { cat:'transportation', emoji:'🚗', label:'Transportation',        tip:'Book early — cars go fast for popular dates',      link:'https://kasal.com' },
  { cat:'lights',         emoji:'💡', label:'Lights & Sounds',       tip:'Lights transform a venue — visit for a demo',     link:'https://kasal.com' },
  { cat:'jewelry',        emoji:'💍', label:'Jewelry',               tip:'Commission custom pieces at least 4 months out',  link:'https://kasal.com' },
];

const VENDOR_EMOJI = {
  venue:'🏛️', catering:'🍽️', photography:'📸', videography:'🎥',
  florals:'💐', attire:'👗', music:'🎵', coordination:'📋',
  cake:'🎂', invites:'📄', hair:'💄', 'photo-booth':'🖼️',
  transportation:'🚗', lights:'💡', jewelry:'💍', others:'✨', other:'📦',
};
const VENDOR_CAT_LABEL = {
  venue:'Venue', catering:'Catering', photography:'Photography', videography:'Videography',
  florals:'Flowers & Florals', attire:'Attire & Accessories', music:'Music & Entertainment',
  coordination:'Coordination & Planning', cake:'Cake & Desserts', invites:'Invitations & Printing',
  hair:'Hair & Makeup', 'photo-booth':'Photo Booth', transportation:'Transportation',
  lights:'Lights & Sounds', jewelry:'Jewelry', others:'Others',
  // legacy keys
  flowers:'Flowers & Florals', makeup:'Hair & Makeup', invitations:'Invitations & Printing',
};
function getSupplierEmoji(cat) { return VENDOR_EMOJI[cat] || '🤝'; }

/* ═══════════════════════════════════════════════
   SUPPLIER MARKETPLACE — inline browse within the Suppliers tab
   View states: 'main' | 'browse' | { cat, catLabel } | { profile: supplierId, suppData }
═══════════════════════════════════════════════ */
let _supplierView     = 'main';
let _prevSupplierView = null;  // tracks where to go when pressing Back from profile
let _marketplaceCache = null;  // { cat: [supplier,...] }

function setSupplierView(view) {
  _supplierView = view;
  renderSuppliers();
  // scroll tab to top
  const el = document.getElementById('wed-suppliers-content');
  if (el) el.scrollTop = 0;
}

// Legacy category key aliases (old supplier.html used different keys)
const CAT_ALIASES = {
  invites:  ['invites', 'invitations'],
  florals:  ['florals', 'flowers'],
  hair:     ['hair', 'makeup'],
};

async function _loadMarketplaceCat(cat) {
  if (_marketplaceCache && _marketplaceCache[cat] !== undefined) return _marketplaceCache[cat];
  if (!_marketplaceCache) _marketplaceCache = {};
  try {
    if (typeof DB !== 'undefined' && DB) {
      const keys = CAT_ALIASES[cat] || [cat];
      // Use 'in' to catch both current and legacy category keys
      const snap = await DB.collection('kasalko_marketplace')
        .where('category', 'in', keys)
        .limit(50)
        .get();
      // Sort client-side: verified+pro → verified → pro → free
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      docs.sort((a, b) => {
        const rank = s => (s.verified ? 2 : 0) + (s.pro ? 1 : 0);
        return rank(b) - rank(a);
      });
      _marketplaceCache[cat] = docs;
    } else {
      _marketplaceCache[cat] = [];
    }
  } catch(e) {
    console.warn('Marketplace load error (check Firestore rules):', e);
    _marketplaceCache[cat] = [];
  }
  return _marketplaceCache[cat];
}

async function _loadSupplierProfile(id) {
  try {
    if (typeof DB !== 'undefined' && DB) {
      const doc = await DB.collection('kasalko_marketplace').doc(id).get();
      if (!doc.exists) return null;
      const data = { id: doc.id, ...doc.data() };
      // Load reviews
      const revSnap = await DB.collection('kasalko_marketplace').doc(id)
        .collection('reviews').orderBy('date','desc').limit(10).get();
      data._reviews = revSnap.docs.map(r => r.data());
      return data;
    }
  } catch(e) {}
  return null;
}

function _supplierCard(s) {
  const verifiedBadge = s.verified ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:9.5px;font-weight:700;color:#1a73e8;background:rgba(26,115,232,0.1);border:1px solid rgba(26,115,232,0.22);border-radius:6px;padding:2px 6px">✔ Verified</span>` : `<span style="display:inline-flex;align-items:center;gap:3px;font-size:9.5px;font-weight:700;color:var(--ink-4);background:rgba(245,230,200,0.4);border:1px solid rgba(184,145,106,0.2);border-radius:6px;padding:2px 6px">Unverified</span>`;
  const proBadge      = s.pro      ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:9.5px;font-weight:700;color:#b5522b;background:rgba(181,82,43,0.1);border:1px solid rgba(181,82,43,0.22);border-radius:6px;padding:2px 6px">⭐ Featured</span>` : '';
  const stars = s.rating_avg ? '★'.repeat(Math.round(s.rating_avg)) + '☆'.repeat(5-Math.round(s.rating_avg)) : '';
  const priceStr = s.price_from ? `₱${Number(s.price_from).toLocaleString()}${s.price_to?' – ₱'+Number(s.price_to).toLocaleString():'+'} ` : '';
  return `
    <div onclick="openSupplierProfile('${s.id}')" class="glass" style="border-radius:var(--r-md);overflow:hidden;cursor:pointer;margin-bottom:10px">
      ${s.cover_photo ? `<div style="height:130px;background:url('${s.cover_photo}') center/cover no-repeat;position:relative">
        <div style="position:absolute;top:7px;right:7px;display:flex;gap:4px">${proBadge}${verifiedBadge}</div>
      </div>` : `<div style="height:80px;background:linear-gradient(135deg,rgba(245,230,200,0.5),rgba(232,245,237,0.5));display:flex;align-items:center;justify-content:center;position:relative">
        <span style="font-size:36px">${getSupplierEmoji(s.category)}</span>
        <div style="position:absolute;top:7px;right:7px;display:flex;gap:4px">${proBadge}${verifiedBadge}</div>
      </div>`}
      <div style="padding:10px 12px">
        <div style="font-size:13px;font-weight:700;color:var(--ink)">${s.name}</div>
        ${s.location ? `<div style="font-size:11px;color:var(--ink-4);margin-top:1px">📍 ${s.location}</div>` : ''}
        ${priceStr ? `<div style="font-size:11px;font-weight:700;color:var(--tan-dark);margin-top:2px">${priceStr}</div>` : ''}
        ${stars ? `<div style="font-size:11px;color:#c9a96e;letter-spacing:1px;margin-top:2px">${stars} <span style="color:var(--ink-4);font-size:10px">(${s.review_count||0})</span></div>` : ''}
      </div>
    </div>`;
}

function openSupplierProfile(id) {
  _prevSupplierView = _supplierView; // remember where we came from
  setSupplierView({ type: 'profile', id });
}

function openPartnerBrowse(cat, catLabel) {
  setSupplierView({ type: 'category', cat, catLabel });
}

function renderSuppliers() {
  const el = document.getElementById('wed-suppliers-content');
  if (!el) return;

  // Dispatcher
  if (_supplierView === 'main')   { _renderSuppliersMain(el); return; }
  if (_supplierView === 'browse') { _renderSuppliersBrowse(el); return; }
  if (_supplierView?.type === 'category') { _renderSuppliersCategory(el, _supplierView.cat, _supplierView.catLabel); return; }
  if (_supplierView?.type === 'profile')  { _renderSupplierProfileView(el, _supplierView.id); return; }
}

function _renderSuppliersMain(el) {
  const byCategory = {};
  WED.vendors.forEach(v => { (byCategory[v.category] = byCategory[v.category]||[]).push(v); });

  el.innerHTML = `
    <!-- Marketplace banner -->
    <div onclick="setSupplierView('browse')" class="glass" style="padding:18px 16px;border-radius:var(--r-lg);margin-bottom:16px;cursor:pointer;background:linear-gradient(135deg,rgba(245,230,200,0.5),rgba(232,245,237,0.5));border:1.5px solid rgba(201,169,110,0.3)">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="font-size:36px">🏪</div>
        <div>
          <div style="font-size:15px;font-weight:700;color:var(--ink)">Browse Supplier Marketplace</div>
          <div style="font-size:11.5px;color:var(--ink-3);margin-top:3px">Find verified wedding suppliers for Philippine weddings</div>
        </div>
        <div style="font-size:18px;color:var(--tan-dark);margin-left:auto">›</div>
      </div>
    </div>

    <!-- Category quick-access -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px">
      ${SUGGESTED_SUPPLIERS.map(s => {
        const mine = byCategory[s.cat] || [];
        return `
        <div class="glass" style="padding:12px;border-radius:var(--r-md)">
          <div style="display:flex;align-items:center;gap:7px;margin-bottom:6px">
            <span style="font-size:19px">${s.emoji}</span>
            <span style="font-size:11.5px;font-weight:700;color:var(--ink)">${s.label}</span>
          </div>
          <div style="font-size:9.5px;color:var(--ink-4);margin-bottom:8px;line-height:1.4">${s.tip}</div>
          ${mine.map(v => `
            <div style="display:flex;align-items:center;gap:6px;padding:5px 8px;border-radius:8px;background:rgba(90,171,122,0.1);border:1px solid rgba(90,171,122,0.18);margin-bottom:4px">
              <span style="font-size:10.5px;font-weight:700;color:var(--green-deep);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${v.name}</span>
              ${v.phone?`<a href="tel:${v.phone.replace(/\s/g,'')}" style="font-size:11px;font-weight:700;text-decoration:none;color:var(--green-deep)" title="${v.phone}">Call</a>`:''}
              <button onclick="deleteVendor(${v.id})" style="font-size:11px;border:none;background:none;color:var(--pink-deep);cursor:pointer;padding:0;line-height:1">×</button>
            </div>`).join('')}
          <div style="display:flex;gap:5px;margin-top:4px">
            <button onclick="openPartnerBrowse('${s.cat}','${s.label}')"
               style="flex:1;padding:6px 4px;border-radius:8px;border:1px solid rgba(201,169,110,0.25);background:rgba(245,230,200,0.55);font-size:9.5px;font-weight:700;color:var(--tan-dark);cursor:pointer;font-family:var(--f)">
               Browse →</button>
            <button onclick="openAddVendorModal('${s.cat}','${s.label}')"
              style="padding:6px 9px;border-radius:8px;border:1px solid rgba(224,120,152,0.25);background:rgba(252,232,238,0.55);font-size:9.5px;font-weight:700;color:var(--pink-deep);cursor:pointer;font-family:var(--f)">
              + Add</button>
          </div>
        </div>`;
      }).join('')}
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <span class="sec-title" style="margin-bottom:0">My Vendors</span>
      <button onclick="openAddVendorModal('','')" class="icon-btn">+ Add Vendor</button>
    </div>
    ${WED.vendors.length ? WED.vendors.map(v => `
      <div class="glass" style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:var(--r-md);margin-bottom:7px">
        <div style="width:38px;height:38px;border-radius:10px;background:rgba(245,230,200,0.65);display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0;border:1px solid rgba(201,169,110,0.2)">${getSupplierEmoji(v.category)}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:700;color:var(--ink)">${v.name}</div>
          <div style="font-size:11px;color:var(--ink-4);text-transform:capitalize">${v.category}${v.phone?' · '+v.phone:''}</div>
          ${v.price?`<div style="font-size:11px;color:var(--tan-dark);font-weight:700;margin-top:1px">₱${Number(v.price).toLocaleString()}</div>`:''}
          ${v.notes?`<div style="font-size:10.5px;color:var(--ink-4);margin-top:2px;font-style:italic">${v.notes}</div>`:''}
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0">
          ${v.phone?`<a href="tel:${v.phone.replace(/\s/g,'')}" style="padding:5px 8px;border-radius:8px;border:1px solid rgba(90,171,122,0.25);background:rgba(90,171,122,0.12);font-size:11px;font-weight:700;color:var(--green-deep);text-decoration:none;text-align:center">📞</a>`:''}
          ${v.link?`<a href="${v.link}" target="_blank" rel="noopener" style="padding:5px 8px;border-radius:8px;border:1px solid rgba(201,169,110,0.25);background:rgba(245,230,200,0.55);font-size:11px;font-weight:700;color:var(--tan-dark);text-decoration:none;text-align:center">🔗</a>`:''}
          <button onclick="deleteVendor(${v.id})" style="padding:5px 8px;border-radius:8px;border:1px solid rgba(224,120,152,0.2);background:rgba(252,232,238,0.5);font-size:11px;cursor:pointer;color:var(--pink-deep)">🗑</button>
        </div>
      </div>`).join('')
    : `<div style="text-align:center;padding:28px;font-size:13px;color:var(--ink-4)">No vendors saved yet — click <b>+ Add</b> next to any category above.</div>`}

    <!-- Supplier portal CTA -->
    <div style="margin-top:20px;padding:16px;border-radius:var(--r-lg);background:rgba(245,230,200,0.35);border:1px solid rgba(184,145,106,0.2);display:flex;align-items:center;gap:12px">
      <span style="font-size:26px;flex-shrink:0">🏪</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:12.5px;font-weight:700;color:var(--ink);margin-bottom:2px">Are you a wedding supplier?</div>
        <div style="font-size:11.5px;color:var(--ink-3);line-height:1.5">Get your business listed in our directory — free, no setup needed.</div>
      </div>
      <a href="https://campingchairph.github.io/vowsandpetals/" target="_blank" rel="noopener"
        style="flex-shrink:0;padding:8px 13px;border-radius:var(--r-md);background:var(--tan);color:var(--ivory);font-size:12px;font-weight:700;text-decoration:none;white-space:nowrap;font-family:var(--f)">
        Get Listed →
      </a>
    </div>
  `;
}

let _supplierSearchQ    = '';
let _supplierLocFilter  = '';
let _supplierSearchResults = null; // null = not searching

function supplierSearch() {
  const q   = (document.getElementById('sup-search-input')?.value || '').trim().toLowerCase();
  const loc = (document.getElementById('sup-loc-filter')?.value || '').toLowerCase();
  _supplierSearchQ   = q;
  _supplierLocFilter = loc;

  const resultsEl = document.getElementById('sup-search-results');
  if (!resultsEl) return;

  if (!q && !loc) {
    resultsEl.innerHTML = '';
    _supplierSearchResults = null;
    return;
  }

  resultsEl.innerHTML = `<div style="text-align:center;padding:20px;color:var(--ink-4);font-size:12.5px">Searching…</div>`;

  if (typeof DB === 'undefined' || !DB) {
    resultsEl.innerHTML = `<div style="padding:16px;color:var(--ink-4);font-size:12.5px">Search unavailable offline.</div>`;
    return;
  }

  DB.collection('kasalko_marketplace').limit(100).get().then(snap => {
    let docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    // Filter
    if (q) docs = docs.filter(d => {
      const haystack = ((d.name||'') + ' ' + (d.category||'') + ' ' + (d.description||'') + ' ' + (d.location||'')).toLowerCase();
      return haystack.includes(q);
    });
    if (loc) docs = docs.filter(d => (d.location||'').toLowerCase().includes(loc));
    // Sort: verified+pro first
    docs.sort((a, b) => {
      const rank = s => (s.verified ? 2 : 0) + (s.pro ? 1 : 0);
      return rank(b) - rank(a);
    });
    _supplierSearchResults = docs;
    if (!docs.length) {
      resultsEl.innerHTML = `<div style="text-align:center;padding:28px;color:var(--ink-4);font-size:13px">No results found — try different keywords or location.</div>`;
    } else {
      resultsEl.innerHTML = `
        <div style="font-size:10.5px;font-weight:700;color:var(--ink-4);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:10px">${docs.length} result${docs.length!==1?'s':''}</div>
        ${docs.map(s => _supplierCard(s)).join('')}`;
    }
  }).catch(() => {
    resultsEl.innerHTML = `<div style="padding:16px;color:var(--ink-4);font-size:12.5px">Search failed. Please try again.</div>`;
  });
}

// Distinct supplier locations — populated from Firestore on first browse open
let _supplierLocations = [];
let _supplierLocationsLoaded = false;

async function _loadSupplierLocations() {
  if (_supplierLocationsLoaded) return;
  if (typeof DB === 'undefined' || !DB) return;
  try {
    const snap = await DB.collection('kasalko_marketplace').limit(300).get();
    const locs = new Set();
    snap.docs.forEach(d => {
      const loc = (d.data().location || '').trim();
      if (loc) locs.add(loc);
    });
    _supplierLocations = [...locs].sort((a, b) => a.localeCompare(b));
    _supplierLocationsLoaded = true;
  } catch(e) { console.warn('Could not load supplier locations:', e); }
}

function _buildLocFilter() {
  const opts = _supplierLocations.map(loc =>
    `<option value="${loc.toLowerCase()}" ${_supplierLocFilter === loc.toLowerCase() ? 'selected' : ''}>${loc}</option>`
  ).join('');
  return `<option value="">📍 All areas</option>${opts}`;
}

function _renderSuppliersBrowse(el) {
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
      <button onclick="setSupplierView('main')" style="padding:7px 12px;border-radius:var(--r-md);border:1px solid rgba(201,169,110,0.28);background:rgba(245,230,200,0.55);font-size:12px;font-weight:700;color:var(--tan-dark);cursor:pointer">← Back</button>
      <div>
        <div style="font-size:15px;font-weight:700;color:var(--ink)">Supplier Marketplace</div>
        <div style="font-size:11px;color:var(--ink-4)">All registered Philippine wedding suppliers</div>
      </div>
    </div>

    <!-- Search + Location -->
    <div style="display:flex;gap:8px;margin-bottom:14px">
      <input id="sup-search-input" type="search" placeholder="Search name, category…" value="${_supplierSearchQ}"
        oninput="supplierSearch()"
        style="flex:1;padding:9px 13px;border-radius:var(--r-md);border:1.5px solid rgba(201,169,110,0.28);background:rgba(253,250,244,0.9);font-family:var(--f);font-size:13px;color:var(--ink);outline:none">
      <select id="sup-loc-filter" onchange="supplierSearch()"
        style="padding:9px 10px;border-radius:var(--r-md);border:1.5px solid rgba(201,169,110,0.28);background:rgba(253,250,244,0.9);font-family:var(--f);font-size:12px;color:var(--ink);outline:none;max-width:130px">
        <option value="">📍 All areas</option>
      </select>
    </div>

    <!-- Search results (hidden when empty) -->
    <div id="sup-search-results"></div>

    <!-- Category grid (shown when not actively searching) -->
    <div id="sup-cat-grid">
      <div style="font-size:10.5px;font-weight:700;color:var(--ink-4);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:10px">Browse by Category</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        ${SUGGESTED_SUPPLIERS.map(s => `
          <div onclick="openPartnerBrowse('${s.cat}','${s.label}')" class="glass"
               style="padding:14px 12px;border-radius:var(--r-md);cursor:pointer;display:flex;align-items:center;gap:10px">
            <div style="width:44px;height:44px;border-radius:12px;background:rgba(245,230,200,0.65);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${s.emoji}</div>
            <div>
              <div style="font-size:12.5px;font-weight:700;color:var(--ink)">${s.label}</div>
              <div style="font-size:10px;color:var(--ink-4);margin-top:1px">Browse →</div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;

  // Load real supplier locations into the filter (async — populates after render)
  _loadSupplierLocations().then(() => {
    const sel = document.getElementById('sup-loc-filter');
    if (sel) sel.innerHTML = _buildLocFilter();
  });

  // Re-run search if there was a previous query
  if (_supplierSearchQ || _supplierLocFilter) supplierSearch();
}

function _renderSuppliersCategory(el, cat, catLabel) {
  // Show loading skeleton immediately, load from Firestore async
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
      <button onclick="setSupplierView('browse')" style="padding:7px 12px;border-radius:var(--r-md);border:1px solid rgba(201,169,110,0.28);background:rgba(245,230,200,0.55);font-size:12px;font-weight:700;color:var(--tan-dark);cursor:pointer">← Back</button>
      <div>
        <div style="font-size:15px;font-weight:700;color:var(--ink)">${catLabel}</div>
        <div style="font-size:11px;color:var(--ink-4)">All suppliers · verified first</div>
      </div>
    </div>
    <div id="supplier-cat-list" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div class="glass" style="border-radius:var(--r-md);height:160px;background:rgba(245,235,215,0.4)"></div>
      <div class="glass" style="border-radius:var(--r-md);height:160px;background:rgba(245,235,215,0.4)"></div>
    </div>`;

  _loadMarketplaceCat(cat).then(suppliers => {
    const listEl = document.getElementById('supplier-cat-list');
    if (!listEl) return;
    if (!suppliers.length) {
      listEl.style.display = 'block';
      listEl.innerHTML = `
        <div style="text-align:center;padding:40px 16px">
          <div style="font-size:36px;margin-bottom:12px">${getSupplierEmoji(cat)}</div>
          <div style="font-size:14px;font-weight:700;color:var(--ink);margin-bottom:6px">No suppliers listed yet in this category</div>
          <div style="font-size:12px;color:var(--ink-4);line-height:1.6;margin-bottom:16px">Are you a ${catLabel.toLowerCase()} supplier? List your business for free.</div>
          <a href="https://campingchairph.github.io/vowsandpetals/" target="_blank" rel="noopener" style="display:inline-block;padding:9px 18px;border-radius:10px;background:linear-gradient(135deg,var(--tan),var(--tan-dark));color:white;font-size:12px;font-weight:700;text-decoration:none">🤝 Get Listed Free</a>
        </div>`;
    } else {
      listEl.innerHTML = suppliers.map(s => _supplierCard(s)).join('');
    }
  });
}

function _goBackFromProfile() {
  // Go back to the exact view we came from (category list, search, or browse)
  const dest = _prevSupplierView || 'browse';
  _prevSupplierView = null;
  setSupplierView(dest);
}

function _fbToMessenger(fbUrl) {
  if (!fbUrl) return null;
  try {
    const m = fbUrl.match(/(?:facebook\.com|fb\.com)\/([^/?#&]+)/);
    if (m && m[1] && m[1] !== 'pages' && !m[1].startsWith('profile')) {
      return 'https://m.me/' + m[1];
    }
  } catch(e) {}
  return null;
}

function _renderSupplierProfileView(el, supplierId) {
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
      <button onclick="_goBackFromProfile()" style="padding:7px 12px;border-radius:var(--r-md);border:1px solid rgba(201,169,110,0.28);background:rgba(245,230,200,0.55);font-size:12px;font-weight:700;color:var(--tan-dark);cursor:pointer">← Back</button>
    </div>
    <div id="supplier-profile-content" style="text-align:center;padding:30px 0;color:var(--ink-4)">Loading profile…</div>`;

  _loadSupplierProfile(supplierId).then(s => {
    const profileEl = document.getElementById('supplier-profile-content');
    if (!profileEl) return;
    if (!s) { profileEl.innerHTML = '<div style="padding:30px;color:var(--ink-4)">Supplier not found.</div>'; return; }

    const verifiedBadge = s.verified ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:700;color:#1a73e8;background:rgba(26,115,232,0.1);border:1px solid rgba(26,115,232,0.22);border-radius:6px;padding:2px 8px">✔ Verified</span>` : '';
    const proBadge      = s.pro      ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:700;color:#b5522b;background:rgba(181,82,43,0.1);border:1px solid rgba(181,82,43,0.22);border-radius:6px;padding:2px 8px">⭐ Featured Pro</span>` : '';
    const stars = s.rating_avg ? '★'.repeat(Math.round(s.rating_avg)) + '☆'.repeat(5-Math.round(s.rating_avg)) : '';

    profileEl.style.textAlign = 'left';
    profileEl.innerHTML = `
      <!-- Cover + avatar -->
      ${s.cover_photo ? `<div style="height:180px;border-radius:16px;overflow:hidden;margin-bottom:-24px;cursor:zoom-in" onclick="openPhotoZoom('${s.cover_photo}')"><img src="${s.cover_photo}" style="width:100%;height:100%;object-fit:cover"></div>` : ''}
      <div class="glass" style="border-radius:var(--r-lg);padding:20px;margin-bottom:12px;${s.cover_photo?'padding-top:36px':''}">
        <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px">${proBadge}${verifiedBadge}</div>
        <div style="font-family:var(--f2);font-size:22px;font-style:italic;font-weight:600;color:var(--ink)">${s.name}</div>
        ${s.category ? `<div style="font-size:11.5px;color:var(--ink-4);margin-top:3px">${getSupplierEmoji(s.category)} ${VENDOR_CAT_LABEL[s.category] || s.category}</div>` : ''}
        ${s.location  ? `<div style="font-size:12px;color:var(--ink-3);margin-top:4px">📍 ${s.location}</div>` : ''}
        ${stars ? `<div style="font-size:13px;color:#c9a96e;letter-spacing:1.5px;margin-top:4px">${stars} <span style="font-size:11px;color:var(--ink-4)">${s.review_count||0} review${(s.review_count||0)!==1?'s':''}</span></div>` : ''}
        ${s.price_from ? `<div style="font-size:13px;font-weight:700;color:var(--tan-dark);margin-top:6px">₱${Number(s.price_from).toLocaleString()}${s.price_to?' – ₱'+Number(s.price_to).toLocaleString():'+'}</div>` : ''}
        ${s.description ? `<div style="font-size:12.5px;color:var(--ink-3);line-height:1.65;margin-top:10px">${s.description}</div>` : ''}

        <!-- Contact buttons -->
        ${(()=>{
          const raw   = (s.phone||'').replace(/[\s\-().]/g,'');
          const msngr = _fbToMessenger(s.fb);
          const btns  = [];
          if (raw) btns.push(`<a href="tel:${raw}" style="display:inline-flex;align-items:center;gap:5px;padding:9px 14px;border-radius:10px;background:rgba(90,171,122,0.15);border:1px solid rgba(90,171,122,0.28);font-size:12px;font-weight:700;color:var(--green-deep);text-decoration:none">📞 Call</a>`);
          if (raw) btns.push(`<a href="viber://chat?number=${encodeURIComponent(raw)}" style="display:inline-flex;align-items:center;gap:5px;padding:9px 14px;border-radius:10px;background:rgba(112,73,167,0.1);border:1px solid rgba(112,73,167,0.25);font-size:12px;font-weight:700;color:#7049a7;text-decoration:none">💬 Viber</a>`);
          if (raw) btns.push(`<a href="sms:${raw}" style="display:inline-flex;align-items:center;gap:5px;padding:9px 14px;border-radius:10px;background:rgba(90,171,122,0.1);border:1px solid rgba(90,171,122,0.22);font-size:12px;font-weight:700;color:var(--green-deep);text-decoration:none">✉️ Text / iMessage</a>`);
          if (msngr) btns.push(`<a href="${msngr}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;padding:9px 14px;border-radius:10px;background:rgba(0,153,255,0.1);border:1px solid rgba(0,153,255,0.25);font-size:12px;font-weight:700;color:#0099ff;text-decoration:none">💬 Messenger</a>`);
          if (s.fb)      btns.push(`<a href="${s.fb}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;padding:9px 14px;border-radius:10px;background:rgba(26,115,232,0.1);border:1px solid rgba(26,115,232,0.22);font-size:12px;font-weight:700;color:#1a73e8;text-decoration:none">📘 Facebook</a>`);
          if (s.ig)      btns.push(`<a href="${s.ig.startsWith('http')?s.ig:'https://instagram.com/'+s.ig.replace(/^@/,'')}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;padding:9px 14px;border-radius:10px;background:rgba(181,63,137,0.1);border:1px solid rgba(181,63,137,0.22);font-size:12px;font-weight:700;color:#b53f89;text-decoration:none">📸 Instagram</a>`);
          if (s.website) btns.push(`<a href="${s.website}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;padding:9px 14px;border-radius:10px;background:rgba(245,230,200,0.55);border:1px solid rgba(201,169,110,0.28);font-size:12px;font-weight:700;color:var(--tan-dark);text-decoration:none">🔗 Website</a>`);
          return btns.length ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">${btns.join('')}</div>` : '';
        })()}

        <!-- Save to vendors -->
        <button onclick="openAddVendorModal('${s.category||''}','${s.name||''}')" style="width:100%;margin-top:14px;padding:11px;border-radius:12px;background:linear-gradient(135deg,var(--rose),#c03060);border:none;color:white;font-size:13px;font-weight:700;cursor:pointer">+ Save to My Vendors</button>
      </div>

      <!-- Photos gallery -->
      ${s.photos && s.photos.length ? `
      <div class="glass" style="border-radius:var(--r-lg);padding:16px;margin-bottom:12px">
        <div style="font-size:11px;font-weight:700;color:var(--ink-4);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:10px">Photos</div>
        <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none">
          ${s.cover_photo ? `<img src="${s.cover_photo}" onclick="openPhotoZoom('${s.cover_photo}')" style="flex:0 0 auto;width:140px;height:100px;object-fit:cover;border-radius:10px;border:1px solid rgba(201,169,110,0.18);cursor:zoom-in">` : ''}
          ${s.photos.map(p=>`<img src="${p}" onclick="openPhotoZoom('${p}')" style="flex:0 0 auto;width:140px;height:100px;object-fit:cover;border-radius:10px;border:1px solid rgba(201,169,110,0.18);cursor:zoom-in">`).join('')}
        </div>
        <div style="font-size:10px;color:var(--ink-4);margin-top:6px">Tap a photo to zoom</div>
      </div>` : ''}

      <!-- Reviews -->
      <div class="glass" style="border-radius:var(--r-lg);padding:16px;margin-bottom:12px">
        <div style="font-size:11px;font-weight:700;color:var(--ink-4);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:10px">Reviews</div>
        ${s._reviews && s._reviews.length
          ? s._reviews.map(r=>`
              <div style="padding:10px 0;border-bottom:1px solid rgba(201,169,110,0.12)">
                <div style="display:flex;justify-content:space-between;margin-bottom:3px">
                  <span style="font-size:12px;font-weight:700;color:var(--ink)">${r.author||'Anonymous'}</span>
                  <span style="font-size:12px;color:#c9a96e">${'★'.repeat(r.rating||5)}</span>
                </div>
                ${r.text ? `<div style="font-size:12px;color:var(--ink-3);line-height:1.55">${r.text}</div>` : ''}
              </div>`).join('')
          : `<div style="font-size:12.5px;color:var(--ink-4);padding:8px 0">No reviews yet — be the first!</div>`}
        <button onclick="openLeaveReview('${s.id}','${(s.name||'').replace(/'/g,"\\'")}')" style="width:100%;margin-top:12px;padding:9px;border-radius:10px;background:rgba(201,169,110,0.15);border:1px solid rgba(201,169,110,0.3);font-size:12.5px;font-weight:700;color:var(--tan-dark);cursor:pointer">✍️ Leave a Review</button>
      </div>
    `;
  });
}

function openPhotoZoom(url) {
  document.getElementById('photo-zoom-overlay')?.remove();
  const el = document.createElement('div');
  el.id = 'photo-zoom-overlay';
  el.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.88);display:flex;align-items:center;justify-content:center;padding:16px;cursor:zoom-out';
  el.innerHTML = `
    <img src="${url}" style="max-width:100%;max-height:90vh;border-radius:12px;object-fit:contain;box-shadow:0 8px 48px rgba(0,0,0,0.6)">
    <button onclick="document.getElementById('photo-zoom-overlay').remove()" style="position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.15);border:none;color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1">×</button>`;
  el.addEventListener('click', e => { if (e.target === el) el.remove(); });
  document.body.appendChild(el);
}

function openLeaveReview(supplierId, supplierName) {
  document.getElementById('leave-review-modal')?.remove();
  const el = document.createElement('div');
  el.id = 'leave-review-modal';
  el.className = 'modal-overlay';
  el.onclick = e => { if (e.target === el) el.remove(); };
  el.innerHTML = `
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-title">Review: ${supplierName}</div>
      <div class="input-group">
        <div class="input-label">Rating</div>
        <div style="display:flex;gap:8px">
          ${[1,2,3,4,5].map(n=>`<button class="split-btn${n===5?' active':''}" style="flex:none;padding:8px 14px;font-size:18px" onclick="this.parentNode.querySelectorAll('.split-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');document.getElementById('review-rating').value=${n}">★</button>`).join('')}
        </div>
        <input type="hidden" id="review-rating" value="5">
      </div>
      <div class="input-group">
        <div class="input-label">Your Review (optional)</div>
        <textarea id="review-text" class="glass-input" rows="3" placeholder="Share your experience…" style="resize:vertical"></textarea>
      </div>
      <div class="input-group">
        <div class="input-label">Your Name</div>
        <input id="review-author" class="glass-input" value="${WED.couple.p1||''}" placeholder="e.g. Maria & Juan">
      </div>
      <button class="cta-btn" onclick="submitReview('${supplierId}')">Submit Review →</button>
    </div>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('open'));
}

async function submitReview(supplierId) {
  const rating = parseInt(document.getElementById('review-rating')?.value || '5');
  const text   = (document.getElementById('review-text')?.value   || '').trim();
  const author = (document.getElementById('review-author')?.value || '').trim() || 'Anonymous';
  try {
    if (typeof DB !== 'undefined' && DB) {
      await DB.collection('kasalko_marketplace').doc(supplierId)
        .collection('reviews').add({ rating, text, author, date: new Date().toISOString(),
          coupleKey: ((WED.couple.p1||'')+'_'+(WED.couple.p2||'')).toLowerCase().replace(/[^a-z0-9]/g,'_') });
      // Invalidate cache so next view reloads
      if (_marketplaceCache) delete _marketplaceCache[supplierId];
    }
    document.getElementById('leave-review-modal')?.remove();
    showToast('⭐ Review submitted! Thank you.');
    // Reload profile view
    if (_supplierView?.type === 'profile') setSupplierView({ type:'profile', id: supplierId });
  } catch(e) { showToast('❌ Could not submit review. Try again.'); }
}

/* ── VENDOR CRUD ─────────────────────────────── */
let _addVendorCategory = '';

function openAddVendorModal(cat, label) {
  _addVendorCategory = cat;
  const catEl = document.getElementById('vendor-category');
  if (catEl && cat) catEl.value = cat;
  openModal('wed-add-vendor-modal');
  setTimeout(() => document.getElementById('vendor-name')?.focus(), 200);
}

function submitAddVendor() {
  const name = (document.getElementById('vendor-name')?.value || '').trim();
  if (!name) { showToast('⚠️ Enter a vendor name'); return; }
  const category = document.getElementById('vendor-category')?.value || _addVendorCategory || 'other';
  const phone    = (document.getElementById('vendor-phone')?.value  || '').trim();
  const link     = (document.getElementById('vendor-link')?.value   || '').trim();
  const notes    = (document.getElementById('vendor-notes')?.value  || '').trim();
  const price    = parseFloat((document.getElementById('vendor-price')?.value||'').replace(/,/g,'')) || 0;
  WED.vendors.push({ id: WED.nextVendorId++, name, category, phone, link, notes, price });
  ['vendor-name','vendor-phone','vendor-link','vendor-notes','vendor-price'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  saveState();
  closeModal('wed-add-vendor-modal');
  renderSuppliers();
  showToast('🤝 ' + name + ' saved!');
}

function deleteVendor(id) {
  const v = WED.vendors.find(v => v.id === id);
  if (!v || !confirm('Remove "' + v.name + '"?')) return;
  WED.vendors = WED.vendors.filter(v => v.id !== id);
  saveState();
  renderSuppliers();
  showToast('🗑 Vendor removed');
}

/* ── QUICK DIALS ─────────────────────────────── */
function openQuickDials() {
  const old = document.getElementById('quick-dials-overlay');
  if (old) { old.remove(); return; }   // toggle off if already open

  const vendorContacts = WED.vendors.filter(v => v.phone);
  const guestContacts  = WED.guests.filter(g => g.phone);

  const vendorRows = vendorContacts.length
    ? vendorContacts.map(v => `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:var(--r-md);margin-bottom:5px;background:rgba(245,230,200,0.55);border:1px solid rgba(201,169,110,0.18)">
          <span style="font-size:20px;flex-shrink:0">${getSupplierEmoji(v.category)}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:700;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${v.name}</div>
            <div style="font-size:10.5px;color:var(--ink-4);text-transform:capitalize">${v.category}</div>
          </div>
          <a href="tel:${v.phone.replace(/\s/g,'')}" style="padding:7px 12px;border-radius:8px;background:rgba(90,171,122,0.15);border:1px solid rgba(90,171,122,0.25);font-size:12px;font-weight:700;color:var(--green-deep);text-decoration:none;flex-shrink:0">📞 Call</a>
        </div>`).join('')
    : `<div style="font-size:12px;color:var(--ink-4);padding:10px 4px;text-align:center">Add vendors with phone numbers in the Suppliers tab.</div>`;

  const guestRows = guestContacts.length
    ? guestContacts.map(g => `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:var(--r-md);margin-bottom:5px;background:rgba(232,245,237,0.55);border:1px solid rgba(90,171,122,0.15)">
          <div style="width:34px;height:34px;border-radius:10px;background:rgba(90,171,122,0.15);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--green-deep);flex-shrink:0">${g.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:700;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${g.name}</div>
            <div style="font-size:10.5px;color:var(--ink-4)">${g.phone}</div>
          </div>
          <a href="tel:${g.phone.replace(/\s/g,'')}" style="padding:7px 12px;border-radius:8px;background:rgba(90,171,122,0.15);border:1px solid rgba(90,171,122,0.25);font-size:12px;font-weight:700;color:var(--green-deep);text-decoration:none;flex-shrink:0">📞 Call</a>
        </div>`).join('')
    : `<div style="font-size:12px;color:var(--ink-4);padding:10px 4px;text-align:center">Add phone numbers when registering guests.</div>`;

  const overlay = document.createElement('div');
  overlay.id = 'quick-dials-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:980;background:rgba(44,31,14,0.3);display:flex;align-items:flex-end;justify-content:center;';
  overlay.innerHTML = `
    <div style="width:100%;max-width:440px;background:var(--cream);border-radius:22px 22px 0 0;padding:20px 16px 44px;max-height:82vh;overflow-y:auto;box-shadow:0 -8px 40px rgba(44,31,14,0.22);">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <div>
          <div style="font-size:15px;font-weight:700;color:var(--ink)">📞 Quick Dials</div>
          <div style="font-size:11px;color:var(--ink-4);margin-top:1px">${vendorContacts.length} vendor${vendorContacts.length!==1?'s':''} · ${guestContacts.length} guest${guestContacts.length!==1?'s':''}</div>
        </div>
        <button onclick="closeQuickDials()" style="width:30px;height:30px;border-radius:50%;border:none;background:rgba(44,31,14,0.08);font-size:17px;cursor:pointer;color:var(--ink-3)">×</button>
      </div>
      <div style="font-size:10.5px;font-weight:700;color:var(--tan-dark);text-transform:uppercase;letter-spacing:0.7px;margin-bottom:8px">🤝 Vendors (${vendorContacts.length})</div>
      ${vendorRows}
      <div style="font-size:10.5px;font-weight:700;color:var(--green-deep);text-transform:uppercase;letter-spacing:0.7px;margin:14px 0 8px">👥 Guests (${guestContacts.length})</div>
      ${guestRows}
    </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeQuickDials(); });
  document.body.appendChild(overlay);
}

function closeQuickDials() {
  const el = document.getElementById('quick-dials-overlay');
  if (el) el.remove();
}

/* ── CHECKLIST ───────────────────────────────── */
let _addToPhaseIndex = null;

/* Generate phases based on months-before-wedding */
function generateChecklistPhases(months) {
  const m = parseInt(months, 10) || 12;
  WED.planningMonths = m;
  WED._collapsedPhases = [];

  const ALL_PHASES = [
    { minMonths: 18, phase: '18 Months Out', items: [
      { text: 'Set wedding date' },
      { text: 'Book the venue' },
      { text: 'Set overall budget' },
      { text: 'Create initial guest list' },
      { text: 'Hire wedding coordinator' },
    ]},
    { minMonths: 12, phase: '12 Months Out', items: [
      { text: 'Set wedding date' },
      { text: 'Book the venue' },
      { text: 'Set overall budget' },
      { text: 'Create initial guest list' },
      { text: 'Hire wedding coordinator' },
    ]},
    { minMonths: 9, phase: '9 Months Out', items: [
      { text: 'Book photographer & videographer' },
      { text: 'Choose wedding theme & color palette' },
      { text: 'Start shopping for wedding attire' },
    ]},
    { minMonths: 6, phase: '6 Months Out', items: [
      { text: 'Book catering' },
      { text: 'Order wedding attire' },
      { text: 'Send save-the-dates' },
      { text: 'Book live band or DJ' },
    ]},
    { minMonths: 3, phase: '3 Months Out', items: [
      { text: 'Send formal invitations' },
      { text: 'Finalize menu with caterer' },
      { text: 'Book hair & makeup' },
      { text: 'Order wedding cake' },
      { text: 'Arrange accommodations for guests' },
    ]},
    { minMonths: 1, phase: '1 Month Out', items: [
      { text: 'Confirm all vendors' },
      { text: 'Finalize seating arrangement' },
      { text: 'Submit final headcount to caterer' },
      { text: 'Pick up wedding attire' },
      { text: 'Prepare payments & envelopes' },
    ]},
    { minMonths: 0, phase: 'Week Of', items: [
      { text: 'Wedding rehearsal' },
      { text: 'Confirm vendors one last time' },
      { text: 'Pack for honeymoon' },
      { text: 'Prepare emergency kit' },
    ]},
    { minMonths: 0, phase: 'Day Of', items: [
      { text: 'Hair & makeup' },
      { text: 'Bride/groom gets dressed' },
      { text: 'Ceremony' },
      { text: 'Reception' },
      { text: 'Send-off / exit' },
    ]},
  ];

  // Pick phases that fit within the planning window; always include Week Of + Day Of
  const fixed = ['Week Of', 'Day Of'];
  let chosen;
  if (m >= 18) {
    chosen = ALL_PHASES.filter(p => p.minMonths <= m && p.minMonths >= 18 || fixed.includes(p.phase) || (p.minMonths < 18 && p.minMonths > 0 && p.minMonths <= m));
    chosen = ALL_PHASES; // 18+ months: all phases
  } else {
    chosen = ALL_PHASES.filter(p => p.minMonths <= m || fixed.includes(p.phase));
  }
  // Remove the 18-month phase if planning less than 18 months
  if (m < 18) chosen = chosen.filter(p => p.phase !== '18 Months Out');
  // Remove the 12-month phase if planning less than 12 months
  if (m < 12) chosen = chosen.filter(p => p.phase !== '12 Months Out');
  // Remove the 9-month phase if planning less than 9 months
  if (m < 9) chosen = chosen.filter(p => p.phase !== '9 Months Out');

  let idCounter = Date.now();
  WED.checklist = chosen.map(p => ({
    phase: p.phase,
    items: p.items.map(it => ({
      id: 'c' + (idCounter++),
      text: it.text,
      done: false,
      note: '',
      noteAt: null,
    })),
  }));
  saveState();
}

function showChecklistTimelineChanger() {
  const el = document.getElementById('checklist-timeline-changer');
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function submitChecklistTimeline(selId) {
  const sel = document.getElementById(selId || 'checklist-months-select');
  const months = sel ? parseInt(sel.value, 10) : 12;
  generateChecklistPhases(months);
  renderChecklist();
  showToast('✅ Checklist updated!');
}

function togglePhaseCollapse(pi) {
  const phaseName = WED.checklist[pi]?.phase;
  if (!phaseName) return;
  const idx = WED._collapsedPhases.indexOf(phaseName);
  if (idx > -1) WED._collapsedPhases.splice(idx, 1);
  else WED._collapsedPhases.push(phaseName);
  saveState();
  renderChecklist();
}

function renderChecklist() {
  const el = document.getElementById('wed-checklist-content');
  if (!el) return;

  /* ── Setup screen when planning window not set ── */
  if (WED.planningMonths === null) {
    el.innerHTML = `
      <div style="max-width:360px;margin:24px auto 0;padding:28px 22px 26px;border-radius:var(--r-lg);background:rgba(255,252,247,0.9);border:1px solid rgba(184,145,106,0.22);text-align:center">
        <div style="font-size:26px;margin-bottom:10px">💍</div>
        <div style="font-family:var(--f2);font-size:20px;font-style:italic;color:var(--ink);margin-bottom:6px">Let's build your checklist</div>
        <div style="font-size:12.5px;color:var(--ink-3);line-height:1.6;margin-bottom:20px">How many months do you have until your wedding? We'll create the right planning phases for you.</div>
        <select id="checklist-months-select" style="width:100%;padding:10px 14px;border-radius:var(--r-md);border:1px solid rgba(184,145,106,0.3);background:rgba(250,246,238,0.9);font-size:13px;color:var(--ink);margin-bottom:16px;font-family:var(--f)">
          <option value="3">3 months — Quick sprint</option>
          <option value="6">6 months</option>
          <option value="9">9 months</option>
          <option value="12" selected>12 months — Recommended</option>
          <option value="18">18 months — Detailed planning</option>
          <option value="24">24 months — Extra thorough</option>
        </select>
        <button onclick="submitChecklistTimeline()" style="width:100%;padding:11px;border-radius:var(--r-md);background:linear-gradient(135deg,var(--gold),var(--tan-dark));border:none;color:#fff;font-size:13px;font-weight:700;cursor:pointer;letter-spacing:0.5px">Build My Checklist →</button>
      </div>`;
    return;
  }

  /* ── Normal checklist view ── */
  const totalDone  = WED.checklist.reduce((a,p)=>a+p.items.filter(i=>i.done).length,0);
  const totalItems = WED.checklist.reduce((a,p)=>a+p.items.length,0);
  const pct = totalItems ? Math.round((totalDone/totalItems)*100) : 0;

  const fmtNoteAt = iso => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-PH', { month:'short', day:'numeric', year:'numeric' })
      + ' · ' + d.toLocaleTimeString('en-PH', { hour:'numeric', minute:'2-digit' });
  };

  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;padding:8px 12px;border-radius:var(--r-md);background:rgba(245,230,200,0.40);border:1px solid rgba(201,169,110,0.16)">
      <span style="font-size:11.5px;font-weight:700;color:var(--ink-3)">📅 ${WED.planningMonths}-month plan</span>
      <div style="display:flex;gap:6px">
        <button onclick="showChecklistTimelineChanger()" style="padding:4px 10px;border-radius:6px;background:rgba(255,253,248,0.9);border:1px solid rgba(184,145,106,0.25);font-size:10.5px;font-weight:700;color:var(--gold-dark);cursor:pointer">Change →</button>
        <button onclick="if(confirm('Reset entire checklist?')){WED.planningMonths=null;WED._collapsedPhases=[];saveState();renderChecklist();}" style="padding:4px 10px;border-radius:6px;background:transparent;border:1px solid rgba(224,120,152,0.22);font-size:10.5px;font-weight:700;color:var(--ink-4);cursor:pointer">Reset</button>
      </div>
    </div>
    <div id="checklist-timeline-changer" style="display:none;margin-bottom:12px;padding:14px;border-radius:var(--r-md);background:rgba(255,252,247,0.95);border:1px solid rgba(184,145,106,0.2)">
      <div style="font-size:12px;font-weight:700;color:var(--ink-3);margin-bottom:8px">Change planning window:</div>
      <select id="checklist-months-change" style="width:100%;padding:8px 12px;border-radius:var(--r-md);border:1px solid rgba(184,145,106,0.3);background:rgba(250,246,238,0.9);font-size:12.5px;color:var(--ink);margin-bottom:10px;font-family:var(--f)">
        <option value="3"${WED.planningMonths===3?' selected':''}>3 months — Quick sprint</option>
        <option value="6"${WED.planningMonths===6?' selected':''}>6 months</option>
        <option value="9"${WED.planningMonths===9?' selected':''}>9 months</option>
        <option value="12"${WED.planningMonths===12?' selected':''}>12 months</option>
        <option value="18"${WED.planningMonths===18?' selected':''}>18 months</option>
        <option value="24"${WED.planningMonths===24?' selected':''}>24 months</option>
      </select>
      <div style="display:flex;gap:8px">
        <button onclick="submitChecklistTimeline('checklist-months-change')" style="flex:1;padding:9px;border-radius:var(--r-md);background:linear-gradient(135deg,var(--gold),var(--tan-dark));border:none;color:#fff;font-size:12px;font-weight:700;cursor:pointer">Apply New Timeline</button>
        <button onclick="document.getElementById('checklist-timeline-changer').style.display='none'" style="padding:9px 14px;border-radius:var(--r-md);background:transparent;border:1px solid rgba(184,145,106,0.22);font-size:12px;color:var(--ink-4);cursor:pointer">Cancel</button>
      </div>
    </div>
    <div style="padding:12px 14px;border-radius:var(--r-md);background:rgba(245,230,200,0.45);border:1px solid rgba(201,169,110,0.18);margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:12px;font-weight:700;color:var(--ink-3)">Overall Progress</span>
        <span style="font-size:12px;font-weight:700;color:var(--tan-dark)">${totalDone}/${totalItems} · ${pct}%</span>
      </div>
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
    </div>
    ${WED.checklist.map((phase,pi)=>{
      const done      = phase.items.filter(i=>i.done).length;
      const total     = phase.items.length;
      const pp        = total ? Math.round((done/total)*100) : 0;
      const collapsed = WED._collapsedPhases.includes(phase.phase);
      return `
      <div style="margin-bottom:14px;border-radius:var(--r-md);overflow:hidden;border:1px solid rgba(184,145,106,0.14)">
        <div onclick="togglePhaseCollapse(${pi})" style="display:flex;align-items:center;justify-content:space-between;padding:10px 13px;background:rgba(245,230,200,0.55);cursor:pointer;user-select:none">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:13px;color:var(--ink-3);transition:transform 0.2s;display:inline-block;transform:rotate(${collapsed?'-90':'0'}deg)">▾</span>
            <span style="font-size:13px;font-weight:700;color:var(--ink-2)">${phase.phase}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:11px;color:var(--ink-4);font-weight:700">${done}/${total}</span>
            <div style="width:40px;height:4px;border-radius:2px;background:rgba(44,31,14,0.1);overflow:hidden">
              <div style="width:${pp}%;height:100%;background:linear-gradient(90deg,var(--rose),var(--tan));border-radius:2px"></div>
            </div>
          </div>
        </div>
        ${collapsed ? '' : `
        <div style="padding:8px 10px 10px;background:rgba(255,252,247,0.7)">
          ${phase.items.map(item=>{
            const noteTs = item.noteAt ? fmtNoteAt(item.noteAt) : '';
            return `
          <div class="glass" style="padding:10px 13px;border-radius:var(--r-md);margin-bottom:6px">
            <div style="display:flex;align-items:center;gap:10px">
              <div onclick="toggleChecklist('${item.id}')" style="width:22px;height:22px;border-radius:7px;border:2px solid ${item.done?'var(--green-accent)':'var(--ink-4)'};background:${item.done?'var(--green-accent)':'transparent'};display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;transition:all 0.2s">
                ${item.done?'<span style="color:white;font-size:12px;font-weight:700">✓</span>':''}
              </div>
              <span onclick="toggleChecklist('${item.id}')" style="font-size:13px;font-weight:500;color:${item.done?'var(--ink-4)':'var(--ink)'};text-decoration:${item.done?'line-through':'none'};flex:1;cursor:pointer;line-height:1.4">${item.text}</span>
              <button onclick="openChecklistNoteEditor('${item.id}')"
                style="padding:3px 8px;border-radius:6px;border:1px solid ${item.note?'rgba(184,145,106,0.35)':'rgba(44,31,14,0.1)'};background:${item.note?'rgba(184,145,106,0.12)':'transparent'};font-size:9.5px;font-weight:700;color:${item.note?'var(--gold-dark)':'var(--ink-4)'};cursor:pointer;flex-shrink:0;font-family:var(--f)"
                title="${item.note?'Edit decision note':'Add decision note'}">
                ${item.note?'◇ Note':'+ Note'}
              </button>
              <button onclick="deleteChecklistItem('${item.id}')" style="width:24px;height:24px;border-radius:7px;border:none;background:rgba(224,120,152,0.1);color:var(--pink-deep);font-size:14px;cursor:pointer;flex-shrink:0;line-height:1">×</button>
            </div>
            ${item.note?`
            <div style="margin-top:6px;padding:6px 8px;border-radius:6px;background:rgba(184,145,106,0.08);border-left:2px solid rgba(184,145,106,0.3)">
              <div style="font-size:11.5px;color:var(--ink-3);font-style:italic;line-height:1.5">"${item.note}"</div>
              ${noteTs?`<div style="margin-top:3px;font-size:10px;color:var(--ink-4)">${noteTs}</div>`:''}
            </div>`:''}
          </div>`;
          }).join('')}
          <button onclick="openAddChecklistItemToPhase(${pi})" style="width:100%;margin-top:4px;padding:7px;border-radius:var(--r-md);background:transparent;border:1px dashed rgba(184,145,106,0.3);font-size:11.5px;font-weight:700;color:var(--ink-4);cursor:pointer">+ Add Task</button>
        </div>`}
      </div>`;
    }).join('')}`;
}

function toggleChecklist(id) {
  for (const phase of WED.checklist) {
    const item = phase.items.find(i => i.id === id);
    if (item) {
      item.done = !item.done;
      saveState(); renderChecklist(); renderOverview();
      showToast(item.done ? 'Task done' : 'Task unchecked');
      return;
    }
  }
}

let _editNoteId = null;

function openChecklistNoteEditor(id) {
  _editNoteId = id;
  let item = null;
  for (const phase of WED.checklist) {
    item = phase.items.find(i => i.id === id);
    if (item) break;
  }
  if (!item) return;
  const labelEl = document.getElementById('checklist-note-item-label');
  const inputEl = document.getElementById('checklist-note-input');
  if (labelEl) labelEl.textContent = item.text;
  if (inputEl) inputEl.value = item.note || '';
  openModal('checklist-note-modal');
  setTimeout(() => inputEl?.focus(), 200);
}

function saveChecklistNote() {
  const note = (document.getElementById('checklist-note-input')?.value || '').trim();
  for (const phase of WED.checklist) {
    const item = phase.items.find(i => i.id === _editNoteId);
    if (item) {
      item.note   = note;
      item.noteAt = note ? new Date().toISOString() : null;
      saveState();
      break;
    }
  }
  closeModal('checklist-note-modal');
  renderChecklist();
}

function openAddChecklistItem()           { _addToPhaseIndex = null; openModal('wed-add-checklist-modal'); }
function openAddChecklistItemToPhase(pi)  { _addToPhaseIndex = pi;   openModal('wed-add-checklist-modal'); }

function submitChecklistItem() {
  const text = document.getElementById('checklist-item-text')?.value.trim();
  if (!text) { showToast('⚠️ Enter a task'); return; }
  const id = 'c'+Date.now();
  if (_addToPhaseIndex !== null && WED.checklist[_addToPhaseIndex]) {
    WED.checklist[_addToPhaseIndex].items.push({ id, text, done:false, note:'' });
  } else {
    WED.checklist[WED.checklist.length-1].items.push({ id, text, done:false, note:'' });
  }
  document.getElementById('checklist-item-text').value = '';
  saveState();
  closeModal('wed-add-checklist-modal');
  renderChecklist();
  renderOverview();
  showToast('✅ Task added!');
}

function deleteChecklistItem(id) {
  for (const phase of WED.checklist) {
    const idx = phase.items.findIndex(i=>i.id===id);
    if (idx > -1) { phase.items.splice(idx,1); break; }
  }
  saveState();
  renderChecklist();
  renderOverview();
}

/* ── SCHEDULE ────────────────────────────────── */
let _editSchedIndex = null;
const SCHED_COLORS = {
  pink:  'rgba(252,232,238,0.72)',
  sand:  'rgba(245,230,200,0.72)',
  green: 'rgba(232,245,237,0.72)',
  cream: 'rgba(255,253,248,0.72)',
};
const SCHED_BORDER = {
  pink:  'rgba(224,120,152,0.2)',
  sand:  'rgba(201,169,110,0.25)',
  green: 'rgba(90,171,122,0.2)',
  cream: 'rgba(255,255,255,0.5)',
};

/* ── SCHEDULE / CALENDAR ─────────────────────── */
let _schedView = 'daily';  // 'monthly' | 'weekly' | 'daily'
let _schedDate = null;     // Date object — currently viewed date

function _getSchedDate() {
  if (!_schedDate) {
    _schedDate = WED.date ? new Date(WED.date + 'T12:00:00') : new Date();
  }
  return _schedDate;
}

function _fmtIso(d) {
  // Date → 'YYYY-MM-DD'
  return d.getFullYear() + '-'
    + String(d.getMonth()+1).padStart(2,'0') + '-'
    + String(d.getDate()).padStart(2,'0');
}

function _eventsOnDate(dateStr) {
  return WED.schedule
    .filter(s => (s.date || WED.date || '') === dateStr)
    .sort((a,b) => a.time.localeCompare(b.time));
}

function setSchedView(view) {
  _schedView = view;
  renderSchedule();
}

function navSchedDate(delta) {
  const d = _getSchedDate();
  if (_schedView === 'monthly') {
    d.setMonth(d.getMonth() + delta);
  } else if (_schedView === 'weekly') {
    d.setDate(d.getDate() + delta * 7);
  } else {
    d.setDate(d.getDate() + delta);
  }
  _schedDate = d;
  renderSchedule();
}

function jumpToDate(dateStr) {
  _schedDate = new Date(dateStr + 'T12:00:00');
  _schedView = 'daily';
  renderSchedule();
}

function prefillSchedDate() {
  const inp = document.getElementById('sched-date');
  if (!inp) return;
  if (!inp.value) {
    inp.value = _fmtIso(_getSchedDate());
  }
}

/* ── Monthly calendar view ── */
function _renderMonthView(d) {
  const year = d.getFullYear();
  const month = d.getMonth();
  const monthName = d.toLocaleString('en-PH', { month: 'long', year: 'numeric' });
  const firstDow  = new Date(year, month, 1).getDay();
  const lastDay   = new Date(year, month + 1, 0).getDate();
  const todayStr  = _fmtIso(new Date());
  const dows      = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  let grid = '<div class="cal-month-grid">';
  dows.forEach(h => { grid += `<div class="cal-month-dow">${h}</div>`; });

  for (let i = 0; i < firstDow; i++) {
    grid += '<div class="cal-month-cell cal-month-empty"></div>';
  }
  for (let day = 1; day <= lastDay; day++) {
    const mm     = String(month+1).padStart(2,'0');
    const dd     = String(day).padStart(2,'0');
    const dStr   = `${year}-${mm}-${dd}`;
    const evs    = _eventsOnDate(dStr);
    const isTdy  = dStr === todayStr;
    const isWed  = dStr === WED.date;
    grid += `
      <div class="cal-month-cell${isTdy?' cal-today':''}${isWed?' cal-wed-day':''}" onclick="jumpToDate('${dStr}')">
        <span class="cal-day-num">${day}</span>
        ${evs.length ? `<div class="cal-dots">${evs.slice(0,4).map(()=>'<span class="cal-dot"></span>').join('')}</div>` : ''}
        ${isWed ? '<span class="cal-wed-badge">💍</span>' : ''}
      </div>`;
  }
  grid += '</div>';

  return `
    <div class="cal-nav">
      <button class="cal-nav-btn" onclick="navSchedDate(-1)">‹</button>
      <span class="cal-nav-title">${monthName}</span>
      <button class="cal-nav-btn" onclick="navSchedDate(1)">›</button>
    </div>
    ${grid}
    <div class="cal-month-hint">Tap a date to see its events</div>`;
}

/* ── Weekly calendar view ── */
function _renderWeekView(d) {
  const sun = new Date(d);
  sun.setDate(d.getDate() - d.getDay()); // back to Sunday

  const todayStr  = _fmtIso(new Date());
  const dayNames  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const weekStart = sun.toLocaleDateString('en-PH', { month:'short', day:'numeric' });
  const weekEndD  = new Date(sun); weekEndD.setDate(sun.getDate()+6);
  const weekEnd   = weekEndD.toLocaleDateString('en-PH', { month:'short', day:'numeric', year:'numeric' });

  let cols = '';
  for (let i = 0; i < 7; i++) {
    const day   = new Date(sun); day.setDate(sun.getDate()+i);
    const dStr  = _fmtIso(day);
    const evs   = _eventsOnDate(dStr);
    const isTdy = dStr === todayStr;
    const isWed = dStr === WED.date;
    cols += `
      <div class="cal-week-col${isTdy?' cal-week-today':''}${isWed?' cal-week-wedday':''}">
        <div class="cal-week-header" onclick="jumpToDate('${dStr}')">
          <div class="cal-week-dow">${dayNames[i]}</div>
          <div class="cal-week-daynum${isTdy?' cal-today-num':''}">${day.getDate()}</div>
          ${isWed ? '<div style="font-size:9px">💍</div>' : ''}
        </div>
        <div class="cal-week-events">
          ${evs.length
            ? evs.map(e=>`
            <div class="cal-week-event" style="border-left:3px solid ${SCHED_BORDER[e.color]||'rgba(201,169,110,0.5)'}" onclick="jumpToDate('${dStr}')">
              <div class="cal-week-event-time">${e.time}</div>
              <div class="cal-week-event-name">${e.event}</div>
            </div>`).join('')
            : '<div class="cal-week-empty">—</div>'}
        </div>
      </div>`;
  }

  return `
    <div class="cal-nav">
      <button class="cal-nav-btn" onclick="navSchedDate(-1)">‹</button>
      <span class="cal-nav-title">${weekStart} – ${weekEnd}</span>
      <button class="cal-nav-btn" onclick="navSchedDate(1)">›</button>
    </div>
    <div class="cal-week-grid">${cols}</div>`;
}

/* ── Daily timeline view ── */
function _renderDayView(d) {
  const dateStr  = _fmtIso(d);
  const dayLabel = d.toLocaleDateString('en-PH', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
  const evs      = _eventsOnDate(dateStr);
  const isWedDay = dateStr === WED.date;

  let html = `
    <div class="cal-nav">
      <button class="cal-nav-btn" onclick="navSchedDate(-1)">‹</button>
      <span class="cal-nav-title">${dayLabel}</span>
      <button class="cal-nav-btn" onclick="navSchedDate(1)">›</button>
    </div>
    ${isWedDay ? '<div class="cal-wed-banner">💍 Your Wedding Day</div>' : ''}`;

  if (!evs.length) {
    html += `
      <div class="empty-state" style="padding:40px 0">
        <div class="empty-emoji">📅</div>
        <div class="empty-title">No Events</div>
        <div class="empty-sub">No events planned for this day.<br>Tap + Add Event above.</div>
      </div>`;
  } else {
    html += '<div class="cal-day-timeline">' + evs.map(s => {
      const i = WED.schedule.indexOf(s);
      return `
        <div style="display:flex;gap:10px;margin-bottom:10px;align-items:flex-start">
          <div style="min-width:52px;text-align:right;padding-top:13px">
            <div style="font-size:11px;font-weight:700;color:var(--ink-3)">${s.time}</div>
          </div>
          <div class="timeline-dot"></div>
          <div style="flex:1;padding:12px 14px;border-radius:var(--r-md);background:${SCHED_COLORS[s.color]||SCHED_COLORS.cream};border:1px solid ${SCHED_BORDER[s.color]||SCHED_BORDER.cream};opacity:${s.done?0.6:1}">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
              <div style="flex:1">
                <div style="font-size:13.5px;font-weight:700;color:var(--ink);text-decoration:${s.done?'line-through':'none'}">${s.event}</div>
                <div style="font-size:11px;color:var(--ink-4);margin-top:2px">👤 ${s.assignee}</div>
              </div>
              <div style="display:flex;gap:5px;flex-shrink:0">
                <button onclick="toggleSchedule(${i})" style="width:26px;height:26px;border-radius:8px;border:2px solid ${s.done?'var(--green-accent)':'var(--ink-4)'};background:${s.done?'var(--green-accent)':'transparent'};display:flex;align-items:center;justify-content:center;cursor:pointer">${s.done?'<span style="color:white;font-size:11px;font-weight:700">✓</span>':''}</button>
                <button onclick="openEditSched(${i})" style="width:26px;height:26px;border-radius:8px;border:1px solid rgba(201,169,110,0.28);background:rgba(245,230,200,0.55);font-size:13px;cursor:pointer">✏️</button>
                <button onclick="deleteSchedItem(${i})" style="width:26px;height:26px;border-radius:8px;border:1px solid rgba(224,120,152,0.22);background:rgba(252,232,238,0.55);font-size:14px;cursor:pointer;color:var(--pink-deep)">×</button>
              </div>
            </div>
          </div>
        </div>`;
    }).join('') + '</div>';
  }
  return html;
}

function renderSchedule() {
  const el = document.getElementById('wed-schedule-content');
  if (!el) return;
  const d = _getSchedDate();

  const toolbar = `
    <div class="sched-toolbar">
      <div class="sched-view-switcher">
        <button class="sched-vbtn${_schedView==='monthly'?' sched-vbtn-active':''}" onclick="setSchedView('monthly')">Monthly</button>
        <button class="sched-vbtn${_schedView==='weekly'?' sched-vbtn-active':''}" onclick="setSchedView('weekly')">Weekly</button>
        <button class="sched-vbtn${_schedView==='daily'?' sched-vbtn-active':''}" onclick="setSchedView('daily')">Daily</button>
      </div>
      <button onclick="openModal('wed-add-sched-modal');prefillSchedDate()" class="sched-add-btn">+ Add Event</button>
    </div>`;

  let body = '';
  if (_schedView === 'monthly') body = _renderMonthView(d);
  else if (_schedView === 'weekly') body = _renderWeekView(d);
  else body = _renderDayView(d);

  el.innerHTML = toolbar + body;
}

function toggleSchedule(i) {
  WED.schedule[i].done = !WED.schedule[i].done;
  saveState();
  renderSchedule();
  showToast(WED.schedule[i].done ? '✅ Done!' : '↩ Unchecked');
}

function addWedSched() {
  const date     = document.getElementById('sched-date')?.value || WED.date || '';
  const time     = document.getElementById('sched-time')?.value;
  const event    = document.getElementById('sched-event')?.value.trim();
  const assignee = document.getElementById('sched-assignee')?.value.trim();
  if (!time||!event) { showToast('⚠️ Fill in time and event'); return; }
  WED.schedule.push({ date, time, event, assignee:assignee||'Unassigned', done:false, color:'cream' });
  WED.schedule.sort((a,b) => (a.date||'').localeCompare(b.date||'') || a.time.localeCompare(b.time));
  document.getElementById('sched-date').value     = '';
  document.getElementById('sched-time').value     = '';
  document.getElementById('sched-event').value    = '';
  document.getElementById('sched-assignee').value = '';
  // Navigate calendar to the new event's date
  if (date) { _schedDate = new Date(date + 'T12:00:00'); _schedView = 'daily'; }
  saveState();
  closeModal('wed-add-sched-modal');
  renderSchedule();
  showToast('📅 Event added!');
}

function openEditSched(i) {
  _editSchedIndex = i;
  const s = WED.schedule[i];
  const dateEl = document.getElementById('edit-sched-date');
  if (dateEl) dateEl.value = s.date || WED.date || '';
  document.getElementById('edit-sched-time').value     = s.time;
  document.getElementById('edit-sched-event').value    = s.event;
  document.getElementById('edit-sched-assignee').value = s.assignee;
  openModal('wed-edit-sched-modal');
}

function submitEditSched() {
  if (_editSchedIndex === null) return;
  const s = WED.schedule[_editSchedIndex];
  s.date     = document.getElementById('edit-sched-date')?.value   || s.date || '';
  s.time     = document.getElementById('edit-sched-time')?.value   || s.time;
  s.event    = document.getElementById('edit-sched-event')?.value.trim()    || s.event;
  s.assignee = document.getElementById('edit-sched-assignee')?.value.trim() || s.assignee;
  WED.schedule.sort((a,b) => (a.date||'').localeCompare(b.date||'') || a.time.localeCompare(b.time));
  if (s.date) { _schedDate = new Date(s.date + 'T12:00:00'); _schedView = 'daily'; }
  _editSchedIndex = null;
  saveState();
  closeModal('wed-edit-sched-modal');
  renderSchedule();
  showToast('📅 Event updated!');
}

function deleteSchedItem(i) {
  WED.schedule.splice(i,1);
  saveState();
  renderSchedule();
  showToast('🗑 Item removed');
}

/* ═══════════════════════════════════════════════
   SEATING CANVAS
═══════════════════════════════════════════════ */
let cvs, cx;
let cTx = { scale: 1, ox: 20, oy: 20 };  // canvas pan/zoom transform

function screenToWorld(sx, sy) {
  return { x: (sx - cTx.ox) / cTx.scale, y: (sy - cTx.oy) / cTx.scale };
}

function initCanvas() {
  cvs = document.getElementById('seating-canvas');
  if (!cvs) return;
  if (cvs._init) { resizeCanvas(); drawCanvas(); return; }
  cvs._init = true;
  cx = cvs.getContext('2d');
  resizeCanvas();
  drawCanvas();
  bindCanvasEvents();
  bindCanvasRotate();
  bindCanvasZoom();
  bindCanvasResize();
  renderFurniturePalette();
  renderCanvasActions();
  renderSeatAssignments();
}

function resizeCanvas() {
  const wrap = document.getElementById('canvas-wrap');
  if (!wrap || !cvs) return;
  const W = wrap.clientWidth || 380;
  const isDesk = window.innerWidth >= 900;
  const defaultH = isDesk
    ? Math.max(520, window.innerHeight - 200)
    : (cvs._userHeight || 420);
  cvs.width  = W;
  cvs.height = cvs._userHeight || defaultH;
  if (!cvs._userHeight) cvs._userHeight = cvs.height;
}

function bindCanvasResize() {
  const handle = document.getElementById('canvas-resize-handle');
  if (!handle || handle._bound) return;
  handle._bound = true;
  let startY = 0, startH = 0;
  const onStart = (e) => {
    e.preventDefault();
    startY = e.touches ? e.touches[0].clientY : e.clientY;
    startH = cvs._userHeight || 400;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onEnd);
    document.addEventListener('touchmove', onMove, {passive:false});
    document.addEventListener('touchend',  onEnd);
  };
  const onMove = (e) => {
    if (e.cancelable) e.preventDefault();
    const y   = e.touches ? e.touches[0].clientY : e.clientY;
    const newH = Math.max(280, Math.min(1400, startH + (y - startY)));
    cvs._userHeight = newH;
    cvs.height = newH;
    drawCanvas();
  };
  const onEnd = () => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup',   onEnd);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend',  onEnd);
  };
  handle.addEventListener('mousedown',  onStart);
  handle.addEventListener('touchstart', onStart, {passive:false});
}

function drawCanvas() {
  if (!cx || !cvs) return;
  cx.clearRect(0, 0, cvs.width, cvs.height);

  // Flat base fill (shows at edges when panned far)
  cx.fillStyle = '#ede4d3';
  cx.fillRect(0, 0, cvs.width, cvs.height);

  cx.save();
  cx.setTransform(cTx.scale, 0, 0, cTx.scale, cTx.ox, cTx.oy);

  // Visible world bounds (for culling)
  const vL = -cTx.ox / cTx.scale - 20;
  const vT = -cTx.oy / cTx.scale - 20;
  const vR = vL + cvs.width  / cTx.scale + 40;
  const vB = vT + cvs.height / cTx.scale + 40;

  // Gradient background in world space
  const bg = cx.createLinearGradient(vL, vT, vR, vB);
  bg.addColorStop(0, '#fef6e8'); bg.addColorStop(1, '#f5e6c8');
  cx.fillStyle = bg;
  cx.fillRect(vL, vT, vR - vL, vB - vT);

  // Dot grid (only visible dots)
  const GRID = 20;
  cx.fillStyle = 'rgba(201,169,110,0.22)';
  const gStartX = Math.floor(vL / GRID) * GRID;
  const gStartY = Math.floor(vT / GRID) * GRID;
  for (let gx = gStartX; gx < vR; gx += GRID) {
    for (let gy = gStartY; gy < vB; gy += GRID) {
      cx.beginPath(); cx.arc(gx, gy, 1.5, 0, Math.PI * 2); cx.fill();
    }
  }

  WED.furniture.forEach(f => drawFurniture(f));
  cx.restore();
}

function drawFurniture(f) {
  const selected = WED.selectedFurniture === f.id;
  cx.save();
  // Use stored w/h directly — rotation swaps them in-place via bindCanvasRotate
  const w = f.w;
  const h = f.h;
  const x = f.x, y = f.y;

  if (f.type === 'round') {
    const rx = x+f.w/2, ry = y+f.h/2, r = f.w/2;
    // Subtle dashed orbital ring shown when table is selected — radius adapts to actual chairs
    if (selected) {
      const sample = WED.furniture.find(c => c.type==='chair' && c.parentTableId===f.id);
      const guideR = r + (sample ? sample.w/2 : 16) + 6;
      cx.beginPath(); cx.arc(rx,ry,guideR,0,Math.PI*2);
      cx.strokeStyle = 'rgba(201,169,110,0.28)'; cx.lineWidth = 1;
      cx.setLineDash([3,5]); cx.stroke(); cx.setLineDash([]);
    }
    cx.beginPath(); cx.arc(rx,ry,r,0,Math.PI*2);
    cx.fillStyle = selected ? 'rgba(224,120,152,0.22)' : 'rgba(255,253,248,0.88)';
    cx.fill();
    cx.strokeStyle = selected ? '#e07898' : 'rgba(201,169,110,0.65)';
    cx.lineWidth = selected ? 2.5 : 1.5; cx.stroke();
    // 2-line label: "Round" on line 1, "Table N" on line 2
    const labelParts = f.label.split(' ');
    const line1 = labelParts[0];                  // "Round"
    const line2 = labelParts.slice(1).join(' ');  // "Table 1"
    const lineH = Math.max(9, Math.min(13, Math.floor(r / 4)));
    cx.textAlign = 'center';
    cx.fillStyle = 'rgba(44,31,14,0.52)';
    cx.font = `500 ${lineH}px Figtree,sans-serif`;
    cx.fillText(line1, rx, ry - lineH * 0.65);
    cx.fillStyle = 'rgba(44,31,14,0.82)';
    cx.font = `700 ${lineH}px Figtree,sans-serif`;
    cx.fillText(line2, rx, ry + lineH * 0.75);
    // Assigned-guest badge — small green circle at top of table
    const num = parseInt(f.label.replace(/\D/g,''));
    const assignedCount = WED.guests.filter(g => g.table === num).length;
    if (assignedCount > 0) {
      const bR = Math.max(8, Math.round(r * 0.22));
      const bX = rx + r * 0.62, bY = ry - r * 0.62;
      cx.beginPath(); cx.arc(bX, bY, bR, 0, Math.PI * 2);
      cx.fillStyle = 'rgba(90,171,122,0.92)'; cx.fill();
      cx.fillStyle = '#fff';
      cx.font = `700 ${Math.max(6, bR - 2)}px Figtree,sans-serif`;
      cx.fillText(assignedCount, bX, bY + Math.max(3, bR * 0.4));
    }
  } else if (f.type === 'long') {
    // Subtle dashed chair-band zone shown when table is selected — height adapts to actual chairs
    if (selected) {
      const sample = WED.furniture.find(c => c.type==='chair' && c.parentTableId===f.id);
      const pad = (sample ? sample.h : 28) + 4;
      cx.beginPath(); cx.roundRect(x-4, y-pad, w+8, h+pad*2, 8);
      cx.strokeStyle = 'rgba(90,171,122,0.25)'; cx.lineWidth = 1;
      cx.setLineDash([3,5]); cx.stroke(); cx.setLineDash([]);
    }
    cx.beginPath(); cx.roundRect(x,y,w,h,8);
    cx.fillStyle = selected ? 'rgba(90,171,122,0.18)' : 'rgba(255,253,248,0.88)';
    cx.fill();
    cx.strokeStyle = selected ? '#5aab7a' : 'rgba(201,169,110,0.65)';
    cx.lineWidth = selected ? 2.5 : 1.5; cx.stroke();
    if (selected) { cx.fillStyle='rgba(90,171,122,0.9)'; cx.font='10px serif'; cx.textAlign='center'; cx.fillText('⟳',x+w/2,y-5); }
  } else if (f.type === 'chair') {
    const assignedGuest = WED.guests.find(g => g._chairId === f.id);
    cx.beginPath(); cx.roundRect(x,y,w,h,5);
    cx.fillStyle = assignedGuest ? 'rgba(90,171,122,0.35)' : (selected ? 'rgba(201,169,110,0.28)' : 'rgba(245,230,200,0.75)');
    cx.fill();
    cx.strokeStyle = assignedGuest ? '#3a7a54' : (selected ? 'rgba(201,169,110,0.9)' : 'rgba(201,169,110,0.5)');
    cx.lineWidth = assignedGuest||selected ? 2 : 1; cx.stroke();
    cx.fillStyle='rgba(44,31,14,0.82)'; cx.textAlign='center';
    if (assignedGuest) {
      cx.font='600 7px Figtree,sans-serif';
      cx.fillText(assignedGuest.name.split(' ')[0], x+w/2, y+h/2+3);
    } else {
      // Two-line label: "RT1" / "Chair N" — font scales with chair size
      const fs1 = Math.max(5, Math.min(7, Math.floor(w / 4.5)));
      const fs2 = Math.max(4, Math.min(6, Math.floor(w / 5.5)));
      const parts = f.label.split('/');
      if (parts.length === 2) {
        cx.font=`bold ${fs1}px Figtree,sans-serif`;
        cx.fillText(parts[0], x+w/2, y+h/2-1);
        cx.font=`600 ${fs2}px Figtree,sans-serif`;
        cx.fillText(parts[1], x+w/2, y+h/2+fs2+1);
      } else {
        cx.font=`600 ${fs1}px Figtree,sans-serif`;
        cx.fillText(f.label, x+w/2, y+h/2+3);
      }
    }
    cx.restore(); return;
  } else if (f.type === 'freechair') {
    const assignedGuest = WED.guests.find(g => g._chairId === f.id);
    cx.beginPath(); cx.roundRect(x,y,w,h,6);
    cx.fillStyle = assignedGuest ? 'rgba(90,171,122,0.3)' : (selected ? 'rgba(201,169,110,0.4)' : 'rgba(245,230,200,0.95)');
    cx.fill();
    cx.strokeStyle = assignedGuest ? '#3a7a54' : (selected ? '#c9a96e' : 'rgba(201,169,110,0.85)');
    cx.lineWidth = selected||assignedGuest ? 2.5 : 1.5; cx.stroke();
    cx.textAlign='center';
    if (assignedGuest) {
      cx.fillStyle='rgba(44,31,14,0.82)'; cx.font='600 7px Figtree,sans-serif';
      cx.fillText(assignedGuest.name.split(' ')[0], x+w/2, y+h/2+3);
    } else {
      cx.fillStyle='#c9a96e'; cx.font='10px serif';
      cx.fillText('★', x+w/2, y+9);
      cx.fillStyle='rgba(44,31,14,0.75)'; cx.font='bold 7px Figtree,sans-serif';
      cx.fillText('Free', x+w/2, y+h/2+2);
      cx.font='600 6px Figtree,sans-serif';
      cx.fillText('Chair', x+w/2, y+h/2+10);
    }
    cx.restore(); return;
  } else if (f.type === 'stage') {
    cx.beginPath(); cx.roundRect(x,y,w,h,10);
    cx.fillStyle = selected ? 'rgba(224,120,152,0.28)' : 'rgba(252,232,238,0.88)';
    cx.fill();
    cx.strokeStyle = selected ? '#e07898' : 'rgba(224,120,152,0.5)';
    cx.lineWidth = selected ? 2.5 : 1.5; cx.stroke();
    if (selected) { cx.fillStyle='rgba(224,120,152,0.9)'; cx.font='bold 11px serif'; cx.textAlign='center'; cx.fillText('⟳',x+w/2,y-5); }
  } else if (f.type === 'entrance') {
    cx.beginPath(); cx.roundRect(x,y,w,h,8);
    cx.fillStyle = selected ? 'rgba(90,171,122,0.22)' : 'rgba(232,245,237,0.88)';
    cx.fill();
    cx.strokeStyle = selected ? '#5aab7a' : 'rgba(90,171,122,0.5)';
    cx.lineWidth = selected ? 2.5 : 1.5; cx.stroke();
    if (selected) { cx.fillStyle='rgba(90,171,122,0.9)'; cx.font='bold 11px serif'; cx.textAlign='center'; cx.fillText('⟳',x+w/2,y-5); }
  } else {
    cx.beginPath(); cx.roundRect(x,y,w,h,8);
    cx.fillStyle = selected ? 'rgba(245,230,200,0.7)' : 'rgba(255,253,248,0.88)';
    cx.fill();
    cx.strokeStyle = selected ? 'rgba(201,169,110,0.8)' : 'rgba(201,169,110,0.5)';
    cx.lineWidth = selected ? 2 : 1.5; cx.stroke();
  }

  cx.fillStyle = 'rgba(44,31,14,0.72)';
  cx.font = `600 ${f.type==='stage'?12:10}px Figtree,sans-serif`;
  cx.textAlign = 'center';
  cx.fillText(f.label, x+w/2, y+h/2+4);
  cx.restore();
}

function bindCanvasEvents() {
  let _pinchState = null;

  const getScreenPos = (e, isTouch) => {
    const r = cvs.getBoundingClientRect();
    const src = isTouch ? e.touches[0] : e;
    return { x: src.clientX - r.left, y: src.clientY - r.top };
  };

  const onDown = (e) => {
    if (e.type !== 'touchstart') e.preventDefault();
    if (e.touches && e.touches.length > 1) return; // multi-touch → pinch handles it
    _pinchState = null;

    const { x: sx, y: sy } = getScreenPos(e, e.type === 'touchstart');
    const { x, y } = screenToWorld(sx, sy); // world coords

    const hit = [...WED.furniture].reverse().find(f => {
      if (f.type === 'chair' || f.type === 'freechair')
        return x >= f.x-4 && x <= f.x+f.w+4 && y >= f.y-4 && y <= f.y+f.h+4;
      if (f.type === 'round') {
        const dx = x-(f.x+f.w/2), dy = y-(f.y+f.h/2);
        return Math.sqrt(dx*dx+dy*dy) <= f.w/2+6;
      }
      return x >= f.x-8 && x <= f.x+f.w+8 && y >= f.y-8 && y <= f.y+f.h+8;
    });

    if (hit) {
      if (hit.type === 'chair' || hit.type === 'freechair') {
        const now = Date.now(), key = '_lastTap_' + hit.id;
        const isDouble = (now - (WED[key]||0)) < 400;
        WED[key] = isDouble ? 0 : now;
        WED.selectedFurniture = hit.id;
        drawCanvas(); renderFurniturePalette(); renderCanvasActions();
        if (isDouble) { openChairGuestPicker(hit.id); return; }
      }
      WED.dragging  = hit;
      WED.dragOffX  = x - hit.x;  // offset in world coords
      WED.dragOffY  = y - hit.y;
      WED._panStart = null;
      WED.selectedFurniture = hit.id;
      renderSeatAssignments();
      drawCanvas(); renderFurniturePalette(); renderCanvasActions();
    } else {
      // Begin canvas pan
      WED._panStart = { sx, sy, ox: cTx.ox, oy: cTx.oy };
      WED.dragging  = null;
      WED.selectedFurniture = null;
      drawCanvas(); renderFurniturePalette(); renderCanvasActions();
    }
  };

  const onMove = (e) => {
    if (e.cancelable) e.preventDefault();

    // ── Two-finger pinch-zoom ──────────────────────
    if (e.touches && e.touches.length === 2) {
      const r = cvs.getBoundingClientRect();
      const t1 = e.touches[0], t2 = e.touches[1];
      const x1 = t1.clientX-r.left, y1 = t1.clientY-r.top;
      const x2 = t2.clientX-r.left, y2 = t2.clientY-r.top;
      const dist = Math.sqrt((x2-x1)**2+(y2-y1)**2);
      const mx = (x1+x2)/2, my = (y1+y2)/2;
      if (_pinchState) {
        const factor = dist / _pinchState.dist;
        const ns = Math.max(0.15, Math.min(6, cTx.scale * factor));
        cTx.ox = mx - (mx - cTx.ox) * (ns / cTx.scale);
        cTx.oy = my - (my - cTx.oy) * (ns / cTx.scale);
        cTx.ox += mx - _pinchState.mx;
        cTx.oy += my - _pinchState.my;
        cTx.scale = ns;
        drawCanvas(); _updateZoomLabel();
      }
      _pinchState = { dist, mx, my };
      WED.dragging  = null;
      WED._panStart = null;
      return;
    }
    _pinchState = null;

    const { x: sx, y: sy } = getScreenPos(e, e.type === 'touchmove');

    // ── Pan ──────────────────────────────────────
    if (WED._panStart) {
      cTx.ox = WED._panStart.ox + (sx - WED._panStart.sx);
      cTx.oy = WED._panStart.oy + (sy - WED._panStart.sy);
      drawCanvas();
      return;
    }

    if (!WED.dragging) return;

    const { x, y } = screenToWorld(sx, sy); // world coords
    const drag = WED.dragging;

    if (drag.type === 'round' || drag.type === 'long') {
      // Table drag — move table + all linked chairs by same delta
      const oldX = drag.x, oldY = drag.y;
      drag.x = x - WED.dragOffX;
      drag.y = y - WED.dragOffY;
      const dx = drag.x - oldX, dy = drag.y - oldY;
      if (dx || dy) {
        WED.furniture.forEach(f => {
          if (f.parentTableId === drag.id) { f.x += dx; f.y += dy; }
        });
      }
    } else if (drag.type === 'chair' && drag.parentTableId) {
      const parent = WED.furniture.find(f => f.id === drag.parentTableId);
      if (parent && parent.type === 'round') {
        // Orbital ring lock
        const tCX = parent.x+parent.w/2, tCY = parent.y+parent.h/2;
        const orbitR = parent.w/2 + drag.w/2 + 6;
        const angle  = Math.atan2(y - tCY, x - tCX);
        drag.x = Math.round(tCX + orbitR*Math.cos(angle) - drag.w/2);
        drag.y = Math.round(tCY + orbitR*Math.sin(angle) - drag.h/2);
      } else if (parent && parent.type === 'long') {
        // Snap to top or bottom edge
        const tL = parent.x, tR = parent.x+parent.w;
        const tT = parent.y, tB = parent.y+parent.h;
        const wX  = x - WED.dragOffX;
        const wCY = (y - WED.dragOffY) + drag.h/2;
        drag.x = Math.max(tL, Math.min(tR-drag.w, wX));
        drag.y = (wCY < (tT+tB)/2) ? tT-drag.h-4 : tB+4;
      } else {
        drag.x = x - WED.dragOffX;
        drag.y = y - WED.dragOffY;
      }
    } else {
      // Free drag — stage, entrance, freechair
      drag.x = x - WED.dragOffX;
      drag.y = y - WED.dragOffY;
    }

    drawCanvas();
  };

  const onUp = () => {
    _pinchState   = null;
    WED._panStart = null;
    if (!WED.dragging) return;
    WED.dragging  = null;
    saveState(); renderCanvasActions();
  };

  cvs.addEventListener('mousedown',  onDown);
  cvs.addEventListener('mousemove',  onMove);
  cvs.addEventListener('mouseup',    onUp);
  cvs.addEventListener('touchstart', onDown, { passive: true });
  cvs.addEventListener('touchmove',  onMove, { passive: false });
  cvs.addEventListener('touchend',   onUp);
}

function bindCanvasRotate() {
  let lastTap = 0;
  const handleDbl = (e) => {
    const now = Date.now();
    if (now - lastTap < 350) {
      const sel = WED.furniture.find(f => f.id === WED.selectedFurniture);
      if (sel && (sel.type === 'long' || sel.type === 'stage' || sel.type === 'entrance')) {
        rotateFurniture(sel);
      }
    }
    lastTap = now;
  };
  if (cvs) {
    cvs.addEventListener('mousedown',  handleDbl);
    cvs.addEventListener('touchstart', handleDbl, { passive: true });
  }
}

function rotateFurniture(sel) {
  if (!sel) return;
  if (sel.type === 'long') {
    const wasHoriz = sel.w >= sel.h;
    const oldW = sel.w, oldH = sel.h;
    const children = WED.furniture.filter(f => f.parentTableId === sel.id);

    // Capture each chair's relative position + which side of the table it's on
    const childData = children.map(chair => {
      let isFirstSide, relativeAlong;
      if (wasHoriz) {
        // Horizontal table: chairs are above (y < center) or below (y > center)
        isFirstSide   = (chair.y + chair.h/2) < (sel.y + sel.h/2);
        relativeAlong = (chair.x + chair.w/2 - sel.x) / sel.w;
      } else {
        // Vertical table: chairs are left (x < center) or right (x > center)
        isFirstSide   = (chair.x + chair.w/2) < (sel.x + sel.w/2);
        relativeAlong = (chair.y + chair.h/2 - sel.y) / sel.h;
      }
      relativeAlong = Math.max(0, Math.min(1, relativeAlong));
      return { chair, isFirstSide, relativeAlong };
    });

    // Rotate the table (swap w/h, keep top-left anchor)
    sel.rot = !sel.rot;
    sel.w = oldH;
    sel.h = oldW;

    // Reposition each child chair using its stored relative data
    childData.forEach(({ chair, isFirstSide, relativeAlong }) => {
      const nCW = chair.h, nCH = chair.w;  // also swap chair dims
      chair.w = nCW;
      chair.h = nCH;
      if (wasHoriz) {
        // Horizontal → Vertical: above → left side, below → right side
        chair.x = isFirstSide ? sel.x - nCW - 4 : sel.x + sel.w + 4;
        chair.y = sel.y + relativeAlong * sel.h - nCH / 2;
      } else {
        // Vertical → Horizontal: left → above, right → below
        chair.y = isFirstSide ? sel.y - nCH - 4 : sel.y + sel.h + 4;
        chair.x = sel.x + relativeAlong * sel.w - nCW / 2;
      }
    });

    saveState(); drawCanvas();
    showToast('Table rotated · chairs followed');
  } else {
    // Stage or Entrance — simple dimension swap
    const tmp = sel.w; sel.w = sel.h; sel.h = tmp;
    sel.rot = !sel.rot;
    saveState(); drawCanvas();
    showToast('Rotated');
  }
}

/* ── CANVAS ZOOM / PAN CONTROLS ──────────────── */
function bindCanvasZoom() {
  if (!cvs) return;
  cvs.addEventListener('wheel', (e) => {
    e.preventDefault();
    const r = cvs.getBoundingClientRect();
    const sx = e.clientX - r.left, sy = e.clientY - r.top;
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    const ns = Math.max(0.15, Math.min(6, cTx.scale * factor));
    cTx.ox = sx - (sx - cTx.ox) * (ns / cTx.scale);
    cTx.oy = sy - (sy - cTx.oy) * (ns / cTx.scale);
    cTx.scale = ns;
    drawCanvas(); _updateZoomLabel();
  }, { passive: false });
}

function _updateZoomLabel() {
  const el = document.getElementById('canvas-zoom-label');
  if (el) el.textContent = Math.round(cTx.scale * 100) + '%';
}

function zoomCanvas(factor) {
  if (!cvs) return;
  const sx = cvs.width / 2, sy = cvs.height / 2;
  const ns = Math.max(0.15, Math.min(6, cTx.scale * factor));
  cTx.ox = sx - (sx - cTx.ox) * (ns / cTx.scale);
  cTx.oy = sy - (sy - cTx.oy) * (ns / cTx.scale);
  cTx.scale = ns;
  drawCanvas(); _updateZoomLabel();
}

function fitCanvas() {
  if (!cvs) return;
  if (!WED.furniture.length) {
    cTx = { scale: 1, ox: 20, oy: 20 };
    drawCanvas(); _updateZoomLabel();
    return;
  }
  const margin = 60;
  const xs = WED.furniture.flatMap(f => [f.x, f.x + f.w]);
  const ys = WED.furniture.flatMap(f => [f.y, f.y + f.h]);
  const minX = Math.min(...xs) - margin, maxX = Math.max(...xs) + margin;
  const minY = Math.min(...ys) - margin, maxY = Math.max(...ys) + margin;
  const scaleX = cvs.width  / (maxX - minX);
  const scaleY = cvs.height / (maxY - minY);
  const ns = Math.min(2.5, scaleX, scaleY);
  cTx.scale = ns;
  cTx.ox = -minX * ns + (cvs.width  - (maxX - minX) * ns) / 2;
  cTx.oy = -minY * ns + (cvs.height - (maxY - minY) * ns) / 2;
  drawCanvas(); _updateZoomLabel();
}

/* ── REDISTRIBUTE CHAIRS EVENLY AROUND A TABLE ── */
// Called after adding or removing a chair so all seats spread evenly with no overlap.
function _redistributeChairs(tableId) {
  const table  = WED.furniture.find(f => f.id === tableId);
  if (!table) return;
  const chairs = WED.furniture.filter(f => f.type === 'chair' && f.parentTableId === tableId);
  const n = chairs.length;
  if (n === 0) return;

  const cW = cvs ? cvs.width  : 380;
  const cH = cvs ? cvs.height : 400;

  if (table.type === 'round') {
    // Evenly space chairs around the circumference, starting from the top (−90°)
    const tableR = table.w / 2;
    const tCX    = table.x + table.w / 2;
    const tCY    = table.y + table.h / 2;
    const cW0    = chairs[0].w;
    const cH0    = chairs[0].h;
    const orbitR = tableR + cW0 / 2 + 6;
    chairs.forEach((chair, i) => {
      const angle = (i * 2 * Math.PI / n) - Math.PI / 2;
      chair.x = Math.max(0, Math.min(cW - chair.w, Math.round(tCX + orbitR * Math.cos(angle) - chair.w / 2)));
      chair.y = Math.max(0, Math.min(cH - chair.h, Math.round(tCY + orbitR * Math.sin(angle) - chair.h / 2)));
    });

  } else if (table.type === 'long') {
    // Top row gets ceil(n/2), bottom row gets floor(n/2)
    const seatsTop = Math.ceil(n / 2);
    const seatsBot = Math.floor(n / 2);
    const cH0 = chairs[0].h;

    // Top row
    chairs.slice(0, seatsTop).forEach((chair, i) => {
      const slotW = table.w / seatsTop;
      chair.x = Math.max(0, Math.min(cW - chair.w, Math.round(table.x + i * slotW + slotW / 2 - chair.w / 2)));
      chair.y = Math.max(0, table.y - cH0 - 4);
    });
    // Bottom row
    chairs.slice(seatsTop).forEach((chair, i) => {
      const slotW = seatsBot > 0 ? table.w / seatsBot : table.w;
      chair.x = Math.max(0, Math.min(cW - chair.w, Math.round(table.x + i * slotW + slotW / 2 - chair.w / 2)));
      chair.y = Math.min(cH - chair.h, table.y + table.h + 4);
    });
  }
}

function addFurniture(type, label) {
  const defaults = {
    round:{w:68,h:68}, long:{w:115,h:46}, stage:{w:140,h:56},
    entrance:{w:76,h:34}, chair:{w:32,h:28}, freechair:{w:32,h:32},
    photo:{w:68,h:58}, bar:{w:100,h:38},
  };
  const d = defaults[type] || {w:68,h:68};

  if (type === 'chair') {
    // Chair must be linked to a selected table
    const selTable = WED.furniture.find(f => f.id === WED.selectedFurniture && (f.type === 'round' || f.type === 'long'));
    if (!selTable) { showToast('⚠️ Select a table on the canvas first'); return; }
    const prefix = selTable.type === 'round' ? 'RT' : 'LT';
    const tableNum = selTable.label.replace(/\D/g,'');
    const existingOnTable = WED.furniture.filter(f => f.type === 'chair' && f.parentTableId === selTable.id).length;
    const chairLabel = `${prefix}${tableNum}/Chair ${existingOnTable + 1}`;

    // Push chair with a placeholder position — _redistributeChairs will fix it
    WED.furniture.push({
      id:'f'+WED.nextFurnitureId++, type:'chair', x:0, y:0,
      w:d.w, h:d.h, label:chairLabel, rot:false, parentTableId:selTable.id,
    });
    // Redistribute ALL chairs on this table so none overlap
    _redistributeChairs(selTable.id);
    saveState(); drawCanvas(); renderFurniturePalette(); renderCanvasActions();
    showToast('🪑 '+chairLabel+' added!');
    return;
  }

  if (type === 'freechair') {
    // Free-standing VIP chair — no table parent required
    WED.furniture.push({
      id:'f'+WED.nextFurnitureId++, type:'freechair',
      x:20, y:20, w:d.w, h:d.h, label:'Free Chair', rot:false, parentTableId:null,
    });
    saveState(); drawCanvas();
    showToast('⭐ Free Chair added! Drag to position.');
    return;
  }

  const num = WED.furniture.filter(f=>f.type===type).length+1;
  WED.furniture.push({
    id:'f'+WED.nextFurnitureId++, type, x:20, y:20, w:d.w, h:d.h,
    label:['round','long'].includes(type)?`${label} ${num}`:label,
    rot:false,
  });
  saveState(); drawCanvas();
  showToast('✅ '+label+' added!');
}

/* ── TABLE SEAT-COUNT PICKER ─────────────────── */
const _tableSeatsCount = { round: 8, long: 10 };
let   _tableModalType  = 'round';

function openAddTableModal(type) {
  _tableModalType = type;
  _tableSeatsCount[type] = _tableSeatsCount[type] || (type === 'round' ? 8 : 10);
  const old = document.getElementById('add-table-overlay');
  if (old) old.remove();

  const maxSeats  = type === 'round' ? 20 : 40;
  const emoji     = type === 'round' ? '⭕' : '▬';
  const typeName  = type === 'round' ? 'Round Table' : 'Long Table';
  const hint      = type === 'round'
    ? 'Chairs are placed evenly around the table.'
    : 'Chairs split between top and bottom edges.';

  const overlay = document.createElement('div');
  overlay.id = 'add-table-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:920;background:rgba(44,31,14,0.28);display:flex;align-items:flex-end;justify-content:center;';
  overlay.innerHTML = `
    <div style="width:100%;max-width:440px;background:var(--cream);border-radius:22px 22px 0 0;padding:24px 20px 44px;box-shadow:0 -8px 40px rgba(44,31,14,0.18)">
      <div style="text-align:center;margin-bottom:6px;font-size:28px">${emoji}</div>
      <div style="text-align:center;font-size:15px;font-weight:700;color:var(--ink);margin-bottom:3px">${typeName}</div>
      <div style="text-align:center;font-size:11.5px;color:var(--ink-4);margin-bottom:22px">${hint}</div>

      <div style="display:flex;align-items:center;justify-content:center;gap:20px;margin-bottom:8px">
        <button onclick="changeTableSeats(-1,${maxSeats})"
          style="width:44px;height:44px;border-radius:50%;border:2px solid rgba(201,169,110,0.4);background:rgba(245,230,200,0.65);font-size:22px;font-weight:700;color:var(--tan-dark);cursor:pointer;line-height:1;font-family:var(--f)">−</button>
        <div style="text-align:center;min-width:64px">
          <div id="table-seats-display" style="font-size:42px;font-weight:800;font-family:var(--f);font-style:normal;color:var(--ink);line-height:1;letter-spacing:-1px">${_tableSeatsCount[type]}</div>
          <div style="font-size:11px;color:var(--ink-4);margin-top:2px">seats</div>
        </div>
        <button onclick="changeTableSeats(+1,${maxSeats})"
          style="width:44px;height:44px;border-radius:50%;border:2px solid rgba(201,169,110,0.4);background:rgba(245,230,200,0.65);font-size:22px;font-weight:700;color:var(--tan-dark);cursor:pointer;line-height:1;font-family:var(--f)">+</button>
      </div>
      <div style="text-align:center;font-size:10.5px;color:var(--ink-4);margin-bottom:20px">min 2 · max ${maxSeats}</div>

      <div style="display:flex;gap:10px">
        <button onclick="closeAddTableModal()"
          style="flex:1;padding:12px;border-radius:var(--r-md);border:1px solid rgba(201,169,110,0.25);background:rgba(255,253,248,0.8);font-size:13px;font-weight:700;color:var(--ink-3);cursor:pointer;font-family:var(--f)">
          Cancel</button>
        <button onclick="confirmAddTable()"
          style="flex:2;padding:12px;border-radius:var(--r-md);border:none;background:linear-gradient(135deg,var(--tan),var(--tan-dark));font-size:13px;font-weight:700;color:white;cursor:pointer;font-family:var(--f)">
          Add Table →</button>
      </div>
    </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeAddTableModal(); });
  document.body.appendChild(overlay);
}

function changeTableSeats(delta, max) {
  const type = _tableModalType;
  _tableSeatsCount[type] = Math.max(2, Math.min(max, (_tableSeatsCount[type] || 8) + delta));
  const el = document.getElementById('table-seats-display');
  if (el) el.textContent = _tableSeatsCount[type];
}

function closeAddTableModal() {
  const el = document.getElementById('add-table-overlay');
  if (el) el.remove();
  renderFurniturePalette(); // refresh seat-count preview on palette buttons
}

function confirmAddTable() {
  const type  = _tableModalType;
  const seats = _tableSeatsCount[type];
  closeAddTableModal();
  addFurnitureWithSeats(type, seats);
}

/* ── BUILD TABLE + CHAIRS ────────────────────── */
function addFurnitureWithSeats(type, seats) {
  const cW = cvs ? cvs.width  : 380;
  const cH = cvs ? cvs.height : 400;
  seats = Math.max(2, seats);

  if (type === 'round') {
    // ── Size the table so chairs fit without overlapping ──
    const targetCW = 24;               // desired chair width
    const gap      = 3;                // minimum gap between chairs
    // Minimum table diameter so chairs at orbit don't overlap:
    //   orbit circumference = 2π*(tableR + targetCW/2 + 6)  ≥  seats*(targetCW+gap)
    const minOrbitCircumference = seats * (targetCW + gap);
    const minOrbitR = minOrbitCircumference / (2 * Math.PI);
    const tableR    = Math.max(34, Math.ceil(minOrbitR - targetCW / 2 - 6));
    const tableSize = tableR * 2;

    // Chair dimensions (scale down only if truly necessary)
    const orbitR    = tableR + targetCW / 2 + 6;
    const arcPerSeat = (2 * Math.PI * orbitR) / seats;
    const chairW    = Math.min(32, Math.max(12, Math.floor(arcPerSeat - gap)));
    const chairH    = Math.max(12, Math.round(chairW * 0.85));

    // Spawn table near top-centre of canvas
    const tx = Math.max(10, Math.round((cW - tableSize) / 2));
    const ty = Math.max(10, Math.round(cH * 0.15));

    const tableNum = WED.furniture.filter(f => f.type === 'round').length + 1;
    const tableId  = 'f' + WED.nextFurnitureId++;
    WED.furniture.push({ id:tableId, type:'round', x:tx, y:ty, w:tableSize, h:tableSize, label:`Round Table ${tableNum}`, rot:false });

    const tCX = tx + tableSize / 2, tCY = ty + tableSize / 2;
    const finalOrbit = tableR + chairW / 2 + 6;
    for (let i = 0; i < seats; i++) {
      const angle = (i * 2 * Math.PI / seats) - Math.PI / 2;
      WED.furniture.push({
        id: 'f' + WED.nextFurnitureId++, type: 'chair',
        x: Math.max(0, Math.min(cW - chairW, Math.round(tCX + finalOrbit * Math.cos(angle) - chairW / 2))),
        y: Math.max(0, Math.min(cH - chairH, Math.round(tCY + finalOrbit * Math.sin(angle) - chairH / 2))),
        w: chairW, h: chairH, label: `RT${tableNum}/Chair ${i + 1}`, rot: false, parentTableId: tableId,
      });
    }
    saveState(); drawCanvas(); renderFurniturePalette(); renderSeatAssignments();
    showToast(`⭕ Round Table ${tableNum} · ${seats} seats added!`);

  } else if (type === 'long') {
    // ── Size the table so chairs fit side-by-side on each long edge ──
    const seatsTop   = Math.ceil(seats / 2);
    const seatsBot   = Math.floor(seats / 2);
    const targetCW   = 28;
    const gap        = 3;
    const tableW     = Math.max(115, seatsTop * (targetCW + gap));
    const tableH     = 46;
    const chairW     = Math.min(32, Math.max(12, Math.floor((tableW / seatsTop) - gap)));
    const chairH     = 24;

    const tx = Math.max(10, Math.round((cW - tableW) / 2));
    const ty = Math.max(chairH + 10, Math.round(cH * 0.3));

    const tableNum = WED.furniture.filter(f => f.type === 'long').length + 1;
    const tableId  = 'f' + WED.nextFurnitureId++;
    WED.furniture.push({ id:tableId, type:'long', x:tx, y:ty, w:tableW, h:tableH, label:`Long Table ${tableNum}`, rot:false });

    // Top row
    for (let i = 0; i < seatsTop; i++) {
      const slotW = tableW / seatsTop;
      WED.furniture.push({
        id: 'f' + WED.nextFurnitureId++, type: 'chair',
        x: Math.max(0, Math.round(tx + i * slotW + slotW / 2 - chairW / 2)),
        y: Math.max(0, ty - chairH - 4),
        w: chairW, h: chairH, label: `LT${tableNum}/Chair ${i + 1}`, rot: false, parentTableId: tableId,
      });
    }
    // Bottom row
    for (let i = 0; i < seatsBot; i++) {
      const slotW = tableW / seatsBot;
      WED.furniture.push({
        id: 'f' + WED.nextFurnitureId++, type: 'chair',
        x: Math.max(0, Math.round(tx + i * slotW + slotW / 2 - chairW / 2)),
        y: Math.min(cH - chairH, ty + tableH + 4),
        w: chairW, h: chairH, label: `LT${tableNum}/Chair ${seatsTop + i + 1}`, rot: false, parentTableId: tableId,
      });
    }
    saveState(); drawCanvas(); renderFurniturePalette(); renderSeatAssignments();
    showToast(`▬ Long Table ${tableNum} · ${seats} seats added!`);
  }
}

function renderFurniturePalette() {
  // Target: compact mini palette inside canvas float bar
  const el = document.getElementById('canvas-palette-mini');
  if (!el) return;

  const selTable = WED.furniture.find(f => f.id === WED.selectedFurniture && (f.type === 'round' || f.type === 'long'));
  const chairOn  = !!selTable;
  const chairSub = chairOn
    ? (() => { const p = selTable.type==='round'?'RT':'LT'; const n = selTable.label.replace(/\D/g,''); return `→ ${p}${n}`; })()
    : 'select\ntable';

  const roundSeats = _tableSeatsCount.round;
  const longSeats  = _tableSeatsCount.long;

  el.innerHTML =
    `<button class="cfb-pal-btn" onclick="openAddTableModal('round')" title="Round Table · ${roundSeats} seats">
      <span class="cfb-pal-emoji">⭕</span>
      <span class="cfb-pal-label">Round</span>
      <span class="cfb-pal-sub">${roundSeats}s</span>
    </button>`
  + `<button class="cfb-pal-btn" onclick="openAddTableModal('long')" title="Long Table · ${longSeats} seats">
      <span class="cfb-pal-emoji">▬</span>
      <span class="cfb-pal-label">Long</span>
      <span class="cfb-pal-sub">${longSeats}s</span>
    </button>`
  + `<button class="cfb-pal-btn" onclick="addFurniture('stage','Stage')" title="Stage">
      <span class="cfb-pal-emoji">🎭</span>
      <span class="cfb-pal-label">Stage</span>
    </button>`
  + `<button class="cfb-pal-btn" onclick="addFurniture('entrance','Entrance')" title="Entrance">
      <span class="cfb-pal-emoji">🚪</span>
      <span class="cfb-pal-label">Entrance</span>
    </button>`
  + `<button class="cfb-pal-btn" onclick="addFurniture('freechair','Free Chair')" title="Free Chair">
      <span class="cfb-pal-emoji">⭐</span>
      <span class="cfb-pal-label">Free</span>
    </button>`
  + (chairOn
    ? `<button class="cfb-pal-btn cfb-pal-active" onclick="addFurniture('chair','Chair')" title="Add chair to selected table">
        <span class="cfb-pal-emoji">🪑</span>
        <span class="cfb-pal-label">Chair</span>
        <span class="cfb-pal-sub">${chairSub}</span>
      </button>`
    : `<button class="cfb-pal-btn" disabled style="opacity:0.35;cursor:not-allowed;border-style:dashed" title="Select a table first">
        <span class="cfb-pal-emoji">🪑</span>
        <span class="cfb-pal-label">Chair</span>
        <span class="cfb-pal-sub" style="white-space:pre">${chairSub}</span>
      </button>`
  );
}

/* ── SEATING ASSIGNMENTS (grouped by table, collapsible, searchable) ── */
let _seatSearchQ = '';
let _seatCollapsed = new Set();
let _seatSearchTimer = null;

function updateSeatSearch(val) {
  _seatSearchQ = val;
  clearTimeout(_seatSearchTimer);
  _seatSearchTimer = setTimeout(renderSeatAssignments, 150);
}

function toggleSeatTable(id) {
  if (_seatCollapsed.has(id)) _seatCollapsed.delete(id);
  else _seatCollapsed.add(id);
  renderSeatAssignments();
}

function _renderChairRow(c) {
  const guest = WED.guests.find(g => g._chairId === c.id);
  const seat  = c.label.split(' ').pop(); // last word = seat number
  if (guest) {
    return `<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:8px;margin-bottom:4px;background:rgba(90,171,122,0.10);border:1px solid rgba(90,171,122,0.18)">
      <span style="font-size:10.5px;color:var(--ink-4);min-width:22px;flex-shrink:0;font-weight:700">${seat}</span>
      <span style="font-size:12.5px;font-weight:700;color:var(--ink);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${guest.name}</span>
      <button onclick="assignChairGuest('${c.id}',null)" style="padding:2px 8px;border-radius:5px;border:none;background:rgba(224,120,152,0.12);font-size:10.5px;font-weight:700;color:var(--pink-deep);cursor:pointer;flex-shrink:0">✕</button>
    </div>`;
  }
  return `<div onclick="openChairGuestPicker('${c.id}')" style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:8px;margin-bottom:4px;background:rgba(245,230,200,0.35);border:1.5px dashed rgba(201,169,110,0.22);cursor:pointer">
    <span style="font-size:10.5px;color:var(--ink-4);min-width:22px;flex-shrink:0;font-weight:700">${seat}</span>
    <span style="font-size:12px;color:var(--ink-4);flex:1;font-style:italic">Empty</span>
    <span style="font-size:10px;color:var(--tan-dark);font-weight:700;flex-shrink:0">+ Assign</span>
  </div>`;
}

function renderSeatAssignments() {
  const el = document.getElementById('seat-assignments');
  if (!el) return;

  const isChairType = f => f.type === 'chair' || f.type === 'freechair';
  const isTableType = f => f.type === 'round'  || f.type === 'longtable';

  const chairs  = WED.furniture.filter(f => isChairType(f));
  const tables  = WED.furniture.filter(f => isTableType(f));
  const q       = _seatSearchQ.trim().toLowerCase();

  const matchesSearch = (c) => {
    if (!q) return true;
    const g = WED.guests.find(gg => gg._chairId === c.id);
    return c.label.toLowerCase().includes(q) || (g && g.name.toLowerCase().includes(q));
  };

  let html = `
    <div style="font-size:11px;font-weight:700;color:var(--ink-4);text-transform:uppercase;letter-spacing:0.6px;margin-bottom:8px;margin-top:4px">🪑 Seat Assignments</div>
    <div style="position:relative;margin-bottom:12px">
      <input type="text" id="seat-search-inp" value="${q.replace(/"/g,'&quot;')}"
        oninput="updateSeatSearch(this.value)"
        placeholder="Search guest or chair…"
        style="width:100%;padding:8px 10px 8px 30px;border-radius:var(--r-md);border:1px solid rgba(184,145,106,0.25);background:rgba(255,253,248,0.85);font-size:12.5px;font-family:var(--f);color:var(--ink);box-sizing:border-box">
      <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:13px;pointer-events:none;opacity:0.5">🔍</span>
    </div>`;

  let hasContent = false;

  /* ── Per-table groups ── */
  tables.forEach(table => {
    const tableChairs   = chairs.filter(c => c.parentTableId === table.id);
    if (!tableChairs.length) return;

    const matched       = tableChairs.filter(matchesSearch);
    if (q && !matched.length) return;

    const seatedCount   = tableChairs.filter(c => WED.guests.some(g => g._chairId === c.id)).length;
    const isCollapsed   = _seatCollapsed.has(table.id);
    const arrow         = isCollapsed ? '▸' : '▾';

    hasContent = true;
    html += `
      <div style="margin-bottom:7px;border-radius:var(--r-md);overflow:hidden;border:1px solid rgba(184,145,106,0.14)">
        <div onclick="toggleSeatTable('${table.id}')" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:rgba(245,230,200,0.55);cursor:pointer;user-select:none">
          <div style="display:flex;align-items:center;gap:7px">
            <span style="font-size:11px;color:var(--ink-3)">${arrow}</span>
            <span style="font-size:12.5px;font-weight:700;color:var(--ink-2)">${table.label}</span>
          </div>
          <span style="font-size:10.5px;color:var(--ink-4);font-weight:700">${seatedCount}/${tableChairs.length}</span>
        </div>
        ${isCollapsed ? '' : `<div style="padding:6px 8px 8px;background:rgba(255,252,247,0.7)">${(q ? matched : tableChairs).map(_renderChairRow).join('')}</div>`}
      </div>`;
  });

  /* ── Free chairs (no parent table) ── */
  const freeChairs    = chairs.filter(c => !c.parentTableId);
  const matchedFree   = freeChairs.filter(matchesSearch);
  if (!q || matchedFree.length) {
    if (freeChairs.length) {
      hasContent = true;
      const isCollapsed   = _seatCollapsed.has('__free__');
      const seatedFree    = freeChairs.filter(c => WED.guests.some(g => g._chairId === c.id)).length;
      const arrow         = isCollapsed ? '▸' : '▾';
      html += `
        <div style="margin-bottom:7px;border-radius:var(--r-md);overflow:hidden;border:1px solid rgba(184,145,106,0.12)">
          <div onclick="toggleSeatTable('__free__')" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:rgba(245,230,200,0.45);cursor:pointer;user-select:none">
            <div style="display:flex;align-items:center;gap:7px">
              <span style="font-size:11px;color:var(--ink-3)">${arrow}</span>
              <span style="font-size:12.5px;font-weight:700;color:var(--ink-2)">Individual Chairs</span>
            </div>
            <span style="font-size:10.5px;color:var(--ink-4);font-weight:700">${seatedFree}/${freeChairs.length}</span>
          </div>
          ${isCollapsed ? '' : `<div style="padding:6px 8px 8px;background:rgba(255,252,247,0.7)">${(q ? matchedFree : freeChairs).map(_renderChairRow).join('')}</div>`}
        </div>`;
    }
  }

  /* ── Unseated guests ── */
  const unseated  = WED.guests.filter(g => !g._chairId);
  const matchedU  = unseated.filter(g => !q || g.name.toLowerCase().includes(q));
  if (matchedU.length) {
    hasContent = true;
    const isCollapsed = _seatCollapsed.has('__unseated__');
    const arrow = isCollapsed ? '▸' : '▾';
    html += `
      <div style="margin-bottom:7px;border-radius:var(--r-md);overflow:hidden;border:1px solid rgba(184,145,106,0.10)">
        <div onclick="toggleSeatTable('__unseated__')" style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;background:rgba(255,253,248,0.7);cursor:pointer;user-select:none">
          <div style="display:flex;align-items:center;gap:7px">
            <span style="font-size:11px;color:var(--ink-3)">${arrow}</span>
            <span style="font-size:12.5px;font-weight:700;color:var(--ink-3)">👤 Not Seated (${matchedU.length})</span>
          </div>
        </div>
        ${isCollapsed ? '' : `<div style="padding:6px 8px 8px;background:rgba(255,252,247,0.7)">
          ${matchedU.map(g=>`
            <div style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:8px;margin-bottom:4px;background:rgba(255,253,248,0.7);border:1px solid rgba(201,169,110,0.12)">
              <div style="width:7px;height:7px;border-radius:50%;flex-shrink:0;background:${g.rsvp==='attending'?'var(--green-accent)':g.rsvp==='declined'?'var(--pink-accent)':'var(--tan)'}"></div>
              <span style="font-size:12.5px;font-weight:600;color:var(--ink);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${g.name}</span>
              <span style="font-size:10px;color:var(--ink-4)">${g.rsvp}</span>
            </div>`).join('')}
        </div>`}
      </div>`;
  }

  if (!hasContent && !chairs.length) {
    html += '<div style="text-align:center;padding:20px;font-size:12.5px;color:var(--ink-4)">Add 🪑 chairs from the palette, then double-tap a chair to assign a guest.</div>';
  } else if (!hasContent && q) {
    html += `<div style="text-align:center;padding:20px;font-size:12.5px;color:var(--ink-4)">No results for "<strong>${q}</strong>"</div>`;
  }

  el.innerHTML = html;
}

/* ── CANVAS ACTIONS (delete / resize) ────────── */
function renderCanvasActions() {
  const el = document.getElementById('canvas-actions');
  if (!el) return;
  const sel = WED.furniture.find(f => f.id === WED.selectedFurniture);
  if (!sel) { el.innerHTML = ''; return; }

  const isLong      = sel.type === 'long';
  const isChair     = sel.type === 'chair' || sel.type === 'freechair';
  const isRotatable = sel.type === 'long' || sel.type === 'stage' || sel.type === 'entrance';

  const btnBase = 'padding:5px 13px;border-radius:8px;font-size:11.5px;font-weight:700;cursor:pointer;font-family:var(--f)';
  let html = `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;padding:8px 0;border-bottom:1px solid rgba(201,169,110,0.18);margin-bottom:6px">
    <span style="font-size:11.5px;font-weight:700;color:var(--ink-3);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">◇ ${sel.label}</span>
    ${isChair ? `<button onclick="openChairGuestPicker('${sel.id}')" style="${btnBase};border:1px solid rgba(90,171,122,0.3);background:rgba(90,171,122,0.1);color:var(--green-deep)">Assign</button>` : ''}
    ${isRotatable ? `<button onclick="rotateFurniture(WED.furniture.find(f=>f.id==='${sel.id}'))" style="${btnBase};border:1px solid rgba(184,145,106,0.3);background:rgba(242,232,213,0.7);color:var(--gold-dark)">Rotate ↻</button>` : ''}
    <button onclick="deleteSelectedFurniture()" style="${btnBase};border:1px solid rgba(224,120,152,0.3);background:rgba(252,232,238,0.7);color:var(--pink-deep)">Delete</button>
  </div>`;

  if (isLong) {
    html += `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;padding-bottom:6px">
      <span style="font-size:11px;font-weight:700;color:var(--ink-4)">Resize:</span>
      <div style="display:flex;align-items:center;gap:4px">
        <button onclick="resizeLongTable(-12,0)" style="${btnBase};padding:4px 10px;border:1px solid rgba(201,169,110,0.3);background:rgba(245,230,200,0.65);color:var(--tan-dark)">−W</button>
        <span style="font-size:11px;color:var(--ink-3);min-width:34px;text-align:center;font-weight:700">${sel.w}px</span>
        <button onclick="resizeLongTable(12,0)"  style="${btnBase};padding:4px 10px;border:1px solid rgba(201,169,110,0.3);background:rgba(245,230,200,0.65);color:var(--tan-dark)">+W</button>
      </div>
      <div style="display:flex;align-items:center;gap:4px">
        <button onclick="resizeLongTable(0,-8)"  style="${btnBase};padding:4px 10px;border:1px solid rgba(201,169,110,0.3);background:rgba(245,230,200,0.65);color:var(--tan-dark)">−H</button>
        <span style="font-size:11px;color:var(--ink-3);min-width:34px;text-align:center;font-weight:700">${sel.h}px</span>
        <button onclick="resizeLongTable(0,8)"   style="${btnBase};padding:4px 10px;border:1px solid rgba(201,169,110,0.3);background:rgba(245,230,200,0.65);color:var(--tan-dark)">+H</button>
      </div>
    </div>`;
  }

  el.innerHTML = html;
}

function deleteSelectedFurniture() {
  const id = WED.selectedFurniture;
  if (!id) return;
  const f = WED.furniture.find(f => f.id === id);
  if (!f) return;
  // If deleting a table, also delete its linked chairs
  const childChairs = WED.furniture.filter(c => c.parentTableId === id);
  const msg = childChairs.length
    ? `Delete "${f.label}" and its ${childChairs.length} linked chair(s)?`
    : `Delete "${f.label}"?`;
  if (!confirm(msg)) return;
  const toRemove = new Set([id, ...childChairs.map(c => c.id)]);
  // Unseat guests in removed chairs
  WED.guests.forEach(g => { if (toRemove.has(g._chairId)) delete g._chairId; });
  const deletedChairParentId = (f.type === 'chair' && f.parentTableId) ? f.parentTableId : null;
  WED.furniture = WED.furniture.filter(f => !toRemove.has(f.id));
  WED.selectedFurniture = null;
  // If a single chair was deleted, redistribute the remaining chairs on that table
  if (deletedChairParentId) {
    _redistributeChairs(deletedChairParentId);
    // Renumber remaining chairs so labels stay sequential
    const remaining = WED.furniture.filter(c => c.type === 'chair' && c.parentTableId === deletedChairParentId);
    const parent = WED.furniture.find(t => t.id === deletedChairParentId);
    if (parent) {
      const prefix = parent.type === 'round' ? 'RT' : 'LT';
      const tableNum = parent.label.replace(/\D/g, '');
      remaining.forEach((c, i) => { c.label = `${prefix}${tableNum}/Chair ${i + 1}`; });
    }
  }
  saveState();
  drawCanvas();
  renderFurniturePalette();
  renderCanvasActions();
  renderSeatAssignments();
  showToast(`🗑 "${f.label}" deleted${childChairs.length ? ' + ' + childChairs.length + ' chair(s)' : ''}`);
}

function resizeLongTable(dw, dh) {
  const sel = WED.furniture.find(f => f.id === WED.selectedFurniture && f.type === 'long');
  if (!sel) return;
  sel.w = Math.max(40, sel.w + dw);
  sel.h = Math.max(18, sel.h + dh);
  saveState();
  drawCanvas();
  renderCanvasActions(); // refresh the size readout
}

/* ── CHAIR GUEST PICKER ──────────────────────── */
function openChairGuestPicker(chairId) {
  const old = document.getElementById('chair-guest-picker');
  if (old) old.remove();
  const chair = WED.furniture.find(f=>f.id===chairId);
  const currentGuest = WED.guests.find(g=>g._chairId===chairId);
  const seated = new Set(WED.guests.filter(g=>g._chairId&&g._chairId!==chairId).map(g=>g.id));
  const overlay = document.createElement('div');
  overlay.id = 'chair-guest-picker';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:900;background:rgba(44,31,14,0.28);display:flex;align-items:flex-end;justify-content:center;';
  let rows = '';
  if (!WED.guests.length) {
    rows = '<div style="text-align:center;padding:20px;font-size:13px;color:var(--ink-4)">No guests yet — add guests in the Guests tab first.</div>';
  } else {
    WED.guests.forEach(g => {
      const isSeated  = seated.has(g.id);
      const isCurrent = currentGuest && g.id===currentGuest.id;
      rows += '<div onclick="assignChairGuest(\''+chairId+'\','+g.id+')" style="'
        + 'display:flex;align-items:center;gap:10px;padding:11px 14px;border-radius:var(--r-md);margin-bottom:6px;cursor:pointer;'
        + 'background:'+(isCurrent?'rgba(90,171,122,0.22)':isSeated?'rgba(44,31,14,0.05)':'rgba(255,253,248,0.85)')+';'
        + 'border:1.5px solid '+(isCurrent?'rgba(58,122,84,0.4)':'rgba(255,255,255,0.5)')+';'
        + 'opacity:'+(isSeated&&!isCurrent?0.45:1)+';pointer-events:'+(isSeated&&!isCurrent?'none':'auto')+'">'
        + '<div style="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:'+(g.rsvp==='attending'?'var(--green-accent)':g.rsvp==='declined'?'var(--pink-accent)':'var(--tan)')+'"></div>'
        + '<span style="font-size:13px;font-weight:600;color:var(--ink);flex:1">'+g.name+'</span>'
        + (isCurrent?'<span style="font-size:11px;color:var(--green-deep);font-weight:700">✓ Seated</span>':'')
        + (isSeated&&!isCurrent?'<span style="font-size:10px;color:var(--ink-4)">Elsewhere</span>':'')
        + '</div>';
    });
  }
  const removeBtn = currentGuest
    ? '<button onclick="assignChairGuest(\''+chairId+'\',null)" style="width:100%;padding:9px;border-radius:var(--r-md);background:rgba(224,120,152,0.12);border:1px solid rgba(224,120,152,0.25);font-size:12.5px;font-weight:700;color:var(--pink-deep);cursor:pointer;margin-bottom:10px;font-family:var(--f)">🗑 Remove '+currentGuest.name.split(' ')[0]+'</button>'
    : '';
  overlay.innerHTML = '<div style="width:100%;max-width:440px;background:var(--cream);border-radius:22px 22px 0 0;padding:20px 16px 32px;max-height:70vh;overflow-y:auto;box-shadow:0 -8px 40px rgba(44,31,14,0.18);">'
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">'
    + '<div style="font-size:14px;font-weight:700;color:var(--ink)">🪑 Assign Guest — '+(chair?chair.label:'Chair')+'</div>'
    + '<button onclick="closeChairPicker()" style="width:28px;height:28px;border-radius:50%;border:none;background:rgba(44,31,14,0.08);font-size:16px;cursor:pointer;color:var(--ink-3)">×</button>'
    + '</div>'
    + removeBtn
    + '<div style="font-size:11px;font-weight:700;color:var(--ink-4);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">All Guests</div>'
    + rows + '</div>';
  overlay.addEventListener('click', e => { if (e.target===overlay) closeChairPicker(); });
  document.body.appendChild(overlay);
}

function closeChairPicker() {
  const el = document.getElementById('chair-guest-picker');
  if (el) el.remove();
}

function assignChairGuest(chairId, guestId) {
  WED.guests.forEach(g => { if (g._chairId===chairId) delete g._chairId; });
  if (guestId !== null) {
    const g = WED.guests.find(g=>g.id===guestId);
    if (g) g._chairId = chairId;
  }
  saveState();
  closeChairPicker();
  drawCanvas();
  renderSeatAssignments();
  showToast(guestId ? '🪑 Guest seated!' : '🗑 Seat cleared');
}

/* ── MOBILE SCREEN-SIZE HINT ─────────────────── */
function _showMobileHint() {
  if (window.innerWidth >= 768) return;               // only on phones
  if (sessionStorage.getItem('dtti_mhint')) return;   // only once per session
  sessionStorage.setItem('dtti_mhint', '1');

  const el = document.createElement('div');
  el.style.cssText = [
    'position:fixed;bottom:0;left:0;right:0;z-index:9999',
    'background:rgba(250,246,238,0.98)',
    'border-radius:20px 20px 0 0',
    'padding:18px 22px 36px',
    'border-top:1.5px solid rgba(184,145,106,0.25)',
    'box-shadow:0 -6px 32px rgba(44,24,16,0.14)',
    'transform:translateY(100%)',
    'transition:transform 0.42s cubic-bezier(0.34,1.4,0.64,1)',
    'font-family:var(--f)'
  ].join(';');

  el.innerHTML = `
    <div style="width:38px;height:4px;border-radius:2px;background:rgba(44,24,16,0.12);margin:0 auto 20px"></div>
    <div style="font-size:28px;text-align:center;margin-bottom:10px">💻</div>
    <div style="font-size:17px;font-weight:800;color:var(--ink);text-align:center;margin-bottom:8px;letter-spacing:-0.3px">Better on a bigger screen</div>
    <div style="font-size:13.5px;color:var(--ink-3);text-align:center;line-height:1.7;margin-bottom:22px">
      We designed this for tablets and laptops — but don't worry, everything still works on your phone!
      Just know it'll look and feel even better when you have more room. 🌸
    </div>
    <button onclick="this.parentElement.style.transform='translateY(110%)';setTimeout(()=>this.parentElement.remove(),350)"
      style="width:100%;padding:14px;border-radius:14px;border:none;background:var(--gold);color:var(--ivory);font-size:14px;font-weight:700;cursor:pointer;font-family:var(--f);letter-spacing:0.2px">
      Got it — let's plan! 💍
    </button>`;

  document.body.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => { el.style.transform = 'translateY(0)'; }));
}

/* ── LANDING PAGE ────────────────────────────── */
function _initDraggableFab() {
  const fab = document.getElementById('quick-dials-fab');
  if (!fab) return;
  fab.style.display = 'flex'; // Make visible inside the app

  // Restore saved position
  try {
    const saved = JSON.parse(localStorage.getItem('_fab_pos') || 'null');
    if (saved && saved.bottom != null && saved.right != null) {
      fab.style.bottom = Math.min(saved.bottom, window.innerHeight - 62) + 'px';
      fab.style.right  = Math.min(saved.right,  window.innerWidth  - 62) + 'px';
      fab.style.left   = 'auto';
      fab.style.top    = 'auto';
    }
  } catch(e) {}

  let _startX = 0, _startY = 0, _startB = 0, _startR = 0;
  let _fabDragging = false, _fabMoved = false;

  const fabStart = e => {
    const t = e.touches ? e.touches[0] : e;
    _fabDragging = true; _fabMoved = false;
    _startX = t.clientX; _startY = t.clientY;
    const rect = fab.getBoundingClientRect();
    _startB = window.innerHeight - rect.bottom;
    _startR = window.innerWidth  - rect.right;
    fab.style.transition = 'none';
    fab.style.cursor = 'grabbing';
    e.preventDefault();
  };
  const fabMove = e => {
    if (!_fabDragging) return;
    const t = e.touches ? e.touches[0] : e;
    const dx = t.clientX - _startX, dy = t.clientY - _startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) _fabMoved = true;
    if (!_fabMoved) return;
    fab.style.bottom = Math.max(8, Math.min(window.innerHeight - 62, _startB - dy)) + 'px';
    fab.style.right  = Math.max(8, Math.min(window.innerWidth  - 62, _startR - dx)) + 'px';
    fab.style.left   = 'auto'; fab.style.top = 'auto';
    e.preventDefault();
  };
  const fabEnd = e => {
    if (!_fabDragging) return;
    _fabDragging = false;
    fab.style.cursor = 'grab';
    fab.style.transition = 'transform 0.15s';
    if (_fabMoved) {
      try { localStorage.setItem('_fab_pos', JSON.stringify({ bottom: parseInt(fab.style.bottom), right: parseInt(fab.style.right) })); } catch(e) {}
    }
  };

  fab.addEventListener('touchstart', fabStart, { passive: false });
  fab.addEventListener('mousedown',  fabStart);
  document.addEventListener('touchmove', fabMove, { passive: false });
  document.addEventListener('mousemove',  fabMove);
  document.addEventListener('touchend',  fabEnd);
  document.addEventListener('mouseup',   fabEnd);

  // Suppress click after a drag
  fab.addEventListener('click', e => { if (_fabMoved) { _fabMoved = false; e.stopImmediatePropagation(); } }, true);
}

function enterApp(instant) {
  if (!window.CURRENT_USER) {
    window._pendingEnter = true;
    if (typeof openAuthModal === 'function') openAuthModal();
    return;
  }
  window._pendingEnter = false;
  sessionStorage.setItem('dtti_entered', '1');
  const el = document.getElementById('dtti-landing');
  if (!el) return;
  if (instant) {
    el.style.display = 'none';
    _initDraggableFab();
    return;
  }
  el.style.transition = 'opacity 0.55s ease, visibility 0.55s ease';
  el.style.opacity    = '0';
  el.style.visibility = 'hidden';
  el.addEventListener('transitionend', () => {
    el.style.display = 'none';
    // After landing page fades, nudge mobile users toward a bigger screen
    setTimeout(_showMobileHint, 600);
    _initDraggableFab();
  }, { once: true });
}

/* ── INIT ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  // Wire amount input formatting
  document.addEventListener('input', function(ev) {
    if (ev.target && ev.target.classList.contains('peso-input')) {
      ev.target.value = ev.target.value.replace(/[^0-9.]/g,'').replace(/^(\d*\.?\d*).*$/,'$1');
      const rawBefore = (ev.target.value||'').replace(/,/g,'');
      const parts = rawBefore.split('.');
      const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,',');
      ev.target.value = parts.length > 1 ? intPart+'.'+parts.slice(1).join('') : intPart;
    }
  });
  // Start on overview
  wedTab('overview');
  // Landing page is always the home — always show on fresh page load
  // enterApp() is called by the user clicking a CTA on the landing page
});

/* ═══════════════════════════════════════════════
   ENTOURAGE
═══════════════════════════════════════════════ */
const ENTOURAGE_ROLES = [
  { role:'Principal Sponsors (Ninong)', emoji:'💍', color:'glass-cream' },
  { role:'Principal Sponsors (Ninang)', emoji:'💍', color:'glass-cream' },
  { role:'Best Man',                    emoji:'🤵', color:'glass-green' },
  { role:'Maid of Honor',               emoji:'👰', color:'glass-pink'  },
  { role:'Groomsmen',                   emoji:'🤵', color:'glass-green' },
  { role:'Bridesmaids',                 emoji:'💐', color:'glass-pink'  },
  { role:'Flower Girls',                emoji:'🌸', color:'glass-pink'  },
  { role:'Ring Bearer',                 emoji:'💍', color:'glass-cream' },
  { role:'Bible Bearer',                emoji:'📖', color:'glass-cream' },
  { role:'Cord Sponsors',               emoji:'🪢', color:'glass-cream' },
  { role:'Veil Sponsors',               emoji:'🤍', color:'glass-cream' },
  { role:'Coin Sponsors',               emoji:'🪙', color:'glass-cream' },
  { role:'Candle Sponsors',             emoji:'🕯️', color:'glass-cream' },
  { role:'Parents of the Groom',        emoji:'👨‍👩‍👦', color:'glass-green' },
  { role:'Parents of the Bride',        emoji:'👨‍👩‍👦', color:'glass-pink'  },
  { role:'Other',                       emoji:'🎀', color:'glass-cream' },
];

function renderEntourage() {
  const el = document.getElementById('wed-entourage-content');
  if (!el) return;

  const total = WED.entourage.length;
  const byRole = {};
  WED.entourage.forEach(m => { (byRole[m.role] = byRole[m.role] || []).push(m); });

  const orderedRoles = ENTOURAGE_ROLES.filter(r => byRole[r.role]);
  const usedRoleNames = new Set(orderedRoles.map(r => r.role));
  const customRoles = Object.keys(byRole).filter(r => !usedRoleNames.has(r))
    .map(r => ({ role: r, emoji:'🎀', color:'glass-cream' }));
  const allRoles = [...orderedRoles, ...customRoles];

  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div>
        <span class="sec-title" style="margin-bottom:0">Entourage</span>
        <div style="font-size:11px;color:var(--ink-4);margin-top:2px">${total} member${total!==1?'s':''}</div>
      </div>
      <div style="display:flex;gap:6px">
        <button onclick="exportEntourage()" style="padding:7px 12px;border-radius:var(--r-md);border:1px solid rgba(201,169,110,0.28);background:rgba(245,230,200,0.65);font-size:11.5px;font-weight:700;color:var(--tan-dark);cursor:pointer">🖨 Print</button>
        <button onclick="openEntourageMemberModal()" class="icon-btn">+ Add</button>
      </div>
    </div>

    ${!total ? `<div class="empty-state">
      <div class="empty-emoji">💍</div>
      <div class="empty-title">No entourage yet</div>
      <div class="empty-sub">Add your ninong, ninang, best man,<br>bridesmaids, and more.</div>
      <button onclick="openEntourageMemberModal()" class="cta-btn pink" style="max-width:220px;margin:0 auto">+ Add First Member</button>
    </div>` : allRoles.map(({ role, emoji, color }) => {
      const members = byRole[role] || [];
      return `
      <div class="${color}" style="border-radius:var(--r-md);margin-bottom:10px;overflow:hidden">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px 8px">
          <div style="display:flex;align-items:center;gap:7px">
            <span style="font-size:16px">${emoji}</span>
            <span style="font-size:13px;font-weight:700;color:var(--ink-2)">${role}</span>
            <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:10px;background:rgba(44,31,14,0.07);color:var(--ink-4)">${members.length}</span>
          </div>
          <button onclick="openEntourageMemberModal('${role.replace(/'/g,"\\'")}')" style="padding:4px 10px;border-radius:8px;border:1px solid rgba(184,145,106,0.25);background:rgba(255,252,247,0.8);font-size:10.5px;font-weight:700;color:var(--gold-dark);cursor:pointer">+ Add</button>
        </div>
        <div style="padding:0 10px 10px;display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:5px">
          ${members.map(m => {
            const initials = m.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
            const displayName = m.name.length > 18 ? m.name.substring(0,17) + '…' : m.name;
            return `
            <div style="display:flex;align-items:center;gap:6px;padding:7px 8px;border-radius:var(--r-sm);background:rgba(255,252,247,0.75);border:1px solid rgba(255,255,255,0.6);min-width:0" title="${m.name}">
              <div style="width:26px;height:26px;border-radius:7px;background:rgba(184,145,106,0.12);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:var(--ink-3);flex-shrink:0">${initials}</div>
              <div style="flex:1;min-width:0">
                <div style="font-size:11.5px;font-weight:700;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${displayName}</div>
                ${m.note ? `<div style="font-size:9.5px;color:var(--ink-4);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-style:italic">${m.note}</div>` : ''}
              </div>
              <button onclick="removeEntourageMember(${m.id})" style="width:22px;height:22px;border-radius:6px;border:none;background:rgba(224,120,152,0.12);font-size:11px;cursor:pointer;color:var(--pink-deep);flex-shrink:0;padding:0">×</button>
            </div>`;
          }).join('')}
        </div>
      </div>`;
    }).join('')}`;
}

let _entouragePickedGuest = null;
let _entouragePresetRole  = '';

function openEntourageMemberModal(presetRole) {
  _entouragePickedGuest = null;
  _entouragePresetRole  = presetRole || '';
  const content = document.getElementById('entourage-picker-content');
  if (content) content.innerHTML = _buildEntouragePickerUI('');
  openModal('wed-entourage-member-modal');
  setTimeout(() => document.getElementById('entourage-guest-search')?.focus(), 220);
}

function _buildEntouragePickerUI(searchVal) {
  const alreadyIn = new Set(WED.entourage.map(m => m.guestId).filter(Boolean));
  const q = searchVal.toLowerCase();
  const filtered = WED.guests.filter(g => g.name.toLowerCase().includes(q));
  const pickedId  = _entouragePickedGuest?.id;

  const rows = filtered.length
    ? filtered.map(g => {
        const inE    = alreadyIn.has(g.id);
        const picked = pickedId === g.id;
        const dot    = g.rsvp==='attending'?'var(--green-accent)':g.rsvp==='declined'?'var(--rose)':'var(--tan)';
        return `<div onclick="pickEntourageGuest(${g.id})" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--r-md);cursor:pointer;margin-bottom:5px;background:${picked?'rgba(90,171,122,0.18)':'rgba(255,252,247,0.85)'};border:1.5px solid ${picked?'rgba(58,122,84,0.38)':'rgba(255,255,255,0.5)'}">
          <div style="width:34px;height:34px;border-radius:9px;background:rgba(184,145,106,0.12);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--ink-3);flex-shrink:0">${g.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:700;color:var(--ink)">${g.name}</div>
            <div style="display:flex;align-items:center;gap:5px;margin-top:2px"><div style="width:6px;height:6px;border-radius:50%;background:${dot};flex-shrink:0"></div><span style="font-size:10.5px;color:var(--ink-4)">${g.rsvp==='attending'?'Attending':g.rsvp==='declined'?'Declined':'Pending'}${inE?' · already in entourage':''}</span></div>
          </div>
          ${picked?'<span style="font-size:16px;color:var(--green-deep)">✓</span>':''}
        </div>`;
      }).join('')
    : `<div style="text-align:center;padding:20px;font-size:13px;color:var(--ink-4)">${WED.guests.length?'No guests match.':'Add guests in the Guests tab first.'}</div>`;

  const roleOpts = ENTOURAGE_ROLES.map(r => `<option value="${r.role}" ${r.role===_entouragePresetRole?'selected':''}>${r.emoji} ${r.role}</option>`).join('');

  const roleSection = _entouragePickedGuest ? `
    <div style="margin-top:10px;padding:12px;border-radius:var(--r-md);background:rgba(245,230,200,0.42);border:1px solid rgba(201,169,110,0.2)">
      <div style="font-size:11.5px;font-weight:700;color:var(--ink-3);margin-bottom:8px">Role for <em>${_entouragePickedGuest.name}</em>:</div>
      <select id="entourage-member-role" class="glass-input" style="margin-bottom:8px">${roleOpts}</select>
      <input type="text" id="entourage-member-note" class="glass-input" placeholder="Note — e.g. travelling from Cebu…" style="margin-bottom:10px">
      <button onclick="submitEntourageMember()" class="cta-btn pink" style="margin:0">Add to Entourage →</button>
    </div>` : '';

  return `
    <input type="search" id="entourage-guest-search" class="glass-input" placeholder="Search guests…" oninput="refreshEntouragePicker(this.value)" style="margin-bottom:8px">
    <div style="max-height:220px;overflow-y:auto;-webkit-overflow-scrolling:touch">${rows}</div>
    ${roleSection}`;
}

function pickEntourageGuest(guestId) {
  _entouragePickedGuest = WED.guests.find(g => g.id === guestId) || null;
  const search  = document.getElementById('entourage-guest-search');
  const content = document.getElementById('entourage-picker-content');
  if (content) content.innerHTML = _buildEntouragePickerUI(search?.value || '');
}

function refreshEntouragePicker(val) {
  const content = document.getElementById('entourage-picker-content');
  if (content) content.innerHTML = _buildEntouragePickerUI(val);
}

function submitEntourageMember() {
  if (!_entouragePickedGuest) { showToast('⚠️ Select a guest first'); return; }
  const role = document.getElementById('entourage-member-role')?.value || 'Other';
  const note = (document.getElementById('entourage-member-note')?.value || '').trim();
  WED.entourage.push({ id: WED._nextEntourageId++, guestId: _entouragePickedGuest.id, name: _entouragePickedGuest.name, role, note });
  _entouragePickedGuest = null;
  saveState();
  closeModal('wed-entourage-member-modal');
  renderEntourage();
  showToast('🎉 Added to entourage!');
}

function removeEntourageMember(id) {
  const m = WED.entourage.find(m => m.id === id);
  if (!m || !confirm('Remove ' + m.name + '?')) return;
  WED.entourage = WED.entourage.filter(m => m.id !== id);
  saveState();
  renderEntourage();
  showToast('🗑 Removed from entourage');
}

function exportEntourage() {
  const byRole = {};
  WED.entourage.forEach(m => { (byRole[m.role] = byRole[m.role] || []).push(m); });
  const rows = ENTOURAGE_ROLES
    .filter(r => byRole[r.role])
    .concat(Object.keys(byRole).filter(r => !ENTOURAGE_ROLES.find(x=>x.role===r)).map(r=>({role:r,emoji:'🎀'})))
    .map(({ role, emoji }) => {
      const members = (byRole[role] || []).map(m => `<tr><td style="padding:6px 10px;font-size:13px;color:#2c1810;border-bottom:1px solid #f0e8d8">${m.name}</td><td style="padding:6px 10px;font-size:11px;color:#8c6848;border-bottom:1px solid #f0e8d8;font-style:italic">${m.note||''}</td></tr>`).join('');
      return `<tr style="background:#faf0e0"><td colspan="2" style="padding:8px 10px;font-size:12px;font-weight:700;color:#5c3a24;letter-spacing:0.3px">${emoji} ${role} (${(byRole[role]||[]).length})</td></tr>${members}`;
    }).join('');
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><title>Entourage — ${WED.couple.p1 || ''} &amp; ${WED.couple.p2 || ''}</title><style>body{font-family:Georgia,serif;background:#fdfaf4;color:#2c1810;padding:32px;max-width:680px;margin:0 auto}h1{font-size:28px;text-align:center;margin-bottom:4px}p{text-align:center;color:#8c6848;margin-bottom:24px}table{width:100%;border-collapse:collapse;border-radius:10px;overflow:hidden;border:1px solid #e8d8c0}@media print{button{display:none}}</style></head><body><h1>${WED.couple.p1||'—'} &amp; ${WED.couple.p2||'—'}</h1><p>Wedding Entourage${WED.date?' · '+new Date(WED.date).toLocaleDateString('en-PH',{month:'long',day:'numeric',year:'numeric'}):''}</p><table>${rows}</table><div style="text-align:center;margin-top:24px"><button onclick="window.print()" style="padding:10px 24px;background:#8c6640;color:#fff;border:none;border-radius:20px;font-size:14px;cursor:pointer">🖨 Print</button></div></body></html>`);
  win.document.close();
}

/* ═══════════════════════════════════════════════
   NOTES / MOOD BOARD  &  GALLERY
═══════════════════════════════════════════════ */
const NOTE_SECTIONS = [
  { key:'general',  label:'General Notes',    emoji:'📝', placeholder:'Ideas, reminders, anything you don\'t want to forget…' },
  { key:'budget',   label:'Budget Notes',     emoji:'💰', placeholder:'Payment schedules, discount codes, balance reminders…' },
  { key:'venue',    label:'Venue & Logistics',emoji:'📍', placeholder:'Parking info, load-in times, venue rules, transport…' },
  { key:'vendors',  label:'Vendor Notes',     emoji:'🤝', placeholder:'Contact notes, special requests, follow-ups needed…' },
  { key:'themes',   label:'Theme & Mood',     emoji:'🌸', placeholder:'Color palette, inspiration, décor ideas, mood board links…' },
];

function compressImage(file, maxDim = 1200, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = e => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let w = img.width, h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w >= h) { h = Math.round(h * maxDim / w); w = maxDim; }
          else        { w = Math.round(w * maxDim / h); h = maxDim; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function _allNoteSections() {
  return [...NOTE_SECTIONS, ...(WED.noteCategories || [])];
}

let _activeNoteKey = null; // null = show card grid; 'key' = show that section's editor

function _openNoteSection(key) { _activeNoteKey = key; renderNotes(); }
function _closeNoteSection()   { _activeNoteKey = null; renderNotes(); }

function renderNotes() {
  const el = document.getElementById('wed-notes-content');
  if (!el) return;
  const sections = _allNoteSections();

  /* ── Single section editor view ── */
  if (_activeNoteKey) {
    const s = sections.find(sec => sec.key === _activeNoteKey);
    if (!s) { _activeNoteKey = null; renderNotes(); return; }

    const sectionPhotos = (WED.notePhotos || []).filter(p => p.sectionKey === s.key);
    const photoArea = sectionPhotos.length
      ? `<div style="display:flex;flex-wrap:wrap;gap:6px;padding:0 0 12px">
          ${sectionPhotos.map(p => `
            <div onclick="openPhotoTagEditor(${p.id})" style="width:54px;height:54px;border-radius:var(--r-sm);overflow:hidden;cursor:pointer;position:relative;flex-shrink:0;border:1.5px solid rgba(184,145,106,0.2)">
              <img src="${p.dataUrl}" style="width:100%;height:100%;object-fit:cover;display:block" alt="">
              ${p.tags && p.tags.length ? `<div style="position:absolute;bottom:0;left:0;right:0;background:rgba(44,24,16,0.55);font-size:8px;color:#fff;padding:2px 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.tags.join(' ')}</div>` : ''}
            </div>`).join('')}
          <label style="width:54px;height:54px;border-radius:var(--r-sm);border:1.5px dashed rgba(184,145,106,0.4);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;background:rgba(245,235,215,0.4)">
            <span style="font-size:22px;color:var(--gold-dark);line-height:1">+</span>
            <input type="file" accept="image/*" style="display:none" onchange="addNotePhoto(event,'${s.key}')">
          </label>
        </div>`
      : `<label style="display:inline-flex;align-items:center;gap:5px;cursor:pointer;font-size:11.5px;color:var(--ink-4);border:1.5px dashed rgba(184,145,106,0.4);border-radius:var(--r-sm);padding:5px 10px;background:rgba(245,235,215,0.35);margin-bottom:12px">
          📷 Add photo
          <input type="file" accept="image/*" style="display:none" onchange="addNotePhoto(event,'${s.key}')">
        </label>`;

    const isCustom = s.key.startsWith('custom_');
    el.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <button onclick="_closeNoteSection()" style="padding:7px 12px;border-radius:var(--r-md);border:1px solid rgba(201,169,110,0.28);background:rgba(245,230,200,0.55);font-size:12px;font-weight:700;color:var(--tan-dark);cursor:pointer">← Back</button>
        <div style="display:flex;align-items:center;gap:7px;flex:1;min-width:0">
          <span style="font-size:20px">${s.emoji}</span>
          <span style="font-size:15px;font-weight:700;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.label}</span>
        </div>
        <button onclick="exportNotes()" style="padding:7px 12px;border-radius:var(--r-md);border:1px solid rgba(201,169,110,0.28);background:rgba(245,230,200,0.65);font-size:11.5px;font-weight:700;color:var(--tan-dark);cursor:pointer;flex-shrink:0">🖨 Print</button>
      </div>
      <div class="glass" style="border-radius:var(--r-md);padding:14px;margin-bottom:12px">
        <textarea
          style="width:100%;border:none;background:transparent;font-size:13px;color:var(--ink);line-height:1.7;resize:vertical;min-height:160px;font-family:var(--f);outline:none"
          placeholder="${s.placeholder || 'Write your notes here…'}"
          oninput="saveNoteField('${s.key}',this.value)"
          autofocus
        >${WED.notes[s.key] || ''}</textarea>
      </div>
      ${photoArea}
      ${isCustom ? `<div style="text-align:center;margin-top:8px"><button onclick="deleteNoteSection('${s.key}')" style="padding:7px 14px;border-radius:var(--r-md);border:none;background:none;font-size:12px;color:var(--pink-deep);cursor:pointer">🗑 Delete this section</button></div>` : ''}`;
    return;
  }

  /* ── Card grid view ── */
  const totalChars = sections.reduce((a, s) => a + (WED.notes[s.key] || '').length, 0);

  const cards = sections.map(s => {
    const text   = WED.notes[s.key] || '';
    const photos = (WED.notePhotos || []).filter(p => p.sectionKey === s.key);
    const preview = text ? text.substring(0, 60).replace(/\n/g,' ') + (text.length > 60 ? '…' : '') : '';
    const hasContent = text.length > 0 || photos.length > 0;
    return `
    <div onclick="_openNoteSection('${s.key}')" class="glass" style="border-radius:var(--r-md);padding:14px 16px;cursor:pointer;display:flex;flex-direction:column;gap:6px;position:relative;min-height:90px;transition:box-shadow 0.15s" onmouseenter="this.style.boxShadow='0 4px 18px rgba(201,169,110,0.22)'" onmouseleave="this.style.boxShadow=''">
      <div style="display:flex;align-items:center;gap:7px">
        <span style="font-size:20px">${s.emoji}</span>
        <span style="font-size:13px;font-weight:700;color:var(--ink)">${s.label}</span>
        <span style="margin-left:auto;font-size:16px;color:var(--ink-4)">›</span>
      </div>
      ${preview ? `<div style="font-size:11.5px;color:var(--ink-3);line-height:1.5;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${preview}</div>` : `<div style="font-size:11.5px;color:var(--ink-4);font-style:italic">Tap to write…</div>`}
      <div style="display:flex;align-items:center;gap:8px;margin-top:2px">
        ${hasContent ? `<span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:8px;background:rgba(90,171,122,0.12);color:var(--green-deep);border:1px solid rgba(90,171,122,0.2)">● Has notes</span>` : ''}
        ${photos.length ? `<span style="font-size:10px;color:var(--ink-4)">📷 ${photos.length}</span>` : ''}
      </div>
    </div>`;
  }).join('');

  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
      <div>
        <span class="sec-title" style="margin-bottom:0">Notes &amp; Mood Board</span>
        <div style="font-size:11px;color:var(--ink-4);margin-top:2px">${totalChars ? totalChars.toLocaleString() + ' characters saved' : 'Tap a section to start writing'}</div>
      </div>
      <button onclick="exportNotes()" style="padding:7px 12px;border-radius:var(--r-md);border:1px solid rgba(201,169,110,0.28);background:rgba(245,230,200,0.65);font-size:11.5px;font-weight:700;color:var(--tan-dark);cursor:pointer">🖨 Print</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
      ${cards}
    </div>
    <div style="text-align:center;padding:4px 0 16px">
      <button onclick="openModal('add-note-category-modal')" style="padding:8px 18px;border-radius:var(--r-md);border:1.5px dashed rgba(184,145,106,0.45);background:rgba(245,235,215,0.4);font-size:12px;font-weight:700;color:var(--tan-dark);cursor:pointer">+ Add Note Section</button>
    </div>`;
}

function saveNoteField(key, value) {
  WED.notes[key] = value;
  saveState();
}

function exportNotes() {
  const allSections = _allNoteSections();
  const sections = allSections
    .filter(s => (WED.notes[s.key] || '').trim())
    .map(s => `<h3 style="margin:0 0 8px;color:#5c3a24;font-size:15px">${s.emoji} ${s.label}</h3><div style="white-space:pre-wrap;font-size:13px;line-height:1.7;color:#2c1810;padding:12px 16px;border-radius:10px;background:#faf0e0;border:1px solid #e8d8c0;margin-bottom:20px">${WED.notes[s.key]}</div>`).join('');
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><title>Notes — ${WED.couple.p1 || ''} &amp; ${WED.couple.p2 || ''}</title><style>body{font-family:Georgia,serif;background:#fdfaf4;color:#2c1810;padding:32px;max-width:680px;margin:0 auto}h1{font-size:26px;text-align:center;margin-bottom:4px}p{text-align:center;color:#8c6848;margin-bottom:28px}@media print{button{display:none}}</style></head><body><h1>${WED.couple.p1 || '—'} &amp; ${WED.couple.p2 || '—'}</h1><p>Wedding Notes${WED.date ? ' · ' + new Date(WED.date).toLocaleDateString('en-PH', {month:'long',day:'numeric',year:'numeric'}) : ''}</p>${sections || '<p style="text-align:center;color:#b89870">No notes saved yet.</p>'}<div style="text-align:center;margin-top:24px"><button onclick="window.print()" style="padding:10px 24px;background:#8c6640;color:#fff;border:none;border-radius:20px;font-size:14px;cursor:pointer">🖨 Print</button></div></body></html>`);
  win.document.close();
}

function submitNoteCategory() {
  const label = (document.getElementById('new-note-cat-label')?.value || '').trim();
  const emoji = (document.getElementById('new-note-cat-emoji')?.value || '').trim() || '📌';
  if (!label) { showToast('⚠️ Enter a section name'); return; }
  const key = 'custom_' + Date.now();
  if (!WED.noteCategories) WED.noteCategories = [];
  WED.noteCategories.push({ key, label, emoji, placeholder: 'Write your notes here…' });
  if (!WED.notes) WED.notes = {};
  WED.notes[key] = '';
  saveState();
  closeModal('add-note-category-modal');
  document.getElementById('new-note-cat-label').value = '';
  document.getElementById('new-note-cat-emoji').value = '';
  renderNotes();
  showToast('✅ Section added!');
}

function deleteNoteSection(key) {
  if (!key.startsWith('custom_')) return;
  if (!confirm('Delete this note section and all its content?')) return;
  WED.noteCategories = (WED.noteCategories || []).filter(c => c.key !== key);
  delete WED.notes[key];
  WED.notePhotos = (WED.notePhotos || []).filter(p => p.sectionKey !== key);
  saveState();
  _activeNoteKey = null;
  renderNotes();
  showToast('🗑 Section deleted');
}

async function addNotePhoto(event, sectionKey) {
  const file = event.target.files?.[0];
  if (!file) return;
  showToast('📷 Compressing…');
  try {
    const dataUrl = await compressImage(file);
    if (!WED.notePhotos) WED.notePhotos = [];
    WED.notePhotos.push({ id: WED._nextPhotoId++, sectionKey, dataUrl, caption: '', tags: [], addedAt: new Date().toISOString() });
    saveState();
    renderNotes();
    if (WED.activeTab === 'gallery') renderGallery();
    showToast('✅ Photo added!');
  } catch (_) {
    showToast('⚠️ Could not read image');
  }
}

let _editingPhotoId   = null;
let _editingPhotoTags = [];

function openPhotoTagEditor(photoId) {
  const photo = (WED.notePhotos || []).find(p => p.id === photoId);
  if (!photo) return;
  _editingPhotoId   = photoId;
  _editingPhotoTags = [...(photo.tags || [])];
  document.getElementById('photo-tag-id').value        = photoId;
  document.getElementById('photo-tag-preview').src     = photo.dataUrl;
  document.getElementById('photo-tag-caption').value   = photo.caption || '';
  document.getElementById('photo-tag-input').value     = '';
  _renderPhotoTagChips();
  openModal('photo-tag-modal');
}

function _renderPhotoTagChips() {
  const el = document.getElementById('photo-tag-chips');
  if (!el) return;
  el.innerHTML = _editingPhotoTags.map((tag, i) =>
    `<span style="display:inline-flex;align-items:center;gap:3px;padding:3px 8px;border-radius:20px;background:rgba(184,145,106,0.2);font-size:11.5px;font-weight:600;color:var(--tan-dark)">
      #${tag}<span onclick="_removePhotoTag(${i})" style="cursor:pointer;color:var(--pink-deep);font-weight:700;font-size:13px;padding-left:2px;line-height:1">×</span>
    </span>`).join('');
}
window._removePhotoTag = function(i) {
  _editingPhotoTags.splice(i, 1);
  _renderPhotoTagChips();
};

function addPhotoTagOnEnter(event) {
  if (event.key !== 'Enter') return;
  event.preventDefault();
  const raw = event.target.value.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_À-ɏ-]/gi, '');
  if (!raw || _editingPhotoTags.includes(raw)) { event.target.value = ''; return; }
  _editingPhotoTags.push(raw);
  event.target.value = '';
  _renderPhotoTagChips();
}

function savePhotoTags() {
  const photo = (WED.notePhotos || []).find(p => p.id === _editingPhotoId);
  if (!photo) { closeModal('photo-tag-modal'); return; }
  photo.caption = (document.getElementById('photo-tag-caption')?.value || '').trim();
  photo.tags    = [..._editingPhotoTags];
  if (!WED.allTags) WED.allTags = [];
  _editingPhotoTags.forEach(t => { if (!WED.allTags.includes(t)) WED.allTags.push(t); });
  saveState();
  closeModal('photo-tag-modal');
  renderNotes();
  if (WED.activeTab === 'gallery') renderGallery();
  showToast('✅ Photo saved!');
}

function deletePhoto() {
  const idx = (WED.notePhotos || []).findIndex(p => p.id === _editingPhotoId);
  if (idx !== -1) WED.notePhotos.splice(idx, 1);
  saveState();
  closeModal('photo-tag-modal');
  renderNotes();
  if (WED.activeTab === 'gallery') renderGallery();
  showToast('🗑 Photo removed');
}

function renderGallery() {
  const el = document.getElementById('wed-gallery-content');
  if (!el) return;
  const photos = WED.notePhotos || [];
  if (!photos.length) {
    el.innerHTML = `
      <div style="text-align:center;padding:52px 24px">
        <div style="font-size:40px;margin-bottom:12px">📷</div>
        <div style="font-size:14px;font-weight:700;color:var(--ink-2);margin-bottom:6px">No photos yet</div>
        <div style="font-size:12px;color:var(--ink-4)">Add photos from the Notes tab, then tag them to group them here.</div>
      </div>`;
    return;
  }

  const tagged   = {};
  const untagged = [];
  photos.forEach(p => {
    if (p.tags && p.tags.length) {
      p.tags.forEach(tag => { (tagged[tag] = tagged[tag] || []).push(p); });
    } else {
      untagged.push(p);
    }
  });

  const renderGroup = (title, gPhotos) => `
    <div style="margin-bottom:22px">
      <div style="font-size:11.5px;font-weight:700;color:var(--ink-3);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid rgba(184,145,106,0.15)">${title} <span style="font-weight:400;color:var(--ink-4)">(${gPhotos.length})</span></div>
      <div class="gallery-grid">
        ${gPhotos.map(p => `
          <div class="gallery-thumb" onclick="openPhotoTagEditor(${p.id})">
            <img src="${p.dataUrl}" alt="${p.caption || ''}">
            ${p.caption ? `<div class="gallery-thumb-overlay">${p.caption}</div>` : ''}
          </div>`).join('')}
      </div>
    </div>`;

  const tagHTML = Object.entries(tagged)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([tag, gp]) => renderGroup('#' + tag, gp)).join('');

  el.innerHTML = `
    <div style="margin-bottom:16px">
      <span class="sec-title" style="margin-bottom:0">Gallery</span>
      <div style="font-size:11px;color:var(--ink-4);margin-top:2px">${photos.length} photo${photos.length !== 1 ? 's' : ''} · tap to edit tags</div>
    </div>
    ${tagHTML}
    ${untagged.length ? renderGroup('Untagged', untagged) : ''}`;
}

/* ═══════════════════════════════════════════════
   EDIT EXPENSE
═══════════════════════════════════════════════ */
function openEditExpense(i) {
  const e = WED.expenses[i];
  if (!e) return;
  document.getElementById('edit-exp-index').value    = i;
  document.getElementById('edit-exp-label').value    = e.label;
  document.getElementById('edit-exp-amount').value   = e.amount.toLocaleString();
  document.getElementById('edit-exp-category').value = e.category;
  openModal('wed-edit-expense-modal');
}

function submitEditExpense() {
  const i      = parseInt(document.getElementById('edit-exp-index')?.value, 10);
  const label  = (document.getElementById('edit-exp-label')?.value || '').trim();
  const amount = parseFloat((document.getElementById('edit-exp-amount')?.value || '').replace(/,/g,'')) || 0;
  const cat    = document.getElementById('edit-exp-category')?.value;
  if (!label || !amount) { showToast('⚠️ Fill in all fields'); return; }
  if (WED.expenses[i]) {
    WED.expenses[i].label    = label;
    WED.expenses[i].amount   = amount;
    WED.expenses[i].category = cat;
  }
  saveState();
  closeModal('wed-edit-expense-modal');
  renderBudget();
  showToast('✅ Expense updated!');
}

/* ═══════════════════════════════════════════════
   EXPORT — Full wedding plan printable page
═══════════════════════════════════════════════ */
function exportWeddingPlan() {
  const attending = WED.guests.filter(g => g.rsvp === 'attending');
  const pending   = WED.guests.filter(g => g.rsvp === 'pending');
  const totalSpent = WED.expenses.reduce((a,e) => a + e.amount, 0);

  const guestRows = WED.guests.map(g =>
    `<tr><td style="padding:5px 8px;border-bottom:1px solid #f0e8d8;font-size:12px">${g.name}</td>
     <td style="padding:5px 8px;border-bottom:1px solid #f0e8d8;font-size:11px;color:${g.rsvp==='attending'?'#3a7a54':g.rsvp==='declined'?'#9c4038':'#8c6640'}">${g.rsvp==='attending'?'✓ Attending':g.rsvp==='declined'?'✗ Declined':'⏳ Pending'}</td>
     <td style="padding:5px 8px;border-bottom:1px solid #f0e8d8;font-size:11px;color:#8c6848">${g.meal||''}</td></tr>`
  ).join('');

  const expRows = WED.expenses.map(e =>
    `<tr><td style="padding:5px 8px;border-bottom:1px solid #f0e8d8;font-size:12px">${e.label}</td>
     <td style="padding:5px 8px;border-bottom:1px solid #f0e8d8;font-size:12px;text-transform:capitalize">${e.category}</td>
     <td style="padding:5px 8px;border-bottom:1px solid #f0e8d8;font-size:12px;text-align:right">₱${e.amount.toLocaleString()}</td>
     <td style="padding:5px 8px;border-bottom:1px solid #f0e8d8;font-size:11px;color:${e.paid?'#3a7a54':'#9c4038'}">${e.paid?'Paid':'Pending'}</td></tr>`
  ).join('');

  const schedRows = [...WED.schedule]
    .sort((a,b) => (a.date+a.time).localeCompare(b.date+b.time))
    .map(s => `<tr><td style="padding:5px 8px;border-bottom:1px solid #f0e8d8;font-size:11px;color:#8c6848;white-space:nowrap">${s.time||''}</td>
     <td style="padding:5px 8px;border-bottom:1px solid #f0e8d8;font-size:12px">${s.event}</td>
     <td style="padding:5px 8px;border-bottom:1px solid #f0e8d8;font-size:11px;color:#8c6848">${s.assignee||''}</td></tr>`).join('');

  const entourageByRole = {};
  WED.entourage.forEach(m => { (entourageByRole[m.role] = entourageByRole[m.role]||[]).push(m.name); });
  const entourageRows = Object.entries(entourageByRole).map(([role, names]) =>
    `<tr><td style="padding:5px 8px;border-bottom:1px solid #f0e8d8;font-size:12px;font-weight:700;color:#5c3a24">${role}</td>
     <td style="padding:5px 8px;border-bottom:1px solid #f0e8d8;font-size:12px">${names.join(', ')}</td></tr>`
  ).join('');

  const dateStr = WED.date ? new Date(WED.date).toLocaleDateString('en-PH',{weekday:'long',year:'numeric',month:'long',day:'numeric'}) : '—';
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><title>Wedding Plan — ${WED.couple.p1||''} &amp; ${WED.couple.p2||''}</title>
  <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Georgia,serif;background:#fdfaf4;color:#2c1810;padding:32px;max-width:800px;margin:0 auto}
  h1{font-size:32px;text-align:center;margin-bottom:6px;letter-spacing:-0.5px}
  .sub{text-align:center;color:#8c6848;margin-bottom:6px;font-size:14px}
  .venue{text-align:center;color:#5c3a24;font-weight:700;margin-bottom:32px;font-size:15px}
  h2{font-size:18px;font-weight:700;color:#5c3a24;margin:28px 0 12px;padding-bottom:6px;border-bottom:2px solid #e8d8c0}
  table{width:100%;border-collapse:collapse;border:1px solid #e8d8c0;border-radius:8px;overflow:hidden;margin-bottom:8px}
  th{padding:8px 10px;background:#f0e8d8;font-size:11px;font-weight:700;text-align:left;color:#5c3a24;text-transform:uppercase;letter-spacing:0.3px}
  .stats{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:8px}
  .stat{flex:1;min-width:120px;padding:14px;border-radius:10px;background:#f0e8d8;border:1px solid #e0d0c0;text-align:center}
  .stat-val{font-size:22px;font-weight:700;color:#2c1810}
  .stat-lbl{font-size:11px;color:#8c6848;margin-top:3px}
  @media print{button{display:none}body{padding:16px}}
  </style></head><body>
  <h1>${WED.couple.p1||'—'} &amp; ${WED.couple.p2||'—'}</h1>
  <div class="sub">${dateStr}</div>
  <div class="venue">${WED.venue||''}</div>
  <div class="stats">
    <div class="stat"><div class="stat-val">${WED.guests.length}</div><div class="stat-lbl">Total Guests</div></div>
    <div class="stat"><div class="stat-val">${attending.length}</div><div class="stat-lbl">Attending</div></div>
    <div class="stat"><div class="stat-val">₱${totalSpent.toLocaleString()}</div><div class="stat-lbl">Total Committed</div></div>
    <div class="stat"><div class="stat-val">${WED.entourage.length}</div><div class="stat-lbl">Entourage</div></div>
  </div>
  <div style="text-align:center;margin:16px 0 28px"><button onclick="window.print()" style="padding:10px 28px;background:#8c6640;color:#fff;border:none;border-radius:20px;font-size:14px;cursor:pointer;font-family:Georgia,serif">🖨 Print / Save as PDF</button></div>
  ${WED.guests.length?`<h2>Guest List (${WED.guests.length})</h2><table><tr><th>Name</th><th>RSVP</th><th>Meal</th></tr>${guestRows}</table>`:''}
  ${WED.expenses.length?`<h2>Budget (₱${WED.budget.toLocaleString()} total · ₱${totalSpent.toLocaleString()} committed)</h2><table><tr><th>Item</th><th>Category</th><th>Amount</th><th>Status</th></tr>${expRows}</table>`:''}
  ${WED.schedule.length?`<h2>Day Program</h2><table><tr><th>Time</th><th>Event</th><th>Assigned To</th></tr>${schedRows}</table>`:''}
  ${WED.entourage.length?`<h2>Entourage (${WED.entourage.length})</h2><table><tr><th>Role</th><th>Members</th></tr>${entourageRows}</table>`:''}
  </body></html>`);
  win.document.close();
}

/* ═══════════════════════════════════════════════
   INVITATION CUSTOMIZATION
═══════════════════════════════════════════════ */
function saveInviteSetting(key, val) {
  if (!WED.inviteSettings) WED.inviteSettings = {};
  WED.inviteSettings[key] = val;
  saveState();
  if (typeof saveInvitePublic === 'function') saveInvitePublic();
}

function uploadInviteHero(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  showToast('📷 Compressing…');
  compressImage(file, 1000, 0.78).then(dataUrl => {
    saveInviteSetting('heroPhoto', dataUrl);
    renderInviteCustomizer();
    showToast('✅ Hero photo saved!');
  }).catch(() => showToast('⚠️ Could not read image'));
}

function renderInviteCustomizer() {
  const el = document.getElementById('invite-customizer-content');
  if (!el) return;
  const s = WED.inviteSettings || {};
  el.innerHTML = `
    <div class="input-group">
      <div class="input-label">Hero Photo (shown at top of RSVP page)</div>
      ${s.heroPhoto ? `<img src="${s.heroPhoto}" style="width:100%;border-radius:var(--r-md);margin-bottom:8px;max-height:180px;object-fit:cover">` : ''}
      <label style="display:block;width:100%;padding:9px;border-radius:var(--r-md);border:1.5px dashed rgba(201,169,110,0.4);background:rgba(245,235,215,0.4);text-align:center;cursor:pointer;font-size:12.5px;color:var(--tan-dark);font-weight:700">
        📷 ${s.heroPhoto ? 'Replace Photo' : 'Upload Photo'}
        <input type="file" accept="image/*" style="display:none" onchange="uploadInviteHero(event)">
      </label>
    </div>
    <div class="input-group">
      <div class="input-label">Dress Code</div>
      <input type="text" class="glass-input" placeholder="e.g. Formal attire, Dusty rose and sage palette…" value="${s.dressCode||''}" oninput="saveInviteSetting('dressCode',this.value)">
    </div>
    <div class="input-group">
      <div class="input-label">Gift Info</div>
      <input type="text" class="glass-input" placeholder="e.g. Monetary gifts preferred, GCash: 09xx…" value="${s.giftsNote||''}" oninput="saveInviteSetting('giftsNote',this.value)">
    </div>
    <div class="input-group">
      <div class="input-label">Special Notes / Reminders</div>
      <textarea class="glass-input" style="min-height:70px;resize:vertical" placeholder="e.g. Parking is at Lot B. Gates open at 2:00 PM…" oninput="saveInviteSetting('specialNote',this.value)">${s.specialNote||''}</textarea>
    </div>
    <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:var(--r-md);background:rgba(245,235,215,0.5);border:1px solid rgba(201,169,110,0.2)">
      <input type="checkbox" id="invite-show-prog" ${s.showProgram?'checked':''} onchange="saveInviteSetting('showProgram',this.checked)" style="width:16px;height:16px;accent-color:var(--tan-dark);cursor:pointer">
      <label for="invite-show-prog" style="font-size:12.5px;font-weight:600;color:var(--ink-2);cursor:pointer">Show wedding program on RSVP page</label>
    </div>`;
}

/* ── GUEST GROUPS MANAGEMENT ─────────────────── */
function renderGuestGroupModal() {
  const el = document.getElementById('guest-group-list');
  if (!el) return;
  el.innerHTML = (WED.guestGroups || []).map((g, i) => `
    <div style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:var(--r-sm);background:rgba(245,235,215,0.5);margin-bottom:5px">
      <span style="flex:1;font-size:13px;font-weight:600;color:var(--ink-2)">${g}</span>
      <span style="font-size:11px;color:var(--ink-4)">${WED.guests.filter(gu=>gu.group===g).length} guests</span>
      <button onclick="removeGuestGroup(${i})" style="border:none;background:none;cursor:pointer;color:var(--pink-deep);font-size:13px;padding:2px">🗑</button>
    </div>`).join('');
}

function addGuestGroup() {
  const inp = document.getElementById('new-group-name');
  const val = (inp?.value || '').trim();
  if (!val) { showToast('⚠️ Enter a group name'); return; }
  if ((WED.guestGroups||[]).includes(val)) { showToast('⚠️ Group already exists'); return; }
  if (!WED.guestGroups) WED.guestGroups = [];
  WED.guestGroups.push(val);
  if (inp) inp.value = '';
  saveState();
  renderGuestGroupModal();
  // Refresh group dropdowns
  _refreshGroupSelects();
  showToast('✅ Group added');
}

function removeGuestGroup(i) {
  const grp = WED.guestGroups[i];
  WED.guestGroups.splice(i, 1);
  WED.guests.forEach(g => { if (g.group === grp) g.group = ''; });
  saveState();
  renderGuestGroupModal();
  _refreshGroupSelects();
  renderGuests();
}

function _refreshGroupSelects() {
  const opts = (WED.guestGroups || []).map(g => `<option value="${g}">${g}</option>`).join('');
  document.querySelectorAll('.guest-group-select').forEach(sel => {
    const cur = sel.value;
    sel.innerHTML = `<option value="">-- No group --</option>${opts}`;
    sel.value = cur;
  });
}

/* ── WINDOW EXPORTS ──────────────────────────── */
window.wedTab               = wedTab;
window.openModal            = openModal;
window.closeModal           = closeModal;
window.closeModalOutside    = closeModalOutside;
window.showToast            = showToast;
window.openSetupModal       = openSetupModal;
window.submitSetup          = submitSetup;
window.renderOverview       = renderOverview;
window.renderBudget         = renderBudget;
window.renderGuests         = renderGuests;
window.renderChecklist      = renderChecklist;
window.renderSchedule       = renderSchedule;
window.addWedExpense        = addWedExpense;
window.toggleExpensePaid    = toggleExpensePaid;
window.deleteExpense        = deleteExpense;
window.selectGuestMeal      = selectGuestMeal;
window.submitAddGuest       = submitAddGuest;
window.updateGuestRSVP      = updateGuestRSVP;
window.removeGuest          = removeGuest;
window.showRSVPCard         = showRSVPCard;
window.shareGuestInvite     = shareGuestInvite;
window.downloadInvitation   = downloadInvitation;
window.uploadInvitation     = uploadInvitation;
window.toggleChecklist      = toggleChecklist;
window.openAddChecklistItem = openAddChecklistItem;
window.openAddChecklistItemToPhase = openAddChecklistItemToPhase;
window.submitChecklistItem  = submitChecklistItem;
window.deleteChecklistItem  = deleteChecklistItem;
window.addWedSched          = addWedSched;
window.toggleSchedule       = toggleSchedule;
window.openEditSched        = openEditSched;
window.submitEditSched      = submitEditSched;
window.deleteSchedItem      = deleteSchedItem;
window.setSchedView         = setSchedView;
window.navSchedDate         = navSchedDate;
window.jumpToDate           = jumpToDate;
window.prefillSchedDate     = prefillSchedDate;
window.initCanvas              = initCanvas;
window.addFurniture            = addFurniture;
window.drawCanvas              = drawCanvas;
window.renderCanvasActions     = renderCanvasActions;
window.deleteSelectedFurniture = deleteSelectedFurniture;
window.resizeLongTable         = resizeLongTable;
window.openChairGuestPicker    = openChairGuestPicker;
window.closeChairPicker        = closeChairPicker;
window.assignChairGuest        = assignChairGuest;
window.openAddTableModal       = openAddTableModal;
window.changeTableSeats        = changeTableSeats;
window.closeAddTableModal      = closeAddTableModal;
window.confirmAddTable         = confirmAddTable;
window.addFurnitureWithSeats   = addFurnitureWithSeats;
window.renderSuppliers         = renderSuppliers;
window.openAddVendorModal      = openAddVendorModal;
window.submitAddVendor         = submitAddVendor;
window.deleteVendor            = deleteVendor;
window.openQuickDials          = openQuickDials;
window.closeQuickDials         = closeQuickDials;
window.enterApp                = enterApp;
window.toggleGuestCard         = toggleGuestCard;
window.rotateFurniture         = rotateFurniture;
window.zoomCanvas              = zoomCanvas;
window.fitCanvas               = fitCanvas;
window.openChecklistNoteEditor  = openChecklistNoteEditor;
window.saveChecklistNote        = saveChecklistNote;
window.togglePhaseCollapse        = togglePhaseCollapse;
window.submitChecklistTimeline    = submitChecklistTimeline;
window.showChecklistTimelineChanger = showChecklistTimelineChanger;
window.toggleSeatTable            = toggleSeatTable;
window.updateSeatSearch           = updateSeatSearch;
window.openPartnerBrowse          = openPartnerBrowse;
window.supplierSearch             = supplierSearch;
window.openPhotoZoom              = openPhotoZoom;
window._goBackFromProfile         = _goBackFromProfile;
window.renderEntourage            = renderEntourage;
window.openEntourageMemberModal   = openEntourageMemberModal;
window.submitEntourageMember      = submitEntourageMember;
window.removeEntourageMember      = removeEntourageMember;
window.exportEntourage            = exportEntourage;
window.renderNotes                = renderNotes;
window._openNoteSection           = _openNoteSection;
window._closeNoteSection          = _closeNoteSection;
window.deleteNoteSection          = deleteNoteSection;
window.saveNoteField              = saveNoteField;
window.exportNotes                = exportNotes;
window.submitNoteCategory         = submitNoteCategory;
window.addNotePhoto               = addNotePhoto;
window.openPhotoTagEditor         = openPhotoTagEditor;
window.addPhotoTagOnEnter         = addPhotoTagOnEnter;
window.savePhotoTags              = savePhotoTags;
window.deletePhoto                = deletePhoto;
window.renderGallery              = renderGallery;
window.pickEntourageGuest         = pickEntourageGuest;
window.refreshEntouragePicker     = refreshEntouragePicker;
window.openEditExpense            = openEditExpense;
window.submitEditExpense          = submitEditExpense;
window.exportWeddingPlan          = exportWeddingPlan;
window.updateGuestSearch          = updateGuestSearch;
window.saveInviteSetting          = saveInviteSetting;
window.uploadInviteHero           = uploadInviteHero;
window.renderInviteCustomizer     = renderInviteCustomizer;
window.renderGuestGroupModal      = renderGuestGroupModal;
window.addGuestGroup              = addGuestGroup;
window.removeGuestGroup           = removeGuestGroup;
window.refreshCard1               = refreshCard1;
window.refreshCard2               = refreshCard2;
window.saveWedHashtag             = saveWedHashtag;
window.saveInviteField            = saveInviteField;
window.uploadCustomCard           = uploadCustomCard;
window.uploadAttirePhoto          = uploadAttirePhoto;
window.clearAttirePhoto           = clearAttirePhoto;
window.toggleInvUploadSpec        = toggleInvUploadSpec;
window.downloadInviteTemplate     = downloadInviteTemplate;
window.selectInviteTheme          = selectInviteTheme;
window.copyGuestLink              = copyGuestLink;
window.setGuestFilter             = setGuestFilter;
window.openEditGuest              = openEditGuest;
window.submitEditGuest            = submitEditGuest;
window.openManageCategories       = openManageCategories;
window.populateExpenseCatSelect   = populateExpenseCatSelect;
window.addExpenseCat              = addExpenseCat;
window.removeExpenseCat           = removeExpenseCat;
window.generateCategoryReceipt    = generateCategoryReceipt;
window.setSupplierView            = setSupplierView;
window.openSupplierProfile        = openSupplierProfile;
window.openLeaveReview            = openLeaveReview;
window.submitReview               = submitReview;
