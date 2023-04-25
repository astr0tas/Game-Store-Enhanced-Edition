import '../../css/Customer/Login.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { checkCookie } from '../tools/cookie';
import { domain } from '../tools/domain';

const AdminLogin = () =>
{
  const Navigate = useNavigate();

  const [inputs, setInputs] = useState({});
  const [isWrong, setIsWrong] = useState(false);

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
    axios.post(`http://${domain}/admin/login`, formData)
      .then(res =>
      {
        console.log(res);
        if (res.data)
        {
          document.cookie = `${ res.data.name }=${ res.data.value }; path="/";`;
          setIsWrong(false);
          Navigate("/admin/home");
        }
        else
        {
          setIsWrong(true);
        }
      })
      .catch(error => console.log(error));
  }

  useEffect(() =>
  {
    if (checkCookie("PHPSESSID"))
      Navigate("/admin/home");
  });

  return (
    <>
      <div className='background'></div>
      <div className="Login d-flex align-items-center justify-content-center">
        <div className="board d-flex justify-content-center align-items-center ">
          <div className="d-flex flex-column form align-items-center justify-content-around">
            <h1 className="text-center mb-3 pb-3 border-bottom border-secondary border-2 w-100">Welcome admin!</h1>
            <form onSubmit={ formSubmit } id="loginForm" className='w-100 d-flex flex-column align-items-center justify-content-center'>
              <input type="text" className="form-control mb-4 rounded-pill" placeholder="Enter your username" name="username" onChange={ formChange } style={ { width: "80%" } } />
              <input type="password" className="form-control mb-4 rounded-pill" placeholder="Enter your password" name="password" onChange={ formChange } style={ { width: "80%" } } />
              <div className="d-flex align-items-center">
                {
                  isWrong &&
                  <AiOutlineCloseCircle style={ {
                    color: 'red',
                    fontSize: "20px",
                    marginRight: '5px'
                  } } />
                }
                {
                  isWrong &&
                  <p
                    style={ {
                      color: 'red',
                      fontSize: "16px",
                      marginBottom: '0'
                    } }
                  >
                    Username and/or password are not correct
                  </p>
                }
              </div>
              <input type="submit" className="btn btn-primary rounded-pill my-3" style={ { width: "80%" } } value="Login" />
              <div className="text-center mb-2"><a href="/admin/forgot_password">Forgot password?</a></div>
              <div style={ { height: "50px" } }></div>
            </form>
          </div>
        </div>
      </div >
    </>
  );
}

export default AdminLogin;
