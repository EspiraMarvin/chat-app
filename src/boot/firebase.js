// Firebase App ( the core Firebase SDK) is always required and must be listed first

import * as firebase from 'firebase/app'

// Add the firebase products that you want to use
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
  apiKey: 'AIzaSyBrQ7OE7Wt4eM6WcpYkspyX0xis0qsx9rA',
  authDomain: 'vuequasarchat.firebaseapp.com',
  projectId: 'vuequasarchat',
  storageBucket: 'vuequasarchat.appspot.com',
  messagingSenderId: '394164638598',
  appId: '1:394164638598:web:6f87458511f8f2cfb2d207'
  // apiKey: 'AIzaSyDOaQP5NY1yiUopptLWfjxnpg5AUsZIjL0',
  // authDomain: 'quasar-chat-3adf7.firebaseapp.com',
  // databaseURL: 'https://quasar-chat-3adf7.firebaseio.com',
  // projectId: 'quasar-chat-3adf7',
  // storageBucket: 'quasar-chat-3adf7.appspot.com',
  // messagingSenderId: '224335320715',
  // appId: '1:224335320715:web:6d0d1ebf688d7d1794268e',
  // measurementId: 'G-EBYN6JR9FM'
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

const firebaseAuth = firebaseApp.auth()
const firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }
