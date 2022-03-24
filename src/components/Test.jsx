import { TextField } from '@mui/material';
import React, { useRef } from 'react'

function Test() {
    const username=useRef();
    const handleClick=(e)=>{

        e.preventDefault();
        console.log(username.current.value);
    }
  return (
    <form onSubmit={handleClick}>
        <TextField type='text' ref={username}/>
        <button type='submit'>
            Submit
        </button>
        
        </form >
  )
}

export default Test