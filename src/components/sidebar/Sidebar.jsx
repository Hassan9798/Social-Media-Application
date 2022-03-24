import React from 'react'
import './Sidebar.css'
import { Feed,Chat,Settings,MusicVideo,Event,School,Groups } from '@mui/icons-material'
export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
            <Feed className='sidebarListIcon'/>
            <span className="sidebarListItemText">
              Home
            </span>
            </li>
            <li className="sidebarListItem">
            <Chat className='sidebarListIcon'/>
            <span className="sidebarListItemText">
              Chat
            </span>
            </li>
            <li className="sidebarListItem">
            <Settings className='sidebarListIcon'/>
            <span className="sidebarListItemText">
              Settings
            </span>
            </li>
            <li className="sidebarListItem">
            <MusicVideo className='sidebarListIcon'/>
            <span className="sidebarListItemText">
              Video
            </span>
            </li>
            <li className="sidebarListItem">
            <Event className='sidebarListIcon'/>
            <span className="sidebarListItemText">
              Event
            </span>
            </li>
            <li className="sidebarListItem">
            <School className='sidebarListIcon'/>
            <span className="sidebarListItemText">
              School
            </span>
            </li>
            <li className="sidebarListItem">
            <Groups className='sidebarListIcon'/>
            <span className="sidebarListItemText">
              Groups
            </span>
            </li>
          </ul>
          <button className="sidebarButton">Show more</button>
          <hr className='sidebarHr' />
          <ul className="sidebarFriendList">
            <li className="sidebarFriend">
              <img src="/assets//person/Hassan5.jpg" alt="" className="sidebarFriendImg" />
              <span className="sidebarFriendName">Hassan khan</span>
            </li>
            <li className="sidebarFriend">
              <img src="/assets//person/Hassan4.jpg" alt="" className="sidebarFriendImg" />
              <span className="sidebarFriendName">Hassan khan</span>
            </li>
            <li className="sidebarFriend">
              <img src="/assets//person/Hassan3.jpg" alt="" className="sidebarFriendImg" />
              <span className="sidebarFriendName">Hassan khan</span>
            </li>
            <li className="sidebarFriend">
              <img src="/assets//person/Hassan6.jpg" alt="" className="sidebarFriendImg" />
              <span className="sidebarFriendName">Hassan khan</span>
            </li>
          </ul>
        
        </div>
    </div>
  )
}
