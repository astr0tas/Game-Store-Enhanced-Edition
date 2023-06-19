import styles from './Statistic.module.css';

const Statistic = () =>
{
      document.title = "Statistics";

      return (
            <div className='w-100 h-100 d-flex flex-column'>
                  <div className='w-100 d-flex align-items-center justify-content-center'>
                        <div className={ `d-flex align-items-center justify-content-center ${ styles.title }` }>
                              <h2 className='d-flex align-items-center' style={ { color: "red" } }>Statistics</h2>
                        </div>
                  </div>
            </div>
      )
}

export default Statistic;