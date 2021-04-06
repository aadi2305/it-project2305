import firebase from "firebase/app"
import "firebase/auth"


var app = firebase.initializeApp({
    apiKey: "AIzaSyAqv_w68XZ4U4ZxC1AMKvRQW63UKh_gXes",
    authDomain: "it-project-8260b.firebaseapp.com",
    projectId: "it-project-8260b",
    storageBucket: "it-project-8260b.appspot.com",
    messagingSenderId: "64943326677",
    appId: "1:64943326677:web:16e41125c569545cef695c",
    measurementId: "G-E3CHR51SMB"
  });
  
  
  
  export const auth = app.auth()
  export default app;