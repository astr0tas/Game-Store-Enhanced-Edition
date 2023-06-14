import styles from './menu.module.css';
import { VscAccount } from "react-icons/vsc";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { domain } from '../../tools/domain';
import { deleteAdminCookie } from '../../tools/cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faUser, faGamepad, faCalculator, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { checkCookie } from '../../tools/cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import { isRefValid } from '../../tools/refChecker';
import '../../General/css/scroll.css';


const AdminMenu = () =>
{
  const Navigate = useNavigate();
  const navbar = useRef(null);
  const tabs = useRef(null);
  const navToggler = useRef(null);

  const [showSidebar, setShowSidebar] = useState(true);

  const handleToggleSidebar = () =>
  {
    // Show or collapse the side menu
    if (showSidebar)
    {
      if (isRefValid(navbar))
        navbar.current.style.width = '0';
      if (isRefValid(tabs))
        tabs.current.style.opacity = '0';
    }
    else
    {
      if (isRefValid(navbar))
        navbar.current.style.width = '160px';
      if (isRefValid(tabs))
        tabs.current.style.opacity = '1';
    }
    setShowSidebar(!showSidebar);
  };

  const logOut = () =>
  {
    axios.get(`http://${ domain }/admin/logout`, { withCredentials: true })
      .then(res =>
      {
        console.log(res);
        deleteAdminCookie();
        Navigate("/admin");
      }).catch(err => { console.log(err); });
  }

  const trackWidth = () =>
  {
    // This function is use to ensure the collapsed side menu will be expanded when the browser's width > 768px.
    if (window.innerWidth >= 768)
    {
      if (isRefValid(navbar))
        navbar.current.style.width = '160px';
      if (isRefValid(tabs))
        tabs.current.style.opacity = '1';
      setShowSidebar(true);
    }
  }

  useEffect(() =>
  {
    if (!checkCookie("PHPADMINSESSID"))
      Navigate("/admin");

    trackWidth();

    document.addEventListener('mousedown', function (event)
    {
      // This event listener is used to close the side menu when the user clicked something outside of it.

      // Check if clicked element is inside the side menu or the toggle button
      if (isRefValid(navbar) && isRefValid(tabs) && isRefValid(navToggler)
        && !navbar.current.contains(event.target) && !navToggler.current.contains(event.target))
      {
        if (showSidebar && window.innerWidth < 768)
        {
          navbar.current.style.width = '0';
          tabs.current.style.opacity = '0';
          setShowSidebar(!showSidebar);
        }
      }
    });

    window.addEventListener('resize', trackWidth);
  }, [Navigate, showSidebar]);

  return (
    <div className='w-100 h-100' style={ { backgroundColor: '#B9FDFD' } }>
      <button className={ `${ styles.navToggler } position-fixed` } onClick={ handleToggleSidebar }><FontAwesomeIcon icon={ faBars } style={ { color: "#000000", fontSize: '1.5rem' } } ref={ navToggler } /></button>
      <div className={ `h-100 d-flex flex-column position-fixed ${ styles.navbar }` } style={ { backgroundColor: '#E6E6E6' } } ref={ navbar }>
        <div className={ `w-100 ${ styles.dummy }` } style={ { minHeight: '50px' } }></div>
        <div className={ `flex-grow-1 d-flex flex-column overflow-auto ${ styles.tabs } mt-md-3 hideBrowserScrollbar` } ref={ tabs }>
          <div className={ `${ styles.hover } mb-3 d-flex align-items-center justify-content-center` } onClick={ () => { Navigate("./profile"); } }>
            <span className={ `d-flex align-items-center justify-content-center p-0` } style={ { fontSize: '3.5rem', whiteSpace: 'nowrap', color: '#1c60c7' } }><VscAccount /></span>
          </div>
          <div className={ `${ styles.hover } mb-3 d-flex align-items-center` } onClick={ () => { Navigate("./home"); } }>
            <span className={ `d-flex align-items-center p-0 ms-2` } style={ { fontSize: '1.5rem', whiteSpace: 'nowrap', color: '#1c60c7' } }><FontAwesomeIcon icon={ faHouse } className={ `me-1` } />Home</span>
          </div>
          <div className={ `${ styles.hover } mb-3 d-flex align-items-center` } onClick={ () => { Navigate("./customer-list"); } }>
            <span className={ `d-flex align-items-center p-0 ms-2` } style={ { fontSize: '1.5rem', whiteSpace: 'nowrap', color: '#1c60c7' } }><FontAwesomeIcon icon={ faUser } className={ `me-1` } />Customers</span>
          </div>
          <div className={ `${ styles.hover } mb-3 d-flex align-items-center` } onClick={ () => { Navigate("./game-list"); } }>
            <span className={ `d-flex align-items-center p-0 ms-2` } style={ { fontSize: '1.5rem', whiteSpace: 'nowrap', color: '#1c60c7' } }><FontAwesomeIcon icon={ faGamepad } className={ `me-1` } />Games</span>
          </div>
          <div className={ `${ styles.hover } mb-3 d-flex align-items-center` } onClick={ () => { Navigate("./statistic"); } }>
            <span className={ `d-flex align-items-center p-0 ms-2` } style={ { fontSize: '1.5rem', whiteSpace: 'nowrap', color: '#1c60c7' } }><FontAwesomeIcon icon={ faCalculator } className={ `me-1` } />Statistics</span>
          </div>
          <div className={ `${ styles.hover } mt-auto d-flex align-items-center` } onClick={ () =>
          {
            logOut();
          } } >
            <span className={ `d-flex align-items-center p-0 ms-2` } style={ { fontSize: '1.5rem', whiteSpace: 'nowrap', color: 'red' } }><FontAwesomeIcon icon={ faRightFromBracket } className={ `me-1` } />Log out</span>
          </div>
        </div>
      </div>

      <div className={ `${ styles.page } d-flex align-items-center justify-content-center` }>
        <div style={ {
          height: '98%',
          width: '98%',
          backgroundColor: '#E6E6E6',
          border: '2px solid black',
          borderRadius: '20px'
        } }>
          <Outlet />
        </div>
      </div>
    </div >
  );
}

export default AdminMenu;