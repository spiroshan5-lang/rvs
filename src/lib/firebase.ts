import crypto from 'crypto';
import https from 'https';

/**
 * Firebase Realtime Database — REST helper (server-side only).
 * The full Firebase SDK is NOT used; all reads/writes go through
 * the RTDB REST API so no client bundle is inflated.
 *
 * Required env vars (.env.local):
 *   NEXT_PUBLIC_FIREBASE_DATABASE_URL  — your RTDB URL
 *   FIREBASE_CLIENT_EMAIL              — Service account email
 *   FIREBASE_PRIVATE_KEY                — Service account private key
 */

let cachedToken: string | null = null;
let tokenExpiry = 0;

async function fetchAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const header = { alg: 'RS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/firebase.database',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600
    };

    // Replace literal '\n' with actual newline characters
    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

    const base64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(`${base64Header}.${base64Payload}`);
    const signature = sign.sign(formattedPrivateKey, 'base64url');

    const jwt = `${base64Header}.${base64Payload}.${signature}`;
    const postData = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`;

    const req = https.request('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const parsed = JSON.parse(data);
          cachedToken = parsed.access_token;
          tokenExpiry = Date.now() + (parsed.expires_in - 60) * 1000; // Expire 1 min early
          resolve(parsed.access_token);
        } else {
          reject(new Error(`Failed to exchange JWT for token: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Builds a fully-authenticated Firebase RTDB REST URL using OAuth2 access token.
 */
export async function getDatabaseUrl(path: string): Promise<string> {
  const base = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    || 'https://rvs-db-default-rtdb.asia-southeast1.firebasedatabase.app';
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (clientEmail && privateKey) {
    if (cachedToken && Date.now() < tokenExpiry) {
      return `${base}${path}?access_token=${cachedToken}`;
    }
    try {
      const token = await fetchAccessToken(clientEmail, privateKey);
      return `${base}${path}?access_token=${token}`;
    } catch (err) {
      console.error('Error fetching database OAuth2 token, falling back without authentication:', err);
    }
  }

  return `${base}${path}`;
}
