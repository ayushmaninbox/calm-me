import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  sendEmailVerification, 
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Upload profile image
export const uploadProfileImage = async (imageData: string, userId: string) => {
  try {
    const storageRef = ref(storage, `profile_images/${userId}`);
    await uploadString(storageRef, imageData, 'data_url');
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error: any) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Email verification
export const sendVerificationEmail = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user is currently signed in');
  }

  try {
    await sendEmailVerification(user);
    return {
      success: true,
      message: 'Verification email sent successfully'
    };
  } catch (error: any) {
    console.error('Error sending verification email:', error);
    return {
      success: false,
      error: error.message || 'Failed to send verification email'
    };
  }
};

// Password reset
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email sent successfully'
    };
  } catch (error: any) {
    console.error('Error sending password reset email:', error);
    return {
      success: false,
      error: error.message || 'Failed to send password reset email'
    };
  }
};

// Google sign-in
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return {
      success: true,
      user: result.user
    };
  } catch (error: any) {
    console.error('Error signing in with Google:', error);
    return {
      success: false,
      error: error.message || 'Failed to sign in with Google'
    };
  }
};

// Email/Password sign up
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await sendVerificationEmail();
    return {
      success: true,
      user: result.user
    };
  } catch (error: any) {
    console.error('Error signing up with email:', error);
    return {
      success: false,
      error: error.message || 'Failed to sign up'
    };
  }
};

// Email/Password sign in
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: result.user
    };
  } catch (error: any) {
    console.error('Error signing in with email:', error);
    return {
      success: false,
      error: error.message || 'Failed to sign in'
    };
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Check if user's email is verified
export const isEmailVerified = () => {
  const user = auth.currentUser;
  return user?.emailVerified || false;
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};