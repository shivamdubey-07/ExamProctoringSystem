import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import axios from "axios";

import { setuserData } from "../Features/Slices/userDataSlice";
import QuestionList from "./question/QuestionList";
import { data } from "jquery";

function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const callPage = async () => {
      try {

        const res = await axios.post(
          "https://exam-backend-0p6v.onrender.com/api/admin-dashboard",
         
          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );


        // const res = await fetch("https://exam-backend-0p6v.onrender.com/api/admin-dashboard", {
        //   method: "GET",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        //   credentials: "include",
        // });

        const data = await res.json();
        console.log("data here",data)
        
        dispatch(setuserData(data.userId));
        console.log("my data is", data.userId);

        if (res.status === 401) {
          const error = new Error(res.error);
          navigate("/login-teachers");

          throw error;
        }
      } catch (err) {
        console.log(err);
        navigate("/login-teachers");
      }
    };

    callPage();
  });

  return (
    <>
      <SideBar />
      {data.code}

      <QuestionList />
    </>
  );
}

export default AdminDashboard;
