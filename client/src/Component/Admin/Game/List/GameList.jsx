import { BsSearch } from 'react-icons/bs';
import { useEffect, useRef, useState, } from 'react';
import axios from 'axios';
import styles from './GameList.module.css';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { domain } from '../../../tools/domain';
import { isRefValid, isRefNotValid } from '../../../tools/refChecker';
import { CiDiscount1 } from 'react-icons/ci';
import { AiFillStar } from 'react-icons/ai';
import '../../../General/css/scroll.css';


const Game = (props) =>
{
      const [solds, setSolds] = useState("N/A");
      const [category, setCategory] = useState("N/A");

      useEffect(() =>
      {
            const saleFormData = new FormData();
            saleFormData.append("id", props.id);
            axios.post(`http://${ domain }/admin/game/getSales`, saleFormData)
                  .then(res =>
                  {
                        if (res.data.solds !== 0) setSolds(res.data.solds);
                  })
                  .catch(error => console.log(error));

            const categoryFormData = new FormData();
            categoryFormData.append("id", props.id);
            axios.post(`http://${ domain }/admin/game/gameCategory`, categoryFormData)
                  .then(res =>
                  {
                        if (res.data.length !== 0)
                        {
                              let temp = res.data[0].category_type;
                              for (let i = 1; i < res.data.length; i++)
                                    temp += ', ' + res.data[i].category_type;
                              setCategory(temp);
                        }
                  })
                  .catch(error => console.log(error));
      }, [props.id]);

      return (
            <tr className={ `${ styles.detail }` } onClick={ () =>
            {
                  if (isRefValid(props.refCheckboxes, props.i) && props.refCheckboxes.current[props.i].style.display !== "block")
                        props.Navigate(`./${ props.id }`);
            } }>
                  <td className='col-1 text-center'>
                        <div className={ `w-100 h-100 d-flex align-items-center justify-content-center` }>
                              <strong ref={ el => (props.refNumbers.current[props.i] = el) }>{ props.i + 1 }</strong>
                              <input ref={ el => (props.refCheckboxes.current[props.i] = el) } type='checkbox' className={ `${ styles.checkbox }` } value={ props.id }></input>
                        </div>
                  </td>
                  <td className='col-3 text-center'>{ props.name }</td>
                  <td className='col-2 text-center'>
                        <div className='w-100 d-flex align-items-center justify-content-center'>
                              <p style={ { marginBottom: '0' } }>${ props.discount === '0' && props.price }{ props.discount !== '0' && ((parseFloat(props.price) + 0.01) * (100 - parseFloat(props.discount)) / 100).toFixed(2) - 0.01 }</p>
                              { props.discount !== '0'
                                    && <div className='d-flex align-items-center ms-2'>
                                          <p style={ { marginBottom: '4px' } }>
                                                <CiDiscount1 style={ { fontSize: '1.2rem', color: 'red' } } />
                                          </p>
                                          <p style={ { marginBottom: '0', color: 'red' } }>
                                                { props.discount }%
                                          </p>
                                    </div>
                              }
                        </div>
                  </td>
                  <td className='col-2 text-center'>{ category }</td>
                  <td className='col-2 text-center'>
                        <div className='w-100 d-flex align-items-center justify-content-center'>
                              <AiFillStar style={ { fontSize: '1rem', color: 'yellow' } } />{ props.ratings }
                        </div>
                  </td>
                  <td className='col-2 text-center'>{ solds }</td>
            </tr>
      );
}

export default function GameList()
{
      const [renderTrigger, setRenderTrigger] = useState(true);

      const cancel = useRef(null);
      const deleteButton = useRef(null);
      const addButton = useRef(null);
      const confirm = useRef(null);
      const search = useRef(null);

      const tableBody = useRef(null);
      const target = useRef(null);
      const numberTag = useRef(null);
      const selectAll = useRef(null);
      const checkboxes = useRef([]);
      const numbers = useRef([]);

      const noGameSelected = useRef(null);
      const confirmation = useRef(null);

      const Navigate = useNavigate();

      useEffect(() =>
      {
            document.title = 'Game list';

            if (isRefNotValid(target) && isRefValid(tableBody))
                  target.current = ReactDOM.createRoot(tableBody.current);

            axios.get(`http://${ domain }/admin/game/getList`)
                  .then(res =>
                  {
                        checkboxes.current = [];
                        numbers.current = [];

                        const temp = [];
                        for (let i = 0; i < res.data.length; i++)
                              temp.push(<Game Navigate={ Navigate } refCheckboxes={ checkboxes } refNumbers={ numbers } key={ i } i={ i } name={ res.data[i].name } price={ res.data[i].price } ratings={ res.data[i].ratings } discount={ res.data[i].discount } id={ res.data[i].id } />);
                        if (isRefValid(target))
                              target.current.render(<>{ temp }</>);
                  })
                  .catch(error => console.log(error));

      }, [renderTrigger, Navigate]);

      let timerId;
      const searchGame = () =>
      {
            clearTimeout(timerId);
            timerId = setTimeout(() =>
            {
                  const formData = new FormData();
                  formData.append("name", isRefValid(search) ? search.current.value : "");
                  axios.post(`http://${ domain }/admin/game/find`, formData)
                        .then(res =>
                        {
                              checkboxes.current = [];
                              numbers.current = [];

                              const temp = [];
                              for (let i = 0; i < res.data.length; i++)
                                    temp.push(<Game Navigate={ Navigate } refCheckboxes={ checkboxes } refNumbers={ numbers } key={ i } i={ i } name={ res.data[i].name } price={ res.data[i].price } ratings={ res.data[i].ratings } discount={ res.data[i].discount } id={ res.data[i].id } />);
                              if (isRefValid(target))
                                    target.current.render(<>{ temp }</>);
                        })
                        .catch(error => console.log(error));
            }, 500);
      }

      const toggleDelete = () =>
      {
            if (isRefValid(cancel))
            {
                  if (cancel.current.style.display === "" || cancel.current.style.display === "none")
                  {
                        cancel.current.style.display = "block";
                        if (isRefValid(confirm))
                              confirm.current.style.display = "block";
                        if (isRefValid(deleteButton))
                              deleteButton.current.style.display = "none";
                        if (isRefValid(addButton))
                              addButton.current.style.display = "none";
                        if (isRefValid(selectAll))
                              selectAll.current.style.display = "block";
                        if (isRefValid(numberTag))
                              numberTag.current.style.display = "none";
                        for (let i = 0; i < checkboxes.current.length; i++)
                        {
                              if (isRefValid(checkboxes, i))
                                    checkboxes.current[i].style.display = "block";
                              if (isRefValid(numbers, i))
                                    numbers.current[i].style.display = "none";
                        }
                  }
                  else
                  {
                        cancel.current.style.display = "none";
                        if (isRefValid(deleteButton))
                              deleteButton.current.style.display = "block";
                        if (isRefValid(addButton))
                              addButton.current.style.display = "block";
                        if (isRefValid(confirm))
                              confirm.current.style.display = "none";
                        if (isRefValid(selectAll))
                              selectAll.current.style.display = "none";
                        if (isRefValid(numberTag))
                              numberTag.current.style.display = "block";
                        for (let i = 0; i < checkboxes.current.length; i++)
                        {
                              if (isRefValid(checkboxes, i))
                              {
                                    checkboxes.current[i].style.display = "none";
                                    checkboxes.current[i].checked = false;
                              }
                              if (isRefValid(numbers, i))
                                    numbers.current[i].style.display = "block";
                        }
                  }
            }
      }

      const preProcess = () =>
      {
            let isEmpty = true;
            for (let i = 0; i < checkboxes.current.length; i++)
            {
                  if (isRefValid(checkboxes, i) && checkboxes.current[i].checked === true)
                  {
                        isEmpty = false;
                        break;
                  }
            }

            if (isEmpty)
            {
                  if (isRefValid(noGameSelected)) noGameSelected.current.style.display = "flex";
            }
            else
            {
                  if (isRefValid(confirmation)) confirmation.current.style.display = "flex";
            }
      }

      const deleteGame = () =>
      {
            const temp = [];
            for (let i = 0; i < checkboxes.current.length; i++)
                  if (isRefValid(checkboxes, i) && checkboxes.current[i].checked === true)
                        temp.push(checkboxes.current[i].value);

            const formData = new FormData();
            formData.append("IDs", temp);
            axios.post(`http://${ domain }/admin/game/delete`, formData)
                  .then(res =>
                  {
                        console.log(res);
                        toggleDelete();
                        setRenderTrigger(!renderTrigger);
                  })
                  .catch(error => console.log(error));
      }

      const selectAllCheckboxes = () =>
      {
            for (let i = 0; i < checkboxes.current.length; i++)
                  if (isRefValid(checkboxes, i))
                        checkboxes.current[i].checked = selectAll.current.checked;
      }

      return (
            <div className='w-100 h-100 d-flex flex-column align-items-center'>
                  <div className={ `${ styles.pop_up } flex-column align-items-center justify-content-around` } ref={ noGameSelected }>
                        <h2 className={ `${ styles.pop_up_message }` }>No game selected!</h2>
                        <button className={ `${ styles.blueButton }` } onClick={ () =>
                        {
                              if (isRefValid(noGameSelected)) noGameSelected.current.style.display = "none";
                        } }>BACK</button>
                  </div>
                  <div className={ `${ styles.pop_up } flex-column align-items-center justify-content-around` } ref={ confirmation }>
                        <h2 className={ `${ styles.pop_up_message }` }>Do you want to delete the selected game(s)?</h2>
                        <div className='d-flex align-items-center'>
                              <button className={ `${ styles.blueButton } me-4` } onClick={ () =>
                              {
                                    if (isRefValid(confirmation)) confirmation.current.style.display = "none";
                              } }>NO</button>
                              <button className={ `${ styles.redButton } ms-4` } onClick={ () =>
                              {
                                    deleteGame();
                                    if (isRefValid(confirmation)) confirmation.current.style.display = "none";
                              } }>YES</button>
                        </div>
                  </div>
                  <div className={ `d-flex flex-column align-items-center justify-content-center w-100 ${ styles.titleBoard }` }>
                        <div className={ `d-flex align-items-center justify-content-center ${ styles.title }` }>
                              <h2 className='d-flex align-items-center' style={ { color: "red" } }>Games</h2>
                        </div>
                        <div className={ `h-100 mt-2 d-flex align-items-center me-md-4 ${ styles.searchEngine }` }>
                              <input ref={ search } type='text' className={ `${ styles.search }` } placeholder='Find' onChange={ searchGame }></input>
                              <BsSearch id='scope' className={ `${ styles.search_icon }` } />
                        </div>
                  </div>
                  <div className={ `flex-grow-1 w-100 overflow-auto mt-3 px-md-2 hideBrowserScrollbar` }>
                        <table className="table table-hover" style={ { borderCollapse: 'separate' } }>
                              <thead style={ { position: "sticky", top: "0", backgroundColor: "#BFBFBF" } }>
                                    <tr>
                                          <th scope="col" className='col-1 text-center'>
                                                <div className={ `w-100 h-100 d-flex align-items-center justify-content-center` }>
                                                      <strong ref={ numberTag }>#</strong>
                                                      <input ref={ selectAll } type='checkbox' className={ `${ styles.checkbox }` } onChange={ selectAllCheckboxes }></input>
                                                </div>
                                          </th>
                                          <th scope="col" className='col-3 text-center'>Name</th>
                                          <th scope="col" className='col-2 text-center'>Price</th>
                                          <th scope="col" className='col-2 text-center'>Category</th>
                                          <th scope="col" className='col-2 text-center'>Ratings</th>
                                          <th scope="col" className='col-2 text-center'>Solds</th>
                                    </tr>
                              </thead>
                              <tbody ref={ tableBody }>
                              </tbody>
                        </table>
                  </div >
                  <div className='w-100 d-flex justify-content-center align-items-center mb-3' style={ { height: "100px" } }>
                        <button className={ `${ styles.delete } mx-3` } onClick={ toggleDelete } ref={ deleteButton }>Delete game</button>
                        <button className={ `${ styles.blueButton } mx-3` } onClick={ () => { Navigate('./add'); } } ref={ addButton }>Add game</button>
                        <button className={ `${ styles.cancel } mx-3` } onClick={ toggleDelete } ref={ cancel }>Cancel</button>
                        <button className={ `${ styles.delete } mx-3` } value="Confirm" onClick={ preProcess } ref={ confirm }>Confirm</button>
                  </div>
            </div >
      )
}