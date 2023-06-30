import React, { useEffect,useState } from 'react';
import Feed from "../Feed/Feed.js";
import Rightbar from "../Rightbar/Rightbar.js";
import Topbar from "../Topbar/Topbar.js";
import Sidebar from "../Sidebar/Sidebar.js";
import { useParams } from 'react-router';
import axios from 'axios';
import "../Profile/Profile.css";

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC;
  const username=useParams().username;
  const [user,setUser]=useState({})
  useEffect(()=>{
    const fetchUser=async()=>{
      const res=await axios.get(PF+`api/users/?username=${username}`);
      // console.log(res.data)
      setUser(res.data);
    }
    
    fetchUser();
  },[username])
  // console.log(user)
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                // src={
                //   user.user.coverPicture
                //     ? `${user.user.coverPicture}`
                //     : "C:\Users\Dhairya.C\Desktop\Training\Social Media\social-media-frontend\public\assets\profile picture 1.jpg"
                // }
                src={`${user.coverPicture}`}
                alt="Cover"
              />
              <img
                className="profileUserImg"
                src={`${user.profilePicture}`}
                alt="Profile "
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={user.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile