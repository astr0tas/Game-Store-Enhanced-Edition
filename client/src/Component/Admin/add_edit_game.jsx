import { useNavigate, useParams } from 'react-router';
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
      const [removedTag, setRemovedTag] = useState([]);
      const [codes, setCodes] = useState(null);
      const [description, setDescription] = useState(null);
      const [minSpec, setMinSpec] = useState(null);
      const [recSpec, setRecSpec] = useState(null);

      const removeTag = () =>
      {
            for (let i = 0; i < removedTag.length; i++)
            {
                  const index = tag.indexOf(removedTag[i]);
                  tag.splice(index, 1);
            }
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
                                                setRemovedTag(prevTags => [...prevTags, event.target.value]);
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
                                                      setRemovedTag(prevTags => [...prevTags, event.target.value]);
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
                                                      setRemovedTag(prevTags => [...prevTags, event.target.value]);
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
                                                      setRemovedTag(prevTags => [...prevTags, event.target.value]);
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
            if (e.target.files.length === 0)
            {
                  if (number === 1)
                        setPic1(null);
                  else if (number === 2)
                        setPic2(null);
                  else if (number === 3)
                        setPic3(null);
                  else
                        setPic4(null);
                  $(`.${ styles.images }_${ number }`).attr("src", "");
            }
            else
            {
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
      }

      const createGame = (event) =>
      {
            event.preventDefault();
            if (name === null)
                  $(`.${ styles.pop_up }`).css("display", "flex");
            else
            {
                  removeTag();
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
            setRemovedTag([]);
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
                              <input type="text" placeholder="Enter game's name" className={ `${ styles.name }` } onChange={ (e) =>
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
      const [oldPic1, setOldPic1] = useState(null);
      const [oldPic2, setOldPic2] = useState(null);
      const [oldPic3, setOldPic3] = useState(null);
      const [oldPic4, setOldPic4] = useState(null);
      const [name, setName] = useState(null);
      const [price, setPrice] = useState(null);
      const [discount, setDiscount] = useState(null);
      const [tag, setTag] = useState([]);
      const [removedTag, setRemovedTag] = useState([]);
      const [oldTag, setOldTag] = useState([]);
      const [codes, setCodes] = useState(null);
      const [description, setDescription] = useState(null);
      const [oldDescription, setOldDescription] = useState(null);
      const [minSpec, setMinSpec] = useState(null);
      const [oldMinSpec, setOldMinSpec] = useState(null);
      const [recSpec, setRecSpec] = useState(null);
      const [oldRecSpec, setOldRecSpec] = useState(null);

      const id = useParams().id;

      const removeTag = () =>
      {
            for (let i = 0; i < removedTag.length; i++)
            {
                  const index = tag.indexOf(removedTag[i]);
                  tag.splice(index, 1);
            }
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
                                          {
                                                setRemovedTag(prevTags => [...prevTags, event.target.value])
                                          }
                                          else
                                          {
                                                setTag(prevTags => [...prevTags, event.target.value]);
                                          }
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
                                                {
                                                      setRemovedTag(prevTags => [...prevTags, event.target.value])
                                                }
                                                else
                                                {
                                                      setTag(prevTags => [...prevTags, event.target.value]);
                                                }
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
                                                {
                                                      setRemovedTag(prevTags => [...prevTags, event.target.value])
                                                }
                                                else
                                                {
                                                      setTag(prevTags => [...prevTags, event.target.value]);
                                                }
                                          })
                                    )
                                          .append(
                                                $("<label>").text(`${ res.data[i + 1].type }`)
                                          );
                                    div3 = $("<div>").addClass(styles.category_checkbox).append(
                                          $("<input>").attr("type", "checkbox").val(res.data[i + 2].type).on('change', function (event)
                                          {
                                                if (!event.target.checked)
                                                {
                                                      setRemovedTag(prevTags => [...prevTags, event.target.value])
                                                }
                                                else
                                                {
                                                      setTag(prevTags => [...prevTags, event.target.value]);
                                                }
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
                        const formData = new FormData();
                        formData.append("id", id);
                        axios.post('http://localhost/admin/game/update/category', formData).then(Response =>
                        {
                              for (let i = 0; i < Response.data.length; i++)
                              {
                                    $('input[type="checkbox"][value="' + Response.data[i].category_type + '"]').prop("checked", true);
                                    setOldTag(prevTags => [...prevTags, Response.data[i].category_type]);
                                    setTag(prevTags => [...prevTags, Response.data[i].category_type]);
                              }
                        }).catch(error => { console.log(error); })
                        axios.post('http://localhost/admin/game/update/info', formData).then(Response =>
                        {
                              $(`.${ styles.name }`).val(Response.data.name);
                              setName(Response.data.name);
                              $(`.gamePrice`).val(Response.data.price);
                              setPrice(Response.data.price);
                              $(`.gameDiscount`).val(Response.data.discount);
                              const data1 = new Uint8Array(Object.values(Response.data.picture_1));
                              const blob1 = new Blob([data1], { type: "image/jpg" });
                              const url1 = URL.createObjectURL(blob1);
                              setOldPic1(url1);
                              $(`.${ styles.images }_1`).attr("src", url1);
                              const data2 = new Uint8Array(Object.values(Response.data.picture_2));
                              const blob2 = new Blob([data2], { type: "image/jpg" });
                              const url2 = URL.createObjectURL(blob2);
                              setOldPic2(url2);
                              $(`.${ styles.images }_2`).attr("src", url2);
                              const data3 = new Uint8Array(Object.values(Response.data.picture_3));
                              const blob3 = new Blob([data3], { type: "image/jpg" });
                              const url3 = URL.createObjectURL(blob3);
                              setOldPic3(url3);
                              $(`.${ styles.images }_3`).attr("src", url3);
                              const data4 = new Uint8Array(Object.values(Response.data.picture_4));
                              const blob4 = new Blob([data4], { type: "image/jpg" });
                              const url4 = URL.createObjectURL(blob4);
                              setOldPic4(url4);
                              $(`.${ styles.images }_4`).attr("src", url4);
                              setDiscount(Response.data.discount);
                              setMinSpec(Response.data.spec_minimum);
                              setOldMinSpec(Response.data.spec_minimum);
                              setRecSpec(Response.data.spec_recommended);
                              setOldRecSpec(Response.data.spec_recommended);
                              setDescription(Response.data.description);
                              setOldDescription(Response.data.description);
                        }).catch(error => { console.log(error); })
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
            if (e.target.files.length === 0)
            {
                  if (number === 1)
                  {
                        setPic1(null);
                        $(`.${ styles.images }_${ number }`).attr("src", oldPic1);
                  }
                  else if (number === 2)
                  {
                        setPic2(null);
                        $(`.${ styles.images }_${ number }`).attr("src", oldPic2);
                  }
                  else if (number === 3)
                  {
                        setPic3(null);
                        $(`.${ styles.images }_${ number }`).attr("src", oldPic3);
                  }
                  else
                  {
                        setPic4(null);
                        $(`.${ styles.images }_${ number }`).attr("src", oldPic4);
                  }
            }
            else
            {
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
      }

      const updateGame = (event) =>
      {
            event.preventDefault();
            if (name === null)
                  $(`.${ styles.pop_up }`).css("display", "flex");
            else
            {
                  console.log(tag);
                  console.log(removedTag);
                  removeTag();
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
                  formData.append("id", id);
                  axios.post('http://localhost/admin/game/update', formData).then(res =>
                  {
                        console.log(res);
                  }).catch(error => { console.log(error); })

                  const formData1 = new FormData();
                  formData1.append("codes", codes);
                  formData1.append("id", id);
                  axios.post('http://localhost/admin/game/addCode', formData1).then(Response =>
                  {
                        console.log(Response);
                  }).catch(error => { console.log(error); })

                  const formData2 = new FormData();
                  formData2.append("tag", tag);
                  formData2.append("id", id);
                  axios.post('http://localhost/admin/game/addTag', formData2).then(Response =>
                  {
                        console.log(Response);
                  }).catch(error => { console.log(error); })
                  goBack();
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
            for (let i = 0; i < oldTag.length; i++)
                  $('input[type="checkbox"][value="' + oldTag[i] + '"]').prop("checked", true);
            setTag(oldTag);
            setRemovedTag([]);
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
                              <input type="text" placeholder="Enter game's name" className={ `${ styles.name }` } onChange={ (e) =>
                              {
                                    if (e.target.value === "")
                                          setName(null);
                                    else
                                          setName(e.target.value);
                              } }></input>
                              <BiTrash className={ `${ styles.trash }` } />
                        </div>
                        <div className={ `d-flex align-items-center w-100 mt-3` } style={ {
                              height: "40%"
                        } }>
                              <div className={ `w-25 h-100 d-flex flex-column justify-content-center align-items-center` }>
                                    <img alt="" className={ `${ styles.images } ${ styles.images }_1` } ></img>
                                    <input type='file' className={ `${ styles.browse }  mt-3 mb-0` } onChange={ (e) => { loadPicture(e, 1) } } accept=".jpg,.jpeg,.png"></input>
                              </div>
                              <div className={ `w-25 h-100 d-flex flex-column justify-content-center align-items-center` }>
                                    <img alt="" className={ `${ styles.images } ${ styles.images }_2` }></img>
                                    <input type='file' className={ `${ styles.browse }  mt-3 mb-0` } onChange={ (e) => { loadPicture(e, 2) } } accept=".jpg,.jpeg,.png"></input>
                              </div>
                              <div className={ `w-25 h-100 d-flex flex-column justify-content-center align-items-center` }>
                                    <img alt="" className={ `${ styles.images } ${ styles.images }_3` } ></img>
                                    <input type='file' className={ `${ styles.browse }  mt-3 mb-0` } onChange={ (e) => { loadPicture(e, 3) } } accept=".jpg,.jpeg,.png"></input>
                              </div>
                              <div className={ `w-25 h-100 d-flex flex-column justify-content-center align-items-center` }>
                                    <img alt="" className={ `${ styles.images } ${ styles.images }_4` } ></img>
                                    <input type='file' className={ `${ styles.browse } mt-3 mb-0` } onChange={ (e) => { loadPicture(e, 4) } } accept=".jpg,.jpeg,.png"></input>
                              </div>
                        </div>
                        <div className={ `d-flex align-items-center justify-content-around w-100 mt-5 mb-5 ${ styles.margining }` }>
                              <div className="d-flex align-items-center">
                                    <p className={ `${ styles.font }` }>Price ($)</p>
                                    <input className={ `${ styles.input } gamePrice` } type="number" placeholder='Enter a price' onChange={ (e) =>
                                    {
                                          if (e.target.value === "")
                                                setPrice(null);
                                          else
                                                setPrice(e.target.value);
                                    } }></input>
                              </div>
                              <div className="d-flex align-items-center" >
                                    <p className={ `${ styles.font }` }>Discount (%)</p>
                                    <input className={ `${ styles.input } gameDiscount` } type="number" onChange={ (e) =>
                                    {
                                          if (e.target.value === "")
                                                setDiscount(null);
                                          else
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
                                    <input type='file' className={ `${ styles.browse }` } accept=".txt" onChange={ (e) =>
                                    {
                                          if (e.target.files.length === 0)
                                                setDescription(oldDescription);
                                          else
                                                setDescription(e.target.files[0]);
                                    } }></input>
                              </div>
                        </div>
                        <div className={ `d-flex align-items-center justify-content-around w-100 mt-5 mb-5 ${ styles.margining }` }>
                              <div className="d-flex align-items-center">
                                    <p className={ `${ styles.font }` }>Minimum system requirement</p>
                                    <input type='file' className={ `${ styles.browse }` } accept=".txt" onChange={ (e) =>
                                    {
                                          if (e.target.files.length === 0)
                                                setMinSpec(oldMinSpec);
                                          else
                                                setMinSpec(e.target.files[0]);
                                    } }></input>
                              </div>
                              <div className="d-flex align-items-center">
                                    <p className={ `${ styles.font }` }>Recommended system requirement</p>
                                    <input type='file' className={ `${ styles.browse }` } accept=".txt" onChange={ (e) =>
                                    {
                                          if (e.target.files.length === 0)
                                                setRecSpec(oldRecSpec);
                                          else
                                                setRecSpec(e.target.files[0]);
                                    } }></input>
                              </div>
                        </div>
                        <div className={ `d-flex align-items-center justify-content-center mt-auto mb-4` }>
                              <button type='button' className={ `${ styles.cancel }` } onClick={ goBack }>Back</button>
                              <button type="button" className={ `${ styles.confirm }` } onClick={ updateGame }>Confirm</button>
                        </div>
                  </div>
            </div>
      );
}