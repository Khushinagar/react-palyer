import {signInWithEmailAndPassword, createUserWithEmailAndPassword, 
    GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import { auth } from '../pages/firebase';

export const LoginAPI =(email, password) => {
    try{
     let response = signInWithEmailAndPassword( auth,email, password);
     console.log({"Login response" : response}); 
     return response;
    } catch(err){
        alert(err.errors.message) ;
    }
};



export const GoogleSigninAPI = async() => {
    try{ 
        const provider = new GoogleAuthProvider();
        const user  = await signInWithPopup(auth,provider);
        console.log(user.user);
    } catch(err){
      console.log(err);
    }
};

export const RegisterAPI = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
  
      if (response.user) {
        console.log("User Registered:", response.user.uid);
        return response.user; // Return the user object on success
      } else {
        throw new Error("User registration failed."); // Throw an error if registration failed
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      throw error; // Rethrow the error to handle it in the frontend
    }
  };

export const LogOut =() => {
    // let navigate = useNavigate();
    try{
    signOut(auth);
    // navigate="/register";
    } catch(err){
        alert(err.errors.message) ;
    }
};