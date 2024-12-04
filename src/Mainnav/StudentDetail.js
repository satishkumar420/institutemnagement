import axios from 'axios';
import React, { useEffect ,useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const StudentDetail = () => {

    const [student,setStudent] = useState({});
    const [Course,setCourse] = useState({});
    const [Fees,setFees] = useState([])

    const navigate = useNavigate()
    const params = useParams();
    

   
   
    useEffect(()=>{
     getStudentDetail();
    },[])


    const getStudentDetail = () => {
        axios.get("http://localhost:3000/student/student-detail/"+params.id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            console.log(res.data)
            setStudent(res.data.studentDetail)
            setCourse(res.data.courseDetail)
            setFees(res.data.FeeDetail)
            console.log(Fees)
          })
          .catch((err) => {
            console.log(err.message);
            toast.error("something error");
          });
        }

        const deleStudent = (studentId) =>{
          if(window.confirm("Are you shure want to delete ?.."))
          {
            axios.delete("http://localhost:3000/student/" + studentId, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              console.log(res.data)
              navigate("/dashboard/course-detail/"+Course._id)
              toast.success("student deleted success.....")
            })
            .catch((err) => {
              console.log(err);
              toast.error("something is wrong");
            });
          }
        }
      

  return (
    
    <div className='student-detail-main-wrapper'>
      { student &&
      <div className='student-detail-wrapper'>
         <div className='student-detail-header'>
          <div className='fullName'>
            <h1>Student Detail</h1>
            </div>
          <div className="sd-btn-container">
                <button className="primary-btn"onClick={()=>{navigate("/dashboard/update-student/"+student._id,{state:{student}})}} >Edit</button>
                <button className="secondary-btn" onClick={()=>deleStudent(student._id)} > Delete</button>
          </div>
          </div>

          <div className='ad-detail'>

            <img src={student.imageUrl} alt="student pic" />
            <div>
              <h3>{student.fullName}</h3>
              <p> Email -: {student.email}</p>
              <p> Phone -: {student.phone}</p>
              <p> Address -: {student.address}</p>
              <h2 style={{textTransform:"capitalize"}}> Course Name : {Course.courseName}</h2>

            </div>
          </div>
      </div>
}  
      <br />
      <h2 payment-title>Payment Histroy</h2>
      <div className='fee-detail-wrapper'>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>

          {
            Fees.map((item)=>{
              return(
                <tr key={item._id}>
                  <td><p>{item.fullName }</p></td>
                  <td><p>{item.phone }</p></td>
                  <td><p>{item.amount }</p></td>
                  <td><p>{item.remark }</p></td>
                </tr>
              )
            })
          }



              {/* {
                Fees.map((payment)=>{
                  <tr  >
                    <td><p>{payment.fullName}</p></td>
                    <td><p>{payment.phone}</p></td>
                    <td><p>{payment.amount}</p></td>
                    <td><p>{payment.remark}</p></td>
                  </tr>
})
              } */}
          </tbody>
        </table>
      </div>


    </div>
  );
}

export default StudentDetail;
