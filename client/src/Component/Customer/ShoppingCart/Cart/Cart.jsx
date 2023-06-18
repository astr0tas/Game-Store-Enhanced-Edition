import { useEffect, useRef, useState } from 'react';
import styles from './Cart.module.css';
import { BsFillCartFill } from 'react-icons/bs';
import { isRefNotValid, isRefValid } from '../../../tools/refChecker';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { domain } from '../../../tools/domain';
import { CiDiscount1 } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { BiTrash } from 'react-icons/bi';
import '../../../General/css/inputNumber.css';
import { Modal } from 'react-bootstrap';
import '../../../General/css/modal.css';
import '../../../General/css/scroll.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Card = (props) =>
{
      const [category, setCategory] = useState("N/A");
      const [isOut, setIsOut] = useState(false);
      const [render, setRender] = useState(false);

      const increase = useRef(null);
      const decrease = useRef(null);
      const amount = useRef(null);

      const removeFromCart = () =>
      {
            const formData = new FormData();
            formData.append("id", props.id);
            axios.post(`http://${ domain }/removeFromCart`, formData, { withCredentials: true }).then(res =>
            {
                  console.log(res);
                  props.setDisablePurchase(false);
                  props.setRender(!props.render);
            })
                  .catch(err => console.log(err))
      }

      useEffect(() =>
      {
            const formData = new FormData();
            formData.append("id", props.id);
            axios.post(`http://${ domain }/game/gameCategory`, formData)
                  .then(res =>
                  {
                        if (res.data.length)
                        {
                              let temp = res.data[0].category_type;
                              for (let i = 1; i < res.data.length - 1; i++)
                                    temp += ', ' + res.data[i].category_type;
                              setCategory(temp);
                        }
                  }).catch(error => { console.log(error); })

            axios.post(`http://${ domain }/game/status`, formData)
                  .then(res =>
                  {
                        if (!res.data)
                        {
                              setIsOut(true);
                              if (isRefValid(increase))
                                    increase.current.disabled = true;
                              if (isRefValid(decrease))
                                    decrease.current.disabled = true;
                              if (isRefValid(amount))
                              {
                                    amount.current.disabled = true;
                                    amount.current.value = 0;
                              }
                              props.setDisablePurchase(true);
                        }
                        else
                        {
                              if (isRefValid(amount)) amount.current.value = props.amount;
                        }
                  }).catch(error => { console.log(error); })
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.id, props.amount, render, props.render]);

      let timer;
      const toggle = (e, symbol) =>
      {
            const formData = new FormData();
            formData.append("id", props.id);
            if (symbol !== '')
            {
                  formData.append("mode", symbol === '-' ? 1 : 2);
                  axios.post(`http://${ domain }/adjustAmount`, formData, { withCredentials: true })
                        .then(res =>
                        {
                              if (res.data.OutDeleted === '1')
                                    props.setshowpopup3(true);
                              else
                              {
                                    if (res.data.OutStatus === '0')
                                          props.setshowpopup1(true);
                                    else
                                    {
                                          if (res.data.OutNotEnough === '1')
                                                props.setshowpopup5(true);
                                          else
                                                props.setRender(!props.render);
                                    }
                              }
                        })
                        .catch(err => console.log(err))
            }
            else
            {
                  clearTimeout(timer);

                  timer = setTimeout(() =>
                  {
                        if ((e.target.value === '' || e.target.value < 0) && isRefValid(amount))
                              amount.current.value = 1;
                        formData.append('amount', e.target.value);
                        formData.append("mode", 3);
                        axios.post(`http://${ domain }/adjustAmount`, formData, { withCredentials: true })
                              .then(res =>
                              {
                                    if (res.data.OutDeleted === '1')
                                          props.setshowpopup3(true);
                                    else
                                    {
                                          if (res.data.OutStatus === '0')
                                                props.setshowpopup1(true);
                                          else
                                          {
                                                if (res.data.OutNotEnough === '1')
                                                {
                                                      props.setshowpopup5(true);
                                                      setRender(!render);
                                                }
                                                else
                                                      props.setRender(!props.render);
                                          }
                                    }
                              })
                              .catch(err => console.log(err))
                  }, 1000);
            }
      }

      return (
            <div className={ `border border-dark rounded row p-2 mx-3 my-3 ${ styles.card }` }>
                  <div className='col-12 col-md-5 d-flex p-0' style={ { maxHeight: '80%' } }>
                        <img alt='' onClick={ () => props.Navigate(`/games/${ props.id }`) } className={ `w-100 ${ styles.imgs } mx-auto rounded` } src={ props.img === null ? 'https://upload.wikimedia.org/wikipedia/commons/7/71/Nothing_whitespace_blank.png' : `http://${ domain }/model/data/games/${ props.img }` }></img>
                  </div>
                  <div className='col-12 col-md-7 d-flex flex-column'>
                        <div className='flex-grow-1 d-flex flex-column justify-content-center'>
                              <h2 className='mt-3'>{ props.name }</h2>
                              <div className='d-flex align-items-center'>
                                    <p>Category:&nbsp;</p>
                                    <p className='overflow-auto' style={ { whiteSpace: 'nowrap' } }>{ category }</p>
                              </div>
                              <div className='d-flex align-items-center'>
                                    <h5>Price:&nbsp;{ !props.price && 'N/A' }{ props.price && '$' }{ props.discount === '0' && props.price }{ props.discount !== '0' && props.discount !== null && ((parseFloat(props.price) + 0.01) * (100 - parseFloat(props.discount)) / 100).toFixed(2) - 0.01 }&nbsp;&nbsp;&nbsp;</h5>
                                    { props.discount !== null && parseFloat(props.discount) !== 0 && <CiDiscount1 style={ {
                                          fontSize: '1rem',
                                          color: 'red',
                                          marginBottom: '10px'
                                    } } /> }
                                    { props.discount !== null && parseFloat(props.discount) !== 0 && <h5 style={ { color: 'red' } }>{ props.discount }%</h5> }
                              </div>
                              {
                                    isOut &&
                                    <div className='d-flex align-items-center mt-2' style={ { color: 'red', fontSize: '1.1rem' } }>
                                          <AiOutlineCloseCircle style={ { marginBottom: '16px' } } />
                                          <p className='ms-1'>Currently of of stock!</p>
                                    </div>
                              }
                        </div>
                        <hr className='mt-auto'></hr>
                        <div className='d-flex align-items-center justify-content-between'>
                              <div className="input-group">
                                    <button ref={ decrease } className="btn btn-secondary btn-sm" style={ { width: '25px' } } onClick={ e => toggle(e, '-') }>-</button>
                                    <input className='text-center removeUpAndDown' type="number" style={ { width: '50px' } } ref={ amount } onChange={ e => toggle(e, '') }></input>
                                    <button ref={ increase } className="btn btn-primary btn-sm" style={ { width: '25px' } } onClick={ e => toggle(e, '+') }>+</button>
                              </div>
                              <BiTrash className={ `${ styles.trash }` } onClick={ removeFromCart } />
                        </div>
                  </div>
            </div>
      );
}

const Cart = () =>
{
      document.title = "Your shopping cart";

      const div = useRef(null);
      const target = useRef(null);

      const [render, setRender] = useState(false);
      const [discount, setDiscount] = useState(0);
      const [total, setTotal] = useState("0");
      const [showPopup, setShowPopup] = useState(false);
      const [showpopup1, setshowpopup1] = useState(false);
      const [showpopup3, setshowpopup3] = useState(false);
      const [showpopup4, setshowpopup4] = useState(false);
      const [showpopup5, setshowpopup5] = useState(false);

      const [disablePurchase, setDisablePurchase] = useState(false);

      const popUpcontainer = useRef(null);

      const Navigate = useNavigate();

      useEffect(() =>
      {
            if (isRefValid(div) && isRefNotValid(target))
                  target.current = ReactDOM.createRoot(div.current);

            axios.get(`http://${ domain }/getCart`, { withCredentials: true })
                  .then(res =>
                  {
                        if (res.data.length)
                        {
                              const temp = [];
                              let totalTemp = 0;
                              for (let i = 0; i < res.data.length; i++)
                              {
                                    if (parseFloat(res.data[i].discount) !== 0)
                                          totalTemp += (parseFloat(res.data[i].price) + 0.01) * parseFloat(res.data[i].amount) * (100 - parseFloat(res.data[i].discount)) / 100 - 0.01;
                                    else
                                          totalTemp += (parseFloat(res.data[i].price) + 0.01) * parseFloat(res.data[i].amount) - 0.01;
                                    temp.push(<Card
                                          setDisablePurchase={ setDisablePurchase }
                                          setshowpopup1={ setshowpopup1 }
                                          setshowpopup3={ setshowpopup3 }
                                          setshowpopup5={ setshowpopup5 }
                                          render={ render } setRender={ setRender } Navigate={ Navigate } key={ i } img={ res.data[i].picture_1 } id={ res.data[i].id } name={ res.data[i].name } price={ res.data[i].price } discount={ res.data[i].discount } amount={ res.data[i].amount }
                                    />);
                              }
                              target.current.render(<>{ temp }</>);
                              setTotal('$' + ((totalTemp * (100 - discount) / 100).toFixed(2)).toString());
                        }
                        else
                        {
                              setDisablePurchase(true);
                              setTotal('$0');
                        }
                  })
                  .catch(err => console.log(err))
            axios.get(`http://${ domain }/info/discount`, { withCredentials: true })
                  .then(res =>
                  {
                        setDiscount(parseFloat(res.data.membership_discount));
                  })
                  .catch(err => console.log(err))

            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [render, Navigate]);

      const buyGames = (method) =>
      {
            setShowPopup(false);

            const formData = new FormData();
            formData.append('total', total.substring(1));
            formData.append('method', method === 1 ? 'MoMo wallet' : 'Online banking');
            axios.post(`http://${ domain }/buyGame`, formData, { withCredentials: true })
                  .then(res =>
                  {
                        console.log(res);
                        if (res.data.OutStatus === '0' || res.data.OutDeleted === '1' || res.data.OutNotEnough === '1')
                              setshowpopup4(true);
                        else
                              Navigate('./receipt');
                  })
                  .catch(err => console.log(err));
      }


      return (
            <div className='w-100 h-100 d-flex flex-column align-items-center' ref={ popUpcontainer }>
                  <div className={ `d-flex align-items-center justify-content-center mx-auto ${ styles.title }` } style={ { color: "red", fontSize: '2rem' } }>
                        <BsFillCartFill className='mb-0' />&nbsp;
                        <h2 className='mb-0'>Your cart</h2>
                  </div>
                  <div className='w-100 flex-grow-1 mt-3 overflow-auto' ref={ div }>
                  </div>
                  <hr></hr>
                  <div className='d-flex justify-content-center align-items-center mb-2 w-100'>
                        <input type='text' disabled className={ `me-3 ${ styles.total } text-center` } style={ { fontSize: '1.5rem' } } value={ total }></input>
                        <button className='btn btn-primary' onClick={ () => setShowPopup(true) } disabled={ disablePurchase }>Purchase</button>
                  </div>
                  <Modal show={ showPopup } backdrop="static" onHide={ () => { setShowPopup(false); } } dialogClassName={ `${ styles.dialog }` } className={ `reAdjustModel container-fluid hideBrowserScrollbar` } container={ popUpcontainer.current } style={ { maxWidth: '800px' } }>
                        <Modal.Header closeButton>
                              <Modal.Title>Payment method</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='d-flex flex-column flex-md-row overflow-auto my-2' style={ { maxHeight: '300px' } }>
                              <div className='d-flex flex-column align-items-center'>
                                    <h3>MoMo</h3>
                                    <img className={ `${ styles.methods }` } src="https://play-lh.googleusercontent.com/dQbjuW6Jrwzavx7UCwvGzA_sleZe3-Km1KISpMLGVf1Be5N6hN6-tdKxE5RDQvOiGRg" alt=""></img>
                                    <button className='btn btn-sm btn-primary mt-3' onClick={ () => buyGames(1) }>Choose</button>
                              </div>
                              <div className='d-flex flex-column align-items-center mt-5 mt-md-0'>
                                    <h3>Online banking</h3>
                                    <img className={ `${ styles.methods }` } src="https://cdn-icons-png.flaticon.com/512/4874/4874090.png" alt=""></img>
                                    <button className='btn btn-sm btn-primary mt-3' onClick={ () => buyGames(2) }>Choose</button>
                              </div>
                        </Modal.Body>
                        <Modal.Footer className='justify-content-center'>
                              <button className='btn btn-danger me-2 me-md-4' onClick={ () => { setShowPopup(false); } }>Cancel</button>
                        </Modal.Footer>
                  </Modal>
                  <Modal show={ showpopup1 } className={ `reAdjustModel` } container={ popUpcontainer.current }>
                        <Modal.Header className='border border-0'>
                        </Modal.Header>
                        <Modal.Body className='border border-0 d-flex justify-content-center'>
                              <h4 className='text-center'>This game has been suspended!</h4>
                        </Modal.Body>
                        <Modal.Footer className='justify-content-center border border-0'>
                              <button className='btn btn-primary ms-2 ms-md-4' onClick={ () =>
                              {
                                    setshowpopup1(false);
                                    setRender(!render);
                              } }>Okay</button>
                        </Modal.Footer>
                  </Modal>
                  <Modal show={ showpopup5 } className={ `reAdjustModel` } container={ popUpcontainer.current }>
                        <Modal.Header className='border border-0'>
                        </Modal.Header>
                        <Modal.Body className='border border-0 d-flex justify-content-center'>
                              <h4 className='text-center'>The store doesn't have enough copies for your demand!</h4>
                        </Modal.Body>
                        <Modal.Footer className='justify-content-center border border-0'>
                              <button className='btn btn-primary ms-2 ms-md-4' onClick={ () =>
                              {
                                    setshowpopup5(false);
                              } }>Okay</button>
                        </Modal.Footer>
                  </Modal>
                  <Modal show={ showpopup3 } className={ `reAdjustModel` } container={ popUpcontainer.current }>
                        <Modal.Header className='border border-0'>
                        </Modal.Header>
                        <Modal.Body className='border border-0 d-flex justify-content-center'>
                              <h4 className='text-center'>This game has been deleted!</h4>
                        </Modal.Body>
                        <Modal.Footer className='justify-content-center border border-0'>
                              <button className='btn btn-primary ms-2 ms-md-4' onClick={ () =>
                              {
                                    setshowpopup3(false);
                                    setRender(!render);
                              } }>Okay</button>
                        </Modal.Footer>
                  </Modal>
                  <Modal show={ showpopup4 } className={ `reAdjustModel` } container={ popUpcontainer.current }>
                        <Modal.Header className='border border-0'>
                        </Modal.Header>
                        <Modal.Body className='border border-0 d-flex justify-content-center'>
                              <h4 className='text-center'>An error has occurred!</h4>
                        </Modal.Body>
                        <Modal.Footer className='justify-content-center border border-0'>
                              <button className='btn btn-primary ms-2 ms-md-4' onClick={ () =>
                              {
                                    setshowpopup4(false);
                                    setRender(!render);
                              } }>Okay</button>
                        </Modal.Footer>
                  </Modal>
            </div >
      )
}

export default Cart;