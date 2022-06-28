import { Users } from "../../dummyData";
import "./post.css";
import { useState } from "react";
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
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
} from "@mui/material";

const Post = ({post}) => {
  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)
  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe"
          src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="John Doe"
        subheader={post.date}
      />
      <CardMedia
        component="img"
        height="20%"
        image={post.photo}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {post?.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <div className="postBottom">
           <div className="postBottomLeft">
        <IconButton aria-label="add to favorites" onClick={likeHandler}>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
             <span className="postLikeCounter">{like}</span>
           </div>
           <div className="postBottomRight">
             <span className="postCommentText"></span>
           </div>
         </div>
      </CardActions>
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