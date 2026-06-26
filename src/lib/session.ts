import crypto from 'crypto';

const SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

/**
 * Creates a signed session token with expiry timestamp.
 * Token format: timestamp.signature
 */
export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(timestamp)
    .digest('hex');
  return `${timestamp}.${signature}`;
}

/**
 * Validates a session token by verifying its HMAC signature and checking expiry.
 * Tokens expire after 7 days.
 */
export function validateSessionToken(token: string): boolean {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;

  // Verify signature using HMAC-SHA256
  const expectedSignature = crypto
    .createHmac('sha256', SECRET)
    .update(timestamp)
    .digest('hex');

  // Timing-safe comparison to prevent timing attacks
  if (signature.length !== expectedSignature.length) return false;

  try {
    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
    if (!isValid) return false;
  } catch {
    return false;
  }

  // Check expiry (7 days)
  const tokenAge = Date.now() - parseInt(timestamp, 10);
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  if (isNaN(tokenAge) || tokenAge > SEVEN_DAYS || tokenAge < 0) return false;

  return true;
}
