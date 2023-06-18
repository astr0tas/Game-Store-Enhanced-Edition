import styles from './Home.module.css';
import { TbFlame } from 'react-icons/tb';
import { domain } from '../../tools/domain';
import { useEffect, useRef, useState } from 'react';
import { isRefNotValid, isRefValid } from '../../tools/refChecker';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { CiDiscount1 } from 'react-icons/ci';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsCart } from 'react-icons/bs';
import { Modal } from 'react-bootstrap';

const Game = (props) =>
{
      const [isInWish, setIsInWish] = useState(false);
      const [isInCart, setIsInCart] = useState(false);
      const [render, setRender] = useState(false);
      const [isOut, setIsOut] = useState(false);

      useEffect(() =>
      {
            const formData = new FormData();
            formData.append('id', props.id);
            axios.post(`http://${ domain }/isAddedToWishlist`, formData, { withCredentials: true }).then(res =>
            {
                  setIsInWish(res.data);
            })
                  .catch(err => console.log(err))

            axios.post(`http://${ domain }/game/status`, formData)
                  .then(res =>
                  {
                        if (res.data)
                        {
                              axios.post(`http://${ domain }/isAddedToCart`, formData, { withCredentials: true }).then(res =>
                              {
                                    setIsInCart(res.data);
                              })
                                    .catch(err => console.log(err))
                        }
                        else setIsOut(true);
                  }).catch(error => { console.log(error); })
      }, [render, props.id]);

      const toggleWishlist = () =>
      {
            const formData = new FormData();
            formData.append('id', props.id);
            if (isInWish)
            {
                  axios.post(`http://${ domain }/removeFromWishlist`, formData, { withCredentials: true }).then(res =>
                  {
                        console.log(res);
                        setRender(!render);
                  })
                        .catch(err => console.log(err))
            }
            else
            {
                  axios.post(`http://${ domain }/addToWishlist`, formData, { withCredentials: true }).then(res =>
                  {
                        if (res.data.OutDeleted === '1')
                              props.setshowpopup3(true);
                        else
                        {
                              if (res.data.OutStatus === '1')
                                    setRender(!render);
                              else
                                    props.setshowpopup1(true);
                        }
                  })
                        .catch(err => console.log(err))
            }
      }

      const toggleCart = () =>
      {
            if (isOut)
                  return;
            const formData = new FormData();
            formData.append('id', props.id);
            if (isInCart)
            {
                  axios.post(`http://${ domain }/removeFromCart`, formData, { withCredentials: true }).then(res =>
                  {
                        console.log(res);
                        setRender(!render);
                  })
                        .catch(err => console.log(err))
            }
            else
            {
                  axios.post(`http://${ domain }/addToCart`, formData, { withCredentials: true }).then(res =>
                  {
                        if (res.data.OutDeleted === '1')
                              props.setshowpopup3(true);
                        else
                        {
                              if (res.data.OutStatus === '0')
                                    props.setshowpopup1(true);
                              else
                              {
                                    if (res.data.OutRemain === '0')
                                          props.setshowpopup2(true);
                                    setRender(!render);
                              }
                        }
                  })
                        .catch(err => console.log(err))
            }
      }

      return (
            <div className={ `col-${ 12 / props.numOfElem } h-100` }>
                  <div className='card border border-dark mx-auto h-100' style={ { width: '90%', maxWidth: '300px' } }>
                        <img className='card-img-top' style={ { height: '60%' } } alt='' src={ props.img === null ? 'https://upload.wikimedia.org/wikipedia/commons/7/71/Nothing_whitespace_blank.png' : `http://${ domain }/model/data/games/${ props.img }` }></img>
                        <div className='card-body d-flex flex-column'>
                              <div className='d-flex align-items-center justify-content-center'>
                                    <a href={ `./games/${ props.id }` } className='btn btn-primary btn-lg'>
                                          { !props.price && 'N/A' }{ props.price && '$' }{ props.discount === '0' && props.price }{ props.discount !== '0' && props.discount !== null && ((parseFloat(props.price) + 0.01) * (100 - parseFloat(props.discount)) / 100).toFixed(2) - 0.01 }
                                    </a>
                                    { props.discount !== null && parseFloat(props.discount) !== 0 && <CiDiscount1 style={ {
                                          fontSize: '1.5rem',
                                          color: 'red',
                                          marginLeft: '10px'
                                    } } /> }
                                    { props.discount !== null && parseFloat(props.discount) !== 0 && <h4 style={ {
                                          color: 'red',
                                          marginBottom: '0'
                                    } }>{ props.discount }%</h4> }
                              </div>
                              <div className='d-flex mt-3 mx-auto align-items-center'>
                                    <AiOutlineHeart className={ `me-2 ${ styles.icons } ${ isInWish === false ? styles.unwish : styles.wish }` } style={ { fontSize: '2.5rem' } } onClick={ toggleWishlist } />
                                    <BsCart className={ `ms-2 ${ styles.icons } ${ isOut ? styles.cartOut : (isInCart === false ? styles.uncart : styles.cart) }` } style={ { fontSize: '2.5rem' } } onClick={ toggleCart } />
                              </div>
                        </div>
                  </div >
            </div>
      );
}

const CustomerHome = () =>
{
      document.title = "Home";

      const popUpContainer = useRef(null);
      const div1 = useRef(null), div2 = useRef(null);
      const target1 = useRef(null), target2 = useRef(null);

      const [render, setRender] = useState(false);
      const [showpopup1, setshowpopup1] = useState(false);
      const [showpopup2, setshowpopup2] = useState(false);
      const [showpopup3, setshowpopup3] = useState(false);


      useEffect(() =>
      {
            if (isRefNotValid(target1) && isRefValid(div1))
                  target1.current = ReactDOM.createRoot(div1.current);
            if (isRefNotValid(target2) && isRefValid(div2))
                  target2.current = ReactDOM.createRoot(div2.current);
      }, [render]);

      return (
            <div className='w-100 h-100 d-flex flex-column align-items-center' ref={ popUpContainer }>
                  <div className={ `d-flex flex-column align-items-center justify-content-center w-100 mb-2` }>
                        <div className={ `d-flex align-items-center justify-content-center ${ styles.title }` }>
                              <h2 className='d-flex align-items-center' style={ { color: "red" } }><TbFlame />Best sellers<TbFlame /></h2>
                        </div>
                  </div>
                  <div className='flex-grow-1 overflow-auto'>
                        <div className='mb-md-1' ref={ div1 }>
                        </div>
                        <div className='mt-md-1' ref={ div2 }>
                        </div>
                  </div>
                  <Modal show={ showpopup1 } className={ `reAdjustModel` } container={ popUpContainer.current }>
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
                  <Modal show={ showpopup2 } className={ `reAdjustModel` } container={ popUpContainer.current }>
                        <Modal.Header className='border border-0'>
                        </Modal.Header>
                        <Modal.Body className='border border-0 d-flex justify-content-center'>
                              <h4 className='text-center'>This game has been sold out!</h4>
                        </Modal.Body>
                        <Modal.Footer className='justify-content-center border border-0'>
                              <button className='btn btn-primary ms-2 ms-md-4' onClick={ () =>
                              {
                                    setshowpopup2(false);
                              } }>Okay</button>
                        </Modal.Footer>
                  </Modal>
                  <Modal show={ showpopup3 } className={ `reAdjustModel` } container={ popUpContainer.current }>
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
            </div>
      )
}

export default CustomerHome;