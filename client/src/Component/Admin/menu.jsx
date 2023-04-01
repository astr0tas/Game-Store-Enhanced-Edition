import '../../css/Admin/menu.css';
import { BiHomeAlt2 } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { AiOutlineBarChart, AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";
import { Outlet } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { GiRetroController } from "react-icons/gi";
import { useEffect, useRef } from 'react';
import $ from 'jquery';

function AdminMenu()
{

  const render = useRef(false);

  const toggleMenu = () =>
  {
    if ($(".menu_container").css("visibility") === "hidden")
    {
      $(".menu_container").css("visibility", "visible");
      $(".dropdown").first().css("display", "block");
      $(".dropdown").last().css("display", "block");
    }
    else
    {
      $(".menu_container").css("visibility", "hidden");
      $(".dropdown").first().css("display", "block");
      $(".dropdown").last().css("display", "none");
    }
  }


  useEffect(() =>
  {
    if (!render.current)
    {
      console.log("render");
      render.current = true;

      window.addEventListener('resize', () =>
      {
        if (window.innerWidth > 575)
        {
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
      {/* <Nav className=" flex-column menu_container">
          <Nav.Item>
            <Nav.Link href="#" className="link-dark user d-flex justify-content-center"><VscAccount size={ 70 } /></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className='item mt-3 pb-3' id="home"><BiHomeAlt2 />Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className='item mt-3 pb-3' id="game"><GiRetroController />Game</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className='item mt-3 pb-3' id="cart"><BsPerson />Customer</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className='item mt-3 pb-3' id="wish"><AiOutlineBarChart />Statistic</Nav.Link>
          </Nav.Item>
          <Nav.Item className="mt-auto mb-3">
            <Nav.Link href="/" className='logout_button'><AiOutlineLogout /> Log out</Nav.Link>
          </Nav.Item>
      </Nav>
      <Outlet /> */}
      <div className='admin-menu h-100'>
        <AiOutlineMenu size={ 25 } className="dropdown" onClick={ toggleMenu } type='button'></AiOutlineMenu>
        <div className="d-flex flex-column menu_container">
          <AiOutlineMenu size={ 25 } className="dropdown" onClick={ toggleMenu } type='button'></AiOutlineMenu>
          <div className='padding_when_collapse'>
            <a href="#" className="link-dark d-flex justify-content-center"><VscAccount className='profile' /></a>
          </div>
          <div className='d-flex flex-column justify-content-between mt-5 tabs'>
            <a href="#" className='item mt-3 pb-3' id="home"><BiHomeAlt2 />Home</a>
            <a href="#" className='item mt-3 pb-3' id="game"><GiRetroController />Game</a>
            <a href="#" className='item mt-3 pb-3' id="customer"><BsPerson />Customer</a>
            <a href="#" className='item mt-3 pb-3' id="stats"><AiOutlineBarChart />Statistic</a>
          </div>
          <a href="#" className='logout_button'><AiOutlineLogout /> Log out</a>
        </div>
      </div>
      <div className='admin-page h-100'>
        <Outlet />
      </div>
    </>
  );
}

export default AdminMenu;