import React from 'react';
import {Link, useLocation} from 'react-router-dom'
import"../components/style.css"




const SideNav = () => {

    const location = useLocation();

  return (
    <div className="nav-container">
         <div className="brand-container">
            <img className='main-logo logen' src={require("../assets/hyperlogo.png")} alt="brand logo" />
            <div className='hide-text'>
            <h2 className='brand-name' > Institute Mangement </h2>
            <p className='brand-slogan' >Mange your app in easy way....</p>
            </div>
         </div>

         <div className="menu-container">
            <Link to="/dashboard/home" className={location.pathname === '/dashboard/home' ? 'menu-active-link' :"menu-link adjust" } > <i className='fa-solid fa-house'></i> Home</Link>
            <Link to="/dashboard/courses" className={location.pathname === '/dashboard/courses' ? 'menu-active-link' :"menu-link" }> <i className='fa-solid fa-book'></i>  All Course</Link>
            <Link to="/dashboard/add-course" className={location.pathname === "/dashboard/add-course"? "menu-active-link" : "menu-link"}> <i className='fa-solid fa-plus'></i>  Add Courses</Link>
            <Link to="/dashboard/students" className={location.pathname==="/dashboard/students" ? "menu-active-link" : "menu-link"}> <i className='fa-solid fa-user-group'></i>  All Students</Link>
            <Link to="/dashboard/add-student" className={location.pathname==="/dashboard/add-student" ? "menu-active-link" :"menu-link"}> <i className='fa-solid fa-plus'></i>  Add Students</Link>
            <Link to="/dashboard/collect-fee" className={location.pathname === "/dashboard/collect-fee" ? "menu-active-link" : "menu-link" }> <i className="fa-brands fa-paypal"></i> Collect Fee</Link>
            <Link  to="/dashboard/pay-history" className={location.pathname === "/dashboard/pay-history" ? "menu-active-link" : "menu-link"}> <i class="fa-regular fa-circle-xmark"></i> Payment History</Link>

         </div>

         <div className="contact-us">
            <p><i className='fa-solid fa-address-card'></i>  Contact Devloper</p>
            <p><i className='fa-solid fa-phone'></i>  +8628846594</p>
         </div>

        </div>
  );
}

export default SideNav;
