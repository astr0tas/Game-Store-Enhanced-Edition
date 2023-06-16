import { useNavigate, useParams } from 'react-router-dom';
import styles from './GameDetail.module.css';
import { useState, useEffect, React } from 'react';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import FormattedText from '../../../tools/formatText';
import { Carousel } from "react-bootstrap";
import { CiDiscount1 } from 'react-icons/ci';
import { domain } from '../../../tools/domain';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsCart } from 'react-icons/bs';
import '../../../General/css/carousel.css';
import '../../../General/css/scroll.css';



export default function CustomerGameDetail()
{
      const id = useParams().id;

      const [render, setRender] = useState(false);

      const [game, SetGame] = useState({
            name: "N/A",
            description: "N/A",
            discount: "N/A",
            price: "N/A",
            rating: "N/A",
            spec_min: "N/A",
            spec_max: "N/A",
            image1url: "N/A",
            image2url: "N/A",
            image3url: "N/A",
            image4url: "N/A"
      });
      const [status, setStatus] = useState({ str: "N/A", color: "N/A" });
      const [category, setCategory] = useState("N/A");

      const [isInWish, setIsInWish] = useState(false);
      const [isInCart, setIsInCart] = useState(false);

      const Navigate = useNavigate();

      useEffect(() =>
      {

            const formData = new FormData();
            formData.append("id", id);
            axios.post(`http://${ domain }/game/detail`, formData)
                  .then(res =>
                  {
                        document.title = res.data.name;
                        SetGame({

                              name: res.data.name,
                              description: res.data.description,
                              discount: res.data.discount,
                              price: res.data.price,
                              rating: res.data.ratings,
                              spec_min: res.data.spec_minimum,
                              spec_max: res.data.spec_recommended,
                              image1url: res.data.picture_1 === null ? null : `http://${ domain }/model/data/games/${ res.data.picture_1 }`,
                              image2url: res.data.picture_2 === null ? null : `http://${ domain }/model/data/games/${ res.data.picture_2 }`,
                              image3url: res.data.picture_3 === null ? null : `http://${ domain }/model/data/games/${ res.data.picture_3 }`,
                              image4url: res.data.picture_4 === null ? null : `http://${ domain }/model/data/games/${ res.data.picture_4 }`
                        });
                  }).catch(error => { console.log(error); })
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
            axios.post(`http://${ domain }/game/status`, formData)
                  .then(res =>
                  {
                        if (res.data)
                              setStatus({ str: "Available", color: "#128400" });
                        else
                              setStatus({ str: "Out of stock", color: "red" });
                  }).catch(error => { console.log(error); })
            axios.post(`http://${ domain }/isAddedToWishlist`, formData, { withCredentials: true }).then(res =>
            {
                  setIsInWish(res.data);
            })
                  .catch(err => console.log(err))

            axios.post(`http://${ domain }/isAddedToCart`, formData, { withCredentials: true }).then(res =>
            {
                  setIsInCart(res.data);
            })
                  .catch(err => console.log(err))
      }, [render, id]);

      const toggleWishlist = () =>
      {
            const formData = new FormData();
            formData.append('id', id);
            if (isInWish)
            {
                  axios.post(`http://${ domain }/removeFromWishlist`, formData, { withCredentials: true }).then(res =>
                  {
                        console.log(res);
                        setRender(!render);
                  })
                        .catch(err => console.log(err))
            }
            else
            {
                  axios.post(`http://${ domain }/addToWishlist`, formData, { withCredentials: true }).then(res =>
                  {
                        console.log(res);
                        setRender(!render);
                  })
                        .catch(err => console.log(err))
            }
      }

      const toggleCart = () =>
      {
            const formData = new FormData();
            formData.append('id', id);
            if (isInCart)
            {
                  axios.post(`http://${ domain }/removeFromCart`, formData, { withCredentials: true }).then(res =>
                  {
                        console.log(res);
                        setRender(!render);
                  })
                        .catch(err => console.log(err))
            }
            else
            {
                  axios.post(`http://${ domain }/addToCart`, formData, { withCredentials: true }).then(res =>
                  {
                        console.log(res);
                        setRender(!render);
                  })
                        .catch(err => console.log(err))
            }
      }

      return (
            <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex align-items-center w-100" style={ { minHeight: "50px" } }>
                        <div className='ms-auto me-3'>
                              <button className={ `ms-2 btn btn-sm btn-secondary` } onClick={ () => { Navigate(-1); } }>Back</button>
                        </div>
                  </div>
                  <div className={ `w-100 overflow-auto hideBrowserScrollbar d-flex flex-column flex-grow-1 mb-3` }>
                        <div className={ `d-lg-flex w-100` }>
                              <div className={ `d-flex flex-column ${ styles.sections } align-self-center` }>
                                    <h1 className='text-center'>{ game.name }</h1>
                                    <Carousel className={ `flex-grow-1 align-self-center` } style={ { width: '90%' } }>
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
                              </div>
                              <div className={ `${ styles.sections } ms-lg-5 mt-2 mt-lg-0 d-flex flex-column align-items-center align-items-lg-start align-self-center` }>
                                    <div className={ `d-flex align-items-center my-lg-3` }>
                                          <h4>Status:&nbsp;&nbsp;</h4>
                                          <h4 style={ {
                                                color: status.color
                                          } }>{ status.str }</h4>
                                    </div>
                                    <div className={ `d-flex align-items-center ${ styles.tags } my-lg-3 w-100 justify-content-center justify-content-lg-start` }>
                                          <h4>Category:&nbsp;&nbsp;</h4>
                                          <div className='overflow-auto'>
                                                <h4 style={ {
                                                      whiteSpace: 'nowrap', height: '26px'
                                                } }>{ category }</h4>
                                          </div>
                                    </div>
                                    <div className='d-flex align-items-center my-lg-3'>
                                          <h4>Price:&nbsp;&nbsp;{ !game.price && 'N/A' }{ game.price && '$' }{ game.discount === '0' && game.price }{ game.discount !== '0' && game.discount !== null && ((parseFloat(game.price) + 0.01) * (100 - parseFloat(game.discount)) / 100).toFixed(2) - 0.01 }&nbsp;&nbsp;&nbsp;</h4>
                                          { game.discount !== null && parseFloat(game.discount) !== 0 && <CiDiscount1 style={ {
                                                fontSize: '1.5rem',
                                                color: 'red',
                                                marginBottom: '12px'
                                          } } /> }
                                          { game.discount !== null && parseFloat(game.discount) !== 0 && <h4 style={ { color: 'red' } }>{ game.discount }%</h4> }
                                    </div>
                                    <h4 className='my-lg-3'>Rating:&nbsp;&nbsp;<AiFillStar style={ { color: "yellow", fontSize: "25px" } } />&nbsp;{ game.rating }</h4>
                                    <div className='d-flex mt-3 align-items-center'>
                                          <AiOutlineHeart className={ `me-2 ${ styles.icons } ${ isInWish === false ? styles.unwish : styles.wish }` } style={ { fontSize: '2.5rem' } } onClick={ toggleWishlist } />
                                          <BsCart className={ `ms-2 ${ styles.icons } ${ isInCart === false ? styles.uncart : styles.cart }` } style={ { fontSize: '2.5rem' } } onClick={ toggleCart } />
                                    </div>
                              </div>
                        </div>
                        <div className={ `mt-5 container-fluid flex-grow-1` }>
                              <div className="row justify-content-center align-items-center g-2">
                                    <h5 className={ `${ styles.text_align }` } style={ { fontWeight: 'bold' } }>Description</h5>
                                    <p style={ { textAlign: 'justify', textJustify: 'inter-word' } }>{ (game.description === null || game.description === "") && 'N/A' }{ game.description !== null && game.description !== "" && game.description }</p>
                                    <h3 className="text-center" style={ { fontWeight: 'bold' } }>System requirements</h3>
                                    <div className='d-flex flex-column flex-lg-row justify-content-lg-around'>
                                          <div>
                                                <h5 className={ `${ styles.text_align }` } style={ { fontWeight: 'bold' } }>Miniumum</h5>
                                                <FormattedText text={ game.spec_min } />
                                          </div>
                                          <div>
                                                <h5 className={ `${ styles.text_align }` } style={ { fontWeight: 'bold' } }>Recommended</h5>
                                                <FormattedText text={ game.spec_max } />
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}