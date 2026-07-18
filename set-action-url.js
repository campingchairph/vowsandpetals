const { GoogleAuth } = require('google-auth-library');
const https = require('https');

const auth = new GoogleAuth({
  credentials: require('./serviceAccount.json'),
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

const PROJECT_ID = 'weddingthings';
const ACTION_URL = 'https://weddingthings.web.app/reset.html';

function request(hostname, path, method, token, body) {
  return new Promise((resolve, reject) => {
    const buf = Buffer.from(body);
    const req = https.request({
      hostname, path, method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': buf.length
      }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(buf);
    req.end();
  });
}

async function run() {
  const token = await auth.getAccessToken();
  console.log('✓ Got access token\n');

  // Attempt 1: v1 with notification structure (standard Firebase Auth)
  console.log('--- Attempt 1: v1 notification config ---');
  const body1 = JSON.stringify({
    notification: {
      sendEmail: {
        resetPasswordTemplate: {
          actionCodeSettings: { url: ACTION_URL }
        }
      }
    }
  });
  const r1 = await request(
    'identitytoolkit.googleapis.com',
    `/v1/projects/${PROJECT_ID}/config?updateMask=notification.sendEmail.resetPasswordTemplate.actionCodeSettings.url`,
    'PATCH', token, body1
  );
  console.log('Status:', r1.status);
  console.log('Body:', r1.body.slice(0, 300), '\n');
  if (r1.status === 200) { console.log('✅ Done!'); return; }

  // Attempt 2: v2 with flat resetPasswordTemplate (Identity Platform style)
  console.log('--- Attempt 2: v2 resetPasswordTemplate ---');
  const body2 = JSON.stringify({
    resetPasswordTemplate: { actionUrl: ACTION_URL }
  });
  const r2 = await request(
    'identitytoolkit.googleapis.com',
    `/v2/projects/${PROJECT_ID}/config?updateMask=resetPasswordTemplate.actionUrl`,
    'PATCH', token, body2
  );
  console.log('Status:', r2.status);
  console.log('Body:', r2.body.slice(0, 300), '\n');
  if (r2.status === 200) { console.log('✅ Done!'); return; }

  // Attempt 3: v2 with notification structure
  console.log('--- Attempt 3: v2 notification config ---');
  const body3 = JSON.stringify({
    notification: {
      sendEmail: {
        resetPasswordTemplate: {
          actionCodeSettings: { url: ACTION_URL }
        }
      }
    }
  });
  const r3 = await request(
    'identitytoolkit.googleapis.com',
    `/v2/projects/${PROJECT_ID}/config?updateMask=notification.sendEmail.resetPasswordTemplate.actionCodeSettings.url`,
    'PATCH', token, body3
  );
  console.log('Status:', r3.status);
  console.log('Body:', r3.body.slice(0, 300), '\n');
  if (r3.status === 200) { console.log('✅ Done!'); return; }

  throw new Error('All attempts failed. See output above.');
}

run().then(() => process.exit(0)).catch(e => {
  console.error('❌', e.message);
  process.exit(1);
});
