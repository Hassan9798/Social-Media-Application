import React, { useContext, useEffect, useState } from 'react'
import './Topbar.css'
import { Search,Person,Chat,Notifications,ArrowDropDown } from '@mui/icons-material'
import {Menu,MenuItem} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import SearchFriends from '../search/Search'
import { AuthContext,setLocalStorage } from '../../context/AuthContext'
import axios from 'axios';
export default function Topbar({user,currentuser,profilepic}) {
  const navigate=useNavigate();
 
  const url="http://localhost:4000/";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogut=(e)=>{
    e.preventDefault();
    setLocalStorage("user", null);
    navigate('/login');
    window.location.reload();

    
  }
  const handleProfile=()=>{
    navigate(`/profile/${user._id?user._id:currentuser._id}`);
    window.location.reload();
  }
  
  return (
    <div className='topbarContainer'>
        <div className="topbarLeft">
          <span className='logo'>Hassan's Book</span>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
          <SearchFriends/>
          {/* <input placeholder='please type' className="searchInput" /> */}
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
           <span className="topbarLink" ><Link to='/' style={{textDecoration: 'none',color:'unset'}}>Home</Link> </span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
            <Person/>
            <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
            <Chat/>
            <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
            <Notifications/>
            <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <div className="topbarImage">
            
            {console.log(user)}

          <img src={profilepic?profilepic:user.profilephoto?url+user.profilephoto:'/assets/person/avatar1.png'} onClick={handleClick} className="topbarImg" />
          <div className="topbarImgArrow">
          <ArrowDropDown className='ArrowDrop' />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogut}>Logout</MenuItem>
          </Menu>
          </div>
          </div>
          
          
        </div>
        
        </div>
  )
}

