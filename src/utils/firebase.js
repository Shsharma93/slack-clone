import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyACNe8x303NmZZTpxaZ9kt7F_s23KPIJxA',
  authDomain: 'slack-clone-99899.firebaseapp.com',
  databaseURL: 'https://slack-clone-99899.firebaseio.com',
  projectId: 'slack-clone-99899',
  storageBucket: 'slack-clone-99899.appspot.com',
  messagingSenderId: '358887084134',
  appId: '1:358887084134:web:bcea96d653862ccd'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
