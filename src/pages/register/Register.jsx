import {React,useState} from 'react'
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Button,styled} from '@mui/material';
import {toast,ToastContainer} from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'
import axios from'axios';
export default function Register() {
  const [fullname,setFullname]=useState("")
  const [photo,setPhoto]=useState("a")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  // const [selectedFile,setSelectedFile]=useState(null);
  const navigate=useNavigate();

  const handlename=(e)=>{
    e.preventDefault()    
    setFullname(e.target.value)
    
    }

    const handleemail=(e)=>{
        e.preventDefault()    
        setEmail(e.target.value)
    }

    const handlepassword=(e)=>{
        e.preventDefault()    
        setPassword(e.target.value)
    }

    const handleclick=()=>{
      
      let user={
        fullname,
        email,
        password

      }
      
      axios.post('http://localhost:4000/store/register',user)
      .then((res)=>{
        if(res.data.User){
          toast.success('registered sucessfully');
        setTimeout(()=>{
          navigate('/');
        },2000);
      }
        else{
          toast.error(res.data.msg);
        }
      })
      .catch((err)=>{
        console.log(err);
      })
      

      
     
    }
    // const handleUploadClick=(e)=>{

    //   const file=e.target.files[0];
    //   setSelectedFile(file);
    //     console.log(file);
    

    // }





    const Input = styled('input')({
      display: 'none',
    });
  return (
    <div className='registerContainer'>
        {/* <img src="/assets/pages/login1.jpeg" alt="" className="registerImage" /> */}
        <div className="registerWrapper">
            {/* <span className="loginLogo">Login</span> */}
            <img src="/assets/pages/loginlogo1.png" alt="" className="registerLogo" />
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
     
      <TextField
        id="input-with-icon-textfield"
        label="Fullname"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
        value={fullname}
        onChange={handlename}
      />
      <TextField
        id="input-with-icon-textfield"
        label="Email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
        onChange={handleemail}
        value={email}
      />
      
      <TextField
        id="input-with-icon-textfield"
        type="password"
        label="Password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
        onChange={handlepassword}
        value={password}
      />
      <Box className='buttonBox'>
      <Button onClick={handleclick} variant="contained" color='success' className='registerButton'>
        Signup
        </Button>
        <ToastContainer autoClose={2000}  />
      </Box> 
    </Box> 
    <div className="info">already have an account?<Link to='/'> Click here</Link></div>
        </div>

    </div>
  )
}
