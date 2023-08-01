

import firebase from "firebase/compat/app"
import 'firebase/compat/analytics'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6yADVL2gndL-kUfpbS6K_2EbA0NqjVeY",
  authDomain: "chat-app-98d96.firebaseapp.com",
  projectId: "chat-app-98d96",
  storageBucket: "chat-app-98d96.appspot.com",
  messagingSenderId: "595634168394",
  appId: "1:595634168394:web:56acefc60845b8804d3cb3",
  measurementId: "G-CJRKDL8PTN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');

if(window.location.hostname === 'localhost') {
  db.useEmulator('localhost', '8080');
}
export {auth, db}
export default firebase;