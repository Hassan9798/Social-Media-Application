import React from 'react'
import './Online.css'
export default function Online({friends}) {
  
  const url="http://localhost:4000/";
  return (
    <div>
     
      <li className="rightbarContact">
          <div className="rightbarImgContainer">
          <img src={url+friends.profilephoto} alt="" className="rightbarContactImg" />
          <span className="rightbarOnline"> </span>
          </div>
          <span className="rightbarContactName">{friends.fullname}</span>
        </li>
        
    </div>
  )
}
