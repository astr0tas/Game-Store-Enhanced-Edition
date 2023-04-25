import '../../css/Customer/Login.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { domain } from '../tools/domain';


function Signup()
{
  const Navigate = useNavigate();

  const [inputs, setInputs] = useState({});
  const [isMatch, setIsMatch] = useState(true);
  const [usedEmail, setUsedEmail] = useState(false);
  const [usedAccount, setUsedAccount] = useState(false);

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
    formData.append("name", inputs.name);
    formData.append("email", inputs.email);
    formData.append("username", inputs.username);
    formData.append("password", inputs.password);
    if (inputs.phone === "" || typeof (inputs.phone) === "undefined")
      inputs.phone = null;
    formData.append("phone", inputs.phone);
    axios.post(`http://${ domain }/sign_up`, formData)
      .then(res =>
      {
        console.log(res);
        if (res.data.email !== null || res.data.username !== null || inputs.password !== inputs.re_password)
        {
          if (res.data.email !== null)
            setUsedEmail(true);
          if (res.data.username !== null)
            setUsedAccount(true);
          if (inputs.password !== inputs.re_password)
            setIsMatch(false);
        }
        else
        {
          setUsedEmail(false);
          setUsedAccount(false);
          Navigate("/");
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
            <h1 className="text-center mb-3 pb-3 border-bottom border-secondary border-2 w-100 sign_up_register">Register</h1>
            <form onSubmit={ formSubmit } id="loginForm" className='w-100 d-flex flex-column align-items-center justify-content-center'>
              <input required type="text" class="form-control mb-4 rounded-pill sign_up_input" placeholder="Your name" name="name" style={ { width: "80%", fontSize: "20px" } } onChange={ formChange } />
              <input required type="text" class="form-control mb-4 rounded-pill sign_up_input" placeholder="Your email" name="email" style={ { width: "80%", fontSize: "20px" } } onChange={ formChange } />
              <input type="text" class="form-control mb-4 rounded-pill sign_up_input" placeholder="Your phone number" name="phone" style={ { width: "80%", fontSize: "20px" } } onChange={ formChange } />
              <input required type="text" class="form-control mb-4 rounded-pill sign_up_input" placeholder="Your username" name="username" style={ { width: "80%", fontSize: "20px" } } onChange={ formChange } />
              <input required type="password" className="form-control mb-4 rounded-pill sign_up_input" placeholder="Enter your password" name="password" style={ { width: "80%", fontSize: "20px" } } onChange={ formChange } />
              <input required type="password" className="form-control mb-4 rounded-pill sign_up_input" placeholder="Re-enter your password" name="re_password" style={ { width: "80%", fontSize: "20px" } } onChange={ formChange } />
              <div className="d-flex flex-column align-items-center">
                <div className="d-flex align-items-center">
                  {
                    usedEmail &&
                    <AiOutlineCloseCircle style={ {
                      color: 'red',
                      fontSize: "20px",
                      marginRight: '5px'
                    } } />
                  }
                  {
                    usedEmail &&
                    <p
                      style={ {
                        color: 'red',
                        fontSize: "16px",
                        marginBottom: '0'
                      } }
                    >
                      This email is used!
                    </p>
                  }
                </div>
                <div className="d-flex align-items-center">
                  {
                    usedAccount &&
                    <AiOutlineCloseCircle style={ {
                      color: 'red',
                      fontSize: "20px",
                      marginRight: '5px'
                    } } />
                  }
                  {
                    usedAccount &&
                    <p
                      style={ {
                        color: 'red',
                        fontSize: "16px",
                        marginBottom: '0'
                      } }
                    >
                      This account name is used!
                    </p>
                  }
                </div>
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
              </div>
              <input type="submit" className="btn btn-primary rounded-pill sign_up_input" style={ { width: "80%", fontSize: "20px" } } value="Finish" />
            </form>
            <div className="text-center"><a href="/" style={ { fontSize: "20px" } } className='sign_up_input'>Already have an account?</a></div>
          </div>
        </div>
      </div >
    </>
  );
}

export default Signup;
