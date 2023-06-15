import {  useParams } from 'react-router-dom';
import styles from './PersonalInfomation.module.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { domain } from '../../tools/domain';
import { isRefValid } from '../../tools/refChecker';
import '../../General/css/scroll.css';

export default function AdminPersonalInfo()
{
      const id = useParams().id;
      const [admin, setadmin] = useState({ name: "N/A", email: "N/A", phone: "N/A", address: "N/A", username: "N/A", image: null });
      const [pass, setPass] = useState("");
      const [repass, setRepass] = useState("");
      const [image, setImage] = useState(null);

      const [renderTrigger, setRenderTrigger] = useState(true);

      const profileImg = useRef(null);
      const admin_email = useRef(null);
      const admin_email_input = useRef(null);
      const admin_phone = useRef(null);
      const admin_phone_input = useRef(null);
      const admin_address = useRef(null);
      const admin_address_input = useRef(null);
      const admin_password_input = useRef(null);
      const admin_repassword_input = useRef(null);
      const admin_name = useRef(null);
      const admin_name_input = useRef(null);
      const image_input = useRef(null);

      const edit = useRef(null);
      const update = useRef(null);

      const bigDiv = useRef(null);
      const div1Height = useRef(null);
      const div2Height = useRef(null);
      const buttonHeight = useRef(null);

      const pop_up = useRef(null);
      const pop_up_1 = useRef(null);
      const pop_up_2 = useRef(null);
      const pop_up_3 = useRef(null);
      const update_pop_up = useRef(null);

      const calculateRemainHeight = () =>
      {
            if (isRefValid(bigDiv) && isRefValid(div1Height) && isRefValid(div2Height) && isRefValid(buttonHeight))
            {
                  const height = bigDiv.current.offsetHeight - div1Height.current.offsetHeight - buttonHeight.current.offsetHeight - 50;
                  div2Height.current.style.height = `calc(${ height }px)`;
            }
      }

      useEffect(() =>
      {
            axios.get(`http://${ domain }/admin/info`, { withCredentials: true })
                  .then(res =>
                  {
                        document.title = `Admin ${ res.data.name }`;
                        setadmin({
                              name: res.data.name,
                              email: res.data.email,
                              phone: res.data.phone,
                              address: res.data.address === null ? "N/A" : res.data.address,
                              username: res.data.username,
                              image: res.data.image === null ? "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA=" : `http://${ domain }/model/data/admins/${ res.data.image }`
                        });
                        if (isRefValid(profileImg))
                              profileImg.current.src = res.data.image === null ? "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA=" : `http://${ domain }/model/data/admins/${ res.data.image }`;
                  })

            calculateRemainHeight();

            window.addEventListener('resize', calculateRemainHeight);

      }, [renderTrigger, id]);

      const changeInfo = () =>
      {
            if (isRefValid(admin_email))
                  admin_email.current.style.display = "none";
            if (isRefValid(admin_phone))
                  admin_phone.current.style.display = "none";
            if (isRefValid(edit))
                  edit.current.style.display = "none";
            if (isRefValid(admin_name))
                  admin_name.current.style.display = "none";
            if (isRefValid(admin_address))
                  admin_address.current.style.display = "none";

            if (isRefValid(update))
                  update.current.style.display = "flex";

            if (isRefValid(admin_email_input))
            {
                  admin_email_input.current.style.display = "inline";
                  admin_email_input.current.value = admin.email;
            }
            if (isRefValid(admin_phone_input))
            {
                  admin_phone_input.current.style.display = "inline";
                  admin_phone_input.current.value = admin.phone;
            }
            if (isRefValid(admin_name_input))
            {
                  admin_name_input.current.style.display = "inline";
                  admin_name_input.current.value = admin.name;
            }
            if (isRefValid(admin_address_input))
            {
                  admin_address_input.current.style.display = "inline";
                  admin_address_input.current.value = admin.address === "N/A" ? "" : admin.address;
            }
            if (isRefValid(admin_password_input))
            {
                  admin_password_input.current.style.display = "inline";
                  setPass("");
            }
            if (isRefValid(admin_repassword_input))
            {
                  admin_repassword_input.current.style.display = "inline";
                  setRepass("");
            }
            if (isRefValid(image_input))
            {
                  image_input.current.style.display = "inline";
                  setImage(null);
            }
      }

      const cancelUpdate = () =>
      {
            if (isRefValid(admin_email))
                  admin_email.current.style.display = "inline";
            if (isRefValid(admin_phone))
                  admin_phone.current.style.display = "inline";
            if (isRefValid(edit))
                  edit.current.style.display = "inline";
            if (isRefValid(admin_name))
                  admin_name.current.style.display = "inline";
            if (isRefValid(admin_address))
                  admin_address.current.style.display = "inline";

            if (isRefValid(edit))
                  edit.current.style.display = "inline-block";

            if (isRefValid(update))
                  update.current.style.display = "none";
            if (isRefValid(admin_email_input))
                  admin_email_input.current.style.display = "none";
            if (isRefValid(admin_phone_input))
                  admin_phone_input.current.style.display = "none";
            if (isRefValid(admin_password_input))
                  admin_password_input.current.style.display = "none";
            if (isRefValid(admin_repassword_input))
                  admin_repassword_input.current.style.display = "none";
            if (isRefValid(admin_name_input))
                  admin_name_input.current.style.display = "none";
            if (isRefValid(admin_address_input))
                  admin_address_input.current.style.display = "none";
            if (isRefValid(image_input))
                  image_input.current.style.display = "none";
      }

      function containsAlphabets(str)
      {
            for (let i = 0; i < str.length; i++)
                  if ((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z')) return true;
            return false;
      }

      const confirmChange = () =>
      {
            if (isRefValid(admin_email_input) && admin_email_input.current.value === "")
            {
                  if (isRefValid(pop_up_1)) pop_up_1.current.style.display = "flex";
            }
            else if (isRefValid(admin_phone_input) && admin_phone_input.current.value === "")
            {
                  if (isRefValid(pop_up)) pop_up.current.style.display = "flex";
            }
            else if (isRefValid(admin_phone_input) && containsAlphabets(admin_phone_input.current.value))
            {
                  if (isRefValid(pop_up_2)) pop_up_2.current.style.display = "flex";
            }
            else if (pass !== repass)
            {
                  if (isRefValid(pop_up_3)) pop_up_3.current.style.display = "flex";
            }
            else
            {
                  const formData = new FormData();
                  formData.append("name", isRefValid(admin_name_input) ? admin_name_input.current.value : null);
                  formData.append("email", isRefValid(admin_email_input) ? admin_email_input.current.value : null);
                  formData.append("phone", isRefValid(admin_phone_input) ? admin_phone_input.current.value : null);
                  formData.append("address", isRefValid(admin_address_input) ? (admin_address_input.current.value === "" ? null : admin_address_input.current.value) : null);
                  formData.append("password", pass === "" ? null : pass);
                  formData.append("image", image);
                  axios.post(`http://${ domain }/admin/info/edit`, formData, { withCredentials: true })
                        .then(res =>
                        {
                              console.log(res);
                              cancelUpdate();
                              setRenderTrigger(!renderTrigger);
                        })
                        .catch(error => { console.log(error); })
            }
      }

      return (
            <div className="d-flex flex-column align-items-center w-100 h-100">
                  <div className={ `flex-grow-1 d-flex w-100 mt-3 overflow-auto hideBrowserScrollbar mb-3` } ref={ bigDiv }>
                        <div className={ `d-flex flex-column flex-md-row align-items-center justify-content-md-around justify-content-xxl-center align-items-md-start w-100 my-auto` } ref={ div1Height }>
                              <div className={ `d-flex flex-column ${ styles.containDiv }` }>
                                    <img className={ `${ styles.img } w-100 h-100` } ref={ profileImg } alt='avatar' />
                                    <label className={ `btn btn-sm btn-light border border-dark mt-3 mx-auto ${styles.browse}` } ref={ image_input }>
                                          <input type='file' className='d-none' onChange={ e =>
                                          {
                                                if (e.target.files.length === 0)
                                                {
                                                      if (isRefValid(profileImg))
                                                            profileImg.current.src = admin.image;
                                                }
                                                else
                                                {
                                                      setImage(e.target.files[0]);
                                                      const file = e.target.files[0];
                                                      const reader = new FileReader();
                                                      reader.readAsArrayBuffer(file);
                                                      reader.onload = () =>
                                                      {
                                                            const blob = new Blob([reader.result], { type: file.type });
                                                            const url = URL.createObjectURL(blob);
                                                            if (isRefValid(profileImg))
                                                                  profileImg.current.src = url;
                                                      };
                                                }
                                          } } accept=".jpg,.jpeg,.png"></input>
                                          Choose file
                                    </label>
                              </div>
                              <div className={ `d-flex flex-column justify-content-center align-items-center ${ styles.info } mt-2 mt-md-0` }>
                                    <div className='w-100 text-center' style={ { marginBottom: '16px' } }>Name: &nbsp;
                                          <span ref={ admin_name }>{ admin.name }</span>
                                          <input type="text" className={ `${ styles.update }` } ref={ admin_name_input } ></input>
                                    </div>
                                    <div className='text-center w-100' style={ { marginBottom: '16px' } }>Email: &nbsp;
                                          <span ref={ admin_email }>{ admin.email }</span>
                                          <input type="text" className={ `${ styles.update } ` } ref={ admin_email_input } ></input>
                                    </div>
                                    <div className='text-center w-100' style={ { marginBottom: '16px' } }>Phone number: &nbsp;
                                          <span ref={ admin_phone }>{ admin.phone }</span>
                                          <input type="text" className={ `${ styles.update } ` } ref={ admin_phone_input } maxLength='10'></input>
                                    </div>
                                    <div className='text-center w-100' style={ { marginBottom: '16px' } }>Address: &nbsp;
                                          <span ref={ admin_address }>{ admin.address }</span>
                                          <input type="text" className={ `${ styles.update } ` } ref={ admin_address_input }></input>
                                    </div>
                                    <div className='text-center w-100' style={ { marginBottom: '16px' } }>Username: &nbsp;
                                          <span>{ admin.username }</span>
                                    </div>
                                    <div className={ `${ styles.update } text-center w-100` } ref={ admin_password_input } style={ { marginBottom: '16px' } }>Password: &nbsp;
                                          <input type="password" value={ pass } onChange={ e => setPass(e.target.value) }></input>
                                    </div>
                                    <div className={ `${ styles.update } text-center w-100` } ref={ admin_repassword_input } style={ { marginBottom: '16px' } }>Re-enter password: &nbsp;
                                          <input type="password" value={ repass } onChange={ e => setRepass(e.target.value) }></input>
                                    </div>
                                    <button className={ ` btn btn-sm btn-primary` } onClick={ changeInfo } ref={ edit }>Edit</button>
                                    <div className={ `${ styles.buttons } w-100 align-items-center justify-content-center` } ref={ update }>
                                          <button className={ `btn btn-sm btn-danger d-block` } onClick={ cancelUpdate }>Cancel</button>
                                          <button className={ `btn btn-sm btn-primary mx-3 d-block` } onClick={ () => { if (isRefValid(update_pop_up)) update_pop_up.current.style.display = "flex"; } }>Confirm</button>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up }` } ref={ pop_up_1 }>
                        <h3>Your email can not be empty!</h3>
                        <button className={ `btn btn-primary` } onClick={ () =>
                        {
                              if (isRefValid(pop_up_1)) pop_up_1.current.style.display = "none";
                        } }>OKAY</button>
                  </div>
                  <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up }` } ref={ pop_up }>
                        <h3>Your phone number can not be empty!</h3>
                        <button className={ `btn btn-primary` } onClick={ () =>
                        {
                              if (isRefValid(pop_up)) pop_up.current.style.display = "none";
                        } }>OKAY</button>
                  </div>
                  <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up }` } ref={ pop_up_3 }>
                        <h3>Your passwords are not matched!</h3>
                        <button className={ `btn btn-primary` } onClick={ () =>
                        {
                              if (isRefValid(pop_up_3)) pop_up_3.current.style.display = "none";
                        } }>OKAY</button>
                  </div>
                  <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up }` } ref={ pop_up_2 }>
                        <h3>Your phone number can not contain alphabetical characters!</h3>
                        <button className={ `btn btn-primary` } onClick={ () =>
                        {
                              if (isRefValid(pop_up_2)) pop_up_2.current.style.display = "none";
                        } }>OKAY</button>
                  </div>
                  <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up }` } ref={ update_pop_up }>
                        <h3 className='mx-2'>Do you really want to update this your info?</h3>
                        <div className='d-flex flex-row align-items-center justify-content-center'>
                              <button className={ `btn btn-danger mx-3` } onClick={ () =>
                              {
                                    if (isRefValid(update_pop_up)) update_pop_up.current.style.display = "none";
                              } }>Cancel</button>
                              <button className={ `btn btn-primary mx-3` } onClick={ () =>
                              {
                                    if (isRefValid(update_pop_up)) update_pop_up.current.style.display = "none";
                                    confirmChange();
                              } }>Confirm</button>
                        </div>
                  </div>
            </div>
      )
}