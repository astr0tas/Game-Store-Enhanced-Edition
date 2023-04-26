import '../../css/Customer/home.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { TbFlame } from 'react-icons/tb';
import { BsCart } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import $ from 'jquery';
import { CiDiscount1 } from 'react-icons/ci';
import { checkCookie } from '../tools/cookie';
import { useNavigate } from 'react-router-dom';
import { domain } from '../tools/domain';

const BestSeller = (props) =>
{
      const [status, setStatus] = useState(false);

      const addToWishlist = (event, id) =>
      {
            event.preventDefault();
            if ($(`.add_to_wishlist_${ id }`).css("color") === "rgb(0, 0, 0)")
            {
                  $(`.add_to_wishlist_${ id }`).css("color", "red");
                  const formData = new FormData();
                  formData.append('game_id', id);
                  axios.post(`http://${ domain }/addWishlist`, formData, { withCredentials: true }).then(res => { console.log(res); }).catch(err => { console.log(err); })
            }
            else
            {
                  $(`.add_to_wishlist_${ id }`).css("color", "rgb(0, 0, 0)");
                  const formData = new FormData();
                  formData.append('game_id', id);
                  axios.post(`http://${ domain }/removeWishlis`, formData, { withCredentials: true }).then(res => { console.log(res); }).catch(err => { console.log(err); })
            }
      }

      const addToCart = (event, id) =>
      {
            event.preventDefault();
            if (status)
            {
                  if ($(`.add_to_cart_${ id }`).css("color") === "rgb(0, 0, 0)")
                  {
                        $(`.add_to_cart_${ id }`).css("color", "#00B3EC");
                        const formData = new FormData();
                        formData.append('game_id', id);
                        axios.post(`http://${ domain }/addCart`, formData, { withCredentials: true }).then(res => { console.log(res); }).catch(err => { console.log(err); })
                  }
                  else
                  {
                        $(`.add_to_cart_${ id }`).css("color", "rgb(0, 0, 0)");
                        const formData = new FormData();
                        formData.append('game_id', id);
                        axios.post(`http://${ domain }/removeCart`, formData, { withCredentials: true }).then(res => { console.log(res); }).catch(err => { console.log(err); })
                  }
            }
            else
                  $('.out_of_stock_pop_up').css("display", "flex");
      }

      useEffect(() =>
      {
            if (props.discount === "0")
                  $(`.discount_${ props.id }`).css("display", "none");
            const formData = new FormData();
            formData.append('id', props.id);
            axios.post(`http://${ domain }/gameStatus`, formData)
                  .then(res =>
                  {
                        setStatus(res.data);
                  }).catch(err => { console.log(err); })
      });

      return (
            <div className={ `sale d-flex flex-column align-items-center ${ props.class }` }>
                  <img className='pic' src={ props.url } alt=""></img>
                  <div className='section'>
                        <button className='detail d-flex align-items-center justify-content-center' onClick={ () => { window.location.href = `/gamelist/${ props.id }`; } }>{ <CiDiscount1 className={ `discount_${ props.id }` } style={ { fontSize: '1.5rem', color: "red",marginTop:"3px" } } /> }${ (props.price - props.price * props.discount / 100.0).toFixed(2) }</button>
                        <div className='d-flex w-100 justify-content-center align-items-center icons'>
                              <BsCart className={ `mx-3 add_to_cart add_to_cart_${ props.id }` } onClick={ (e) => { addToCart(e, props.id) } } />
                              <AiOutlineHeart className={ `mx-3 add_to_wishlist add_to_wishlist_${ props.id }` } onClick={ (e) => { addToWishlist(e, props.id) } } />
                        </div>
                  </div>
            </div>
      );
}

export default function CustomerHome()
{
      const effectRan = useRef(false);

      const Navigate = useNavigate();

      useEffect(() =>
      {
            if (!checkCookie("PHPSESSID"))
                  Navigate("/");
            if (effectRan.current === false)
            {
                  document.getElementById("home").style.backgroundColor = "#00B3EC";
                  document.getElementById("home").style.color = "white";

                  axios.get(`http://${ domain }/getBestSeller`)
                        .then(res =>
                        {
                              const group1 = ReactDOM.createRoot(document.getElementsByClassName('group')[0]);
                              const group2 = ReactDOM.createRoot(document.getElementsByClassName('group')[1]);
                              let temp1 = [], temp2 = [];
                              for (let i = 0; i < res.data.length; i++)
                              {
                                    const data = new Uint8Array(Object.values(res.data[i].picture_1));
                                    const blob = new Blob([data], { type: "image/jpg" });
                                    const url = URL.createObjectURL(blob);
                                    if (i < 3)
                                          temp1.push(<BestSeller key={ i } url={ url } class={ "" } price={ res.data[i].price } id={ res.data[i].id } discount={ res.data[i].discount } />);
                                    else
                                          temp2.push(<BestSeller key={ i } url={ url } class={ "mx-5" } price={ res.data[i].price } id={ res.data[i].id } discount={ res.data[i].discount } />);
                              }
                              group1.render(<>{ temp1 }</>);
                              group2.render(<>{ temp2 }</>);
                        })
                        .catch(error => console.log(error));

                  console.log("render");
                  effectRan.current = true;
            }

      }, []);

      return (
            <div className='d-flex flex-column justify-content-center align-items-center h-100 w-100 customer-home'>
                  <div className='board'>
                        <div className="d-flex align-items-center justify-content-center best_sellers">
                              <h2 className='d-flex align-items-center' style={ { color: "red" } }><TbFlame />Best sellers<TbFlame /></h2>
                        </div>
                        <div className="best-sellers overflow-auto">
                              <div className="group">
                              </div>
                              <div className="group">
                              </div>
                        </div>
                  </div>
                  <div className='position-absolute out_of_stock_pop_up flex-column align-items-center justify-content-between'>
                        <h2 className='mt-3 mt-md-5'>This game is out of stock!</h2>
                        <button className='mb-3 mb-md-5 OKAY' onClick={ () => { $('.out_of_stock_pop_up').css("display", "none"); } }>OKAY</button>
                  </div>
            </div>
      )
}