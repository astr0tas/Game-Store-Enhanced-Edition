import styles from './Home.module.css';
import { TbFlame } from 'react-icons/tb';
import { domain } from '../../tools/domain';
import { useEffect, useRef } from 'react';
import { isRefNotValid, isRefValid } from '../../tools/refChecker';
import ReactDOM from 'react-dom/client';

const Game = (props) =>
{
      return (
            <div className='card mx-auto my-auto'>
                  <img className='card-img-top' alt='' src={ `http://${ domain }/model/data/games/${ props.url }` }></img>
                  <div className='card-body'>
                        <a href={ `./games/${ props.id }` } className='btn btn-sm btn-primary'>${ props.price }</a>
                  </div>
                  <div className='card-footer'>

                  </div>
            </div >
      );
}

const CustomerHome = () =>
{
      document.title = "Home";

      const div1 = useRef(null), div2 = useRef(null);
      const target1 = useRef(null), target2 = useRef(null);


      useEffect(() =>
      {
            if (isRefNotValid(target1) && isRefValid(div1))
                  target1.current = ReactDOM.createRoot(div1.current);
            if (isRefNotValid(target2) && isRefValid(div2))
                  target2.current = ReactDOM.createRoot(div2.current);
      });

      return (
            <div className='w-100 h-100 d-flex flex-column'>
                  <div className={ `d-flex flex-column align-items-center justify-content-center w-100 mb-2` }>
                        <div className={ `d-flex align-items-center justify-content-center ${ styles.title }` }>
                              <h2 className='d-flex align-items-center' style={ { color: "red" } }><TbFlame />Best sellers<TbFlame /></h2>
                        </div>
                  </div>
                  <div className='flex-grow-1 overflow-auto'>
                        <div className='mb-md-1' ref={ div1 }>
                        </div>
                        <div className='mt-md-1' ref={ div2 }>
                        </div>
                  </div>
            </div>
      )
}

export default CustomerHome;