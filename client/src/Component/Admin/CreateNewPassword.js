import '../../css/Customer/Login.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exportedAdminUsername } from './ForgotPassword';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { domain } from '../tools/domain';


function AdminCreateNewPassword()
{
  const Navigate = useNavigate();

  const [password, setPassword] = useState();
  const [repassword, setRepassword] = useState();
  const [isMatch, setIsMatch] = useState(true);

  const formSubmit = (e) =>
  {
    e.preventDefault();
    if (password !== repassword)
    {
      setIsMatch(false);
    }
    else
    {
      setIsMatch(true);
      const formData = new FormData();
      formData.append("username", exportedAdminUsername);
      formData.append("password", password);
      axios.post(`http://${domain}/admin/new_password`, formData)
        .then(res =>
        {
          console.log(res);
          Navigate("/admin");
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <>
      <div className='background'></div>
      <div className="Login d-flex align-items-center justify-content-center">
        <div className="board d-flex justify-content-center align-items-center ">
          <div className="d-flex flex-column form align-items-center justify-content-around">
            <h1 className="text-center mb-3 pb-3 border-bottom border-secondary border-2 w-100">Password Recovery</h1>
            <form onSubmit={ formSubmit } id="loginForm" className='w-100 d-flex flex-column align-items-center justify-content-center'>
              <input type="password" className="form-control mb-4 rounded-pill" placeholder="Enter your password" style={ { width: "80%", fontSize: "20px" } } onChange={ (e) => { setPassword(e.target.value); } } />
              <input type="password" className="form-control mb-4 rounded-pill" placeholder="Re-enter your password" style={ { width: "80%", fontSize: "20px" } } onChange={ (e) => { setRepassword(e.target.value); } } />
              <div className="d-flex align-items-center">
                {
                  !isMatch &&
                  <AiOutlineCloseCircle style={ {
                    color: 'red',
                    fontSize: "20px",
                    marginRight: '5px'
                  } } />
                }
                {
                  !isMatch &&
                  <p
                    style={ {
                      color: 'red',
                      fontSize: "16px",
                      marginBottom: '0'
                    } }
                  >
                    Passwords are not matched!
                  </p>
                }
              </div>
              <input type="submit" className="btn btn-primary rounded-pill my-3" style={ { width: "80%", fontSize: "20px" } } value="Change my password" />
            </form>
            <div className="text-center"><a href="/" style={ { fontSize: "20px" } }>Back to login</a></div>
          </div>
        </div>
      </div >
    </>
  );
}

export default AdminCreateNewPassword;
