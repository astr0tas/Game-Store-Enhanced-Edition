import Button from 'react-bootstrap/Button';
import '../../css/Admin/dashboard.css';
import { BiHomeAlt2 } from "react-icons/bi";
import { VscGear } from "react-icons/vsc";
import { BsPerson } from "react-icons/bs";
import { AiOutlineBarChart, AiOutlineLogout } from "react-icons/ai";
import { Link, Outlet } from 'react-router-dom';

function Dashboard()
{
  return (
    <div className="dashboard">
      <div className='menu'>
        <img style={ { width: '100%' } } src={ require('../../img/admin.png') } alt='' />
        <div className='home'>
          <Link to='/'> <Button><BiHomeAlt2 className='icon' /> Home</Button></Link>
        </div>
        <div className='game'>
          <Button><VscGear className='icon' /> Game</Button>
        </div>
        <div className='customer'>
          <Link to='customer'><Button><BsPerson className='icon' /> Customer</Button></Link>
        </div>
        <div className='stat'>
          <Link to='stat'> <Button><AiOutlineBarChart className='icon' /> Statistic</Button></Link>
        </div>
        <div className='logout'>
          <Button><AiOutlineLogout className='icon' /> Log out</Button>
        </div>
      </div>
      <div className='main'>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;