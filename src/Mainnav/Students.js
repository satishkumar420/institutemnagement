import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../components/style.css";
import { useNavigate } from "react-router-dom";

const Students = () => {

  const [studentList, setStudentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getStudent();
  },[]);

  const getStudent = () => {
    axios.get("http://localhost:3000/student/all-students", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setStudentList(res.data.students);
        console.log(studentList);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something is wrong");
      });
  };

  return (
    <div className="course-wrapper">
    <div className="course-wrapr">
     {
      studentList.map((student)=>(
        <div  onClick={()=>navigate("/dashboard/student-detail/"+student._id)} key={student._id}  className="course-box">
          <img className="course-thumb" src={student.imageUrl} alt="course-thumbnail" />
          <h2 className="heading">Name : {student.fullName}</h2>
          <p className="paragraph">location : {student.address}</p>
        </div>
      ))
     }
    </div>
    </div>
  );
};

export default Students;
