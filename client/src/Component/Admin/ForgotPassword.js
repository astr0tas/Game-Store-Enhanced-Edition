import '../../css/Customer/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

let exportedAdminUsername = "";

function AdminForgotPassword()
{
  const Navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [isWrong, setIsWrong] = useState(false);

  const formSubmit = (event) =>
  {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);

    axios.post('http://localhost/admin/recovery', formData)
      .then(res =>
      {
        if (res.data)
        {
          setIsWrong(false);
          exportedAdminUsername = username;
          Navigate("/admin/create_new_password");
        }
        else
        {
          setIsWrong(true);
        }
      })
      .catch(error => console.log(error));
  }


  return (
    <>
      <div className='background'></div>
      <div className="Login d-flex align-items-center justify-content-center">
        <div className="board d-flex justify-content-center align-items-center ">
          <div className="d-flex flex-column form align-items-center justify-content-around">
            <h1 className="text-center mb-3 pb-3 border-bottom border-secondary border-2 w-100">Password Recovery</h1>
            <form onSubmit={ formSubmit } id="loginForm" className='w-100 d-flex flex-column align-items-center justify-content-center'>
              <input type="text" className="form-control mb-4 rounded-pill" placeholder="Enter your username" name="username" style={ { width: "80%", fontSize: "20px" } } onChange={ (e) => { setUsername(e.target.value); } } />
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
                    Username is not found!
                  </p>
                }
              </div>
              <input type="submit" className="btn btn-primary rounded-pill my-3" style={ { width: "80%", fontSize: "20px" } } value="Continue" />
            </form>
            <div className="text-center"><a href="/" style={ { fontSize: "20px" } }>Back to login</a></div>
          </div>
        </div>
      </div >
    </>
  );
}

export default AdminForgotPassword;
export { exportedAdminUsername };
