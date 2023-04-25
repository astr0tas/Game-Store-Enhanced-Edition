import '../../css/Customer/menu.css';
import { BiHomeAlt2 } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { Outlet } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { GiRetroController } from "react-icons/gi";
import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import $ from 'jquery';
import { useEffect, useRef } from 'react';
import { deleteCustomerCookie } from '../tools/cookie';
import axios from 'axios';
import { domain } from '../tools/domain';


function CustomerMenu()
{
      const render = useRef(false);

      const toggleMenu = () =>
      {
            if ($(".menu_container").css("visibility") === "hidden")
            {
                  $(".menu_container").css("opacity", "1");
                  $(".menu_container").css("visibility", "visible");
                  $(".dropdown").first().css("display", "block");
                  $(".dropdown").last().css("display", "block");
            }
            else
            {
                  $(".menu_container").css("opacity", "0");
                  $(".menu_container").css("visibility", "hidden");
                  $(".dropdown").first().css("display", "block");
                  $(".dropdown").last().css("display", "none");
            }
      }

      const logOut = async () =>
      {
            await axios.get(`http://${domain}/logout`, { withCredentials: true }).then(res => { console.log(res); }).catch(err => { console.log(err); });
            deleteCustomerCookie();
      }


      useEffect(() =>
      {
            if (!render.current)
            {
                  render.current = true;
                  window.addEventListener('resize', () =>
                  {
                        if (window.innerWidth > 575)
                        {
                              $(".menu_container").css("opacity", "1");
                              $(".menu_container").css("visibility", "visible");
                              $(".dropdown").css("display", "none");
                        }
                        else
                        {
                              $(".dropdown").first().css("display", "block");
                        }
                  });
            }
      });

      return (
            <>
                  <div className='customer-menu h-100'>
                        <AiOutlineMenu size={ 25 } className="dropdown" onClick={ toggleMenu } type='button'></AiOutlineMenu>
                        <div className="d-flex flex-column menu_container">
                              <AiOutlineMenu size={ 25 } className="dropdown" onClick={ toggleMenu } type='button'></AiOutlineMenu>
                              <div className='padding_when_collapse'>
                                    <a href="myself" className="link-dark d-flex justify-content-center mt-2"><VscAccount className='profile' /></a>
                              </div>
                              <div className='d-flex flex-column justify-content-between mt-5 tabs'>
                                    <a href="/home" className='item mt-3 pb-3' id="home"><BiHomeAlt2 />Home</a>
                                    <a href="" className='item mt-3 pb-3' id="game"><GiRetroController />Game</a>
                                    <a href="#" className='item mt-3 pb-3' id="wishlist"><AiOutlineHeart />Wishlist</a>
                                    <a href="#" className='item mt-3 pb-3' id="cart"><BsCart />Cart</a>
                              </div>
                              <a href="/" className='logout_button' onClick={ () => { logOut() } }><AiOutlineLogout /> Log out</a>
                        </div>
                  </div>
                  <div className='customer-page h-100'>
                        <Outlet />
                  </div>
            </>
      );
}

export default CustomerMenu;