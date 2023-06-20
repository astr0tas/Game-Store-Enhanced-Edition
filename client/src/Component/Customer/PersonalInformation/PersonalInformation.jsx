import styles from './PersonalInformation.module.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { domain } from '../../General/tools/domain';
import { isRefValid, isRefNotValid } from '../../General/tools/refChecker';
import '../../General/css/scroll.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Modal } from 'react-bootstrap';
import '../../General/css/modal.css';

const History = (props) =>
{
      function formatString(input)
      {
            const hyphenPositions = [4, 8, 12];
            let formattedString = "";

            for (let i = 0; i < input.length; i++)
            {
                  if (hyphenPositions.includes(i))
                  {
                        formattedString += "-";
                  }
                  formattedString += input[i];
            }

            return formattedString;
      }

      return (
            <tr>
                  <td className='col-3 text-center'>{ props.name }</td>
                  <td className='col-3 text-center'>{ formatString(props.code) }</td>
                  <td className='col-2 text-center'>{ props.date }</td>
                  <td className='col-2 text-center'>${ props.price }</td>
                  <td className='col-2 text-center'>{ props.method }</td>
            </tr>
      );
}


export default function CustomerPersonalInfo()
{
      document.title = `Profile`;

      const [customer, setCustomer] = useState({ name: "N/A", email: "N/A", phone: "N/A", spending: "N/A", rank: "N/A", discount: "N/A", image: "N/A", dob: "N/A" });
      const [renderTrigger, setRenderTrigger] = useState(true);
      const [image, setImage] = useState(null);
      const [pass, setPass] = useState("");
      const [repass, setRepass] = useState("");
      const [wrong, setWrong] = useState(false);
      const [isFuture, setIsFuture] = useState(false);

      const customer_name = useRef(null);
      const customer_name_input = useRef(null);
      const customer_email = useRef(null);
      const customer_email_input = useRef(null);
      const customer_phone = useRef(null);
      const customer_phone_input = useRef(null);
      const customer_dob = useRef(null);
      const customer_dob_input = useRef(null);

      const edit = useRef(null);
      const update = useRef(null);
      const history = useRef(null);
      const image_input = useRef(null);
      const imageRef = useRef(null);
      const password_input = useRef(null);
      const repassword_input = useRef(null);
      const formRef = useRef(null);

      const div2Height = useRef(null);

      const [showPopup, setShowPopup] = useState(false);

      const target = useRef(null);

      useEffect(() =>
      {
            axios.get(`http://${ domain }/info`, { withCredentials: true })
                  .then(res =>
                  {
                        setCustomer({
                              name: res.data.name,
                              email: res.data.email,
                              phone: res.data.phone === null ? 'N/A' : res.data.phone,
                              spending: res.data.total_spending,
                              rank: res.data.membership_rank,
                              discount: res.data.membership_discount,
                              image: res.data.image === null ? "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA=" : `http://${ domain }/model/data/customers/${ res.data.image }`,
                              dob: res.data.dob === null ? 'N/A' : res.data.dob,
                        });
                        if (isRefValid(imageRef))
                              imageRef.current.src = res.data.image === null ? "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA=" : `http://${ domain }/model/data/customers/${ res.data.image }`;
                  })

      }, [renderTrigger]);

      const getHistory = () =>
      {
            axios.get(`http://${ domain }/info/history`, { withCredentials: true })
                  .then(res =>
                  {
                        if (res.data.length !== 0)
                              if (isRefValid(div2Height))
                                    div2Height.current.style.display = "block";

                        let temp = [];
                        for (let i = 0; i < res.data.length; i++)
                              temp.push(<History key={ i } name={ res.data[i].name } code={ res.data[i].code } date={ res.data[i].date } price={ res.data[i].price } method={ res.data[i].method } />);

                        if (isRefNotValid(target) && isRefValid(history))
                              target.current = ReactDOM.createRoot(history.current);
                        if (isRefValid(target))
                              target.current.render(<>{ temp }</>);
                  })
                  .catch(error => console.log(error));
      }

      const changeInfo = () =>
      {
            if (isRefValid(customer_name))
                  customer_name.current.style.display = "none";
            if (isRefValid(customer_email))
                  customer_email.current.style.display = "none";
            if (isRefValid(customer_phone))
                  customer_phone.current.style.display = "none";
            if (isRefValid(customer_dob))
                  customer_dob.current.style.display = "none";
            if (isRefValid(edit))
                  edit.current.style.display = "none";
            if (isRefValid(update))
                  update.current.style.display = "flex";
            if (isRefValid(customer_email_input))
            {
                  customer_email_input.current.style.display = "inline";
                  customer_email_input.current.value = customer.email;
            }
            if (isRefValid(customer_phone_input))
            {
                  customer_phone_input.current.style.display = "inline";
                  customer_phone_input.current.value = customer.phone === "N/A" ? "" : customer.phone;
            }
            if (isRefValid(customer_dob_input))
            {
                  customer_dob_input.current.style.display = "inline";
                  customer_dob_input.current.value = customer.dob === "N/A" ? "" : customer.dob;
            }
            if (isRefValid(customer_name_input))
            {
                  customer_name_input.current.style.display = "inline";
                  customer_name_input.current.value = customer.name;
            }
            if (isRefValid(image_input))
                  image_input.current.style.setProperty('display', 'block', 'important');
            if (isRefValid(password_input))
            {
                  password_input.current.style.display = "inline";
                  setPass("");
            }
            if (isRefValid(repassword_input))
            {
                  repassword_input.current.style.display = "inline";
                  setRepass("");
            }
      }

      const cancelUpdate = () =>
      {
            if (isRefValid(customer_name))
                  customer_name.current.style.display = "inline";
            if (isRefValid(customer_email))
                  customer_email.current.style.display = "inline";
            if (isRefValid(customer_phone))
                  customer_phone.current.style.display = "inline";
            if (isRefValid(customer_dob))
                  customer_dob.current.style.display = "inline";
            if (isRefValid(edit))
                  edit.current.style.display = "inline-block";
            if (isRefValid(update))
                  update.current.style.display = "none";
            if (isRefValid(customer_name_input))
                  customer_name_input.current.style.display = "none";
            if (isRefValid(customer_email_input))
                  customer_email_input.current.style.display = "none";
            if (isRefValid(customer_phone_input))
                  customer_phone_input.current.style.display = "none";
            if (isRefValid(customer_dob_input))
                  customer_dob_input.current.style.display = "none";
            if (isRefValid(image_input))
                  image_input.current.style.setProperty('display', 'none', 'important');
            if (isRefValid(password_input))
                  password_input.current.style.display = "none";
            if (isRefValid(repassword_input))
                  repassword_input.current.style.display = "none";
            setWrong(false);
            setIsFuture(false);
      }

      const confirmChange = (e) =>
      {
            if (e !== undefined)
            {
                  e.preventDefault();
                  if (pass !== repass)
                        setWrong(true);
                  else if (isRefValid(customer_dob_input) && customer_dob_input.current.value !== '' && new Date(customer_dob_input.current.value) > new Date())
                        setIsFuture(true);
                  else
                  {
                        setWrong(false);
                        setIsFuture(false);
                        const formData = new FormData();
                        formData.append("name", isRefValid(customer_name_input) ? customer_name_input.current.value : null);
                        formData.append("image", image);
                        formData.append("password", pass === '' ? null : pass);
                        formData.append("email", isRefValid(customer_email_input) ? customer_email_input.current.value : null);
                        formData.append("phone", isRefValid(customer_phone_input) ? (customer_phone_input.current.value === "" ? null : customer_phone_input.current.value) : null);
                        formData.append("dob", isRefValid(customer_dob_input) ? (customer_dob_input.current.value === "" ? null : customer_dob_input.current.value) : null);
                        axios.post(`http://${ domain }/info/update`, formData, { withCredentials: true })
                              .then(res =>
                              {
                                    console.log(res);
                                    cancelUpdate();
                                    setRenderTrigger(!renderTrigger);
                              })
                              .catch(error => { console.log(error); });
                  }
            }
      }

      const changeImage = (e) =>
      {
            if (e.target.files.length === 0)
            {
                  setImage(null);
                  if (isRefValid(imageRef))
                        imageRef.current.src = customer.image;
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
                        if (isRefValid(imageRef))
                              imageRef.current.src = url;
                  };
            }
      }

      return (
            <form className='h-100 w-100 overflow-auto hideBrowserScrollbar d-flex align-items-center justify-content-center' onSubmit={ confirmChange } onKeyDown={ (event) =>
            {
                  if (event.key === 'Enter' || event.key === "NumpadEnter")
                        event.preventDefault();
            } } ref={ formRef }>
                  <div className="w-100 h-100">
                        <div className={ `h-100 w-100 d-flex flex-column` }>
                              <div className={ `mt-4 d-flex flex-column flex-md-row align-items-center justify-content-md-between align-items-md-start w-100` }>
                                    <div className={ `${ styles.imgContainer } ms-md-5 d-flex flex-column` }>
                                          <img className={ `h-100 ${ styles.img }` } ref={ imageRef } alt='avatar' />
                                          <label className={ `btn btn-sm btn-light border border-dark mt-3 mx-auto ${ styles.browse } mb-3` } ref={ image_input }>
                                                <input type='file' className='d-none' accept='.jpg,.jpeg,.png' onChange={ changeImage }></input>
                                                Choose file
                                          </label>
                                    </div>
                                    <div className={ `d-flex flex-column justify-content-center align-items-center ${ styles.info } mt-2 mt-md-0 me-xxl-5` }>
                                          <div className='text-center' style={ { marginBottom: '16px' } }>Name: &nbsp;
                                                <span ref={ customer_name }>{ customer.name }</span>
                                                <input type="text" className={ `${ styles.update } ` } ref={ customer_name_input } required></input>
                                          </div>
                                          <div className='text-center' style={ { marginBottom: '16px' } }>Date of birth: &nbsp;
                                                <span ref={ customer_dob }>{ customer.dob }</span>
                                                <input type="date" className={ `${ styles.update } ` } ref={ customer_dob_input } ></input>
                                          </div>
                                          <div className='text-center' style={ { marginBottom: '16px' } }>Email: &nbsp;
                                                <span ref={ customer_email }>{ customer.email }</span>
                                                <input type="email" className={ `${ styles.update } ` } ref={ customer_email_input } required></input>
                                          </div>
                                          <div className='text-center' style={ { marginBottom: '16px' } }>Phone number: &nbsp;
                                                <span ref={ customer_phone }>{ customer.phone }</span>
                                                <input title="Your phone number must not contain alphabetical character(s)" type="text" className={ `${ styles.update } ` } ref={ customer_phone_input } maxLength='10' pattern='[0-9]{10}'></input>
                                          </div>
                                          <div className='text-center' style={ { marginBottom: '16px' } }>Total spending: &nbsp;${ customer.spending }</div>
                                          <div className='text-center' style={ { marginBottom: '16px' } }>
                                                Membership rank: &nbsp;
                                                <span>{ customer.rank }</span>
                                          </div>
                                          <div className='text-center' style={ { marginBottom: '16px' } }>
                                                Membership discount: &nbsp;
                                                <span>{ customer.discount }%</span>
                                          </div>
                                          <div className={ `${ styles.update } text-center w-100` } ref={ password_input } style={ { marginBottom: '16px' } }>Password: &nbsp;
                                                <input type="password" value={ pass } onChange={ e => setPass(e.target.value) }></input>
                                          </div>
                                          <div className={ `${ styles.update } text-center w-100` } ref={ repassword_input } style={ { marginBottom: '16px' } }>Re-enter password: &nbsp;
                                                <input type="password" value={ repass } onChange={ e => setRepass(e.target.value) }></input>
                                          </div>
                                          <div className='d-flex align-items-center' style={ { color: 'red' } }>
                                                {
                                                      wrong
                                                      &&
                                                      <AiOutlineCloseCircle style={ {
                                                            marginRight: '5px',
                                                            marginBottom: '16px'
                                                      } } className={ `${ styles.p }` } />
                                                }
                                                {
                                                      wrong
                                                      &&
                                                      <p className={ `${ styles.p }` }>
                                                            Passwords are not matched!
                                                      </p>
                                                }
                                                {
                                                      isFuture
                                                      &&
                                                      <AiOutlineCloseCircle style={ {
                                                            marginRight: '5px',
                                                            marginBottom: '16px'
                                                      } } className={ `${ styles.p } text-center` } />
                                                }
                                                {
                                                      isFuture
                                                      &&
                                                      <p className={ `${ styles.p } text-center` }>
                                                            Your birthdate can not be the future!
                                                      </p>
                                                }
                                          </div>
                                          <button type='button' className={ `btn btn-sm btn-primary` } onClick={ changeInfo } ref={ edit }>Edit</button>
                                          <div className={ `${ styles.buttons } w-100 align-items-center justify-content-center` } ref={ update }>
                                                <button type='button' className={ `btn btn-sm btn-danger` } onClick={ cancelUpdate }>Cancel</button>
                                                <button type='button' className={ `btn btn-sm btn-primary mx-3` } onClick={ () =>
                                                {
                                                      setShowPopup(true);
                                                } }>Confirm</button>
                                          </div>
                                    </div>
                              </div>
                              <button type='button' className={ `btn btn-sm btn-primary ms-md-5 ms-3 mt-2 align-self-start` } onClick={ getHistory }>Get history purchases</button>
                              <div className={ `w-100 mt-2 mb-4 overflow-auto ${ styles.table } flex-grow-1` } ref={ div2Height } style={ { minHeight: '300px' } }>
                                    <table className={ `table table-hover mx-auto mb-0 w-100` }>
                                          <thead style={ { position: "sticky", top: '0', backgroundColor: "#BFBFBF" } }>
                                                <tr>
                                                      <th scope="col" className={ `col-3 text-center` }>Game name</th>
                                                      <th scope="col" className={ `col-3 text-center` }>Code</th>
                                                      <th scope="col" className={ `col-2 text-center` }>Date</th>
                                                      <th scope="col" className={ `col-2 text-center` }>Price</th>
                                                      <th scope="col" className={ `col-2 text-center` }>Method</th>
                                                </tr>
                                          </thead>
                                          <tbody ref={ history }>
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  </div>
                  <Modal show={ showPopup } onHide={ () => { setShowPopup(false); } } className={ `reAdjustModel` } container={ formRef.current }>
                        <Modal.Header closeButton className='border border-0'>
                        </Modal.Header>
                        <Modal.Body className='border border-0 d-flex justify-content-center'>
                              <h4 className='text-center'>Do you want to update your info?</h4>
                        </Modal.Body>
                        <Modal.Footer className='justify-content-center border border-0'>
                              <button className='btn btn-danger me-2 me-md-4' onClick={ () => { setShowPopup(false); } }>NO</button>
                              <button className='btn btn-primary ms-2 ms-md-4' onClick={ () => { setShowPopup(false); confirmChange(); } }>YES</button>
                        </Modal.Footer>
                  </Modal>
            </form>
      )
}