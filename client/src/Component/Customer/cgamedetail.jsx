import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/Customer/gamedetail.module.css';
import { useState, useEffect, useRef, React } from 'react';
import axios from 'axios';
import $ from 'jquery';
import { BiTrash } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import FormattedText from '../tools/formatText';
import { Carousel } from "react-bootstrap";
import '../../css/carousel.css';
import { CiDiscount1 } from 'react-icons/ci';
import { BsCart, BsSearch } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { domain } from '../tools/domain';
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
                  axios.post(`http://${ domain }/admin/game/detail`, formData)
                        .then(res =>
                        {
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
                  axios.post(`http://${ domain }/admin/game/category`, formData)
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
                  axios.post(`http://${ domain }/admin/game/detail/status`, formData)
                        .then(res =>
                        {
                              if (res.data.length === 1)
                              {
                                    $(`.add_status`).append(
                                          $("<p>").css("color", "#128400").text("Available")
                                    );
                              }
                              else
                              {
                                    $(`.add_status`).append(
                                          $("<p>").css("color", "red").text("Out of stock")
                                    );
                              }
                        }).catch(error => { console.log(error); })
                  render.current = true;
            }
      });

      const addToWishlist = (event, id) =>
      {
            event.preventDefault();
            if ($(`.add_to_wishlist_${ id }`).css("color") === "rgb(0, 0, 0)")
                  $(`.add_to_wishlist_${ id }`).css("color", "red");
            else
                  $(`.add_to_wishlist_${ id }`).css("color", "rgb(0, 0, 0)");
      }

      const addToCart = (event, id) =>
      {
            event.preventDefault();
            if ($(`.add_to_cart_${ id }`).css("color") === "rgb(0, 0, 0)")
                  $(`.add_to_cart_${ id }`).css("color", "#00B3EC");
            else
                  $(`.add_to_cart_${ id }`).css("color", "rgb(0, 0, 0)");
      }




      return (
            <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                  <div className={ `${ styles.detail_board }` }>
                        <div className="d-flex align-items-center  justify-content-end w-100" style={ { height: "50px" } }>
                              <div className='mt-2'>

                                    <button className={ ` mx-3 ${ styles.back }` }><a href={ `/allgames` }>Back</a></button>
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
                        <div className={ `d-flex align-items-center justify-content-around w-100 cointainer` } style={ { height: "40%" } }>
                              <Carousel style={ {
                                    width: "40%",
                                    height: "100%"
                              } }>
                                    <Carousel.Item>
                                          <img
                                                className={ `d-block w-100 ${ styles.img }` }
                                                src={ game.image1url }
                                                alt="First"
                                          />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                          <img
                                                className={ `d-block w-100 ${ styles.img }` }
                                                src={ game.image2url }
                                                alt="Second"
                                          />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                          <img
                                                className={ `d-block w-100 ${ styles.img }` }
                                                src={ game.image3url }
                                                alt="Third"
                                          />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                          <img
                                                className={ `d-block w-100 ${ styles.img }` }
                                                src={ game.image4url }
                                                alt="Fourth"
                                          />
                                    </Carousel.Item>
                              </Carousel>
                              <div className={ `w-50 h-100 d-flex flex-column justify-content-around ${ styles.info }` }>
                                    <div className={ `d-flex align-items-center add_status` }>
                                          <p>Status:&nbsp;&nbsp;</p>
                                    </div>
                                    <div className={ `d-flex align-items-center ${ styles.tags }` }>
                                          <p>Tag:&nbsp;&nbsp;</p>
                                    </div>
                                    <div className='d-flex align-items-center'><p>Price:&nbsp;&nbsp;${ (game.price - (game.price * game.discount / 100.0)).toFixed(2) }&nbsp;&nbsp;&nbsp;</p>
                                          { parseFloat(game.discount) !== 0 && <CiDiscount1 style={ {
                                                fontSize: '30px',
                                                color: 'red',
                                                marginBottom: '16px'
                                          } } /> }
                                          { parseFloat(game.discount) !== 0 && <p style={ { color: 'red' } }>{ game.discount }%</p> }
                                    </div>
                                    <p>Rating:&nbsp;<AiFillStar style={ { color: "yellow", fontSize: "25px" } } />&nbsp;{ game.rating }</p>
                                    <div className='d-flex w-100 align-items-center ms-0'>
                                          <BsCart className={ `mx-3 add_to_cart add_to_cart_${ game.id } ${ styles.icons } ${ styles.foo }` } onClick={ (e) => { addToCart(e, game.id) } } />
                                          <AiOutlineHeart className={ `mx-3 add_to_wishlist add_to_wishlist_${ game.id } ${ styles.icons } ${ styles.foo }` } onClick={ (e) => { addToWishlist(e, game.id) } } />
                                    </div>
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

            </div>
      )
}