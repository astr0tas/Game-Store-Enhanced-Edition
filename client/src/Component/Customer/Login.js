import '../../css/Customer/Login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login()
{

  // const [Value, setValue] = useState('email')

  // const handle1 = (e) =>
  // {
  //   console.log(e.target.innerHTML)
  //   setValue('Phone')
  // }

  // const handle2 = () =>
  // {
  //   setValue('email')
  // }

  const Navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  const formChange = (event) =>
  {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const formSubmit = (event) =>
  {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", inputs.username);
    formData.append("password", inputs.password);
    
    axios.post('http://localhost/customer/login.php', formData)
      .then(res =>
      {
        if (res.data)
        {
          alert("Welcome!"); // This can be replaced with a pop-up
          // Navigate(); // Need to navigate to the home page
        }
        else
        {
          alert("Username or password is incorrect!"); // This can be replaced with a pop-up
          document.getElementById("loginForm").reset();
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="Login  d-flex align-items-center">
      <div className="container d-flex justify-content-end align-items-center ">
        <div className="form-sign-up col-4 me-5 w-25 border p-3 rounded rounded-3 bg-info bg-gradient shadow-lg">
          <h1 className="text-center mb-3 pb-3 border-bottom border-secondary border-2">Login</h1>
          {/* <div className="mb-3 border-bottom border-secondary border-2">
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
          </div> */}
          <form onSubmit={ formSubmit } id="loginForm">
            <input type="text" className="form-control mb-4 rounded-pill" placeholder="Enter your username" name="username" onChange={ formChange } />
            <input type="password" className="form-control mb-4 rounded-pill" placeholder="Enter your password" name="password" onChange={ formChange } />
            <input type="submit" className="btn btn-primary rounded-pill w-100 my-4" />
          </form>

          <div className="text-center mb-2"><a href="/forgot_password">Forgot password?</a></div> {/* Dont fix this */ }
          <div className="text-center">Don't have an account? <a href="/sign_up">Register</a></div> {/* Dont fix this */ }


        </div>
      </div>
    </div >
  );
}

export default Login;
