import * as React from 'react';
import { Users } from '../../dummyData';
import './post.css';
import { useEffect, useState } from 'react';
import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  Refresh,
  Share,
} from '@mui/icons-material';
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ModalImage from 'react-modal-image';
import { format, render, cancel, register } from 'timeago.js';
import { API, PF } from '../../api';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../useFetch';

// const options = ['Delete Post', 'Edit Post'];

const Post = ({ post, refresh }) => {
  const { loading, data, error } = useFetch(`/user/${post?.userId}`);
  console.log(data);
  const navigate = useNavigate();
  var imageurl = post?.photo ? `${API}/post/photo/${post?._id}` : '';
  // const [user, setUser] = useState({});
  const { user } = useContext(AuthContext);
  console.log(post?.likes.length);

  const [like, setLike] = useState(post?.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const token = user?.token;
  const userId = user?.user._id;

  const headers = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    // setLike(post?.likes.length);
    setIsLiked(post?.likes.includes(user?.user._id));
  }, [post?.likes, user?.user._id]); // like, isLiked,

  const likeHandler = () => {
    axios
      .put(`${API}/post/${post?._id}/like`, { userId: user?.user._id }, headers)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  console.log('hello');

  const deletePost = () => {
    if (window.confirm('Delete this post?')) {
      console.log(user?.user._id);
      console.log(post?.userId);
      axios
        .delete(`${API}/post/${post?._id}`, headers)
        .then((res) => {
          console.log(res);
          refresh();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
            ></Avatar>
          </Link>
        }
        action={
          post?.userId === userId && (
            <IconButton
              aria-label='more'
              id='long-button'
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup='true'
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
          )
        }
        title={data?.name}
        subheader={format(post?.createdAt)}
      />

      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 30 * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem
          key='edit'
          onClick={(e) => navigate(`/editpost/${post?._id}`)}
        >
          Edit post
        </MenuItem>
        <MenuItem key='delete' style={{ color: 'red' }} onClick={deletePost}>
          Delete post
        </MenuItem>
      </Menu>

      {/* {imageurl && (
        <CardMedia
          component='img'
          height='20%'
          image={imageurl}
          alt='Paella dish'
        />
      )} */}

      {imageurl && <ModalImage small={imageurl} large={imageurl} />}

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

      {/* <>
          <button onClick={deletePost}>delete post</button>
          <button onClick={(e) => navigate(`/editpost/${post?._id}`)}>
            edit post
          </button>
        </> */}
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
