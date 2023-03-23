import '../css/Login.css';
import { useState } from 'react';







function Login()
{

  const [Value, setValue] = useState('email')

  function Input()
  {
    if (Value === 'email')
      return (
        <input type="text" className="form-control mb-4 rounded-pill" placeholder="Nhập Email" />
      )
    return (
      <input type="text" className="form-control mb-4 rounded-pill" placeholder="Nhập Số điện thoại" />
    )
  }

  const handle1 = (e) =>
  {
    console.log(e.target.innerHTML)
    setValue('Phone')
  }

  const handle2 = () =>
  {
    setValue('email')
  }

  return (
    <div className="Login  d-flex align-items-center">
      <div className="container d-flex justify-content-end align-items-center ">
        <div className="form-sign-up col-4 me-5 w-25 border p-3 rounded rounded-3 bg-info bg-gradient shadow-lg">
          <h1 className="text-center mb-5">Đăng nhập</h1>
          <div className="mb-3 border-bottom border-secondary border-2">
            <h4
              onClick={ handle1 }
              className="d-inline-block me-5 ms-1"
              style={ Value === 'Phone' ? {
                color: '#fff',
              } : {} }>
              Số điện thoại</h4>
            <h4
              onClick={ handle2 }
              className="d-inline-block"
              style={ Value === 'email' ? {
                color: '#fff',

              } : {} }
            >Email</h4>
          </div>
          <Input></Input>
          <input type="text" className="form-control mb-4 rounded-pill" placeholder="Nhập mât khẩu" />
          <button type="button" className="btn btn-primary rounded-pill w-100 my-4">Đăng nhập</button>

          <div className="text-center mb-2"><a href="/forgot_password">Forgot password?</a></div> {/* Dont fix this */ }
          <div className="text-center">Don't have an account? <a href="/sign_up">Register</a></div> {/* Dont fix this */ }


        </div>
      </div>
    </div >
  );
}

export default Login;
