/**
 * Firebase Realtime Database — REST helper (server-side only).
 * The full Firebase SDK is NOT used; all reads/writes go through
 * the RTDB REST API so no client bundle is inflated.
 *
 * Required env vars  (.env.local):
 *   NEXT_PUBLIC_FIREBASE_DATABASE_URL  — your RTDB URL
 *   FIREBASE_AUTH_TOKEN                — database secret (server-only, never exposed to browser)
 */

/**
 * Builds a fully-authenticated Firebase RTDB REST URL.
 * Auth token is appended only server-side; the env var is never
 * prefixed with NEXT_PUBLIC so it stays out of the browser bundle.
 */
export function getDatabaseUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    || 'https://riko-backend-default-rtdb.firebaseio.com';
  const token = process.env.FIREBASE_AUTH_TOKEN;
  return `${base}${path}${token ? `?auth=${token}` : ''}`;
}
