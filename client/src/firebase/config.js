import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyA7nEKvnThwJID4Gn8LlA2_JZtR8vjlfC8",
    authDomain: "contact-manager-8cf36.firebaseapp.com",
    projectId: "contact-manager-8cf36",
    storageBucket: "contact-manager-8cf36.appspot.com",
    messagingSenderId: "413532598950",
    appId: "1:413532598950:web:7da3fd2f2e0411685a7a67",
    measurementId: "G-PSX27C2X2R"
};
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
