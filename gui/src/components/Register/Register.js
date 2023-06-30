import React,{useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../Register/Register.css';

function SignUp() {
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const navigate=useNavigate();
    const PF=process.env.REACT_APP_PUBLIC;

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const user={
            username:username.current.value,
            email:email.current.value,
            password:password.current.value
        };
        try {
            await axios.post(PF+"api/users/signUp",user);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }
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
                        type="text" 
                        className='LoginInput' 
                        placeholder='Username' 
                        required
                        ref={username}
                    />
                    <input 
                        type='email' 
                        className="LoginInput" 
                        placeholder='Email'
                        required
                        ref={email}
                    />
                    <input 
                        type='password' 
                        className="LoginInput" 
                        placeholder='Password'
                        required
                        ref={password}
                    />
                    <button className='LoginButton'>Sign Up</button>
                    
                    <button className="LoginRegisterButton" onClick={()=>navigate('/login')}>Log into account</button>
                </form>                
            </div>
        </div>
    </div>
  )
}

export default SignUp