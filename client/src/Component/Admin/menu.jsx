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
    <div style={ { display: 'flex', flexDirection: 'row', backgroundColor: "#B9FDFD" } }>
      <Nav className="flex-column menu_container bg-light">
        <Nav.Item>
          <Nav.Link href="#" className="link-dark user d-flex justify-content-center"><VscAccount size={ 100 } /></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className='item  mt-3 pb-3'><BiHomeAlt2 /> Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className='item  mt-3 pb-3'><GiRetroController /> Game</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className='item mt-3 pb-3'><BsPerson /> Customer</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className='item  mt-3 pb-3'><AiOutlineBarChart /> Statistic</Nav.Link>
        </Nav.Item>
        <Nav.Item className="mt-auto mb-3">
          <Nav.Link href="/admin" className='logout_button'><AiOutlineLogout /> Log out</Nav.Link>
        </Nav.Item>
      </Nav>
      <Outlet />
    </div>
  );
}

export default AdminMenu;