import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();

// Configuration du provider Google pour une meilleure UX
googleProvider.setCustomParameters({
  prompt: 'select_account', // Force la sélection du compte
});

// Connection test - désactivé temporairement pour éviter les erreurs
// async function testConnection() {
//   try {
//     await getDocFromServer(doc(db, 'test', 'connection'));
//   } catch (error) {
//     if(error instanceof Error && error.message.includes('the client is offline')) {
//       console.error("Please check your Firebase configuration. You might be offline or blocked.");
//     }
//   }
// }
// testConnection();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
