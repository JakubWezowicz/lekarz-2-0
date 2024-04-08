import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAB8YrJV8S_K7dyQBzhN8wrzw-MCi8Wug4",
  authDomain: "lekarz-2-0.firebaseapp.com",
  projectId: "lekarz-2-0",
  storageBucket: "lekarz-2-0.appspot.com",
  messagingSenderId: "918662467361",
  appId: "1:918662467361:web:b9286fa71440b84bf7b860",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};