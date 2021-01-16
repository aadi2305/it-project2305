import firebase from "firebase/app"
import "firebase/auth"


var app = firebase.initializeApp({
    apiKey: "AIzaSyA0Fuw3B4F72QAq0WcDPmNax_DWndxPkaU",
    authDomain: "calorix-7e8e4.firebaseapp.com",
    projectId: "calorix-7e8e4",
    storageBucket: "calorix-7e8e4.appspot.com",
    messagingSenderId: "1050684478277",
    appId: "1:1050684478277:web:f1242aab99f6de3ffba42c",
    measurementId: "G-MK1JB536CG"
  });
  
  
  
  export const auth = app.auth()
  export default app;