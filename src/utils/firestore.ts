import { initializeApp } from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import { getFirestore } from '@firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyBOACjoDC9PyR5ehZjLtJ0X03uMiSmZ9K8',
  authDomain: 'allied-db133.firebaseapp.com',
  projectId: 'allied-db133',
  storageBucket: 'allied-db133.appspot.com',
  messagingSenderId: '579779834381',
  appId: '1:579779834381:web:ca957952e1264a37e11b44',
  measurementId: 'G-65X98EBRYW'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
