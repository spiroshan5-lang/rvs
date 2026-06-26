import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };

/**
 * Constructs the Firebase RTDB REST API URL.
 * Automatically appends the Firebase database secret auth query parameter if configured server-side.
 */
export function getDatabaseUrl(path: string): string {
  const dbUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || 'https://riko-backend-default-rtdb.firebaseio.com';
  const token = process.env.FIREBASE_AUTH_TOKEN;
  return `${dbUrl}${path}${token ? `?auth=${token}` : ''}`;
}
