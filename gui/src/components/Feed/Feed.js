import { useContext, useEffect, useState } from "react";
import Post from "../Post/Post.js";
import Share from "../Share/Share.js";
import "../Feed/Feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const PF=process.env.REACT_APP_PUBLIC;
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(PF+`api/posts/profile/${username}`)
        : await axios.get(PF+`api/posts/timeline/${user.user._id}`);
      // const res=await axios.get(PF+`api/posts/profile/${username}`);
      // console.log()
      setPosts(
        res.data.sort((p1, p2) => {
          return (new Date(p1.createdAt) - new Date(p2.createdAt));
        })
      );
      // console.log(posts);
      if(!res){
        console.log("error in feed")
      }
    };
    fetchPosts();
  }, [ username]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}