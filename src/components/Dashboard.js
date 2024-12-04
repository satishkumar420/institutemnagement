import React, { useState } from "react";
import "../components/style.css";
import SideNav from "./SideNav";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
const logoutHandler = () =>{
   localStorage.clear();
   navigate("/login")
}


  return (
    <div className="dashboard-main">
      <div className="dashboard-container">
        <SideNav />
        <div className="main-container">

          <div className="main-bar">

            <div className="logo-container">
              <img className="main-logo" src={localStorage.getItem("imageUrl") }  alt="main logo"/>
            </div>

            <div className="logout">
              <h2 className="main-heading">{localStorage.getItem("fullName")}</h2>
              <button className="logout-btn" onClick={logoutHandler} > { loading && <img className="loader" src={require("../assets/load.gif")} /> } Logout </button>
              {/* <button  className="logout-btn" onClick={logoutHandler}>Logout</button> */}
            </div>

          </div>
          
          <div className="outlet-bar">
          <Outlet/>
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
