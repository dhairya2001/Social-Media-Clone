import "./Friend.css";

export default function Friend({user}) {
//   const PF = process.env.REACT_APP_PUBLIC;
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={`${user.user.profilePicture}`} alt="" />
      <span className="sidebarFriendName">{user.user.username}</span>
    </li>
  );
}