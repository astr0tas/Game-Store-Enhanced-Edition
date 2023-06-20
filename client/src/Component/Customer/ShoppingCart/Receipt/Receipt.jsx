import { useEffect, useState } from 'react';
import styles from './Receipt.module.css';
import { RiBillFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { domain } from '../../../General/tools/domain';
import { useRef } from 'react';
import { isRefNotValid, isRefValid } from '../../../General/tools/refChecker';
import ReactDOM from 'react-dom/client';
import { CiDiscount1 } from 'react-icons/ci';

const Game = (props) =>
{
      const [category, setCategory] = useState("N/A");

      function formatString(input)
      {
            const hyphenPositions = [4, 8, 12];
            let formattedString = "";

            for (let i = 0; i < input.length; i++)
            {
                  if (hyphenPositions.includes(i))
                  {
                        formattedString += "-";
                  }
                  formattedString += input[i];
            }

            return formattedString;
      }

      useEffect(() =>
      {
            const formData = new FormData();
            formData.append("id", props.id);
            axios.post(`http://${ domain }/game/gameCategory`, formData)
                  .then(res =>
                  {
                        if (res.data.length)
                        {
                              let temp = res.data[0].category_type;
                              for (let i = 1; i < res.data.length - 1; i++)
                                    temp += ', ' + res.data[i].category_type;
                              setCategory(temp);
                        }
                  }).catch(error => { console.log(error); })
      }, [props.id])

      return (
            <div className={ `border border-dark rounded row p-2 mx-3 my-3 ${ styles.card }` }>
                  <div className='col-12 col-md-5 d-flex p-0' style={ { maxHeight: '80%' } }>
                        <img alt='' onClick={ () => props.Navigate(`/games/${ props.id }`) } className={ `w-100 ${ styles.imgs } mx-auto rounded` } src={ props.img === null ? 'https://upload.wikimedia.org/wikipedia/commons/7/71/Nothing_whitespace_blank.png' : `http://${ domain }/model/data/games/${ props.img }` }></img>
                  </div>
                  <div className='col-12 col-md-7 d-flex flex-column'>
                        <div className='flex-grow-1 d-flex flex-column justify-content-center'>
                              <h2 className='mt-3'>{ props.name }</h2>
                              <div className='d-flex align-items-center'>
                                    <p>Category:&nbsp;</p>
                                    <p className='overflow-auto' style={ { whiteSpace: 'nowrap' } }>{ category }</p>
                              </div>
                              <div className='d-flex align-items-center'>
                                    <h5>Price:&nbsp;{ !props.price && 'N/A' }{ props.price && '$' }{ props.discount === '0' && props.price }{ props.discount !== '0' && props.discount !== null && ((parseFloat(props.price) + 0.01) * (100 - parseFloat(props.discount)) / 100).toFixed(2) - 0.01 }&nbsp;&nbsp;&nbsp;</h5>
                                    { props.discount !== null && parseFloat(props.discount) !== 0 && <CiDiscount1 style={ {
                                          fontSize: '1rem',
                                          color: 'red',
                                          marginBottom: '10px'
                                    } } /> }
                                    { props.discount !== null && parseFloat(props.discount) !== 0 && <h5 style={ { color: 'red' } }>{ props.discount }%</h5> }
                              </div>
                        </div>
                        <hr className='mt-auto'></hr>
                        <div className={ `d-flex ${ styles.code }` }>
                              <p className='d-none d-sm-block'>Activation code:&nbsp;&nbsp;</p>
                              <p>{ formatString(props.code) }</p>
                        </div>
                  </div>
            </div>
      );
}

const Receipt = (props) =>
{
      const Navigate = useNavigate();
      const div = useRef(null);
      const target = useRef(null);

      useEffect(() =>
      {
            if (!props.isPaid)
                  Navigate('/home');

            if (isRefNotValid(target) && isRefValid(div))
                  target.current = ReactDOM.createRoot(div.current);

            axios.get(`http://${ domain }/getReceipt`, { withCredentials: true })
                  .then(res =>
                  {
                        const temp = [];
                        for (let i = 0; i < res.data.length; i++)
                              temp.push(<Game key={ i } Navigate={ Navigate } code={ res.data[i].code } id={ res.data[i].id } name={ res.data[i].name } discount={ res.data[i].discount } price={ res.data[i].price } img={ res.data[i].picture_1 } />);
                        if (isRefValid(target))
                              target.current.render(<>{ temp }</>);
                  })
                  .catch(err => console.log(err));
      }, [Navigate, props.isPaid]);

      return (
            <div className='w-100 h-100 d-flex flex-column'>
                  <div className={ `d-flex align-items-center justify-content-center mx-auto ${ styles.title }` } style={ { color: "red", fontSize: '2rem' } }>
                        <RiBillFill className='mb-0' />&nbsp;
                        <h2 className='mb-0'>Receipt</h2>
                  </div>
                  <div className='w-100 flex-grow-1 mt-3 overflow-auto' ref={ div }>
                  </div>
            </div>
      )
}

export default Receipt;