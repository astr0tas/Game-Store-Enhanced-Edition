import '../../css/Customer/ForgotPassword.css';
//import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

let username = "";

function ForgotPassword()
{


  // function Input(){
  //   if(Value==='email')
  //   return (
  //     <input type="text" classNameName="form-control mb-4 rounded-pill" placeholder="Nhập Email" />
  //   )
  //   return (
  //     <input type="text" classNameName="form-control mb-4 rounded-pill" placeholder="Nhập Số điện thoại" />
  //   )
  // }

  // const handle1=(e)=>{
  //   setValue('Phone')
  // }

  // const handle2=()=>{
  //   setValue('email')
  // }

  const Navigate = useNavigate();

  const formSubmit = (event) =>
  {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    axios.post('http://localhost/customer/recovery.php', formData)
      .then(res =>
      {
        if (res.data)
        {
          Navigate("/create_new_password");
        }
        else
        {
          alert("Username is incorrect!"); // This can be replaced with a pop-up
          document.getElementById("recoveryForm").reset();
        }
      })
      .catch(error => console.log(error));
  }


  return (
    <div className="ForgotPassword  d-flex align-items-center">
      <div className="container d-flex justify-content-end align-items-center ">
        <div className="form-sign-up col-4 me-5 w-25 border p-3 rounded rounded-3 bg-info bg-gradient shadow-lg">
          <h1 className="text-center mb-5 border-bottom border-secondary border-2 pb-3">Forgot password</h1>
          {/* <div className="mb-3 border-bottom border-secondary border-2">
                    <h4 onClick={handle1} 
                      className="d-inline-block me-5 ms-1"
                      style={Value==='Phone'?{
                        color:'#fff',
                      }:{}}
                      >Số điện thoại</h4>
                    <h4 
                      onClick={handle2} 
                      className="d-inline-block"
                      style={Value==='email'?{
                        color:'#fff',
                      }:{}}
                      >Email</h4>
                </div> */}
          <form onSubmit={ formSubmit } id="recoveryForm">
            <input type="text" className="form-control mb-4 rounded-pill" placeholder="Enter your username" onChange={ (e) => username=e.target.value } />
            <input type="submit" className="btn btn-primary rounded-pill w-100 my-4" value="Change my password" />
          </form>
          <div className="text-center">Back to <a href="/">Login</a></div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
export { username };
