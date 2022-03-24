import {React,useContext, useEffect, useState} from 'react'
import './Home.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import {useLocation} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios'
export default function Home() {
  const [user,setUser]=useState('');
  const {user:currentuser}=useContext(AuthContext);

  useEffect(()=>{
    getUser();
  },[])
const getUser=async()=>{
  try{
  await axios.get(`http://localhost:4000/store/getuser/${currentuser._id}`)
  .then((res)=>{
    setUser(res.data);
  })
    
  }
  catch(err){
    console.log(err);
  }
}
  return (
    <div>
      {console.log(user)}
      <Topbar user={user}/>
      <div className="homeContainer">
      <Sidebar/>
      <Feed user={user} />
      <Rightbar user={user}/>
      </div>
    

    </div>
  )
}

