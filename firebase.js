import * as firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import {getFirestore} from "firebase/firestore"



const firebaseConfig = {

    apiKey: "AIzaSyCil41LxaBbrFlTviS_oubOcTGAQO6VS2s",
    authDomain: "chatapplication-8218a.firebaseapp.com",
    projectId: "chatapplication-8218a",
    storageBucket: "chatapplication-8218a.appspot.com",
    messagingSenderId: "658501511261",
    appId: "1:658501511261:web:70fe111f5a76b2df9ac5b4"
};


let app;
if (firebase.getApps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = getAuth();
const db = getFirestore(app);

export { auth,db };
export default {firebase};
