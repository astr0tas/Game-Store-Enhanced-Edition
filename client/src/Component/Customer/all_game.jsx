import '../../css/Customer/allgames.css';
import { useEffect, useRef, useState, React } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { BsCart, BsSearch } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import $ from 'jquery';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { domain } from '../tools/domain';
import { CiDiscount1 } from 'react-icons/ci';
import { checkCookie } from '../tools/cookie';
import { useNavigate } from 'react-router-dom';

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
                        if ($(`.add_to_wishlist_${ id }`).css("color") === "rgb(255, 0, 0)")
                              $(`.add_to_wishlist_${ id }`).css("color", "rgb(0, 0, 0)");
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
            axios.post(`http://${ domain }/isAddedToWishlist`, formData, { withCredentials: true })
                  .then(res =>
                  {
                        if (res.data)
                              $(`.add_to_wishlist_${ props.id }`).css("color", "red");
                  }).catch(err => { console.log(err); })
            axios.post(`http://${ domain }/isAddedToCart`, formData, { withCredentials: true })
                  .then(res =>
                  {
                        if (res.data)
                              $(`.add_to_cart_${ props.id }`).css("color", "#00B3EC");
                  }).catch(err => { console.log(err); })
      });

      return (
            <div className={ `sale d-flex flex-column align-items-center` }>
                  <img className='pic' src={ props.url } alt="pic"></img>
                  <div className='section'>
                        <button className='detail d-flex align-items-center justify-content-center' onClick={ () => { window.location.href = `/allgames/${ props.id }`; } }>{ <CiDiscount1 className={ `discount_${ props.id } discount_icon` } style={ { fontSize: '1.5rem', color: "red", marginTop: "3px" } } /> }${ (props.price - props.price * props.discount / 100.0).toFixed(2) }</button>
                        <div className='d-flex w-100 justify-content-center align-items-center mt-2'>
                              <BsCart className={ `mx-3 add_to_cart add_to_cart_${ props.id }` } onClick={ (e) => { addToCart(e, props.id) } } />
                              <AiOutlineHeart className={ `mx-3 add_to_wishlist add_to_wishlist_${ props.id }` } onClick={ (e) => { addToWishlist(e, props.id) } } />
                        </div>
                  </div>
            </div>
      );
}

export default function CustomerGame()
{
      const Navigate = useNavigate();

      const effectRan = useRef(false);

      const firstRender = useRef(true);

      const [offset, setOffset] = useState(0);
      const [count, setCount] = useState(6);
      const [flag, setFlag] = useState(false);

      const foo = () =>
      {
            if (window.innerWidth < 728)
            {
                  return 2;
            }
            else if (window.innerWidth < 992)
            {
                  return 4;
            }
            else
            {
                  return 6;
            }
      }

      useEffect(() =>
      {
            if (!checkCookie("PHPSESSID"))
                  Navigate("/");
            if (effectRan.current === false)
            {
                  document.getElementById("game").style.backgroundColor = "#00B3EC";
                  document.getElementById("game").style.color = "white";
                  effectRan.current = true;

                  window.addEventListener('resize', () =>
                  {
                        if (window.innerWidth < 728)
                        {
                              setCount(2);
                              effectRan.current = false;
                        }
                        else if (window.innerWidth < 992)
                        {
                              setCount(4);
                              effectRan.current = false;
                        }
                        else
                        {
                              setCount(6);
                              effectRan.current = false;
                        }
                  });

                  let firstRenderOnly = 1000;
                  if (firstRender.current)
                  {
                        firstRenderOnly = foo();
                        firstRender.current = false;
                  }

                  const formData = new FormData();
                  formData.append("limit", count > firstRenderOnly ? firstRenderOnly : count);
                  formData.append("offset", offset);
                  axios.post(`http://${ domain }/getAllGames`, formData)
                        .then((res) =>
                        {
                              if (res.data.length === 0)
                              {
                                    setFlag(true);
                                    setOffset(offset - count);
                              }
                              else
                              {
                                    setFlag(false);
                                    let temp = [];
                                    let i = 0;
                                    for (; i < res.data.length / 2; i++)
                                    {
                                          const data = new Uint8Array(Object.values(res.data[i].picture_1));
                                          const blob = new Blob([data], { type: "image/jpg" });
                                          const url = URL.createObjectURL(blob);
                                          temp.push(
                                                <BestSeller
                                                      key={ i }
                                                      url={ url }
                                                      price={ res.data[i].price }
                                                      id={ res.data[i].id }
                                                      discount={ res.data[i].discount }
                                                />
                                          );
                                    }
                                    const target1 = ReactDOM.createRoot(document.getElementsByClassName("group")[0]);
                                    target1.render(<>{ temp }</>);

                                    temp = [];
                                    for (; i < res.data.length; i++)
                                    {
                                          const data = new Uint8Array(Object.values(res.data[i].picture_1));
                                          const blob = new Blob([data], { type: "image/jpg" });
                                          const url = URL.createObjectURL(blob);
                                          temp.push(
                                                <BestSeller
                                                      key={ i }
                                                      url={ url }
                                                      price={ res.data[i].price }
                                                      id={ res.data[i].id }
                                                      discount={ res.data[i].discount }
                                                />
                                          );
                                    }
                                    const target2 = ReactDOM.createRoot(document.getElementsByClassName("group")[1]);
                                    target2.render(<>{ temp }</>);
                              }
                        })
                        .catch((error) => console.log(error));
                  console.log("render");
            }
      }, [offset, count]);


      let timer;
      const search = (temp_offset = 0) =>
      {
            clearTimeout(timer);
            timer = setTimeout(() =>
            {
                  $('.of_all').css("display", "none");
                  $('.of_search').css("display", "inline");
                  const formData = new FormData();
                  formData.append("name", $("#search").val());
                  formData.append("limit", count);
                  formData.append("offset", temp_offset);
                  axios.post(`http://${ domain }/findGame`, formData)
                        .then((res) =>
                        {
                              console.log(res);
                              console.log(temp_offset);
                              if (res.data.length === 0)
                              {
                                    setFlag(true);
                                    setOffset(temp_offset-count);
                              }
                              else
                              {
                                    $(".group").empty();
                                    setFlag(false);
                                    let temp = [];
                                    let i = 0;
                                    for (; i < res.data.length / 2; i++)
                                    {
                                          const data = new Uint8Array(Object.values(res.data[i].picture_1));
                                          const blob = new Blob([data], { type: "image/jpg" });
                                          const url = URL.createObjectURL(blob);
                                          temp.push(
                                                <BestSeller
                                                      key={ i }
                                                      url={ url }
                                                      price={ res.data[i].price }
                                                      id={ res.data[i].id }
                                                      discount={ res.data[i].discount }
                                                />
                                          );
                                    }
                                    const target1 = ReactDOM.createRoot(document.getElementsByClassName("group")[0]);
                                    target1.render(<>{ temp }</>);

                                    temp = [];
                                    for (; i < res.data.length; i++)
                                    {
                                          const data = new Uint8Array(Object.values(res.data[i].picture_1));
                                          const blob = new Blob([data], { type: "image/jpg" });
                                          const url = URL.createObjectURL(blob);
                                          temp.push(
                                                <BestSeller
                                                      key={ i }
                                                      url={ url }
                                                      price={ res.data[i].price }
                                                      id={ res.data[i].id }
                                                      discount={ res.data[i].discount }
                                                />
                                          );
                                    }
                                    const target2 = ReactDOM.createRoot(document.getElementsByClassName("group")[1]);
                                    target2.render(<>{ temp }</>);
                              }
                        })
                        .catch((error) => console.log(error));
            }, 100);
      };

      return (
            <div className='d-flex flex-column justify-content-center align-items-center h-100 w-100 customer-game'>
                  <div className='board'>
                        <div className=" d-flex align-items-center justify-content-center best_sellers">
                              <input className='search' id='search' type='text' placeholder='Find' onKeyUp={ () => { setOffset(0); setFlag(false); search(); } } />
                              <BsSearch id='scope' className="search_icon" />
                        </div>
                        <div className="container-fluid w-100 d-flex flex-column" id='body' style={ { height: '85%' } }>
                              <div className="group justify-content-around align-items-center">
                              </div>
                              <div className="group justify-content-around align-items-center">
                              </div>
                        </div>
                        <div className="mt-auto mb-3">
                              <GrFormPrevious className='mx-2 page_direction of_all' size={ 40 } onClick={ () => { if (offset !== 0) { setOffset(offset - count); effectRan.current = false; } } } />
                              <GrFormNext className='mx-2 page_direction of_all' size={ 40 } onClick={ () => { if (!flag) { setOffset(offset + count); effectRan.current = false; } } } />
                              <GrFormPrevious className='mx-2 page_direction of_search' size={ 40 } onClick={ () => { if (offset !== 0) { search(offset - count); setOffset(offset - count); } } } />
                              <GrFormNext className='mx-2 page_direction of_search' size={ 40 } onClick={ () => { if (!flag) { search(offset + count); setOffset(offset + count); } } } />
                        </div>
                  </div>
                  <div className='position-absolute out_of_stock_pop_up flex-column align-items-center justify-content-between'>
                        <h2 className='mt-3 mt-md-5'>This game is out of stock!</h2>
                        <button className='mb-3 mb-md-5 OKAY' onClick={ () => { $('.out_of_stock_pop_up').css("display", "none"); } }>OKAY</button>
                  </div>
            </div>
      )
}