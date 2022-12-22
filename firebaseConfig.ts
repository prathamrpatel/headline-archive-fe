// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBgqwuQ3S5RdZQt-ejP8B9nt8qANW42gG4',
  authDomain: 'headline-archive-d5101.firebaseapp.com',
  projectId: 'headline-archive-d5101',
  storageBucket: 'headline-archive-d5101.appspot.com',
  messagingSenderId: '206975847220',
  appId: '1:206975847220:web:e6018559a73dc462dfb361',
  measurementId: 'G-RSVFQ4K7R2',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
