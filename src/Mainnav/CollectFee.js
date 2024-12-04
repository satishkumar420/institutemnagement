import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CollectFee = () => {

const [fullName,setFullName] = useState('');
const [phone,setPhone] = useState('');
const [amount ,setAmount] = useState(0)
const [remark,setRemark] = useState('')
const [courseId,setCourseId] = useState('')
const [courseList,setCourseList] = useState([])
const [Loading,setLoading] = useState(false);

const navigate = useNavigate()


useEffect(()=>{
  getCourses()
},[])

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
}

const submitHandler = (e) =>{
e.preventDefault();
axios.post('http://localhost:3000/fee/add-fee',{
  fullName:fullName,
  amount:amount,
  phone:phone,
  remark:remark,
  courseId:courseId
},{
  headers:{
    Authorization:"Bearer " + localStorage.getItem('token')
  }
}
)
.then(res=>{
setLoading(false)
console.log(res.data)
toast.success("Fee Payed.....")
navigate("/dashboard/pay-history")
})
.catch(err=>{
 setLoading(false)
console.log(err)
toast.error('something error')
})
}

  return (
    <div className='fee-box'>
      <h1>Collect Fee</h1>
      <div className='fee-box-wrap'>
      <form onSubmit={submitHandler} className="signup-form">
            <input onChange={(e)=>{setFullName(e.target.value)}} type="text" placeholder="Full Name" required />
            <input onChange={(e)=>{setPhone(e.target.value)}} type="number" placeholder="Phone"  required />
            <input onChange={(e)=>{setAmount(e.target.value)}}  type="text" placeholder="Amount"   required/>
            <input onChange={(e)=>{setRemark(e.target.value)}} type="text" placeholder="Remark"  required />
            <select value={courseId} onChange={(e)=>setCourseId(e.target.value)}>
         <option value="select course"> Select Course</option>
          {
            courseList.map((course)=>(
              <option value={course._id}>{course.courseName}</option>
            ))
          }
        </select>
            <button className="submit-btn" type="submit" > {Loading && <img className="loader" src={require("../assets/load.gif")} alt="" /> } Submit</button>
          </form>
        </div>
    </div>
  );
}

export default CollectFee;

