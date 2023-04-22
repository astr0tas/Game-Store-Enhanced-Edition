import { useNavigate } from 'react-router';
import styles from '../../css/Admin/add_edit_game.module.css';
import { BiTrash } from 'react-icons/bi';
import { useRef, useEffect, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';

export const AddGame = () =>
{
      const render = useRef(false);
      const [pic1, setPic1] = useState(null);
      const [pic2, setPic2] = useState(null);
      const [pic3, setPic3] = useState(null);
      const [pic4, setPic4] = useState(null);
      const [name, setName] = useState(null);
      const [price, setPrice] = useState(null);
      const [discount, setDiscount] = useState(null);
      const [tag, setTag] = useState([]);
      const [codes, setCodes] = useState(null);
      const [description, setDescription] = useState(null);
      const [minSpec, setMinSpec] = useState(null);
      const [recSpec, setRecSpec] = useState(null);

      const removeTag = (tagToRemove) =>
      {
            const updatedTags = tag.filter((tag) => tag !== tagToRemove);
            setTag(updatedTags);
      };

      useEffect(() =>
      {
            if (!render.current)
            {
                  $("#game").css("color", "white");
                  $("#game").css("background-color", "#00B3EC");
                  axios.get('http://localhost/admin/game/categories').then(res =>
                  {
                        for (let i = 0; i < res.data.length; i += 3)
                        {
                              let div1 = $("<div>").addClass(styles.category_checkbox).append(
                                    $("<input>").attr("type", "checkbox").val(res.data[i].type).on('change', function (event)
                                    {
                                          if (!event.target.checked)
                                                removeTag(event.target.value);
                                          else
                                                setTag(prevTags => [...prevTags, event.target.value]);
                                    })
                              )
                                    .append(
                                          $("<label>").text(`${ res.data[i].type }`)
                                    );
                              let div2 = null, div3 = null;
                              if (i + 1 === res.data.length)
                              {
                                    $(`.${ styles.categories_list }`).append(
                                          $("<div>").addClass("w-100").addClass("d-flex").addClass("justify-content-around").addClass("align-items-center").append(
                                                div1
                                          )
                                    );
                              }
                              else if (i + 1 !== res.data.length && i + 2 === res.data.length)
                              {
                                    div2 = $("<div>").addClass(styles.category_checkbox).append(
                                          $("<input>").attr("type", "checkbox").val(res.data[i + 1].type).on('change', function (event)
                                          {
                                                if (!event.target.checked)
                                                      removeTag(event.target.value);
                                                else
                                                      setTag(prevTags => [...prevTags, event.target.value]);
                                          })
                                    )
                                          .append(
                                                $("<label>").text(`${ res.data[i + 1].type }`)
                                          );
                                    $(`.${ styles.categories_list }`).append(
                                          $("<div>").addClass("w-100").addClass("d-flex").addClass("justify-content-around").addClass("align-items-center").append(
                                                div1
                                          ).append(
                                                div2
                                          )
                                    );
                              }
                              else
                              {
                                    div2 = $("<div>").addClass(styles.category_checkbox).append(
                                          $("<input>").attr("type", "checkbox").val(res.data[i + 1].type).on('change', function (event)
                                          {
                                                if (!event.target.checked)
                                                      removeTag(event.target.value);
                                                else
                                                      setTag(prevTags => [...prevTags, event.target.value]);
                                          })
                                    )
                                          .append(
                                                $("<label>").text(`${ res.data[i + 1].type }`)
                                          );
                                    div3 = $("<div>").addClass(styles.category_checkbox).append(
                                          $("<input>").attr("type", "checkbox").val(res.data[i + 2].type).on('change', function (event)
                                          {
                                                if (!event.target.checked)
                                                      removeTag(event.target.value);
                                                else
                                                      setTag(prevTags => [...prevTags, event.target.value]);
                                          })
                                    )
                                          .append(
                                                $("<label>").text(`${ res.data[i + 2].type }`)
                                          );
                                    $(`.${ styles.categories_list }`).append(
                                          $("<div>").addClass("w-100").addClass("d-flex").addClass("justify-content-around").addClass("align-items-center").append(
                                                div1
                                          ).append(
                                                div2
                                          ).append(
                                                div3
                                          )
                                    );
                              }
                        }
                  }).catch(error => { console.log(error); })
                  render.current = true;
            }
      });

      const loadPicture = (e, number) =>
      {
            e.preventDefault();
            const file = e.target.files[0];
            if (number === 1)
                  setPic1(file);
            else if (number === 2)
                  setPic2(file);
            else if (number === 3)
                  setPic3(file);
            else
                  setPic4(file);
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = () =>
            {
                  const blob = new Blob([reader.result], { type: file.type });
                  const url = URL.createObjectURL(blob);
                  $(`.${ styles.images }_${ number }`).attr("src", url);
            };
      }

      const createGame = (event) =>
      {
            event.preventDefault();
            if (name === null)
                  $(`.${ styles.pop_up }`).css("display", "flex");
            else
            {
                  const formData = new FormData();
                  formData.append("picture1", pic1);
                  formData.append("picture2", pic2);
                  formData.append("picture3", pic3);
                  formData.append("picture4", pic4);
                  formData.append("price", price);
                  formData.append("discount", discount);
                  formData.append("description", description);
                  formData.append("minSpec", minSpec);
                  formData.append("recSpec", recSpec);
                  formData.append("name", name);
                  axios.post('http://localhost/admin/game/create', formData).then(res =>
                  {
                        const formData1 = new FormData();
                        formData1.append("codes", codes);
                        formData1.append("id", res.data);
                        axios.post('http://localhost/admin/game/addCode', formData1).then(Response =>
                        {
                              console.log(Response);
                        }).catch(error => { console.log(error); })

                        const formData2 = new FormData();
                        formData2.append("tag", tag);
                        formData2.append("id", res.data);
                        axios.post('http://localhost/admin/game/addTag', formData2).then(Response =>
                        {
                              console.log(Response);
                        }).catch(error => { console.log(error); })
                  }).catch(error => { console.log(error); })
            }
      }

      const chooseCategories = () =>
      {
            $(`.${ styles.categories }`).css("display", "flex");
      }

      const stopChoosing = () =>
      {
            $('input[type="checkbox"]').each(function ()
            {
                  $(this).prop("checked", false);
            });
            $(`.${ styles.categories }`).css("display", "none");
            setTag([]);
      }

      return (
            <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                  <div className={ `${ styles.pop_up } position-absolute flex-column align-items-center` }>
                        <h1>Please enter the game's name!</h1>
                        <button className={ `mx-3 ${ styles.confirm }` } onClick={ () => { $(`.${ styles.pop_up }`).css("display", "none"); } }>OKAY</button>
                  </div>
                  <div className={ `${ styles.categories } w-50 h-50 position-absolute flex-column align-items-center` }>
                        <h1>Choose categories</h1>
                        <div className={ `w-100 d-flex flex-column align-items-center justify-content-around ${ styles.categories_list }` }></div>
                        <div className='mt-auto mb-3'>
                              <button className={ `mx-3 ${ styles.cancel }` } onClick={ stopChoosing }>Cancel</button>
                              <button className={ `mx-3 ${ styles.confirm }` } onClick={ () => { $(`.${ styles.categories }`).css("display", "none"); } }>Confirm</button>
                        </div>
                  </div>
                  <div className={ `${ styles.board }` }>
                        <div className={ `mt-2 w-100 d-flex justify-content-center align-items-center` }>
                              <input type="text" placeholder="Enter game's name" className={ `${ styles.name }` } defaultValue="" onChange={ (e) =>
                              {
                                    setName(e.target.value);
                              } }></input>
                        </div>
                        <div className={ `d-flex align-items-center w-100 mt-3` } style={ {
                              height: "40%"
                        } }>
                              <div className={ `w-25 h-100 d-flex flex-column justify-content-center align-items-center` }>
                                    <img alt="" className={ `${ styles.images } ${ styles.images }_1` } src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"></img>
                                    <input type='file' className={ `${ styles.browse }  mt-3 mb-0` } onChange={ (e) => { loadPicture(e, 1) } } accept=".jpg,.jpeg,.png"></input>
                              </div>
                              <div className={ `w-25 h-100 d-flex flex-column justify-content-center align-items-center` }>
                                    <img alt="" className={ `${ styles.images } ${ styles.images }_2` } src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"></img>
                                    <input type='file' className={ `${ styles.browse }  mt-3 mb-0` } onChange={ (e) => { loadPicture(e, 2) } } accept=".jpg,.jpeg,.png"></input>
                              </div>
                              <div className={ `w-25 h-100 d-flex flex-column justify-content-center align-items-center` }>
                                    <img alt="" className={ `${ styles.images } ${ styles.images }_3` } src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"></img>
                                    <input type='file' className={ `${ styles.browse }  mt-3 mb-0` } onChange={ (e) => { loadPicture(e, 3) } } accept=".jpg,.jpeg,.png"></input>
                              </div>
                              <div className={ `w-25 h-100 d-flex flex-column justify-content-center align-items-center` }>
                                    <img alt="" className={ `${ styles.images } ${ styles.images }_4` } src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"></img>
                                    <input type='file' className={ `${ styles.browse } mt-3 mb-0` } onChange={ (e) => { loadPicture(e, 4) } } accept=".jpg,.jpeg,.png"></input>
                              </div>
                        </div>
                        <div className={ `d-flex align-items-center justify-content-around w-100 mt-5 mb-5 ${ styles.margining }` }>
                              <div className="d-flex align-items-center">
                                    <p className={ `${ styles.font }` }>Price ($)</p>
                                    <input className={ `${ styles.input }` } type="number" placeholder='Enter a price' onChange={ (e) =>
                                    {
                                          setPrice(e.target.value);
                                    } }></input>
                              </div>
                              <div className="d-flex align-items-center" >
                                    <p className={ `${ styles.font }` }>Discount (%)</p>
                                    <input className={ `${ styles.input }` } type="number" onChange={ (e) =>
                                    {
                                          setDiscount(e.target.value);
                                    } }></input>
                              </div>
                              <div className="d-flex align-items-center">
                                    <p className={ `${ styles.font } categories` }>Tag</p>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className={ `${ styles.choose_categories }` } onClick={ chooseCategories }>Browse</button>
                              </div>
                        </div>
                        <div className={ `d-flex align-items-center justify-content-around w-100 mt-5 mb-5 ${ styles.margining }` }>
                              <div className="d-flex align-items-center">
                                    <p className={ `${ styles.font }` }>Codes</p>
                                    <input type='file' className={ `${ styles.browse }` } accept=".txt" onChange={ (e) => { setCodes(e.target.files[0]); } }></input>
                              </div>
                              <div className="d-flex align-items-center">
                                    <p className={ `${ styles.font }` }>Description</p>
                                    <input type='file' className={ `${ styles.browse }` } accept=".txt" onChange={ (e) => { setDescription(e.target.files[0]); } }></input>
                              </div>
                        </div>
                        <div className={ `d-flex align-items-center justify-content-around w-100 mt-5 mb-5 ${ styles.margining }` }>
                              <div className="d-flex align-items-center">
                                    <p className={ `${ styles.font }` }>Minimum system requirement</p>
                                    <input type='file' className={ `${ styles.browse }` } accept=".txt" onChange={ (e) => { setMinSpec(e.target.files[0]); } }></input>
                              </div>
                              <div className="d-flex align-items-center">
                                    <p className={ `${ styles.font }` }>Recommended system requirement</p>
                                    <input type='file' className={ `${ styles.browse }` } accept=".txt" onChange={ (e) => { setRecSpec(e.target.files[0]); } }></input>
                              </div>
                        </div>
                        <div className={ `d-flex align-items-center justify-content-center mt-auto mb-4` }>
                              <button type='button' className={ `${ styles.cancel }` } onClick={ () => { window.location.href = "/admin/gamelist"; } }>Cancel</button>
                              <button type="button" className={ `${ styles.confirm }` } onClick={ createGame }>Confirm</button>
                        </div>
                  </div>
            </div>
      );
}

export const EditGame = () =>
{
      const render = useRef(false);
      const [pic1, setPic1] = useState(null);
      const [pic2, setPic2] = useState(null);
      const [pic3, setPic3] = useState(null);
      const [pic4, setPic4] = useState(null);
      const [name, setName] = useState(null);
      const [price, setPrice] = useState(null);
      const [discount, setDiscount] = useState(null);
      const [tag, setTag] = useState([]);
      const [codes, setCodes] = useState(null);
      const [description, setDescription] = useState(null);
      const [minSpec, setMinSpec] = useState(null);
      const [recSpec, setRecSpec] = useState(null);

      const removeTag = (tagToRemove) =>
      {
            const updatedTags = tag.filter((tag) => tag !== tagToRemove);
            setTag(updatedTags);
      };

      useEffect(() =>
      {
            if (!render.current)
            {
                  $("#game").css("color", "white");
                  $("#game").css("background-color", "#00B3EC");
                  axios.get('http://localhost/admin/game/categories').then(res =>
                  {
                        for (let i = 0; i < res.data.length; i += 3)
                        {
                              let div1 = $("<div>").addClass(styles.category_checkbox).append(
                                    $("<input>").attr("type", "checkbox").val(res.data[i].type).on('change', function (event)
                                    {
                                          if (!event.target.checked)
                                                removeTag(event.target.value);
                                          else
                                                setTag(prevTags => [...prevTags, event.target.value]);
                                    })
                              )
                                    .append(
                                          $("<label>").text(`${ res.data[i].type }`)
                                    );
                              let div2 = null, div3 = null;
                              if (i + 1 === res.data.length)
                              {
                                    $(`.${ styles.categories_list }`).append(
                                          $("<div>").addClass("w-100").addClass("d-flex").addClass("justify-content-around").addClass("align-items-center").append(
                                                div1
                                          )
                                    );
                              }
                              else if (i + 1 !== res.data.length && i + 2 === res.data.length)
                              {
                                    div2 = $("<div>").addClass(styles.category_checkbox).append(
                                          $("<input>").attr("type", "checkbox").val(res.data[i + 1].type).on('change', function (event)
                                          {
                                                if (!event.target.checked)
                                                      removeTag(event.target.value);
                                                else
                                                      setTag(prevTags => [...prevTags, event.target.value]);
                                          })
                                    )
                                          .append(
                                                $("<label>").text(`${ res.data[i + 1].type }`)
                                          );
                                    $(`.${ styles.categories_list }`).append(
                                          $("<div>").addClass("w-100").addClass("d-flex").addClass("justify-content-around").addClass("align-items-center").append(
                                                div1
                                          ).append(
                                                div2
                                          )
                                    );
                              }
                              else
                              {
                                    div2 = $("<div>").addClass(styles.category_checkbox).append(
                                          $("<input>").attr("type", "checkbox").val(res.data[i + 1].type).on('change', function (event)
                                          {
                                                if (!event.target.checked)
                                                      removeTag(event.target.value);
                                                else
                                                      setTag(prevTags => [...prevTags, event.target.value]);
                                          })
                                    )
                                          .append(
                                                $("<label>").text(`${ res.data[i + 1].type }`)
                                          );
                                    div3 = $("<div>").addClass(styles.category_checkbox).append(
                                          $("<input>").attr("type", "checkbox").val(res.data[i + 2].type).on('change', function (event)
                                          {
                                                if (!event.target.checked)
                                                      removeTag(event.target.value);
                                                else
                                                      setTag(prevTags => [...prevTags, event.target.value]);
                                          })
                                    )
                                          .append(
                                                $("<label>").text(`${ res.data[i + 2].type }`)
                                          );
                                    $(`.${ styles.categories_list }`).append(
                                          $("<div>").addClass("w-100").addClass("d-flex").addClass("justify-content-around").addClass("align-items-center").append(
                                                div1
                                          ).append(
                                                div2
                                          ).append(
                                                div3
                                          )
                                    );
                              }
                        }
                  }).catch(error => { console.log(error); })
                  render.current = true;
            }
      });

      const Navigate = useNavigate();

      const goBack = () =>
      {
            Navigate(-1);
      }

      const loadPicture = (e, number) =>
      {
            e.preventDefault();
            const file = e.target.files[0];
            if (number === 1)
                  setPic1(file);
            else if (number === 2)
                  setPic2(file);
            else if (number === 3)
                  setPic3(file);
            else
                  setPic4(file);
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = () =>
            {
                  const blob = new Blob([reader.result], { type: file.type });
                  const url = URL.createObjectURL(blob);
                  $(`.${ styles.images }_${ number }`).attr("src", url);
            };
      }

      const createGame = (event) =>
      {
            event.preventDefault();
            if (name === null)
                  $(`.${ styles.pop_up }`).css("display", "flex");
            else
            {
                  const formData = new FormData();
                  formData.append("picture1", pic1);
                  formData.append("picture2", pic2);
                  formData.append("picture3", pic3);
                  formData.append("picture4", pic4);
                  formData.append("price", price);
                  formData.append("discount", discount);
                  formData.append("description", description);
                  formData.append("minSpec", minSpec);
                  formData.append("recSpec", recSpec);
                  formData.append("name", name);
                  axios.post('http://localhost/admin/game/create', formData).then(res =>
                  {
                        const formData1 = new FormData();
                        formData1.append("codes", codes);
                        formData1.append("id", res.data);
                        axios.post('http://localhost/admin/game/addCode', formData1).then(Response =>
                        {
                              console.log(Response);
                        }).catch(error => { console.log(error); })

                        const formData2 = new FormData();
                        formData2.append("tag", tag);
                        formData2.append("id", res.data);
                        axios.post('http://localhost/admin/game/addTag', formData2).then(Response =>
                        {
                              console.log(Response);
                        }).catch(error => { console.log(error); })
                  }).catch(error => { console.log(error); })
            }
      }

      const chooseCategories = () =>
      {
            $(`.${ styles.categories }`).css("display", "flex");
      }

      const stopChoosing = () =>
      {
            $('input[type="checkbox"]').each(function ()
            {
                  $(this).prop("checked", false);
            });
            $(`.${ styles.categories }`).css("display", "none");
            setTag([]);
      }

      return (
            <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                  <div className={ `${ styles.pop_up } position-absolute flex-column align-items-center` }>
                        <h1>Please enter the game's name!</h1>
                        <button className={ `mx-3 ${ styles.confirm }` } onClick={ () => { $(`.${ styles.pop_up }`).css("display", "none"); } }>OKAY</button>
                  </div>
                  <div className={ `${ styles.categories } w-50 h-50 position-absolute flex-column align-items-center` }>
                        <h1>Choose categories</h1>
                        <div className={ `w-100 d-flex flex-column align-items-center justify-content-around ${ styles.categories_list }` }></div>
                        <div className='mt-auto mb-3'>
                              <button className={ `mx-3 ${ styles.cancel }` } onClick={ stopChoosing }>Cancel</button>
                              <button className={ `mx-3 ${ styles.confirm }` } onClick={ () => { $(`.${ styles.categories }`).css("display", "none"); } }>Confirm</button>
                        </div>
                  </div>
                  <div className={ `${ styles.board }` }>
                        <div className={ `mt-2 w-100 d-flex justify-content-center align-items-center` }>
                              <input type="text" placeholder="Enter game's name" className={ `${ styles.name }` } defaultValue="" onChange={ (e) =>
                              {
                                    setName(e.target.value);
                              } }></input>
                              <BiTrash className={ `${ styles.trash }` } />
                        </div>
                        <div className={ `d-flex align-items-center w-100 mt-3` } style={ {
                              height: "40%"
                        } }>
                              <div className={ `w-25 h-100 d-flex flex-column justify-content-center align-items-center` }>
                                    <img alt="" className={ `${ styles.images } ${ styles.images }_1` } src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"></img>
                                    <input type='file' className={ `${ styles.browse }  mt-3 mb-0` } onChange={ (e) => { loadPicture(e, 1) } } accept=".jpg,.jpeg,.png"></input>
                              </div>
                              <div className={ `w-25 h-100 d-flex flex-column justify-content-center align-items-center` }>
                                    <img alt="" className={ `${ styles.images } ${ styles.images }_2` } src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"></img>
                                    <input type='file' className={ `${ styles.browse }  mt-3 mb-0` } onChange={ (e) => { loadPicture(e, 2) } } accept=".jpg,.jpeg,.png"></input>
                              </div>
                              <div className={ `w-25 h-100 d-flex flex-column justify-content-center align-items-center` }>
                                    <img alt="" className={ `${ styles.images } ${ styles.images }_3` } src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"></img>
                                    <input type='file' className={ `${ styles.browse }  mt-3 mb-0` } onChange={ (e) => { loadPicture(e, 3) } } accept=".jpg,.jpeg,.png"></input>
                              </div>
                              <div className={ `w-25 h-100 d-flex flex-column justify-content-center align-items-center` }>
                                    <img alt="" className={ `${ styles.images } ${ styles.images }_4` } src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"></img>
                                    <input type='file' className={ `${ styles.browse } mt-3 mb-0` } onChange={ (e) => { loadPicture(e, 4) } } accept=".jpg,.jpeg,.png"></input>
                              </div>
                        </div>
                        <div className={ `d-flex align-items-center justify-content-around w-100 mt-5 mb-5 ${ styles.margining }` }>
                              <div className="d-flex align-items-center">
                                    <p className={ `${ styles.font }` }>Price ($)</p>
                                    <input className={ `${ styles.input }` } type="number" placeholder='Enter a price' onChange={ (e) =>
                                    {
                                          setPrice(e.target.value);
                                    } }></input>
                              </div>
                              <div className="d-flex align-items-center" >
                                    <p className={ `${ styles.font }` }>Discount (%)</p>
                                    <input className={ `${ styles.input }` } type="number" onChange={ (e) =>
                                    {
                                          setDiscount(e.target.value);
                                    } }></input>
                              </div>
                              <div className="d-flex align-items-center">
                                    <p className={ `${ styles.font } categories` }>Tag</p>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className={ `${ styles.choose_categories }` } onClick={ chooseCategories }>Browse</button>
                              </div>
                        </div>
                        <div className={ `d-flex align-items-center justify-content-around w-100 mt-5 mb-5 ${ styles.margining }` }>
                              <div className="d-flex align-items-center">
                                    <p className={ `${ styles.font }` }>Codes</p>
                                    <input type='file' className={ `${ styles.browse }` } accept=".txt" onChange={ (e) => { setCodes(e.target.files[0]); } }></input>
                              </div>
                              <div className="d-flex align-items-center">
                                    <p className={ `${ styles.font }` }>Description</p>
                                    <input type='file' className={ `${ styles.browse }` } accept=".txt" onChange={ (e) => { setDescription(e.target.files[0]); } }></input>
                              </div>
                        </div>
                        <div className={ `d-flex align-items-center justify-content-around w-100 mt-5 mb-5 ${ styles.margining }` }>
                              <div className="d-flex align-items-center">
                                    <p className={ `${ styles.font }` }>Minimum system requirement</p>
                                    <input type='file' className={ `${ styles.browse }` } accept=".txt" onChange={ (e) => { setMinSpec(e.target.files[0]); } }></input>
                              </div>
                              <div className="d-flex align-items-center">
                                    <p className={ `${ styles.font }` }>Recommended system requirement</p>
                                    <input type='file' className={ `${ styles.browse }` } accept=".txt" onChange={ (e) => { setRecSpec(e.target.files[0]); } }></input>
                              </div>
                        </div>
                        <div className={ `d-flex align-items-center justify-content-center mt-auto mb-4` }>
                              <button type='button' className={ `${ styles.cancel }` } onClick={ goBack }>Back</button>
                              <button type="button" className={ `${ styles.confirm }` } onClick={ createGame }>Confirm</button>
                        </div>
                  </div>
            </div>
      );
}