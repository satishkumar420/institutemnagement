import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../components/style.css";
import { useNavigate } from "react-router-dom";

const Courses = () => {

  const [courseList, setCourseList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
  },[]);

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

  return (
    <div className="course-wrapper"> 
    <div className="course-wrapr">
         {
      courseList.map((course)=>(
        <div onClick={()=>{navigate("/dashboard/course-detail/" + course._id )}} className="course-box" key={course._id}>
          <img className="course-thumb" src={course.imageUrl} alt="course-thumbnail" />
          <h2 className="heading">{course.courseName}</h2>
          <p className="paragraph">Rs : {course.price} only..</p>
        </div>
      ))
     }
     </div>
     </div>   
  );
};

export default Courses;
