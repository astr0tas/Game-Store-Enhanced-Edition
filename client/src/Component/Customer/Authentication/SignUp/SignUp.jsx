import styles from './SignUp.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { checkCookie } from '../../../tools/cookie';
import { domain } from '../../../tools/domain';
import React from 'react';

export default function CustomerSignUp()
{
      const Navigate = useNavigate();


      const [inputs, setInputs] = useState({});

      const [isWrong, setIsWrong] = useState(false);
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
            if (inputs.password !== inputs.repassword)
                  setIsWrong(true);
            else
            {
                  setIsWrong(false);
                  setUsedEmail(false);
                  setUsedAccount(false);
                  const formData = new FormData();
                  formData.append("name", inputs.name);
                  formData.append("email", inputs.email);
                  formData.append("phone", (inputs.phone !== undefined && inputs.phone !== '') ? inputs.phone : null);
                  formData.append("username", inputs.username);
                  formData.append("password", inputs.password);
                  axios.post(`http://${ domain }/signUp`, formData)
                        .then(res =>
                        {
                              console.log(res);
                              if (res.data.email !== null || res.data.username !== null)
                              {
                                    if (res.data.email !== null)
                                          setUsedEmail(true);
                                    else if (res.data.username !== null)
                                          setUsedAccount(true);
                              }
                              else
                                    Navigate("/");
                        })
                        .catch(error => console.log(error));
            }
      }

      useEffect(() =>
      {
            if (checkCookie("PHPSESSID"))
                  Navigate("./home");

            document.title = 'Sign up';
      }, [Navigate]);

      return (
            <>
                  <div className={ `${ styles.background }` }></div>
                  <div className={ `container-fluid d-flex` }>
                        <form onSubmit={ formSubmit } className={ `${ styles.form } bg-light d-flex flex-column align-items-center justify-content-around fs-5 my-auto mx-auto` }>
                              <div className="border-bottom border-dark w-100 d-flex flex-column align-items-center mb-2">
                                    <h1 className={ `my-3 mx-5 ${ styles.title }` }>Sign up</h1>
                              </div>
                              <div className="mb-1 form-outline">
                                    <label htmlFor="form_name" className={ `${ styles.font }` }>Name</label>
                                    <input type="text" id="form_name" className={ `form-control ${ styles.font }` } onChange={ formChange } name="name" required />
                              </div>
                              <div className="mb-1 form-outline">
                                    <label htmlFor="form_email" className={ `${ styles.font }` }>Email address</label>
                                    <input type="email" id="form_email" className={ `form-control ${ styles.font }` } onChange={ formChange } name="email" required />
                              </div>
                              <div className="mb-1 form-outline">
                                    <label htmlFor="form_phone" className={ `${ styles.font }` }>Phone number</label>
                                    <input title="Your phone number should not contain alphabetical character(s)" pattern="[0-9]{10}" type="text" maxLength={ 10 } id="form_phone" className={ `form-control ${ styles.font }` } onChange={ formChange } name="phone" />
                              </div>
                              <div className="mb-1 form-outline">
                                    <label htmlFor="form_username" className={ `${ styles.font }` }>Username</label>
                                    <input type="text" id="form_username" className={ `form-control ${ styles.font }` } onChange={ formChange } name="username" required />
                              </div>
                              <div className="form-outline mb-1">
                                    <label htmlFor="form_password" className={ `${ styles.font }` } >Password</label>
                                    <input type="password" id="form_password" className={ `form-control ${ styles.font }` } onChange={ formChange } name="password" required />
                              </div>
                              <div className="mb-2 form-outline">
                                    <label htmlFor="form_repassword" className={ `${ styles.font }` }>Re-enter your password</label>
                                    <input type="password" id="form_repassword" className={ `form-control ${ styles.font }` } onChange={ formChange } name="repassword" required />
                              </div>
                              <div className='d-flex align-items-center'>
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
                                                Your passwords are not matched!
                                          </p>
                                    }
                                    {
                                          usedAccount
                                          &&
                                          <AiOutlineCloseCircle style={ {
                                                marginRight: '5px',
                                                marginBottom: '16px'
                                          } } className={ `${ styles.p }` } />
                                    }
                                    {
                                          usedAccount
                                          &&
                                          <p className={ `${ styles.p }` }>
                                                This account has already been taken!
                                          </p>
                                    }
                                    {
                                          usedEmail
                                          &&
                                          <AiOutlineCloseCircle style={ {
                                                marginRight: '5px',
                                                marginBottom: '16px'
                                          } } className={ `${ styles.p }` } />
                                    }
                                    {
                                          usedEmail
                                          &&
                                          <p className={ `${ styles.p }` }>
                                                This email has already been taken!
                                          </p>
                                    }
                              </div>
                              <input type="submit" className={ `btn btn-primary btn-block mb-4 ${ styles.font }` } value="Create account" />
                              <div className="row mb-2">
                                    <div className="col">
                                          <span className={ `${ styles.font }` }>Go back to <a href="/" className={ `text-decoration-none text-center` }>login</a></span>
                                    </div>
                              </div>
                        </form>
                  </div>
            </>
      )
}