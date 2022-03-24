import React, { useEffect,useState } from 'react'
import './Rightbar.css'
import {VideoCall,Search,MoreHoriz} from '@mui/icons-material'
import {useParams,Link, useNavigate,Navigate} from 'react-router-dom';
import Online from '../online/Online'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
export default function Rightbar({user}) {
  const url="http://localhost:4000/";
  const {id}=useParams();
  const navigate=useNavigate();
  const [friendsList,setFriendsList]=useState([]);
  const {user:currentuser}=useContext(AuthContext);
 
  useEffect(async ()=>{
    try{
      await axios.get(`http://localhost:4000/store/${id?id:user._id}/getfriends`)
                .then((res)=>{

                  setFriendsList(res.data);
                })
                .catch(err=>console.log(err));
    }
    catch(err){
      console.log(err);
    }
  },[user])


  const isEmpty=Object.keys(friendsList).length===0;

  const ProfileRigthbar=()=>{
    return(
  <>
    <div className="rightbarTop">
        <div className="rightbarTopleft">
          <span className="rightbarTopText" style={{'marginLeft':'55px'}}>Friends</span>
          </div>
      </div>
      <hr className="rightbarHr" />
      <ul className="rightbarContactsList">
        <div className="profileRigthbarBottom">
        {isEmpty?<span style={{'fontWeight':'lighter','marginLeft':'55px'}}>No friends!</span>
        :
        friendsList.map((friend)=>(
          <div className='friendsList'> 
           <img 
           src={url+friend.profilephoto} 
           className="profileFriends"
           onClick={(e)=>{
             e.preventDefault();
             navigate(`/profile/${friend._id}`);
            window.location.reload(false); 

           }} 
          />
          <span className="profileFriendsName">{friend.fullname}</span>
          </div>

        ))
        }
        </div>
        
        
        
      </ul>
    
  </>
    )




  }
  const HomeRightbar=()=>{
    return(
<>
<div className="rightbarTop">
        <div className="rightbarTopleft">
          <span className="rightbarTopText">Friends</span>
          </div>
          <div className="rightbarTopRight">
          <VideoCall/>
          <Search/>
          <MoreHoriz/>
          </div>
      </div>
      <hr className="rightbarHr" />
      <ul className="rightbarContactsList">
        {isEmpty?<span style={{'fontWeight':'lighter','marginLeft':'55px'}}>No friends!</span>
        :
        friendsList.map((friend)=>(
          <Online key={friend._id} friends={friend} />
        ))
        }
        
        
      </ul>


  
</>




    )



  }
  return (
    
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {id?id===currentuser._id?<ProfileRigthbar/>:console.log('empty'):<HomeRightbar/> }
      
      
      </div>
      
    </div>
  )
}
