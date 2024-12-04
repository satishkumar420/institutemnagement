import React, { useState } from "react";
import "../components/style.css";
import axios from "axios"
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {

  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  const [image,setImage] = useState(null)
  const [imageUrl,setImageUrl] = useState("")
  const [Loading,setLoading] = useState(false)


  const navigate = useNavigate();


 const submitHandler = (e) =>{
  e.preventDefault();
  setLoading(true)
  const formData = new FormData();
  formData.append('fullName',fullName)
  formData.append('email',email)
  formData.append('phone',phone)
  formData.append('password',password)
  formData.append('image',image)
  
  axios.post("http://localhost:3000/user/signup",formData)
  .then(res=>{
    setLoading(false)
    toast.success("Account is Created..")
    navigate('/login')
    console.log(res)
  })
  .catch(err=>{
    setLoading(false)
    toast.error("something wrong ....");
    console.log(err)
  })
 }

const fileHandler = (e) =>{
  setImage(e.target.files[0])
  setImageUrl(URL.createObjectURL(e.target.files[0]))
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
          <h1>Create Your Account</h1>

          <form onSubmit={submitHandler} className="signup-form">
            <input onChange={(e)=>{setFullName(e.target.value)}} type="text" placeholder="Institute Name" required />
            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email"  required />
            <input onChange={(e)=>{setPhone(e.target.value)}}  type="text" placeholder="Phone"   required/>
            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password"  required />
            <input onChange={fileHandler} type="file" required />
            {imageUrl && <img className="your-logo graphic" src={imageUrl} alt="your logo" />}
            <button className="submit-btn" type="submit" > {Loading && <img className="loader" src={require("../assets/load.gif")} alt="" /> } Submit</button>
            <Link className="link" to="/login"><u>Login With Your Account</u></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
