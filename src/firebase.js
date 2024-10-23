// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDOG577I04dI8BXrwtaJCtaHh8iU2Dx4LQ',
  authDomain: 'react-blog-cf942.firebaseapp.com',
  databaseURL: 'https://react-blog-cf942-default-rtdb.firebaseio.com',
  projectId: 'react-blog-cf942',
  storageBucket: 'react-blog-cf942.appspot.com',
  messagingSenderId: '989339663447',
  appId: '1:989339663447:web:1dfac840e8779de7b97712',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
