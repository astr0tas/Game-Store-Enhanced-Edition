import { BsSearch } from 'react-icons/bs';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import styles from '../../css/Admin/gamelist.module.css';
import { useNavigate } from 'react-router-dom';

const Game = (props) =>
{
      return (
            <tr>
                  <th scope='row'>{ props.i + 1 }</th>
                  <td>{ props.name }</td>
                  <td>{ props.price }</td>
                  <td>{ props.solds }</td>
                  <td>{ props.ratings }</td>
                  <td className='d-flex align-items-center justify-content-center'>
                        <a href={ `./gamelist/${ props.name }` }></a>
                        <input className={ `${ styles.checkbox }` } type="checkbox" value={ props.name }></input>
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

                  axios.get('http://localhost/admin/get_game_list.php')
                        .then(res =>
                        {
                              console.log(res);
                              let temp = [];
                              for (let i = 0; i < res.data.length; i++)
                              {
                                    // $(".game_list_table_body").append($("<tr>").append($("<th>").attr("scope", "row").text(i + 1))
                                    //       .append($("<td>").text(res.data[i].name))
                                    //       .append($("<td>").text(res.data[i].price))
                                    //       .append($("<td>").text(res.data[i].solds))
                                    //       .append($("<td>").text(res.data[i].total_spending))
                                    //       .append($("<td>").addClass("d-flex").addClass("align-items-center").addClass("justify-content-center")
                                    //             .append($("<a>").text("Detail").addClass(styles.detail).attr("href", "./customerList/" + res.data[i].id))
                                    //             .append($("<input>").addClass(styles.checkbox).attr("type", "checkbox").attr("value", res.data[i].id))
                                    //       )
                                    // );
                              }
                        })
                        .catch(error => console.log(error));
                  render.current = true;
            }
      });

      const delete_user = () =>
      {

            const checkedValues = $('input[type="checkbox"]:checked').map(function ()
            {
                  return $(this).val();
            }).get();

            for (let i = 0; i < checkedValues.length; i++)
            {
                  const formData = new FormData();
                  formData.append("id", checkedValues[i]);
                  axios.post('http://localhost/admin/delete_customer.php', formData)
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
                  $(`.${ styles.checkbox }`).css("display", "block");
            }
            else
            {
                  $(`.${ styles.delete }`).last().css("display", "none");
                  $(`.${ styles.back }`).css("display", "none");
                  $(`.${ styles.delete }`).first().css("display", "block");
                  $(`.${ styles.detail }`).css("display", "block");
                  $(`.${ styles.add }`).css("display", "block");
                  $(`.${ styles.checkbox }`).css("display", "none");
            }
      }

      const search = () =>
      {
            $(".table_body").empty();
            const formData = new FormData();
            formData.append("data", $("#search").val());
            axios.post('http://localhost/admin/find_customer.php', formData)
                  .then(res =>
                  {
                        for (let i = 0; i < res.data.length; i++)
                        {
                              $(".table_body").append($("<tr>").append($("<th>").attr("scope", "row").text(i + 1))
                                    .append($("<td>").text(res.data[i].name))
                                    .append($("<td>").text(res.data[i].email))
                                    .append($("<td>").text(res.data[i].phone))
                                    .append($("<td>").text(res.data[i].total_spending))
                                    .append($("<td>").addClass("d-flex").addClass("align-items-center")
                                          .append($("<a>").text("Detail").addClass("detail").attr("href", "./" + res.data[i].id))
                                          .append($("<input>").addClass("checkbox").attr("type", "checkbox").attr("value", res.data[i].id))
                                    )
                              );
                        }
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
                                          <button className={ `${ styles.yes }` } onClick={ () => { delete_user(); $(`.${ styles.pop_up_container }`).css("display", "none"); } }>Yes</button>
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
                              <div className='w-100' style={ { height: "calc(100% - 100px)", overflow: "auto" } }>
                                    <table className="table table-hover mx-auto mt-3" style={ { width: "90%" } }>
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
                                          <tbody className="game_list_table_body">
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