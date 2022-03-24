import Home from "./pages/home/Home.jsx";
import Profile from './pages/profile/Profile'
import {Routes,Route,Navigate} from 'react-router-dom';
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.js";
function App() {
const {user}= useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user? <Home/>:<Login/>}/>
        <Route path="/profile/:id"  element={<Profile/>}/>
        <Route exact path="/login" element={user?<Navigate to='/'/>:<Login/>}/>
        <Route path="/register" element={user?<Navigate to='/'/>:<Register/>}/>
        </Routes>
    </div>
  );
}

export default App;
