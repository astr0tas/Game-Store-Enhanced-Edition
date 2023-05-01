import styles from './Recovery.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { domain } from '../../../tools/domain';
import $ from 'jquery';


function AdminRecovery()
{
  const Navigate = useNavigate();

  // Validate username
  const [username, setUsername] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const [isMissing, setIsMissing] = useState(false);

  const usernameValidation = (event) =>
  {
    event.preventDefault();
    if (username === "")
    {
      setIsWrong(false);
      setIsMissing(true);
    }
    else
    {
      setIsMissing(false);
      const formData = new FormData();
      formData.append("username", username);

      axios.post(`http://${ domain }/admin/recovery`, formData)
        .then(res =>
        {
          if (res.data)
          {
            setIsWrong(false);
            $(`.${ styles.checkUsername }`).css("display", "none");
            $(`.${ styles.newPassword }`).css("display", "flex");
          }
          else
          {
            setIsWrong(true);
          }
        })
        .catch(error => console.log(error));
    }
  }

  // Changing password
  const [password, setPassword] = useState();
  const [repassword, setRepassword] = useState();
  const [isMatch, setIsMatch] = useState(true);

  const changePassword = (e) =>
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
      formData.append("username", username);
      formData.append("password", password);
      axios.post(`http://${ domain }/admin/newPassword`, formData)
        .then(res =>
        {
          console.log(res);
          Navigate("/admin");
        })
        .catch(error => console.log(error));
    }
  }

  useEffect(() =>
  {
    document.title = 'Password recovery';
    if (window.innerHeight > 330)
      $(`.${ styles.resize }`).addClass('h-100');
    window.addEventListener('resize', () =>
    {
      if (window.innerHeight > 330)
        $(`.${ styles.resize }`).addClass('h-100');
      else
        $(`.${ styles.resize }`).removeClass('h-100');
    });
  });

  return (
    <>
      <div className={ `${ styles.background }` }></div>
      {/* Validate username first */ }
      <div className={ `container-fluid align-items-center justify-content-center ${ styles.resize } ${ styles.checkUsername }` }>
        <form onSubmit={ usernameValidation } className={ `${ styles.form } bg-light d-flex flex-column align-items-center justify-content-around fs-5` }>
          <div className="border-bottom border-dark w-100 d-flex flex-column align-items-center mb-5">
            <h1 className={ `my-3 mx-5 ${ styles.title }` }>Password recovery</h1>
          </div>
          <div className="mb-2 form-outline">
            <label htmlFor="form_username" className={ `${ styles.font }` }>Enter your username</label>
            <input type="text" id="form_username" className={ `form-control ${ styles.font }` } placeholder="Username" onChange={ (e) => { setUsername(e.target.value); } } name="username" />
          </div>
          <div className='d-flex align-items-center mb-4'>
            {
              isWrong
              &&
              <AiOutlineCloseCircle style={ {
                marginRight: '5px',
                marginBottom: '16px'
              } } className={ `${ styles.p }` } />
            }
            {
              isWrong
              &&
              <p className={ `${ styles.p }` }>
                Username not found!
              </p>
            }
            {
              isMissing
              &&
              <AiOutlineCloseCircle style={ {
                marginRight: '5px',
                marginBottom: '16px'
              } } className={ `${ styles.p }` } />
            }
            {
              isMissing
              &&
              <p className={ `${ styles.p }` }>
                Enter your username!
              </p>
            }
          </div>
          <input type="submit" className={ `btn btn-primary btn-block mb-4 ${ styles.font }` } value="Continue" />
          <div className="row mb-4">
            <div className="col">
              <a href="/admin" className={ `text-decoration-none ${ styles.font }` }>Back to login</a>
            </div>
          </div>
        </form>
      </div>
      {/* Changing password */ }
      <div className={ `container align-items-center justify-content-center ${ styles.resize } ${ styles.newPassword }` }>
        <form onSubmit={ changePassword } className={ `${ styles.form } bg-light d-flex flex-column align-items-center justify-content-around fs-5` }>
          <div className="border-bottom border-dark w-100 d-flex flex-column align-items-center mb-5">
            <h1 className={ `my-3 mx-5 ${ styles.title }` }>Password recovery</h1>
          </div>
          <div className="mb-4 form-outline">
            <label htmlFor="form_password" className={ `${ styles.font }` }>Enter new password</label>
            <input type="password" id="form_password" className={ `form-control ${ styles.font }` } placeholder="Password" onChange={ (e) => { setPassword(e.target.value); } } />
          </div>
          <div className="mb-2 form-outline">
            <label htmlFor="form_repassword" className={ `${ styles.font }` }>Confirm new password</label>
            <input type="password" id="form_repassword" className={ `form-control ${ styles.font }` } placeholder="Password" onChange={ (e) => { setRepassword(e.target.value); } } />
          </div>
          <div className='d-flex align-items-center mb-4'>
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
          <input type="submit" className={ `btn btn-primary btn-block mb-4 ${ styles.font }` } value="Finish" />
          <div className="row mb-4">
            <div className="col">
              <a href="/admin" className={ `text-decoration-none ${ styles.font }` }>Back to login</a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminRecovery;
