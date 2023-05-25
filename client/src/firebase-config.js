// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBQrMY-PB8MJ5zMX3ArgszRRK1jEg69a28',
  authDomain: 'blog-8e891.firebaseapp.com',
  projectId: 'blog-8e891',
  storageBucket: 'blog-8e891.appspot.com',
  messagingSenderId: '167205313103',
  appId: '1:167205313103:web:fce84c34ab5a49d973283a',
  measurementId: 'G-LKDN58Z363',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create connections
export const db = getFirestore(app);
export const storage = getStorage();
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
