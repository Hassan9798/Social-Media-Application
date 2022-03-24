import axios from 'axios';
import {useContext} from 'react';
import {AuthContext} from './context/AuthContext';
// const {setUser}=useContext(AuthContext);
export const loginCall=async (usercredential)=>{
// dispatch({type:'LOGIN_START'});
try{
const res=await axios.post('http://localhost:4000/store/login',usercredential)
// setUser(res.data.User);
// console.log(user);
// dispatch({type:'LOGIN_SUCCESS',payload:res.data.User});
}
catch(err){
    console.log(err);
// dispatch({type:'LOGIN_FAILURE',payload:err})
    
}


}