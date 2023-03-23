import '../css/ForgotPassword.css';
import { useState } from 'react';
function ForgotPassword() {

  const [Value,setValue]=useState('email')

  function Input(){
    if(Value==='email')
    return (
      <input type="text" classNameName="form-control mb-4 rounded-pill" placeholder="Nhập Email" />
    )
    return (
      <input type="text" classNameName="form-control mb-4 rounded-pill" placeholder="Nhập Số điện thoại" />
    )
  }

  const handle1=(e)=>{
    setValue('Phone')
  }

  const handle2=()=>{
    setValue('email')
  }

  return (
    <div className="ForgotPassword  d-flex align-items-center">
        <div className="container d-flex justify-content-end align-items-center ">
            <div className="form-sign-up col-4 me-5 w-25 border p-3 rounded rounded-3 bg-info bg-gradient shadow-lg">
                <h1 className="text-center mb-5">Quên mật khẩu</h1>
                <div className="mb-3 border-bottom border-secondary border-2">
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
                </div>
                <Input></Input>
                <button type="button" className="btn btn-primary rounded-pill w-100 my-4">Gửi mã</button>               
            </div>
        </div>
    </div>  
  );
}

export default ForgotPassword;
