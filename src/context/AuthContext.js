import { createContext, useReducer,useState,useEffect } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE={
user:null,
// {coverphoto: "uploads\\DSC_7942.JPG",
// createdAt: "2022-03-16T14:35:27.868Z",
// email: "hassan@gmail.com",
// follower: [],
// followings: ['623204dd5697dc9de8031cbc', '62337367d1103988c0365ee5'],
// fullname: "hassan khan",
// password: "$2b$10$q7eEMZ1BJqM98lF8onoKyeJN.y6.8GstYx9StJowuwjrRc/T8C1Ue",
// profilephoto: "uploads/DSC_7942.JPG",
// updatedAt: "2022-03-21T13:49:33.238Z",
// __v: 0,
// _id: "6231f5af5697dc9de8031840"},
isFetching:false,
error:false

};

export const AuthContext=createContext(INITIAL_STATE);
export function setLocalStorage(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log(e);
      // catch possible errors:
      // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    }
  }
  
  function getLocalStorage(key, initialValue) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      // if error, return initial value
      return initialValue;
    }
  }
export const AuthContextProvider=({children})=>{
    const [user, setUser] = useState(() => getLocalStorage("user", INITIAL_STATE.user));
    // const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE);
    useEffect(() => {
        setLocalStorage("user", user);
      }, [user]);
      // console.log(INITIAL_STATE);
    return(
        <AuthContext.Provider
        value=
        {{
            user,
            setUser
            // isFetching:state.isFetching,
            // error:state.error,
            // dispatch
        }}
        >
         {children}  

        </AuthContext.Provider>



    )

};