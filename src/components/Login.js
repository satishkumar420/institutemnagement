import React, { useState } from "react";
import "../components/style.css";
import axios from "axios"
import { toast } from 'react-toastify';
import { useNavigate , Link } from "react-router-dom";


const Login = () => {

  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [Loading,setLoading] = useState(false)


  const navigate = useNavigate();


 const submitHandler = (e) =>{
  e.preventDefault();
  setLoading(true)

  axios.post("http://localhost:3000/user/login",{
    email:email,
    password:password
  })

  .then(res=>{
    setLoading(false)
    toast.success("Going to Dashboard..")
    localStorage.setItem('token',res.data.token)
    localStorage.setItem('fullName',res.data.fullName)
    localStorage.setItem('imageUrl',res.data.imageUrl)
    localStorage.setItem('imageId',res.data.imageId)
    localStorage.setItem('email',res.data.email)
    


    navigate('/dashboard')
    console.log(res.data)
  })
  .catch(err=>{
    setLoading(false)
    toast.error("Wrong Email or Password ....");
    console.log(err)
  })
 }


  return (
    <div className="signup-wrap">
      <div className="signup-box">
        <div className="signup-left">
          <img
            src={require("../assets/institute logo.png")}
            alt="institute logo"
          />
          <h1 className="left-heading">Hyper Institute</h1>
          <p className="left-pera">Learn code and more.......</p>
        </div>
        <div className="signup-right">
          <h1>Login Your Account</h1>

          <form onSubmit={submitHandler} className="signup-form">
              
            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email"  required />
            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password"  required /> 
            <button className="submit-btn" type="submit" > { Loading && <img className="loader" src={require("../assets/load.gif")} alt="loader" /> } Submit</button>
            {/* <button className="submit-btn" type="submit" > {Loading &&  <i class="fas fa-spinner fa-spin fa-pulse"></i>}  Submit</button> */}
            <Link className="link" to="/signup"><u>Create Your Account</u></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

