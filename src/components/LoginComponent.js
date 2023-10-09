import { useState } from 'react'
import React from 'react'
import {LoginAPI , GoogleSigninAPI} from '../apis/api'
import GoogleButton from 'react-google-button'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function LoginComponent() {
  let navigate = useNavigate();
    const [credentials, setCredentials] = useState("")
    const login = async () => {
        try{
         let res =  await LoginAPI(credentials.email, credentials.password);
         navigate('/home');
        }catch(err){
          toast.error("please check your credentials");
        }
    };

    const googleSignIn = () =>{
      let response = GoogleSigninAPI();
      navigate('/home');
     
    };
  return ( 
    <>
      <div >

      </div>

      
        </>

  )
}
