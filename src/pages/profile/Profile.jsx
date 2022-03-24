import React, { useContext, useEffect, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import {AuthContext,setLocalStorage} from '../../context/AuthContext';
import { IconButton,styled,Modal,Box,Button } from '@mui/material'
import { PhotoCamera,Cancel } from '@mui/icons-material'
import {useParams} from 'react-router-dom';
import './Profile.css'
import axios from 'axios'
export default function Profile() {
  const url="http://localhost:4000/";
  const {user:currentuser}=useContext(AuthContext);
  const [currentUser,setCurrentUser]=useState(currentuser);
  const {id}=useParams();
  const [name,setName]=useState('');
  const [profilepic,setProfilepic]=useState('');
  const [coverpic,setCoverpic]=useState('');
  const [openp, setOpenp] = React.useState(false);
  const [openc, setOpenc] = React.useState(false);
  const [previewimg,setPreviewimg]=useState('');
  const [user,setUser]=useState('');
  const[followed,setFollowed]=useState(currentUser.followings.includes(user._id));
  useEffect(()=>{
  getCurrentUser();
  // setFollowed(currentUser.followings.includes(user._id));
  },[currentuser,followed])

  const getCurrentUser=async()=>{
    try{
      await axios.get(`http://localhost:4000/store/getuser/${currentuser._id}`)
      .then((res)=>{
        console.log(res.data)
        setCurrentUser(res.data);
      })
    }
    catch(err){
      console.log(err);
    }
   
  }

 useEffect(()=>{
      getuser();
  },[profilepic,coverpic]);
 
  const getuser=async ()=>{
   await axios.get(`http://localhost:4000/store/getuser/${id}`)
    .then((res)=>{  
      setUser(res.data);
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const coverp=url+user.coverphoto;
  const profilep=url+user.profilephoto;
  const handleOpenp = (e) => {
    setOpenp(true);
  };
  const handleOpenc = (e) => {
    setOpenc(true);
  };
  
  const handleprofileimage=(e)=>{
    // console.log(e.target.name);
    setName(e.target.name);
    setProfilepic(e.target.files[0]); 
   setPreviewimg(URL.createObjectURL(e.target.files[0]));
  }
  const handlecoverimage=(e)=>{
    // console.log(e.target.files[0]);
    setName(e.target.name)
    setCoverpic(e.target.files[0]); 
   setPreviewimg(URL.createObjectURL(e.target.files[0]));
  }

  const handleprofileClick=async (e)=>{
    e.preventDefault();
    setOpenp(false);
    setPreviewimg('');
    const formData=new FormData();
    formData.append('id',id)
    formData.append('name',name)
    formData.append('profile',profilepic)
    // console.log(profilepic);
   
  await axios.post('http://localhost:4000/store/upload',formData)
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err));
    getuser()
    
  }
  const handlecoverClick=async (e)=>{
    // console.log(coverpic);
    e.preventDefault();
    setOpenc(false);
    setPreviewimg('');
    const formData=new FormData();
    console.log(name);
    formData.append('id',id)
    formData.append('name',name)
    formData.append('profile',coverpic)
    console.log(formData);
    await axios.post('http://localhost:4000/store/upload',formData)
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err))
    getuser();
    
  }

  const handleFollowEvent=async(e)=>{
    e.preventDefault();
    console.log(currentUser.followings.includes(user._id))
    if(currentUser.followings.includes(user._id)===false){
      await axios.put(`http://localhost:4000/store/${currentUser._id}/follow`,{userId:user._id})
                  .then((res)=>{
                    console.log(res.data);
                  })

    }
    else{
      await axios.put(`http://localhost:4000/store/${currentUser._id}/unfollow`,{userId:user._id})
      .then((res)=>{
        console.log(res.data);
      })

    }
   setFollowed(!followed);
  }
  

    const style = {
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      borderRadius:'10%',
      boxShadow: 24,
      pt: 2,
      px: 4,
      pb: 3,
    };
  

  const Input = styled('input')({
    display: 'none',
  });
  return (
    <div>
      <div>
      <Topbar currentuser={currentuser} profilepic={profilep}/>
      <div className="profile">
        <Sidebar/>
        <div className="profileRight">
        <div className="profileTop">
          <div className="profileCover">
            
            <img src={coverp} alt="" className="profileCoverImg" />
            <div className="coverIcon">  
            <PhotoCamera  className ='cameraCoverIcon' name='covercamera' onClick={handleOpenc} />
            <Modal
                open={openc}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                
              >
                <Box sx={{ ...style, width: 400 }}>
                <Cancel className='CancelButton' 
                onClick={()=>{
                  setOpenc(false)
                  setPreviewimg('')
                   setCoverpic('')
                  }}/>

                  <h2 style={{marginLeft:'130px'}} id="parent-modal-title">Upload Cover</h2>
                  <div className="modalProfileImg">
                 {previewimg?<img src={previewimg} alt="" className="uploadImage" />:'No File is Choosen'} 
                  <p id="parent-modal-description">
                   {coverpic.name}
                  </p>
                  </div>
                  
                  <div className="profilepicicons">
                  <label htmlFor="upload-photo">
                  <input
                    style={{ display: 'none' }}
                    id="upload-photo"
                    name="coverpic"
                    type="file"
                    onChange={handlecoverimage}
                  />
                  <Button color="secondary" variant="contained" component="span">
                   Choose File
                  </Button> 
                </label>
                <Button color="secondary" variant="contained" component="span" onClick={handlecoverClick}>
                   Upload
                  </Button>
                  </div>
                </Box>
              </Modal>
            </div>

          <img src={profilep} alt="" className="profileUserImg" />
          <div className="userIcon">
          <PhotoCamera  className ='cameraCoverIcon' onClick={handleOpenp} />
            <Modal
                open={openp}
                
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 400 }}>
                <Cancel className='CancelButton'
                 onClick={()=>{
                   setOpenp(false)
                   setPreviewimg('')
                   setProfilepic('')
                }}/>
                  <h2 style={{marginLeft:'130px'}} id="parent-modal-title">Upload profilepic</h2>
                  <div className="modalProfileImg">
                 {previewimg?<img src={previewimg} alt="" className="uploadImage" />:'No File is Choosen'} 
                  <p id="parent-modal-description">
                   {profilepic.name}
                  </p>
                  </div>
                  
                  <div className="profilepicicons">
                  <label htmlFor="upload-photo">
                  <input
                    style={{ display: 'none' }}
                    id="upload-photo"
                    name="profilepic"
                    type="file"
                    onChange={handleprofileimage}
                  />
                  <Button color="secondary" variant="contained" component="span">
                   Choose File 
                  </Button> 
                </label>
                <Button color="secondary" variant="contained" component="span" onClick={handleprofileClick}>
                   Upload
                  </Button>
                  </div>
                </Box>
              </Modal>
          </div>
          
          
        
          </div>
          <div className="profileInfo">
            <h4 className="profileUsername">{user.fullname}</h4>
            {id!==currentuser._id && (
              <div className="follow">
              <button className='followButton' onClick={handleFollowEvent}>
                {((currentUser.followings.includes(user._id))===true)?'unFollow':'Follow'}
              </button>
              </div>
              
            )}
          </div>
        
        </div>
        <div className="profileBottom">
        <Feed className='feed' user={user} />
        </div>
        </div> 
        <Rightbar/>

      </div>
    

    </div>
    </div>
  )
}
