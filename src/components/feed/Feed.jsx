import React, { useEffect, useState } from 'react'
import Share from '../share/Share'
import Post from '../post/Post'
import './Feed.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
export default function Feed({user}) {
  const {id}=useParams();
  const [posts,setPosts]=useState([]);
  console.log(user._id);

useEffect(async()=>{

  if(id){
   await axios.get(`http://localhost:4000/store/getpost/${id}`)
    .then((res)=>{
      setPosts(res.data);
    })

    .catch((err)=>{
      console.log(err);
    })
  }
  else{
   await axios.get(`http://localhost:4000/store/getallposts/${user?._id}`)
    .then((res)=>{
      setPosts(res.data);
    })
    .catch((err)=>{
console.log(err);
    })

  }

},[user]);

  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share user={user}/>
        {posts.map((p)=>(
          <Post key={p.id} user={user} post={p}/>
        ))}
        
        
      </div>
      </div>
  )
}
