import '../../css/Customer/menu.css';
import { BiHomeAlt2 } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { Outlet } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { GiRetroController } from "react-icons/gi";
import { Nav } from 'react-bootstrap';
import { AiOutlineHeart } from "react-icons/ai";
import { BsCart } from "react-icons/bs";


function CustomerMenu()
{
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
                              <Nav.Link href="#" className='item mt-3 pb-3' id="cart"><BsCart /> Cart</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                              <Nav.Link href="#" className='item mt-3 pb-3' id="wish"><AiOutlineHeart />Wishlist</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="mt-auto mb-3">
                              <Nav.Link href="/" className='logout_button'><AiOutlineLogout /> Log out</Nav.Link>
                        </Nav.Item>
                  </Nav>
                  <Outlet /> */}
                  <div className='customer-menu h-100'>
                        <div className="d-flex flex-column menu_container">
                              <a href="#" className="link-dark user d-flex justify-content-center"><VscAccount size={ 70 } /></a>
                              <div className='d-flex flex-column justify-content-between mt-5 tabs'>
                                    <a href="#" className='item mt-3 pb-3' id="home"><BiHomeAlt2 />Home</a>
                                    <a href="#" className='item mt-3 pb-3' id="game"><GiRetroController />Game</a>
                                    <a href="#" className='item mt-3 pb-3' id="wish"><AiOutlineHeart />Wishlist</a>
                              </div>
                              <a href="#" className='logout_button'><AiOutlineLogout /> Log out</a>
                        </div>
                  </div>
                  <div className='customer-page h-100'>
                        <Outlet />
                  </div>
            </>
      );
}

export default CustomerMenu;