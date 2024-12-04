import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { toast } from 'react-toastify';

const PayHistory = () => {

  const [payDetails, setPayDetail] = useState([])
  useEffect(()=>{
  getPaymentHistory();
  },[])

 
  const getPaymentHistory = () => {
    axios.get("http://localhost:3000/fee/payment-history", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.paymentHistory)
        setPayDetail(res.data.paymentHistory)
      })
      .catch((err) => {
        console.log(err);
        toast.error("something is wrong");
      });
  }


  return (
    <div className='student-row'> 
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
            {/* {payDetails.paymentHistory} */}
          {
            payDetails.map((item)=>{
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
          </tbody>
        </table>
      
     </div>
  );
}

export default PayHistory;
