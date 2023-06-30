import React, { useState,useContext, useRef, useEffect } from 'react'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'
import '../Share/Share.css'
import CancelIcon from '@mui/icons-material/Cancel';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

function Share() {
  let { user } = useContext(AuthContext)
  
  // console.log(user.user)
  const PF = process.env.REACT_APP_PUBLIC;
  const desc=useRef();
  const [file,setFile]=useState("");
 
  const handleImageChange=(e)=>{
    const image=e.target.files[0];
    const reader=new FileReader();
    reader.onload=(e)=>{
      const binaryData=e.target.result;
      setFile(binaryData)
    }
    reader.readAsDataURL(image);
  }
  const submitHandler=async(e)=>{
    e.preventDefault();
    const newPost={
      userId:user.user._id,
      // img:file,
      desc:desc.current.value
    };
    if(file){
      newPost.img = file;
      try{
        await axios.post(PF + "api/posts/",newPost);
        window.location.reload();
      } catch(err){console.log(err)}
    }
    else{
      try {
        await axios.post(PF + "api/posts/", newPost);
        window.location.reload();
      } catch (err) {console.log(err)}
    }
   
  }
  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img className='shareProfileImg'
            src={`${user.user.profilePicture}`}
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className='shareHr'/>
        {
          file && (
            <div className='shareImgContainer'>
              <img className='shareImg' src={`${file}`} alt=""/>
              <CancelIcon className="shareCancelImg" onClick={()=>setFile(null)}/>
            </div>
          )
        }
        <form className='shareBottom' onSubmit={submitHandler}>
        <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={handleImageChange}
                
              />
            </label>
            {/* <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <LocationOnIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div> */}
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div> 
  )
}

export default Share