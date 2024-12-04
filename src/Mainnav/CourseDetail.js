import axios from "axios";
import React, {  useEffect,useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CourseDetail = () => {
  const params = useParams();

  const [course, setCourse] = useState({});
  const [studentsList, setStudentsList] = useState([]);
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate();

 useEffect(()=>{
 getCourseDetail()
 },[])


  const getCourseDetail = () => {
    console.log(params.id);
    axios
      .get("http://localhost:3000/course/courses-detail/"+params.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setCourse(res.data.course);
        setStudentsList(res.data.studentList);
      })
      .catch((err) => {
        console.log(err);
        toast.error("something error");
      });
  };

  const deleCourse = (courseId) =>{
    if(window.confirm("Are you shure want to delete ?.."))
    {
      axios.delete("http://localhost:3000/course/" + courseId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data)
        navigate("/dashboard/courses")
      })
      .catch((err) => {
        console.log(err);
        toast.error("something is wrong");
      });
    }
  }

  return (
    <div className="course-detail-main-wrapper">
      {course && (
        <div className="main" >
          <div className="course-detail-wrapper">
            <img
              className="course-logo"
              src={course.imageUrl}
              alt="your logo"
            />
            <div className="main1">
              <h1>{course.courseName}</h1>
              <p> Price :- {course.price}</p>
              <p> Starting Date :- {course.startingDate}</p>
              <p> End Date :- {course.endDate}</p>
            </div>

            <div className="main3" >
              <div className="best">
                <button className="primary-btn" onClick={()=>{navigate('/dashboard/update-course/'+course._id,{state:{course}})}} >Edit</button>
                <button className="secondary-btn" onClick={()=>{deleCourse(course._id)}} > {loading && <img className="loader" src={require("../assets/load.gif")} alt=""  /> } Delete</button>
              </div>
              <h3>Course Description</h3>
              <div className="course-description">
                <p>{course.description}</p>
              </div>
            </div>
          </div>
          <p className="head">
            <b>{course.description}</b>
          </p>
        </div>
      )}
      { studentsList && studentsList.length > 0 &&
        <div className="student-list-container">
          <table>
            <thead>
              <tr className="over">
                <th>Student Image</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {studentsList.map((student) => (
                <tr onClick={()=>navigate("/dashboard/student-detail/"+student._id)} key={student._id} className="student-row">
                  <td>
                    <img
                      className="your-logo bring"
                      src={student.imageUrl}
                      alt="students pic"
                    />
                  </td>
                  <td><p>{student.fullName}</p></td>
                  <td><p>{student.phone}</p></td>
                  <td><p>{student.email}</p></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};

export default CourseDetail;
