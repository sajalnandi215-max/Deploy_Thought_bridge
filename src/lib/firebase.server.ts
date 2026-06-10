// Server-side Firebase initialization for use in TanStack Start handlers
// This module should only be imported within .handler() or other server-only contexts

import { initializeApp, getApp, cert } from "firebase-admin/app";
import { getFirestore as getAdminFirestore } from "firebase-admin/firestore";

let adminApp: any;

// Initialize Firebase Admin SDK (requires GOOGLE_APPLICATION_CREDENTIALS env var or service account config)
// For development, you can use the client SDK credentials by setting up a service account in Firebase Console
function getAdminApp() {
  if (adminApp) {
    return adminApp;
  }

  try {
    adminApp = getApp("admin");
    return adminApp;
  } catch {
    // App doesn't exist yet, initialize it
    // Note: In production, set GOOGLE_APPLICATION_CREDENTIALS to point to your service account JSON
    // For now, we'll use a fallback approach using the client SDK on the server
    console.warn(
      "Firebase Admin SDK not initialized. Using client SDK on server (development mode)."
    );
    return null;
  }
}

export function getServerFirestore() {
  const app = getAdminApp();
  if (app) {
    return getAdminFirestore(app);
  }

  // Fallback: Use the regular Firebase SDK for server-side operations
  // This is not ideal for production but works for development
  const { getFirestore: getClientFirestore } = require("firebase/firestore");
  const { initializeApp: initClient } = require("firebase/app");

  const firebaseConfig = {
    apiKey: "AIzaSyCroA2QxCef9msqBZRQMnHF9ROy_VBWQwU",
    authDomain: "thoughtbridge-25673.firebaseapp.com",
    projectId: "thoughtbridge-25673",
    storageBucket: "thoughtbridge-25673.firebasestorage.app",
    messagingSenderId: "695905535161",
    appId: "1:695905535161:web:738950ad69337103e9c768",
  };

  const app = initClient(firebaseConfig);
  return getClientFirestore(app);
}
