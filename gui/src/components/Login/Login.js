import React,{useContext,useRef, useState} from 'react';
import {loginCall} from '../../apicalls/apicall.js';
import { AuthContext } from '../../context/AuthContext.js';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router';
import '../Login/Login.css';

function Login() {
    const email=useRef();
    const password=useRef();
    
    const {isFetching,dispatch}=useContext(AuthContext);
    const navigate=useNavigate();
    // const PF=process.env.REACT_APP_PUBLIC;
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(email,password)
        
        loginCall(
            {email:email.current.value,password:password.current.value},dispatch
        );
        // console.log(user);
    }
    
    // const handleSubmit=(e)=>{
    //     e.preventDefault();
    //     await axios.post(PF+"api/users/logIn",{email:email,password:password})
        
    // }
  return (
    <div className="Login">
        <div className='LoginWrap'>
            <div className="LoginLeft">
                <h3 className="LoginLogo"> Social Media </h3>
                <span className="LoginDesc">
                    Connecting Friends around the world
                </span>
            </div>
            <div className="LoginRight">
                <form className="LoginBox" onClick={handleSubmit}>
                    <input 
                        type='email' 
                        className="LoginInput" 
                        placeholder='Email'
                        required
                        // value={email}
                        ref={email}
                    />
                    <input 
                        type='password' 
                        className="LoginInput" 
                        placeholder='Password'
                        required
                        // minLength={6}
                        // value={password}
                        ref={password}
                    />
                    <button 
                        className='LoginButton'
                        type='submit'
                        disabled={isFetching}
                    >
                        Log In
                        {/* {isFetching?(<CircularProgress color="white" size="20px" />):("
                        Log In
                        ")} */}
                    </button>
                    <span className="LoginForgot">Forgot Password</span>
                    <button className="LoginRegisterButton" onClick={()=>navigate("/signUp")}>
                        {/* {isFetching ? (
                            <CircularProgress color="white" size="20px" />
                        ) : ( */}
                            "Create a New Account"
                        {/* )} */}
                    </button>
                </form>                
            </div>
        </div>
    </div>
  )
}

export default Login