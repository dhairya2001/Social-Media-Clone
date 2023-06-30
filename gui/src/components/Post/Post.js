import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
// import { MoreVert } from "@material-ui/icons";
// import "../../../public/assets/user.jpg"
import "../Post/Post.css";

function Post({post}) {
  const [like, setLike] = useState(post.likes.length);
  const [comment,setComment]=useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC;
  const { user: currentUser } = useContext(AuthContext);
  // console.log(post)
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser.user._id));
  }, [currentUser.user._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(PF + `api/users/?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);
  const renderComments=()=>{
    return post.comments.map(x=>{
      return(
        <li>x</li>
      )
    })
  }
  const likeHandler = () => {
    try {
      axios.put(PF + "api/posts/" + post._id + "/like", { userId: currentUser.user._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={`${user.profilePicture}`}
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <img className="postImg" src={`${post.img}`} alt="Post pic Here" />
          <br/>
          <span className="postText">{post?.desc}</span>
          
          
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <FavoriteBorderIcon
              className="likeIcon"
              // src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            {/* <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            /> */}
            <span className="postLikeCounter">{like}  likes &nbsp;</span>
            <CommentIcon/>
            <span className="postLikeCounter"> <ul>{renderComments()}</ul> </span>
          </div>
          {/* <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Post