import '../../css/Admin/menu.css';
import { BiHomeAlt2 } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { AiOutlineBarChart, AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";
import { Outlet } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { GiRetroController } from "react-icons/gi";
import { useEffect, useState, useRef } from 'react';
// import { Nav, Container, Navbar } from 'react-bootstrap';
import $ from 'jquery';

function AdminMenu()
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

  // const [navbarExpanded, setNavbarExpanded] = useState(false);

  // const handleNavbarToggle = () =>
  // {
  //   setNavbarExpanded(!navbarExpanded);
  // }

  return (
    <>
      {/* <div className='admin_menu h-100 position-fixed'>
        <Navbar bg="light" expand="lg" className='overflow-auto h-100 w-100' collapseOnSelect expanded={ navbarExpanded } onToggle={ handleNavbarToggle }>
          <Container className="d-flex flex-column h-100 w-100 p-0">
            <div className="navbar_toggler w-100">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </div>
            <Navbar.Collapse id="basic-navbar-nav" className='h-75 w-100'>
              <Nav className="flex-column h-100 w-100">
                <div className='d-flex flex-column flex-grow-1'>
                  <Nav.Link href="#" className='tab'><BiHomeAlt2 />Home</Nav.Link>
                  <Nav.Link href="#" className='tab'><GiRetroController />Game</Nav.Link>
                  <Nav.Link href="#" className='tab'><BsPerson />Customer</Nav.Link>
                  <Nav.Link href="#" className='tab'><AiOutlineBarChart />Statistic</Nav.Link>
                </div>
                <Nav.Link href="#" className="mt-auto logout"><AiOutlineLogout /> Log out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className='admin_page h-100'>
        <Outlet />
      </div> */}

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