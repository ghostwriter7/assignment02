import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDdZ1yCe-1lKpvZCD8d-0WAjGTww3V5JLA",
  authDomain: "assignment02-76e07.firebaseapp.com",
  projectId: "assignment02-76e07",
  storageBucket: "assignment02-76e07.appspot.com",
  messagingSenderId: "249140352800",
  appId: "1:249140352800:web:a300bd4697bacd379fa945",
  databaseURL: "https://assignment02-76e07-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
