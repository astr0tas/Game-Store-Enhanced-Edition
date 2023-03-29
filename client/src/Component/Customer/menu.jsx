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
            <div style={ { position: 'fixed', top: 0, left: 0, right: 0, display: 'flex', flexDirection: 'row', backgroundColor: "#B9FDFD"} }>
                  <Nav className=" flex-column menu_container bg-light">
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
                  <Outlet />
            </div>
      );
}

export default CustomerMenu;