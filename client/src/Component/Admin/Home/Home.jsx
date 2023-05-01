import styles from './Home.module.css';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import { TbFlame } from 'react-icons/tb';
import { CiDiscount1 } from 'react-icons/ci';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { domain } from '../../tools/domain';

const BestSeller = (props) =>
{
      useEffect(() =>
      {
            if (props.discount === "0")
                  $(`.discount_${ props.id }`).css("display", "none");
      });

      // return (
      //       <div className={ `sale d-flex flex-column align-items-center ${ props.class }` }>
      //             <img className='pic' src={ props.url } alt=""></img>
      //             <div className='section'>
      //                   <button className='detail d-flex align-items-center justify-content-center mt-3' onClick={ () => { window.location.href = `/admin/gamelist/${ props.id }`; } }>{ <CiDiscount1 className={ `discount_${ props.id }` } style={ { fontSize: '25px', color: "red" } } /> }${ (props.price - props.price * props.discount / 100.0).toFixed(2) }</button>
      //                   <p className='sold mt-4'>SOLD: { props.total_sale }</p>
      //             </div>
      //       </div>
      // );
}


export default function AdminHome()
{

      // const effectRan = useRef(false);
      // const Navigate = useNavigate();

      // useEffect(() =>
      // {
      //       if (!checkCookie("PHPADMINSESSID"))
      //             Navigate("/admin");

      //       if (effectRan.current === false)
      //       {
      //             document.getElementById("home").style.backgroundColor = "#00B3EC";
      //             document.getElementById("home").style.color = "white";

      //             axios.get(`http://${ domain }/admin/getBestSeller`)
      //                   .then(res =>
      //                   {
      //                         const group1 = ReactDOM.createRoot(document.getElementsByClassName('group')[0]);
      //                         const group2 = ReactDOM.createRoot(document.getElementsByClassName('group')[1]);
      //                         let temp1 = [], temp2 = [];
      //                         console.log(res);
      //                         for (let i = 0; i < res.data.length; i++)
      //                         {
      //                               const data = new Uint8Array(Object.values(res.data[i].picture_1));
      //                               const blob = new Blob([data], { type: "image/jpg" });
      //                               const url = URL.createObjectURL(blob);
      //                               if (i < 3)
      //                                     temp1.push(<BestSeller key={ i } url={ url } class={ "" } price={ res.data[i].price } id={ res.data[i].id } discount={ res.data[i].discount } total_sale={ res.data[i].total_sale } />);
      //                               else
      //                                     temp2.push(<BestSeller key={ i } url={ url } class={ "mx-5" } price={ res.data[i].price } id={ res.data[i].id } discount={ res.data[i].discount } total_sale={ res.data[i].total_sale } />);
      //                         }
      //                         group1.render(<>{ temp1 }</>);
      //                         group2.render(<>{ temp2 }</>);
      //                   })
      //                   .catch(error => console.log(error));

      //             console.log("render");
      //             effectRan.current = true;

      //       }

      // }, []);

      return (
            // <div className='d-flex flex-column justify-content-center align-items-center h-100 w-100 admin-home'>
            //       <div className='board'>
            //             <div className="d-flex align-items-center justify-content-center best_sellers">
            //                   <h2 className='d-flex align-items-center' style={ { color: "red" } }><TbFlame />Best sellers<TbFlame /></h2>
            //             </div>
            //             <div className="best-sellers">
            //                   <div className="group">
            //                   </div>
            //                   <div className="group">
            //                   </div>
            //             </div>
            //       </div>
            // </div>
            <div className='w-100 h-100 d-flex flex-column'>
                  <div className='w-100 d-flex align-items-center justify-content-center'>
                        <div className={ `d-flex align-items-center justify-content-center ${ styles.title }` }>
                              <h2 className='d-flex align-items-center' style={ { color: "red" } }><TbFlame />Best sellers<TbFlame /></h2>
                        </div>
                  </div>
                  <div className={ `flex-grow-1 w-100 mt-3 mt-md-5 w-100 overflow-auto` }>
                        <div className={ `${ styles.group_1 } w-100` }>
                        </div>
                        <div className={ `${ styles.group_2 } w-100 ` }>
                        </div>
                  </div>
            </div>
      )
}