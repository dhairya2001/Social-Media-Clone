import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../Rightbar/Rightbar.css'

export default function Rightbar({ user }) {
  // console.log(user);
  // const givenUsername=user.username;
  const PF = process.env.REACT_APP_PUBLIC;
  const [followings, setFollowings] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  // console.log(currentUser.user)

  let currentUserFollowings;
  // let list=[];
  const [followed, setFollowed] = useState(
    currentUser.user.followings.includes(user?._id)
  );
 
  useEffect(() => {
    const getFollowers = async () => {
      try {
        const followingList = await axios.get(PF+`api/users/followers/${currentUser.user._id}`);
        // console.log(followingList)
      } catch (err) {
        console.log(err);
      }
    };
    getFollowers();
  }, [currentUser.user]);
  const handleClick = async () => {
    const data=await axios.get(PF+`api/users/?userId=${currentUser.user._id}`);
    currentUserFollowings=data.followings;
    setFollowed(!followed)
    try {
      if (data.followings.includes(user._id)) {
        await axios.put(PF+`api/users/${user._id}/unfollow`, {
          userId: currentUser.user._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
        console.log("unfollowed")
      } else {
        await axios.put(PF+`api/users/${user._id}/follow`, {
          userId: currentUser.user._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
        console.log("followed");
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer mt-2">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Mahesh Pandey</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">People you Follow</h4>
        <ul className="rightbarFriendList">
          
          {/* {followings.map((friend) => 
          (  
            <Link
              to={`/profile/${friend.username}`}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={`${friend.profilePicture}`}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend}</span>
              </div>
            </Link>
          ))} */}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.user.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship}</span>
            
          </div>
        </div>
        {/* <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {followings.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  
                  src={`${friend.profilePicture}`}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div> */}
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}