import React, { useState } from 'react'
import './Share.css'
import {PermMedia,Mood,People,Cancel} from '@mui/icons-material'
import ShareIcon from '@mui/icons-material/Share';
import {Modal,Box,Button } from '@mui/material'
import axios from 'axios';
import {useParams} from 'react-router-dom';

export default function Share({user}) {
    // console.log(user);
    const {id}=useParams();
    const url="http://localhost:4000/";
    // console.log(url+user.profilephoto);
    
    
    const [open,setOpen]=useState(false);
    const [post,setPost]=useState({desc:"",img:""});
    const handlePost=(e)=>{
        e.preventDefault();
        setPost(post=>({...post,desc:e.target.value}))
    }
    // console.log(post);
    const handlePostImg=(e)=>{
        e.preventDefault();
        setPost(post=>({...post,img:e.target.files[0]}))
    }
    // console.log(post.desc);

    const handlePostUpload=async (e)=>{
        e.preventDefault();
        const formdata=new FormData();
        formdata.append('desc',post.desc);
        formdata.append('postimg',post.img);
        formdata.append('user',id?id:user._id);
      await axios.post('http://localhost:4000/store/createpost',formdata)
             .then((res)=>{
                 console.log(res.data)
             })
             .catch(err=>console.log(err));
        setOpen(false);
        setPost(post=>({...post,desc:'',img:''}));
        window.location.reload();
    }


    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid white',
        borderRadius:'10px',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };
    
  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
            <img src={url+user.profilephoto} alt="" className="shareProfileImg" />
            <input placeholder="what's on your mind?" onClick={()=>{setOpen(true)}} className="shareInput" />
            <Modal
                open={open}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                
              >
                <Box sx={{ ...style, width: 500 ,height:400}}>
                    <div className="postTop">
                    <h2 style={{marginLeft:'170px'}} id="parent-modal-title">Create Post</h2>
                    <Cancel className='cancelButton' onClick={()=>{setOpen(false)}}/>
                    </div>
                  <hr className='postModalBreak'/>
                  <div className="createPost">
                      <div className="createPostBottom">
                      <img src={url+user.profilephoto} alt="" className="shareProfileImg" />
                      <h5 className="profileName">{user.fullname}</h5>
                      </div>
                      <input placeholder="what's on your mind?" type='text' name='postinput' onChange={handlePost} className="postInput" />
                        <div className="postphoto">
                        <label htmlFor="upload-photo">
                        <input
                            style={{ display: 'none' }}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            onChange={handlePostImg}
                        />

                        <Button  className='postImgButton' color="inherit" variant="contained" component="span" >
                            Add Photo/Video
                        </Button>
                        </label>
                        
                        
                      <Button style={{marginLeft:'35%',marginTop:'10px'}} className='postButton' onClick={handlePostUpload} color="primary" variant="contained" component="span" >
                   Post
                  </Button>
                  </div>
                  </div>
                </Box>
              </Modal>
            </div>
            <hr className='shareHr'/>
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                        <PermMedia htmlColor='tomato'className='shareIcon'/>
                        <span className="shareOptionText"> Photo/Video</span>
                    </div>
                    <div className="shareOption">
                        <Mood htmlColor='blue'className='shareIcon'/>
                        <span className="shareOptionText"> Mood</span>
                    </div>
                    <div className="shareOption">
                        <People htmlColor='black' className='shareIcon'/>
                        <span className="shareOptionText"> Find Friends</span>
                    </div>
                </div>
                <div className="shareButtondiv">
                
                <button className="shareButton"> <ShareIcon className='shareImg'/>Share</button>
                </div>
                
                
            </div>
        </div>
        
        </div>
  )
}
