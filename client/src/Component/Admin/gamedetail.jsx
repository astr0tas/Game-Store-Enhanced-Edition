import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/Admin/gamedetail.module.css';
import { useState, useEffect, useRef, React } from 'react';
import axios from 'axios';
import $ from 'jquery';
import { BiTrash } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import FormattedText from '../tools/formatText';
import { Carousel } from "react-bootstrap";
import '../../css/carousel.css';
import { CiDiscount1 } from 'react-icons/ci';


export default function GameDetail()
{
      const id = useParams().id;
      const render = useRef(false);
      const [game, SetGame] = useState({
            name: "N/A",
            description: "N/A",
            discount: "N/A",
            price: "N/A",
            rating: "N/A",
            sold: "N/A",
            spec_min: "N/A",
            spec_max: "N/A",
            image1url: "N/A",
            image2url: "N/A",
            image3url: "N/A",
            image4url: "N/A"
      });

      const Navigate = useNavigate();
      useEffect(() =>
      {
            if (!render.current)
            {
                  $("#game").css("color", "white");
                  $("#game").css("background-color", "#00B3EC");

                  const formData = new FormData();
                  formData.append("id", id);
                  axios.post('http://localhost/admin/game/detail', formData)
                        .then(res =>
                        {
                              console.log(res)
                              const data1 = new Uint8Array(Object.values(res.data.picture_1));
                              const blob1 = new Blob([data1], { type: "image/jpg" });
                              const url1 = URL.createObjectURL(blob1);
                              const data2 = new Uint8Array(Object.values(res.data.picture_2));
                              const blob2 = new Blob([data2], { type: "image/jpg" });
                              const url2 = URL.createObjectURL(blob2);
                              const data3 = new Uint8Array(Object.values(res.data.picture_3));
                              const blob3 = new Blob([data3], { type: "image/jpg" });
                              const url3 = URL.createObjectURL(blob3);
                              const data4 = new Uint8Array(Object.values(res.data.picture_4));
                              const blob4 = new Blob([data4], { type: "image/jpg" });
                              const url4 = URL.createObjectURL(blob4);
                              SetGame({

                                    name: res.data.name,
                                    description: res.data.description,
                                    discount: res.data.discount,
                                    price: res.data.price,
                                    rating: res.data.ratings,
                                    sold: res.data.solds,
                                    spec_min: res.data.spec_minimum,
                                    spec_max: res.data.spec_recommended,
                                    image1url: url1,
                                    image2url: url2,
                                    image3url: url3,
                                    image4url: url4
                              });
                        }).catch(error => { console.log(error); })
                  axios.post('http://localhost/admin/game/update/category', formData)
                        .then(res =>
                        {

                              for (let i = 0; i < res.data.length - 1; i++)
                              {
                                    $(`.${ styles.tags }`).append(
                                          $("<p>").text(res.data[i].category_type + ",").append("&nbsp;")
                                    );
                              }
                              $(`.${ styles.tags }`).append(
                                    $("<p>").text(res.data[res.data.length - 1].category_type)
                              );
                        }).catch(error => { console.log(error); })
                  render.current = true;
            }
      });

      const deleteGame = () =>
      {
            const formData = new FormData();
            formData.append("id", id);
            axios.post('http://localhost/admin/game/delete', formData)
                  .then(res =>
                  {
                        console.log(res);
                  })
                  .catch(error => console.log(error));
            window.location.href = "/admin/gamelist";

      }

      const question = () =>
      {
            $(`.${ styles.delete_pop_up }`).css("display", "flex");
      }

      const editGame = () =>
      {
            Navigate("./edit");
      }

      return (
            <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                  <div className={ `${ styles.detail_board }` }>
                        <div className="d-flex align-items-center justify-content-between w-100" style={ { height: "50px" } }>
                              <BiTrash className={ `mx-3 ${ styles.trash }` } onClick={ question } />
                              <div className='mt-2'>
                                    <button className={ `${ styles.edit }` } onClick={ editGame }>Edit</button>
                                    <button className={ `mx-3 ${ styles.back }` }><a href={ `/admin/gamelist` }>Back</a></button>
                              </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-around w-100'>
                              <div className='d-flex align-items-center justify-content-center' style={ {
                                    width: "40%",
                                    height: '50px'
                              } }>
                                    <h2 className={ `${ styles.name }` }>{ game.name }</h2>
                              </div>
                              <div className='w-50' style={ { height: '50px' } }></div>
                        </div>
                        <div className={ `d-flex align-items-center justify-content-around w-100` } style={ { height: "40%" } }>
                              <Carousel style={ {
                                    width: "40%",
                                    height: "100%"
                              } }>
                                    <Carousel.Item>
                                          <img
                                                className={ `d-block w-100 ${ styles.img }` }
                                                src={ game.image1url }
                                                alt="First image"
                                          />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                          <img
                                                className={ `d-block w-100 ${ styles.img }` }
                                                src={ game.image2url }
                                                alt="Second image"
                                          />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                          <img
                                                className={ `d-block w-100 ${ styles.img }` }
                                                src={ game.image3url }
                                                alt="Third image"
                                          />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                          <img
                                                className={ `d-block w-100 ${ styles.img }` }
                                                src={ game.image4url }
                                                alt="Fourth image"
                                          />
                                    </Carousel.Item>
                              </Carousel>
                              <div className={ `w-50 h-100 d-flex flex-column justify-content-around ${ styles.info }` }>
                                    <div className={ `d-flex align-items-center ${ styles.tags }` }>
                                          <p>Tag:&nbsp;&nbsp;</p>
                                    </div>
                                    <div className='d-flex align-items-center'><p>Price:&nbsp;&nbsp;${ (game.price - (game.price * game.discount / 100.0)).toFixed(2) }&nbsp;&nbsp;&nbsp;</p>
                                          { parseFloat(game.discount) !== 0 && <CiDiscount1 style={ {
                                                fontSize: '30px',
                                                color: 'red',
                                                marginBottom: '16px'
                                          } } /> }
                                          { parseFloat(game.discount) !== 0 && <p>{ game.discount }%</p> }
                                    </div>
                                    <p>Rating:&nbsp;<AiFillStar style={ { color: "yellow", fontSize: "25px" } } />&nbsp;{ game.rating }</p>
                                    <p>Sold:&nbsp;{ game.sold }</p>
                              </div>
                        </div>
                        <div className="container-fluid overflow-auto mt-3">
                              <span> <h6>Description: </h6> { game.description }</span>
                              <div className="row justify-content-center align-items-center g-2">
                                    <h3 className="text-center">System requirements</h3>
                                    <span className="col-6" ><h6>Miniumum requirements:</h6>  <FormattedText text={ game.spec_min } /></span>
                                    <span className="col-6"><h6>Recommended:</h6>  <FormattedText text={ game.spec_max } /></span>
                              </div>

                        </div>
                  </div>
                  <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.delete_pop_up }` }>
                        <h3>Do you really want to delete this game?</h3>
                        <div>
                              <button className={ `${ styles.delete_cancel } mx-3` } onClick={ () =>
                              {
                                    $(`.${ styles.delete_pop_up }`).css("display", "none");
                              } }>Cancel</button>
                              <button className={ `${ styles.delete_confirm } mx-3` } onClick={ () =>
                              {
                                    $(`.${ styles.delete_pop_up }`).css("display", "none"); deleteGame();
                              } }>Confirm</button>
                        </div>
                  </div>
            </div>
      )
}