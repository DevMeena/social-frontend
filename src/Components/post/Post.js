import { Users } from '../../dummyData';
import './post.css';
import { useEffect, useState } from 'react';
import { Favorite, FavoriteBorder, MoreVert, Share } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from '@mui/material';
import { format, render, cancel, register } from 'timeago.js';
import { API, PF } from '../../api';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../../useFetch';

const Post = ({ post }) => {
  // console.log(post?.likes.length);

  // const { id } = useParams();

  const { loading, data, error } = useFetch(`/user/${post?.userId}`);

  console.log(data);

  var imageurl = post?.photo ? `${API}/post/photo/${post?._id}` : '';

  const { user } = useContext(AuthContext);
  console.log(post?.likes.length);
  const [like, setLike] = useState(0); //post.like
  const [isLiked, setIsLiked] = useState(false);
  const token = user?.token;
  const userId = user?.user._id;
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  // console.log(headers.headers);
  const likeHandler = () => {
    // if (isLiked) {
    //   setLike(like - 1);
    //   setIsLiked(!isLiked);
    // } else {
    //   setLike(like + 1);
    //   setIsLiked(!isLiked);
    // }
    axios
      .put(`${API}/post/${post?._id}/like`, { userId: user?.user._id }, headers)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    window.location.reload();
  };
  console.log('hello');
  useEffect(() => {
    setLike(post?.likes.length);
    setIsLiked(post?.likes.includes(user?.user._id));
  }, [like, isLiked, post, user]); // like, isLiked,

  const deletePost = () => {
    if (window.confirm('Delete this account?')) {
      console.log(user?.user._id);
      console.log(post?.userId);
      const data = user?.user._id;
      axios
        .delete(`${API}/post/${post?._id}`, headers)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Link to={`/profile/${post?.userId}`}>
            <Avatar
              sx={{ bgcolor: 'red' }}
              aria-label='recipe'
              src={PF + data?.profilePicture}
              // src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1657092625~exp=1657093225~hmac=4dd9cb5fab08231c7ba6e15a30778b8728965fe258d568ef23f468dc5480936e&w=740'
            ></Avatar>
          </Link>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVert />
          </IconButton>
        }
        title={data?.name}
        subheader={format(post?.createdAt)}
      />
      {imageurl && (
        <CardMedia
          component='img'
          height='20%'
          image={imageurl}
          alt='Paella dish'
        />
      )}
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {post?.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <IconButton aria-label='add to favorites' onClick={likeHandler}>
              <Checkbox
                icon={<FavoriteBorder />}
                checked={isLiked}
                checkedIcon={<Favorite sx={{ color: 'red' }} />}
              />
            </IconButton>
            <span className='postLikeCounter'>{like}</span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'></span>
          </div>
        </div>
      </CardActions>
      <button onClick={deletePost}>delete post</button>
    </Card>
  );
};

export default Post;

// import "./post.css";
// // import { MoreVert } from "@material-ui/icons";
// import { Users } from "../../dummyData";
// import { useState } from "react";

// export default function Post({ post }) {
// const [like,setLike] = useState(post.like)
// const [isLiked,setIsLiked] = useState(false)

// const likeHandler =()=>{
//   setLike(isLiked ? like-1 : like+1)
//   setIsLiked(!isLiked)
// }
//   return (
//     <div className="post">
//       <div className="postWrapper">
//         <div className="postTop">
//           <div className="postTopLeft">
//             <img
//               className="postProfileImg"
//               src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
//               alt=""
//             />
//             <span className="postUsername">
//               {Users.filter((u) => u.id === post?.userId)[0].username}
//             </span>
//             <span className="postDate">{post.date}</span>
//           </div>
//           <div className="postTopRight">
//             <MoreVertIcon />
//           </div>
//         </div>
//         <div className="postCenter">
//           <span className="postText">{post?.desc}</span>
//           <img className="postImg" src={post.photo} alt="" />
//         </div>
//         <div className="postBottom">
//           <div className="postBottomLeft">
//             <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
//             <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
//             <span className="postLikeCounter">{like} people like it</span>
//           </div>
//           <div className="postBottomRight">
//             <span className="postCommentText">{post.comment} comments</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
