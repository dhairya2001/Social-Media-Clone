import { useContext } from 'react';
import Topbar from '../Topbar/Topbar.js'
import Sidebar from "../Sidebar/Sidebar.js";
import Feed from "../Feed/Feed.js";
import Rightbar from "../Rightbar/Rightbar.js";
import { AuthContext } from '../../context/AuthContext.js';
import "../Home/Home.css"

export default function Home() {
  const { user : currentUser } = useContext(AuthContext);
  // const username=currentUser.user.username;
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar/>
      </div>
    </>
  );
}