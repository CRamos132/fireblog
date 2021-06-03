import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDQvUZegARrMWJI_4B3BYvlAGjcR5LirBU",
    authDomain: "nextfire-34b5d.firebaseapp.com",
    projectId: "nextfire-34b5d",
    storageBucket: "nextfire-34b5d.appspot.com",
    messagingSenderId: "521839557142",
    appId: "1:521839557142:web:4ac22d2d71a64153985337",
    measurementId: "G-261J9GFEN4"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()