import React, { useEffect, useState } from 'react';
import "../components/style.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';



const AddStudent = () => {




const [fullName,setFullName] = useState('');
const [phone,setPhone] = useState('');
const [email,setEmail] = useState('');
const [address,setAddress] = useState('');
const [courseId,setCourseId] = useState('');
const [image,setImage] = useState(null);
const [imageUrl,setImageUrl] = useState("");
const [Loading,setLoading] = useState(false);
const [courseList,setCourseList] = useState([]);

const navigate = useNavigate()
const location = useLocation()

useEffect(() => {
  getCourses();
if(location.state)
{
  setFullName(location.state.student.fullName)
  setPhone(location.state.student.phone)
  setEmail(location.state.student.email)
  setAddress(location.state.student.address)
  setCourseId(location.state.student.courseId)
  setImageUrl(location.state.student.imageUrl)
}
else
{
  setFullName('')
  setPhone('')
  setEmail('')
  setAddress('')
  setCourseId('')
  setImageUrl('')
}

},[location]);

const getCourses = () => {
  axios.get("http://localhost:3000/course/all-courses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setCourseList(res.data.courses);
      console.log(courseList);
    })
    .catch((err) => {
      console.log(err);
      toast.error("something is wrong");
    });
};

const submitHandler = (e) =>{
  e.preventDefault();
  setLoading(true)
  const formData = new FormData();
  formData.append('fullName',fullName)
  formData.append('email',email)
  formData.append('phone',phone)
  formData.append('address',address)
  formData.append('courseId',courseId)
  if(image)
  {
    formData.append('image',image)
  }


  if(location.state)
  {
    axios.put('http://localhost:3000/student/'+location.state.student._id,formData,{
      headers:{
        Authorization:"Bearer " + localStorage.getItem('token')
      }
    }
    )
  .then(res=>{
    setLoading(false)
    console.log(res)
    toast.success("Student Updated.....")
    navigate("/dashboard/student-detail/"+location.state.student._id)
  })
  .catch(err=>{
     setLoading(false)
    console.log(err)
    toast.error('something error')
  })
  }
  
  else
  {
    axios.post('http://localhost:3000/student/add-student',formData,{
      headers:{
        Authorization:"Bearer " + localStorage.getItem('token')
      }
    }
    )
  .then(res=>{
    console.log(res)
    setLoading(false)
    console.log(res)
    toast.success("Student Added.....")
    navigate("/dashboard/students")
  })
  .catch(err=>{
     setLoading(false)
    console.log(err.message)
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
      <h1>{location.state ? "Update Student" : "Add New Student"}</h1>
        <input required value={fullName} onChange={(e)=>{setFullName(e.target.value)}} type="text" placeholder='student Name' />
        <input required value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='email' />
        <input required value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="number" placeholder='phone' />
        <input required value={address} onChange={(e)=>{setAddress(e.target.value)}} type="text" placeholder='address' />
        <select value={courseId} onChange={(e)=>setCourseId(e.target.value)}>
         <option value="select course"> Select Course</option>
          {
            courseList.map((course)=>(
              <option value={course._id}>{course.courseName}</option>
            ))
          }
        </select>
        <input required={!location.state} type="file" onChange={fileHandler} />
        {imageUrl && <img className="your-logo" src={imageUrl} alt="Student logo" />}
        <button className="logout-btn" type="submit" > { Loading && <img className="loader" src={require("../assets/load.gif")} alt="" /> } Submit</button>
        {/* <button className="logout-btn" type="submit" > {Loading &&  <i class="fas fa-spinner fa-spin fa-pulse"></i>}  Submit</button> */}

      </form>
    </div> 
  );
}

export default AddStudent;
