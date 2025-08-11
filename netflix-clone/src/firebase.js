import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBqKb-3EkAaCGzAxJ_ENc5--ZRDL0G3f48",
  authDomain: "streamflix-003.firebaseapp.com",
  projectId: "streamflix-003",
  storageBucket: "streamflix-003.firebasestorage.app",
  messagingSenderId: "113732995881",
  appId: "1:113732995881:web:40c31b9d5e5bc1b74d8538",
  measurementId: "G-TBFWPST5NB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


// User signup function
const signup = async (name, email, password)=> {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc (collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }catch (error){
        console.log(error);
        alert(error);
        
    }
}

// User login function
const login = async (email, password) =>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log(error);
        alert(error);
        
    }
}

// User logout function
const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};