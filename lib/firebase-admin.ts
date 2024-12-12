import * as admin from 'firebase-admin';

// Function to initialize Firebase Admin
function initializeFirebaseAdmin() {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    } catch (error) {
      console.error('Firebase admin initialization error:', error);
    }
  }
  return admin;
}

// Initialize Firebase Admin
const adminApp = initializeFirebaseAdmin();

// Export the auth instance
export const auth = adminApp.auth();