import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Config comes ONLY from env — no keys are hardcoded in source.
// (NEXT_PUBLIC_ Firebase values are safe to ship to the client; security is
//  enforced by Firestore Rules, not by hiding them.)
const env = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// True only when real credentials are present. Hooks/UI use this to decide
// whether to talk to Firebase or show the "configure me" notice.
export const isFirebaseConfigured = Boolean(env.apiKey && env.appId);

// Fallback placeholders keep initializeApp/getAuth from throwing during build
// or before .env.local is filled in. No real network call is ever made while
// unconfigured because isFirebaseConfigured short-circuits the data hooks.
const firebaseConfig = {
  apiKey: env.apiKey || "demo-unconfigured-key",
  authDomain: env.authDomain || "demo.firebaseapp.com",
  projectId: env.projectId || "demo",
  storageBucket: env.storageBucket || "demo.appspot.com",
  messagingSenderId: env.messagingSenderId || "000000000000",
  appId: env.appId || "1:000000000000:web:demo",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
