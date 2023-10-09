import React from 'react'
import { useState } from 'react'
import {RegisterAPI , GoogleSigninAPI} from '../apis/api'
import { useNavigate } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faArrowRight} from '@fortawesome/free-solid-svg-icons'


const Home = () => {
  let navigate = useNavigate();
    const [credentials, setCredentials] = useState({
      email  : "",
      password : ""
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    let register = async (e) => {
      e.preventDefault();
      
        try{
         let user = await RegisterAPI(email,password);
         console.log({"frontend Register response" : user});
         navigate('/musiclibrary')
          setEmail("");
          setPassword("");
          setUsername("");
        } catch(err){
          console.log(err);   
        }
    };

    const googleSignIn = (props) =>{
      let response = GoogleSigninAPI();
      navigate('/musiclibrary');
    };
  return (
    <>
    <div className='home'>
     <div className='left-div'>
    <h1>Music <br/><FontAwesomeIcon 
    size="4x" icon={faMusic}/></h1>
    
    <form onSubmit={register}>
      <label>Username</label>
      <input type='text' placeholder='Your name'value={username}
      onChange={(e) => setUsername(e.target.value)}
      required/>
      <label>Email</label>
      <input type='email' placeholder='Your email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
       required/>
      <label>Password</label>
      <input type='password' placeholder='Your password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required/>
      <div className='register-div'>
      <button type='submit'>Register  <span><FontAwesomeIcon size="2x"icon={faArrowRight}/></span></button>
       </div>
    </form>
    <div className='google-btn'>
      <GoogleButton className='google-btn'onClick={googleSignIn}/>
    </div>
</div>
    <div className='right-div'>
   
</div>
</div>

    </>
  )
}

export default Home