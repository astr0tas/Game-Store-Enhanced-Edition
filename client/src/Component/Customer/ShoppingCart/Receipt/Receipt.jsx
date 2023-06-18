import styles from './Receipt.module.css';
import { RiBillFill } from 'react-icons/ri';

const Receipt = () =>
{
      return (
            <div className='w-100 h-100'>
                  <div className={ `d-flex align-items-center justify-content-center mx-auto ${ styles.title }` } style={ { color: "red", fontSize: '2rem' } }>
                        <RiBillFill className='mb-0' />&nbsp;
                        <h2 className='mb-0'>Receipt</h2>
                  </div>
            </div>
      )
}

export default Receipt;