import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDHeymOA-4_G4ECPCZpZbMtAgj5LzwD7Yk",
    authDomain: "my-money-625f9.firebaseapp.com",
    projectId: "my-money-625f9",
    storageBucket: "my-money-625f9.appspot.com",
    messagingSenderId: "733833822895",
    appId: "1:733833822895:web:0e460391667e6018b24a5a"
  };

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

const timeStamp = firebase.firestore.Timestamp

export {projectFirestore, projectAuth, timeStamp}