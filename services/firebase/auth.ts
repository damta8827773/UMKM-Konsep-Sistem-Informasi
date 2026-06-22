import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as fbSignOut,
  type User,
} from "firebase/auth";
import { auth } from "./client";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export function signInWithGoogle() {
  return signInWithPopup(auth, provider);
}

export function signOut() {
  return fbSignOut(auth);
}

export function watchAuth(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}

// Daftar email admin. Tambah/ubah di .env.local → NEXT_PUBLIC_ADMIN_EMAILS
// (pisah dengan koma). Firestore Rules juga harus disamakan (firestore.rules).
const DEFAULT_ADMINS = "damtafaiz@gmail.com,rdwnfakhrii20@gmail.com";
export const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? DEFAULT_ADMINS)
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/** Teks untuk ditampilkan ("a@x.com atau b@y.com"). */
export const ADMIN_EMAILS_LABEL = ADMIN_EMAILS.join(" atau ");

/** Client-side convenience check (UX only — Firestore Rules are authoritative). */
export function isAdminUser(user: User | null): boolean {
  return !!user && !!user.email && ADMIN_EMAILS.includes(user.email.toLowerCase()) && user.emailVerified;
}
