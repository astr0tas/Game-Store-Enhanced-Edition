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
                              <p style={ { fontSize: '20px' } }>Activation code: { props.code }</p>
                        </div>
                  </div>
            </div>
      );
}

export const Product = () =>
{
      const Navigate = useNavigate();

      const render = useRef(false);

      const [offset, setOffset] = useState(0);
      const [flag, setFlag] = useState(false);

      useEffect(() =>
      {
            if (!checkCookie("PHPSESSID"))
                  Navigate("/");
            if (!render.current)
            {
                  $("#cart").css("background-color", "#00B3EC").css("color", "white");
                  const formData = new FormData();
                  formData.append('offset', offset);
                  let temp = [];
                  axios.post(`http://${ domain }/product`, formData, { withCredentials: true }).then(res =>
                  {
                        console.log(res);
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
                                    temp.push(<Card url={ url } name={ res.data[i].name } key={ i } id={ res.data[i].id } price={ res.data[i].price } discount={ res.data[i].discount } code={ res.data[i].code } />);
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
                              <button className={ `${ styles.go_back }` } onClick={ () => { $("#cart").css("background-color", "white").css("color", "blue"); Navigate("/home"); } }>Go back</button>
                        </div>
                  </div>
            </div>
      );
}