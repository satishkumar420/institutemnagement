import React, { useEffect, useState } from 'react';
import "../components/style.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const AddCourse = () => {



const [courseName,setCourseName] = useState('');
const [description,setDescription] = useState('');
const [price,setPrice] = useState('');
const [startingDate,setStartingDate] = useState('');
const [endDate,setEndDate] = useState('');
const [image,setImage] = useState(null)
const [imageUrl,setImageUrl] = useState("")
const [Loading,setLoading] = useState(false)

const navigate = useNavigate();
const location = useLocation();

useEffect(()=>{
  if(location.state)
  {
   setCourseName(location.state.course.courseName)
   setDescription(location.state.course.description)
   setPrice(location.state.course.price)
   setStartingDate(location.state.course.startingDate)
   setEndDate(location.state.course.endDate)
   setImageUrl(location.state.course.imageUrl) 
  }
  else{
    setCourseName('')
    setDescription('')
    setPrice(0)
    setStartingDate('')
    setEndDate('')
    setImageUrl('') 
  }
   
},[location])



const submitHandler = (e) =>{
  e.preventDefault();
  setLoading(true)
  const formData = new FormData();
  formData.append('courseName',courseName)
  formData.append('price',price)
  formData.append('description',description)
  formData.append('startingDate',startingDate)
  formData.append('endDate',endDate)
  console.log(courseName,price,description,startingDate,endDate)
  if(image)
  {
    formData.append('image',image)
  }


  if(location.state)
  {
    axios.put('http://localhost:3000/course/'+location.state.course._id,formData,{
      headers:{
        Authorization:"Bearer " + localStorage.getItem('token')
      }
    }
    )
  .then(res=>{
    setLoading(false)
    console.log(res)
    toast.success("Course Updated.....")
    navigate("/dashboard/course-detail/"+location.state.course._id)
  })
  .catch(err=>{
     setLoading(false)
    console.log(err)
    toast.error('something error')
  })
  }
  else
  {
    axios.post('http://localhost:3000/course/add-course',formData,{
      headers:{
        Authorization:"Bearer " + localStorage.getItem('token')
      }
    }
    )
  .then(res=>{
    console.log(res)
    setLoading(false)
    console.log(res)
    toast.success("Course Added.....")
    navigate("/dashboard/courses")
  })
  .catch(err=>{
     setLoading(false)
    console.log(err)
    toast.error('something error')
  })
  }

  

}

const fileHandler = (e) =>{
  setImage(e.target.files[0])
  setImageUrl(URL.createObjectURL(e.target.files[0]))
}

  return (
    <div>
      <form onSubmit={submitHandler} className='signup-form'>
        <h1>{location.state ? "Update data" : "Add New Course"}</h1>
        <input value={courseName}  required onChange={(e)=>{setCourseName(e.target.value)}} type="text" placeholder='Course Name' />
        <input value={description} required  onChange={(e)=>{setDescription(e.target.value)}} type="text" placeholder='description' />
        <input value={price} required  onChange={(e)=>{setPrice(e.target.value)}} type="text" placeholder='price' />
        <input value={startingDate} required  onChange={(e)=>{setStartingDate(e.target.value)}} type="text" placeholder='starting Date (YY/MM/DD)' />
        <input value={endDate} required  onChange={(e)=>{setEndDate(e.target.value)}} type="text" placeholder='end Date (YY/MM/DD)' />
        <input  required={!location.state} type="file" onChange={fileHandler} />
        {imageUrl && <img className="your-logo" src={imageUrl} alt="yourlogo" />}
        <button className="logout-btn" type="submit" > { Loading && <img className="loader" src={require("../assets/load.gif")} alt="" /> } Submit</button>
        {/* <button className="logout-btn" type="submit" > {Loading &&  <i class="fas fa-spinner fa-spin fa-pulse"></i>}  Submit</button> */}

      </form>
    </div> 
  );
}

export default AddCourse;
