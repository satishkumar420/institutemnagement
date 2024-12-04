import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import Student from '../../../api/model/Student';


const Home = () => {
  const [totalCourse,setTotalCourse] = useState(0);
  const [totalStudent,setTotalStudent] = useState(0);
  const [TotalAmount,setTotalAmount] = useState(0)
  const [students,setStudents] = useState([])
  const [Fees,setFees] = useState([])
  useEffect(()=>{
    getHomeDetail()
  },[])

  const getHomeDetail = () =>{

      axios.get("http://localhost:3000/course/home", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          setTotalCourse(res.data.totalCourse)
          setTotalStudent(res.data.totalStudent)
          setTotalAmount(res.data.totalAmount)
          setStudents(res.data.students)
          setFees(res.data.fee)
        })
        .catch((err) => {
          console.log(err);
          toast.error("something error");
        });
    };


  return (
    <div className='home-wrapper'>
      <div className='home-main-wrap'>
     
      <div className='box box1'>
           <h2><i className='fa-solid fa-book'></i> Total Course </h2>
           <p>0{totalCourse}</p>
       </div>
      
      <div className='box box2'>
        <h2> <i className='fa-solid fa-user-group'></i> Total Student</h2>
         <p>0{totalStudent}</p>
      </div>

      <div className='box box3'>
      <h2><i class="fa-solid fa-indian-rupee-sign"></i> Total Amount</h2>
        <p>{TotalAmount}</p>
      </div>

    </div>  

   <div className='list-container'>
<div className='table-container'>
<table>
  <thead>
    <tr className='over'>
      <th>Profile</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    { students.map((student)=>(
      <tr className='pera' key={student._id}>
        <td><img className='main-logo' src={student.imageUrl} alt="" /></td>
        <td><p>{student.fullName}</p></td>
        <td><p>{student.phone}</p></td>
        <td><p>{student.email}</p></td>

      </tr>
    ))

    }
  </tbody>
</table>
</div>
<div className='table-container'>
<table>
  <thead>
    <tr className='over'>
      <th>Student Name</th>
      <th>Date and time</th>
      <th>Amount</th>
      <th>Remark</th>
    </tr>
  </thead>
  <tbody>
    { Fees.map((pay)=>(
      <tr className='pera' key={pay._id}>
        <td><p>{pay.fullName}</p></td>
        <td><p>{pay.createdAt}</p></td>
        <td><p>{pay.amount}</p></td>
        <td><p>{pay.remark}</p></td>

      </tr>
    ))

    }
  </tbody>
</table>
</div>
   </div>

    </div>
  );
}

export default Home;
