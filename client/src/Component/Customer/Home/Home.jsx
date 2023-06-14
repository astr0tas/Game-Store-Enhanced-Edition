import styles from './Home.module.css';
import { TbFlame } from 'react-icons/tb';


const CustomerHome = () =>
{
      document.title = "Home";

      return (
            <div className='w-100 h-100 d-flex flex-column'>
                  <div className={ `d-flex flex-column align-items-center justify-content-center w-100 mb-2` }>
                        <div className={ `d-flex align-items-center justify-content-center ${ styles.title }` }>
                              <h2 className='d-flex align-items-center' style={ { color: "red" } }><TbFlame />Best sellers<TbFlame /></h2>
                        </div>
                  </div>
                  <div className='flex-grow-1'>

                  </div>
            </div>
      )
}

export default CustomerHome;