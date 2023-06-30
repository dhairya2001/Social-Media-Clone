import React,{useContext,useState} from 'react';
import Topbar from '../Topbar/Topbar';
// import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';

function Updateuser() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC;
    // const [file,setFile]=useState("");
    const [dob,setDOB]=useState(user.user.dob);
    const [name,setName]=useState(user.user.name);
    const [city,setCity]=useState(user.user.city);
    const [relationship,setRelationship]=useState(user.user.relationship);
    const [from,setFrom]=useState(user.user.from);
    const [profilePic,setProfilePic]=useState(user.user.profilePicture);
    const [coverPic,setCoverPic]=useState(user.user.coverPicture);

    const handleCoverPicChange=(e)=>{
        const image=e.target.files[0];
        const reader=new FileReader();
        reader.onload=(e)=>{
          const binaryData=e.target.result;
          setCoverPic(binaryData)
        }
        reader.readAsDataURL(image);
      }
    const handleProfilePicChange=(e)=>{
      const image=e.target.files[0];
      const reader=new FileReader();
      reader.onload=(e)=>{
        const binaryData=e.target.result;
        setProfilePic(binaryData)
      }
      reader.readAsDataURL(image);
    }
    const handleCityChange=(e)=>{
      setCity(e.target.value);
    }
    const handleFromChange=(e)=>{
      setFrom(e.target.value);
    }
    const handleRelationshipChange=(e)=>{
      setRelationship(e.target.value);
    }
    const handleNameChange=(e)=>{
      setName(e.target.value);
    }
    const handleDOBChange=(e)=>{
      setDOB(e.target.value);
    }
    const updateUserData=async(e)=>{
        e.preventDefault();
        const updatedUser={
          userId:user.user._id,
          coverPicture:coverPic,
          profilePicture:profilePic,
          city:city,
          from:from,
          relationship:relationship,
          dob:dob,
          name:name
        }
        try{
          await axios.put(PF+`api/users/${user.user._id}`,updatedUser);
          toast.success('Profile Updated !', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        } catch (err){
          console.log(err);
        }
        
    }
  return (
    <div>
        <Topbar/>
        <form>
            <label>User Name : {user.user.username}</label> 

            {/* <input onChange /> */}
            <br/>
            {/* <label>Cover Photo :</label> 
            <input
                // style={{ display: "none" }}
                type="file"
                id="cover"
                accept=".png,.jpeg,.jpg"
                onChange={handleCoverPicChange}
                
              />
            <br/> */}
            <label>DOB</label>
            <input type="date" value={dob} onChange={handleDOBChange}/>
            <br/>
            <label>Name :</label>
            <input type="text" value={name} onChange={handleNameChange}/>
            <br/>
            <label>Profile Photo :</label> 
            <input
                // style={{ display: "none" }}
                type="file"
                id="profile"
                accept=".png,.jpeg,.jpg"
                onChange={handleProfilePicChange}
              />
            <br/>
            <label>City :</label> 
            <input
                // style={{ display: "none" }}
                type="text"
                value={city}
                onChange={handleCityChange}
              />
            <br/>
            <label>From :</label>
            <input
              type="text"
              value={from}
              onChange={handleFromChange}
            />
             <br/>
            <label>Relationship :</label>
            <select onChange={handleRelationshipChange} value={relationship}>
              <option>Single</option>
              <option>Commited</option>
              <option>Married</option>
            </select>
             <br/>
            <button onClick={updateUserData}>Save</button>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    </div>
  )
}

export default Updateuser