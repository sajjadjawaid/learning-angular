// src/environments/firebase-config.ts

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCBhcSZ2cQhpKx9QQA36OPRiJadINHtKtU',
  authDomain: 'client-image-f7af2.firebaseapp.com',
  projectId: 'client-image-f7af2',
  storageBucket: 'client-image-f7af2.appspot.com',
  messagingSenderId: '913551448543',
  appId: '1:913551448543:web:5f508f2f7b06c298f6cc6a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };
