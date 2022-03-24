import {React,useState,useRef, useContext} from 'react'
import './Login.css'
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button,CircularProgress } from '@mui/material';
import {Link,useNavigate} from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginCall } from '../../apicalls';
import {AuthContext} from '../../context/AuthContext'
import axios from'axios';
export default function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  // const navigate=useNavigate()
  // const{user,isFetching,error,dispatch}=useContext(AuthContext);
  const{user,setUser}=useContext(AuthContext);

  const handleemail=(e)=>{
    e.preventDefault()    
    setEmail(e.target.value)
    // console.log(e.target.value)
    }

  const handlepassword=(e)=>{
        e.preventDefault()    
        setPassword(e.target.value)
    }
    const handleClick=async (e)=>{
      e.preventDefault();
      let userCredentials={
        email,
        password
      }
    
    //  const result=loginCall(user,dispatch);
    // loginCall(userCredentials);
      // console.log(result)
     await axios.post('http://localhost:4000/store/login',userCredentials)
      .then(({data})=>{
        if(data.User){
          toast.success(data.msg);
          setUser(data.User);
          
        // setTimeout(()=>{
        //   navigate('/home',{state:data.User});
        //   // navigate(`/profile/${data.User._id}`);
        // },2000);
      }
        else{
          toast.error(data.msg);
        };
      })
      .catch(err=>console.log(err))
    }
    // console.log(user);

  return (
    <div className='loginContainer'>
        <div className="loginWrapper">
            <img src="/assets/pages/loginlogo1.png" alt="" className="loginLogo" />
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
     <form action="submit" onSubmit={handleClick}>
      <TextField
        id="input-with-icon-textfield"
        type="email"
        label="Email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
         name={email}
        value={email}
        variant="standard"
        onChange={handleemail}
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
        name={password}
        value={password}
        variant="standard"
        onChange={handlepassword}
      />
      <Box className='buttonBox' style={{'marginTop':'20px','marginBottom':'-10px'}}>
      <Button variant="contained" type='submit' className='loginButton'>
       {/* {isFetching ?<CircularProgress style={{'color':'white','fontSize':'2px'}} /> :'Login'} */}
       Login
        </Button>
        <ToastContainer autoClose={2000}  />
      </Box>
      </form>
    </Box>
    <div className="info">not have an account?<Link to='/register'> Click here</Link></div>
        </div>

    </div>
  )
}
