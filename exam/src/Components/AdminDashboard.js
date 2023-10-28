import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import SideBar from "./SideBar";
import Cookies from 'js-cookie';

import {setuserData} from "../Features/Slices/userDataSlice"

function AdminDashboard() {
  const navigate = useNavigate();
const dispatch=useDispatch()

  


  const callPage=async()=>{
    try{
      const res= await fetch("http://localhost:9000/api/admin-dashboard",{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"

        },
        credentials:"include"
      })

      const data=await res.json();
      dispatch(setuserData(data.userId))
            console.log("my data is",data.userId);

      if(res.status=== 401){
        const error=new Error(res.error)
        navigate("/login-teachers")

        throw error

      }

    }
    catch(err){
        console.log(err);
        navigate("/login-teachers")
     

    }
  }
  


  useEffect(() => {
      callPage();

  },[]); 

  return (
    <>
      <SideBar />

    hellot
      
 

    
    </>
  );
}


export default AdminDashboard;
