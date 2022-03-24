import React, { useState ,useEffect} from 'react'
import './Post.css'
import {MoreVert , FavoriteBorder,Comment,Favorite} from '@mui/icons-material';
import Moment from 'react-moment';
import axios from 'axios';
export default function Post(p) {
    // console.log(p.post);
   const url="http://localhost:4000/";
    
    const [like,setLike]=useState(p.post.likes.length);
    const [isliked,setIsliked]=useState(false);

    useEffect(()=>{
        setIsliked(p.post.likes.includes(p.user._id))
    },[])
    const likeHandler=async(e)=>{
        e.preventDefault();
        setLike(isliked?like-1:like+1);
        setIsliked(!isliked)
        try{
          await axios.put(`http://localhost:4000/store/${p.post._id}/likepost`,{userid:p.user._id})
                    .then((res)=>{console.log(res.data)})
                    .catch(err=>console.log(err));
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img src={p.post.user?url+p.post.user.profilephoto:"/assets/person/avatar1.png"} alt="" className="postProfileImg" />
                    <span className="postUsername">{p.post.user?p.post.user.fullname:'Hassankhan'}</span>
                    <span className="postDate"><Moment fromNow>{p.post.createdAt}</Moment></span>
                </div>
                <div className="postTopRight">
                <MoreVert/>
                </div>
            </div>
            
            <div className="postCenter">
                <span className="postText">{p && p.post.desc}</span>
                <img src={p.post?url+p.post.image:'/assets/person/avatar1.png'} alt="" className="postImg" />
            </div>
            <div className="postBottom">
            <div className="postBottomLeft">
                <div className="iconWrapper" onClick={likeHandler} >
                   {isliked?<Favorite className='likeIcon'/>:<FavoriteBorder className='likeIcon'  />} 
                </div>
                    <Comment className='commentIcon'/>
            
            <span className="postLikeCounter">{like} likes</span>
            </div>
            <div className="postBottomRight">
            <span className="postCommentCounter">{p.post.comments}comments</span>
            </div>
            </div>
        </div>

    </div>
  )
}
