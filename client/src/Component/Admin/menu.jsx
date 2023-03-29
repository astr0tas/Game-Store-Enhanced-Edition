import '../../css/Admin/menu.css';
import { BiHomeAlt2 } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { AiOutlineBarChart, AiOutlineLogout } from "react-icons/ai";
import { Outlet } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { GiRetroController } from "react-icons/gi";
import { Nav } from 'react-bootstrap';

function AdminMenu()
{
  return (
    <>
        <Nav className=" flex-column menu_container">
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
      {/* <ul>
        <li><a href="#"><VscAccount size={ 70 } /></a></li>
        <li><a href="#"><BiHomeAlt2 />Home</a></li>
        <li><a href="#"><GiRetroController />Game</a></li>
        <li><a href="#"><BsPerson />Customer</a></li>
        <li><a href="#"><AiOutlineBarChart />Statistic</a></li>
        <li><a href="/admin"><AiOutlineLogout /> Log out</a></li>
      </ul> */}
      <Outlet />
    </>
  );
}

export default AdminMenu;