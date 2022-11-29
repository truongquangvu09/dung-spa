import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: 'AIzaSyClhc8VRms74VAXxjmxoE9TH-5QTquQmjo',
    authDomain: 'dung-spa-beauty.firebaseapp.com',
    projectId: 'dung-spa-beauty',
    storageBucket: 'dung-spa-beauty.appspot.com',
    messagingSenderId: '551420800575',
    appId: '1:551420800575:web:b0a6b54894a0602a73d28a',
    measurementId: 'G-5BGPLL54GX',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
