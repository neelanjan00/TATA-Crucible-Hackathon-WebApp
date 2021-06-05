import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAUU4B_2JkDwUFw-JbQgfqqxq8xkpMUWmE",
    authDomain: "dmscanner10.firebaseapp.com",
    databaseURL: "https://dmscanner10-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dmscanner10",
    storageBucket: "dmscanner10.appspot.com",
    messagingSenderId: "614626576227",
    appId: "1:614626576227:web:e8f4b69e3ad01fb1737556"
}

firebase.initializeApp(firebaseConfig)

export default firebase