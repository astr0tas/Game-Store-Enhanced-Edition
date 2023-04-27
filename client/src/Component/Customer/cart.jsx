import { useEffect, useRef, useState } from 'react';
import styles from '../../css/Customer/card.module.css';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import $ from 'jquery';
import { domain } from '../tools/domain';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { checkCookie } from '../tools/cookie';
import { useNavigate } from 'react-router-dom';

const Card = (props) =>
{

      useEffect(() =>
      {
            const formData = new FormData();
            formData.append("id", props.id);
            axios.post(`http://${ domain }/getCategory`, formData).then(res =>
            {
                  let text = "";
                  for (let i = 0; i < res.data.length; i++)
                  {
                        text += res.data[i].category_type + ", ";
                  }
                  text = text.slice(0, -2);
                  $(`.category_${ props.id }`).append(text);
            })
                  .catch(err => { console.log(err); })
      });

      const removeGame = () =>
      {
            const formData = new FormData();
            formData.append('game_id', props.id);
            axios.post(`http://${ domain }/removeCart`, formData, { withCredentials: true }).then(res => { console.log(res); }).catch(err => { console.log(err); })
            window.location.reload();
      }

      return (
            <div className={ `${ styles.card }` } style={ { height: "45%" } }>
                  <div style={ { height: "80%", width: "40%" } }>
                        <img className='w-100 h-100' src={ props.url } alt="game"></img>
                  </div>
                  <div style={ { height: "100%", width: "50%" } } className='d-flex flex-column'>
                        <div style={ { height: "75%", borderBottom: "1px solid rgba(0, 0, 0, 0.5)" } } className='d-flex flex-column justify-content-between'>
                              <h1 className='mt-5'>{ props.name }</h1>
                              <h4>Price: ${ (props.price - props.price * props.discount / 100.0).toFixed(2) }</h4>
                              <div className='d-flex align-items-center mb-3'>
                                    <p style={ {
                                          fontSize: '1.5rem'
                                    } }>Category:&nbsp;&nbsp;
                                    </p>
                                    <p className={ `category_${ props.id }` } style={ {
                                          fontSize: '1.5rem'
                                    } }></p>
                              </div>
                        </div>
                        <div className='h-25 d-flex flex-column justify-content-center'>
                              <button className={ `${ styles.remove }` } onClick={ removeGame }>Remove from cart</button>
                        </div>
                  </div>
            </div>
      );
}

export const Cart = () =>
{
      const Navigate = useNavigate();

      const render = useRef(false);

      const [offset, setOffset] = useState(0);
      const [total, setTotal] = useState(0);
      const [flag, setFlag] = useState(false);
      const [ids, setIds] = useState([]);

      const buyCart = () =>
      {
            $(`.${ styles.pop_up }`).css("display", "block");
      }

      const confirmBuy = (method) =>
      {
            console.log(method);
            const formData = new FormData();
            formData.append('games', ids);
            formData.append("method", method);
            axios.post(`http://${ domain }/buyGame`, formData, { withCredentials: true }).then(res =>
            {
                  console.log(res);
            })
                  .catch(err => { console.log(err); })
            // window.location.href = "/product";
      }

      useEffect(() =>
      {
            if (!checkCookie("PHPSESSID"))
                  Navigate("/");
            if (!render.current)
            {
                  $("#cart").css("background-color", "#00B3EC").css("color", "white");
                  axios.get(`http://${ domain }/getCart`, { withCredentials: true }).then(res =>
                  {
                        let price = 0;
                        for (let i = 0; i < res.data.length; i++)
                        {
                              setIds(prev => [...prev, res.data[i].id]);
                              const temp = parseFloat(res.data[i].price) - parseFloat(res.data[i].price) * parseFloat(res.data[i].discount) / 100.0;
                              const temp1 = (temp - temp * parseFloat(res.data[i].membership_discount) / 100.0).toFixed(2);
                              price += Number(temp1);
                        }
                        setTotal(price);
                  })
                        .catch(err => { console.log(err); })
                  const formData = new FormData();
                  formData.append('offset', offset);
                  let temp = [];
                  axios.post(`http://${ domain }/displayCart`, formData, { withCredentials: true }).then(res =>
                  {
                        if (res.data.length === 0)
                        {
                              setFlag(true);
                              setOffset(offset - 2);
                        }
                        else
                        {
                              setFlag(false);
                              for (let i = 0; i < res.data.length; i++)
                              {
                                    const data = new Uint8Array(Object.values(res.data[i].picture_1));
                                    const blob = new Blob([data], { type: "image/jpg" });
                                    const url = URL.createObjectURL(blob);
                                    temp.push(<Card url={ url } name={ res.data[i].name } key={ i } id={ res.data[i].id } price={ res.data[i].price } discount={ res.data[i].discount } />);
                              }
                              const target = ReactDOM.createRoot(document.getElementById("myCart"))
                              target.render(<>{ temp }</>);
                        }

                  })
                        .catch(err => { console.log(err); })
                  render.current = true;
            }
      }, [offset]);

      return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                  <div className={ `${ styles.board }` }>
                        <h1 className='my-md-4 mx-md-5 mt-3 align-self-center align-self-md-start'>Your shopping cart</h1>
                        <div className='w-100' style={ {
                              height: "80%"
                        } }>
                              <div className='d-flex flex-column justify-content-around align-items-center' style={ {
                                    height: "95%"
                              } } id="myCart">
                              </div>
                              <div className='w-100 d-flex align-items-center justify-content-center'>
                                    <GrFormPrevious size={ 40 } className={ `mx-3 ${ styles.change_page }` } onClick={ () =>
                                    {
                                          if (offset !== 0) { setOffset(offset - 2); render.current = false; }
                                    } } />
                                    <GrFormNext size={ 40 } className={ `mx-3 ${ styles.change_page }` } onClick={ () =>
                                    {
                                          if (!flag) { setOffset(offset + 2); render.current = false; }
                                    } } />
                              </div>
                        </div>
                        <div className='w-100 d-flex align-items-center justify-content-center mt-3'>
                              <h1 style={ {
                                    fontWeight: "normal"
                              } }>Total:&nbsp;&nbsp;</h1>
                              <h1 style={ {
                                    fontWeight: "bold"
                              } }>${ total.toFixed(2) }</h1>
                              <button className={ `mx-md-5 mx-3 ${ styles.buy_now }` } onClick={ buyCart }>Buy now</button>
                        </div>
                  </div>
                  <div className={ `${ styles.pop_up }` }>
                        <AiOutlineCloseCircle className={ `${ styles.close }` } onClick={ () => { $(`.${ styles.pop_up }`).css("display", "none"); } } />
                        <h2 className='mx-auto' style={ { display: "block", width: "70%", textAlign: "center" } }>Choose your payment method</h2>
                        <div className={ `d-flex flex-column flex-md-row align-items-center justify-content-around mt-3` }>
                              <div className={ `d-flex flex-column w-50 align-items-center` }>
                                    <img alt="momo" src="https://upload.wikimedia.org/wikipedia/vi/thumb/f/fe/MoMo_Logo.png/220px-MoMo_Logo.png" className={ `${ styles.payment }` }></img>
                                    <button className={ `${ styles.payment_button }` } onClick={ () =>
                                    {
                                          confirmBuy("MoMo wallet");
                                    } }>Choose</button>
                              </div>
                              <div className={ `d-flex flex-column w-50 align-items-center` }>
                                    <img alt="online banking" className={ `${ styles.payment }` } src="https://cdn-icons-png.flaticon.com/512/4874/4874090.png"></img>
                                    <button className={ `${ styles.payment_button }` } onClick={ () =>
                                    {
                                          confirmBuy("Online banking");
                                    } }>Choose</button>
                              </div>
                        </div>
                  </div>
            </div>
      );
}