import styles from './Login.module.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { checkCookie } from '../../../tools/cookie';
import { domain } from '../../../tools/domain';

const AdminLogin = () =>
{
  const Navigate = useNavigate();

  const resize = useRef(null);

  const [inputs, setInputs] = useState({});
  const [isWrong, setIsWrong] = useState(false);
  const [isMissing, setIsMissing] = useState(false);

  const formChange = (event) =>
  {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const formSubmit = (event) =>
  {
    event.preventDefault();
    if (inputs.username === "" || inputs.password === "" || typeof (inputs.password) === "undefined" || typeof (inputs.username) === "undefined")
    {
      setIsMissing(true);
      setIsWrong(false);
    }
    else
    {
      setIsMissing(false);
      const formData = new FormData();
      formData.append("username", inputs.username);
      formData.append("password", inputs.password);
      axios.post(`http://${ domain }/admin/login`, formData, { withCredentials: true })
        .then(res =>
        {
          if (res.data)
          {
            setIsWrong(false);
            Navigate("./home");
          }
          else
          {
            setIsWrong(true);
          }
        })
        .catch(error => console.log(error));
    }
  }

  useEffect(() =>
  {
    if (checkCookie("PHPADMINSESSID"))
      Navigate("./home");
    
    document.title = 'Login';

    if (window.innerHeight > 430)
      resize.current.classList.add('h-100');
    
    window.addEventListener('resize', () =>
    {
      if (window.innerHeight > 430)
        resize.current.classList.add('h-100');
      else
        resize.current.classList.remove('h-100');
    });
  },[]);

  return (
    <>
      <div className={ `${ styles.background }` }></div>
      <div className={ `container-fluid d-flex justify-content-center align-items-center` } ref={ resize }>
        <form onSubmit={ formSubmit } className={ `${ styles.form } bg-light d-flex flex-column align-items-center justify-content-around fs-5` }>
          <div className="border-bottom border-dark w-100 d-flex flex-column align-items-center mb-5">
            <h1 className={ `my-3 mx-5 ${ styles.title }` }>Welcome Admin!</h1>
          </div>
          <div className="mb-4 form-outline">
            <label htmlFor="form_username" className={ `${ styles.font }` }>Username</label>
            <input type="text" id="form_username" className={ `form-control ${ styles.font }` } onChange={ formChange } name="username" />
          </div>
          <div className="form-outline mb-2">
            <label htmlFor="form_password" className={ `${ styles.font }` } >Password</label>
            <input type="password" id="form_password" className={ `form-control ${ styles.font }` } onChange={ formChange } name="password" />
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
                Username or password is not correct!
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
            { isMissing
              &&
              <p className={ `${ styles.p }` }>
                Username or password is missing!
              </p>
            }
          </div>
          <input type="submit" className={ `btn btn-primary btn-block mb-4 ${ styles.font }` } value="Sign in" />
          <div className="row mb-4">
            <div className="col">
              <a href="./admin/recovery" className={ `text-decoration-none ${ styles.font }` }>Forgot password?</a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminLogin;
