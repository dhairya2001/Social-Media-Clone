import "./Friendlist.css";

export default function Friendlist({user}) {
  const PF = process.env.REACT_APP_PUBLIC;
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PF+user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}