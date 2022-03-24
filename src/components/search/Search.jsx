import React,{useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import {Search} from '@mui/icons-material';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import './Search.css'
import axios from 'axios';
import { Avatar } from '@mui/material';
import { Link, generatePath,useNavigate } from 'react-router-dom';

export default function SearchFriends() {
  const navigate=useNavigate();
    const url="http://localhost:4000/";
    const [searchitem,setSearchItem]=useState("");
    const[users,setUsers]=useState('');
      
    const handleClick=(e)=>{
      e.preventDefault()
        getResult()
    }
    const handleSearch=(e)=>{
      const data=e.target.value
      if(data===''){
        setUsers('');
      }
      setSearchItem(data);
    }
    const getResult=async ()=>{
      await  axios.get(`http://localhost:4000/store/search?name=${searchitem}`)
        .then((res)=>{
          
           setUsers(res.data);
        })
        .catch(err=>console.log(err));
    }
   
    
const isEmpty=Object.keys(users).length===0;
  return (
      <div className="searchContainer">
         <div className="searchbar">
          <Search className='searchIcon'/>
          <form onSubmit={(e)=>handleClick(e)}>
          <input placeholder='Search Friends' type='text'  
          value={searchitem} 
          onChange={handleSearch} 
          className="searchInput" />
        </form>

          </div>
{
    !isEmpty? <Box sx={{ display: { xs: 'none', md: 'block' } ,width:'100%',marginLeft:'25px',height:'150px',overflowY: 'scroll', bgcolor: 'background.paper',border:'1px solid rgb(224,224,224);',borderRadius:'1%' }}>
    <nav aria-label="main mailbox folders">
    <List>
    {users.map((user)=>
    <ListItem key={user._id} disablePadding>
      {/* <Link to='/home'> */}
    <ListItemButton 
    onClick={(e)=>{
      e.preventDefault();
      navigate(`/profile/${user._id}`);
      window.location.reload();
    }}>
    <ListItemAvatar>
      <Avatar src={url+user.profilephoto}/>
       </ListItemAvatar>
    <ListItemText primary={user.fullname}/>
    </ListItemButton>
    {/* </Link> */}
    </ListItem>
    )}
</List>
</nav>
    </Box>
:console.log('empty')
    }     
      </div>
    
  );
}