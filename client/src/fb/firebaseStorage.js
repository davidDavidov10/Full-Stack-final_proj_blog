import firebase from "firebase"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCb29xNgvFI1YR_gr6FMCw9HHj31asgJ1k",
    authDomain: "blog-91cd0.firebaseapp.com",
    databaseURL: "https://blog-91cd0.firebaseio.com",
    projectId: "blog-91cd0",
    storageBucket: "blog-91cd0.appspot.com",
    messagingSenderId: "145116560512",
    appId: "1:145116560512:web:484e42e8128ba4659f7a65",
    measurementId: "G-BRN74S1L4Z"
};
firebase.initializeApp(firebaseConfig)
const storage = firebase.storage();


export default firebase
export {storage};