import { BsSearch } from 'react-icons/bs';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import styles from '../../css/Admin/gamelist.module.css';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { AiFillStar } from 'react-icons/ai';


const Game = (props) =>
{
      return (
            <tr>
                  <th scope='row' className='col-1'>{ props.i + 1 }</th>
                  <td className='col-4'>{ props.name }</td>
                  <td className="text-center col-1">${ props.price }</td>
                  <td className="text-center col-2">{ props.solds }</td>
                  <td className="text-center col-2"><AiFillStar style={ { color: "yellow", fontSize: "25px" } } />{ props.ratings }</td>
                  <td className='col-2 text-center'>
                        < a href={ `./gamelist/${ props.id }` } className={ `${ styles.detail }` }>Detail</a>
                        <input className={ `${ styles.checkbox }` } type="checkbox" value={ props.id }></input>
                  </td>
            </tr>
      );
}

export default function GameList()
{
      const render = useRef(false);

      const Navigate = useNavigate();

      useEffect(() =>
      {
            if (!render.current)
            {
                  $("#game").css("color", "white");
                  $("#game").css("background-color", "#00B3EC");

                  axios.get('http://localhost/admin/game/list')
                        .then(res =>
                        {
                              let temp = [];
                              for (let i = 0; i < res.data.length; i++)
                                    temp.push(<Game key={ i } i={ i } id={ res.data[i].id } name={ res.data[i].name } price={ res.data[i].price } solds={ res.data[i].solds } ratings={ res.data[i].ratings } discount={ res.data[i].discount } />);
                              const target = ReactDOM.createRoot(document.getElementById('game_list_table_body'));
                              target.render(<>{ temp }</>);
                        })
                        .catch(error => console.log(error));
                  render.current = true;
            }
      });

      const delete_game = () =>
      {

            const checkedValues = $('input[type="checkbox"]:checked').map(function ()
            {
                  return $(this).val();
            }).get();

            for (let i = 0; i < checkedValues.length; i++)
            {
                  console.log(checkedValues[i]);
                  const formData = new FormData();
                  formData.append("id", checkedValues[i]);
                  axios.post('http://localhost/admin/game/delete', formData)
                        .then(res =>
                        {
                              console.log(res.data);
                        })
                        .catch(error => console.log(error));
            }
            window.location.reload();
      }

      const toggle_delete = () =>
      {
            $(`.${ styles.checkbox }`).prop("checked", false);
            if ($(`.${ styles.delete }`).first().css("display") === "block")
            {
                  $(`.${ styles.delete }`).last().css("display", "block");
                  $(`.${ styles.back }`).css("display", "block");
                  $(`.${ styles.delete }`).first().css("display", "none");
                  $(`.${ styles.detail }`).css("display", "none");
                  $(`.${ styles.add }`).css("display", "none");
                  $(`.${ styles.checkbox }`).css("display", "inline-block");
            }
            else
            {
                  $(`.${ styles.delete }`).last().css("display", "none");
                  $(`.${ styles.back }`).css("display", "none");
                  $(`.${ styles.delete }`).first().css("display", "block");
                  $(`.${ styles.detail }`).css("display", "inline-block");
                  $(`.${ styles.add }`).css("display", "block");
                  $(`.${ styles.checkbox }`).css("display", "none");
            }
      }

      const search = () =>
      {
            $("#game_list_table_body").empty();
            const formData = new FormData();
            formData.append("data", $("#search").val());
            axios.post('http://localhost/admin/game/find', formData)
                  .then(res =>
                  {
                        let temp = [];
                        for (let i = 0; i < res.data.length; i++)
                              temp.push(<Game key={ i } i={ i } id={ res.data[i].id } name={ res.data[i].name } price={ res.data[i].price } solds={ res.data[i].solds } ratings={ res.data[i].ratings } discount={ res.data[i].discount } />);
                        const target = ReactDOM.createRoot(document.getElementById('game_list_table_body'));
                        target.render(<>{ temp }</>);
                  })
                  .catch(error => console.log(error));
      }

      const addGame = (event) =>
      {
            event.preventDefault();
            //Navigate();
      }

      return (
            <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                  <div className={ `w-100 h-100 ${ styles.pop_up_container }` }>
                        <div className={ `${ styles.game_list_pop_up }` }>
                              <div className='d-flex flex-column align-items-center justify-content-around w-100 h-100'>
                                    <h3 className={ `${ styles.confirm_title }` }>Do you want to delete the selected game(s)?</h3>
                                    <div className={ `${ styles.confirm_boxes } d-flex justify-content-between align-items-center` }>
                                          <button className={ `${ styles.no }` } onClick={ () => { $(`.${ styles.pop_up_container }`).css("display", "none"); } }>No</button>
                                          <button className={ `${ styles.yes }` } onClick={ () => { delete_game(); $(`.${ styles.pop_up_container }`).css("display", "none"); } }>Yes</button>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className={ `${ styles.gameList }` }>
                        <div className='d-flex justify-content-end align-items-center w-100'>
                              <form className='d-flex justify-content-end align-items-center w-100' style={ { height: "40px" } }>
                                    <input className={ `${ styles.search }` } id='search' type='text' placeholder='Find' onKeyUp={ search } />
                                    <BsSearch id='scope' className={ `${ styles.search_icon }` } size={ 20 } />
                              </form>
                        </div>
                        <form className="w-100" style={ { height: "calc(100% - 40px)" } }>
                              <div className='w-100'>
                                    <table className="table table-hover mx-auto mt-3 mb-0 " style={ { width: "90%" } }>
                                          <thead style={ { borderBottom: "2px solid black" } }>
                                                <tr>
                                                      <th scope="col" className='col-1'>#</th>
                                                      <th scope="col" className='col-4'>Name</th>
                                                      <th scope="col" className='col-1 text-center'>Price</th>
                                                      <th scope="col" className='col-2 text-center'>Number of solds</th>
                                                      <th scope="col" className='col-2 text-center'>Ratings</th>
                                                      <th scope="col" className='col-2 text-center'>Action</th>
                                                </tr>
                                          </thead>
                                    </table>
                              </div>
                              <div className='w-100' style={ { height: "calc(100% - 150px)", overflow: "auto" } }>
                                    <table className="table table-hover mx-auto" style={ { width: "90%" } }>
                                          <tbody id="game_list_table_body">
                                          </tbody>
                                    </table>
                              </div>
                              <div className='w-100 d-flex justify-content-center align-items-center' style={ { height: "100px" } }>
                                    <button type="button" className={ `${ styles.delete }` } onClick={ toggle_delete }>Delete game</button>
                                    <button type="button" className={ `${ styles.add }` } onClick={ addGame }>Add a game</button>
                                    <button type="button" className={ `${ styles.back }` } onClick={ toggle_delete }>Back</button>
                                    <button type="button" className={ `${ styles.delete }` } value="Confirm" onClick={ () => { $(`.${ styles.pop_up_container }`).css("display", "flex"); } }>Confirm</button>
                              </div>
                        </form>
                  </div>
            </div>
      )
}