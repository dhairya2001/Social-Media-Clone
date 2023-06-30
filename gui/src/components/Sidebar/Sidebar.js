import "../Sidebar/Sidebar.css";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import FriendList from "../FriendList/Friendlist.js"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const {user}=useContext(AuthContext);
  const handleLogOut=()=>{
    localStorage.clear();
    window.location.reload();
  }
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
              <img className='shareProfileImg'
                src={`${user.user.profilePicture}`}
                alt=""
            />
          </li>
          <li className="sidebarListItem">
            <label>UserName : {user.user.username}</label>
          </li>
          <li className="sidebarListItem">
            <label>EmailId : {user.user.email}</label>
          </li>
          <li className="sidebarListItem">
            <label>DOB : {user.user.dob}</label>
          </li>
          <li className="sidebarListItem">
            <label>Name : {user.user.name}</label>
          </li>
          <li className="sidebarListItem">
            <label><Link  to={'/'} style={{ textDecoration: "none" }}>HomePage</Link></label>
          </li>
          <li className="sidebarListItem">
            <Link to={`/profile/${user.user.username}`} style={{ textDecoration: "none" }}>My Profile</Link>
          </li>
          <li className="sidebarListItem">
            <Link to={`/update/${user.user._id}`} style={{ textDecoration: "none" }}>Edit Profile</Link>
          </li>
          <li className="sidebarListItem">
            Followers
          </li>
          <li className="sidebarListItem">
            Following
          </li>
          <li className="sidebarListItem">
            <Link  to={'/'} onClick={handleLogOut} style={{ textDecoration: "none" }}>Log Out</Link>
          </li>
        </ul>
        {/* <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledWhiteOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <GroupAddOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkBorderOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutlineOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutlineOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventNoteOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <SchoolOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" /> */}
        {/* <ul className="sidebarFriendList">
          {Users.map((u) => (
            <FriendList key={u.id} user={u} />
          ))}
        </ul> */}
      </div>
    </div>
  );
}