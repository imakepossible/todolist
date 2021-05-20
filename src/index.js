import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
 // http://findmevaccine.herokuapp.com/
 /* var config = {
  apiKey: "",
    authDomain: "project.firebaseapp.com",
    projectId: "project",
    storageBucket: "project.appspot.com",
    messagingSenderId: "2342",
    appId: "1:2342:web:989ce41ca9e5059e2840ed"
};

firebase.initializeApp(config);  */


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
