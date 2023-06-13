import styles from './EditGame.module.css';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { domain } from '../../../tools/domain';
import { useNavigate, useParams } from 'react-router-dom';
import { isRefNotValid, isRefValid } from '../../../tools/refChecker';
import ReactDOM from 'react-dom/client';

const Category = (props) =>
{
      const change = (event) =>
      {
            if (!event.target.checked)
                  props.setRemovedTag(prevTags => [...prevTags, event.target.value]);
            else
                  props.setTag(prevTags => [...prevTags, event.target.value]);
      }

      useEffect(() =>
      {
            if (props.tag.includes(props.category) && isRefValid(props.checkbox, props.index))
                  props.checkbox.current[props.index].checked = true;
      })

      return (
            <div className={ `d-flex align-items-center col-${ 12 / props.length } mb-3` }>
                  <input style={ { minWidth: '1.2rem', minHeight: '1.2rem' } } type="checkbox" ref={ el => (props.checkbox.current[props.index] = el) } value={ props.category } onChange={ change }></input>
                  <p className='ms-2 mb-0'>{ props.category }</p>
            </div>
      )
}

const Line = (props) =>
{
      const root = useRef(null);
      const target = useRef(null);

      useEffect(() =>
      {
            if (isRefNotValid(root) && isRefValid(target)) root.current = ReactDOM.createRoot(target.current);
            const temp = [];
            for (let i = 0; i < props.data.length; i++)
            {
                  if (props.data[i] !== undefined)
                        temp.push(<Category tag={ props.tag } length={ props.data.length } key={ i } category={ props.data[i].type } setRemovedTag={ props.setRemovedTag } setTag={ props.setTag } checkbox={ props.checkbox } index={ props.elementPerLine * props.i + i } />);
            }
            root.current.render(<>{ temp }</>);
      });

      return (
            <div className='row mx-auto' ref={ target } style={ { width: '95%' } }>
            </div>
      )
}

const EditGame = () =>
{
      document.title = `Edit game`;

      const id = useParams().id;
      let timer;

      const [pic1, setPic1] = useState("");
      const [pic2, setPic2] = useState("");
      const [pic3, setPic3] = useState("");
      const [pic4, setPic4] = useState("");

      const [oldPic1, setOldPic1] = useState("");
      const [oldPic2, setOldPic2] = useState("");
      const [oldPic3, setOldPic3] = useState("");
      const [oldPic4, setOldPic4] = useState("");

      const [name, setName] = useState(null);
      const [price, setPrice] = useState(null);
      const [discount, setDiscount] = useState(null);

      const [oldName, setOldName] = useState(null);
      const [oldTag, setOldTag] = useState([]);

      const [tag, setTag] = useState([]);
      const [removedTag, setRemovedTag] = useState([]);

      const [codes, setCodes] = useState(null);
      const [description, setDescription] = useState(null);
      const [minSpec, setMinSpec] = useState(null);
      const [recSpec, setRecSpec] = useState(null);

      const img1 = useRef(null);
      const img2 = useRef(null);
      const img3 = useRef(null);
      const img4 = useRef(null);
      const choose_categories = useRef(null);
      const renderTarget = useRef(null);
      const root = useRef(null);
      const checkbox = useRef([]);

      const nameRef = useRef(null);
      const priceRef = useRef(null);
      const discountRef = useRef(null);

      const [render, setRender] = useState(false);

      useEffect(() =>
      {
            const formData = new FormData();
            formData.append("id", id);
            axios.post(`http://${ domain }/admin/game/detail`, formData)
                  .then(res =>
                  {
                        setOldName(res.data.name);
                        setName(res.data.name);
                        if (isRefValid(nameRef))
                              nameRef.current.value = res.data.name;

                        setPrice(res.data.price);
                        if (isRefValid(priceRef))
                              priceRef.current.value = res.data.price;

                        setDiscount(res.data.discount);
                        if (isRefValid(discountRef))
                              discountRef.current.value = res.data.discount;

                        setOldPic1(res.data.picture_1 === null ? "" : `http://${ domain }/model/data/games/${ res.data.picture_1 }`);
                        setPic1(res.data.picture_1 === null ? "" : `http://${ domain }/model/data/games/${ res.data.picture_1 }`,);

                        setOldPic2(res.data.picture_2 === null ? "" : `http://${ domain }/model/data/games/${ res.data.picture_2 }`);
                        setPic2(res.data.picture_2 === null ? "" : `http://${ domain }/model/data/games/${ res.data.picture_2 }`);

                        setOldPic3(res.data.picture_3 === null ? "" : `http://${ domain }/model/data/games/${ res.data.picture_3 }`);
                        setPic3(res.data.picture_3 === null ? "" : `http://${ domain }/model/data/games/${ res.data.picture_3 }`);

                        setOldPic4(res.data.picture_4 === null ? "" : `http://${ domain }/model/data/games/${ res.data.picture_4 }`);
                        setPic4(res.data.picture_4 === null ? "" : `http://${ domain }/model/data/games/${ res.data.picture_4 }`);
                  })
                  .catch(err => { console.log(err); })
            axios.post(`http://${ domain }/admin/game/gameCategory`, formData)
                  .then(res =>
                  {
                        if (res.data.length)
                        {
                              const tags = [];
                              const oldTags = [];
                              for (let i = 0; i < res.data.length; i++)
                              {
                                    tags.push(res.data[i].category_type);
                                    oldTags.push(res.data[i].category_type);
                              }
                              setTag(tags);
                              setOldTag(oldTags);
                        }
                  }).catch(error => { console.log(error); })
      }, [render,id]);

      const removeTag = () =>
      {
            for (let i = 0; i < removedTag.length; i++)
            {
                  const index = tag.indexOf(removedTag[i]);
                  tag.splice(index, 1);
            }
      };

      const Navigate = useNavigate();

      const loadPicture = (e, number) =>
      {
            e.preventDefault();
            if (e.target.files.length === 0)
            {
                  if (number === 1 && isRefValid(img1))
                  {
                        img1.current.src = oldPic1;
                        setPic1(null);
                  }
                  else if (number === 2 && isRefValid(img2))
                  {
                        img2.current.src = oldPic2;
                        setPic2(null);
                  }
                  else if (number === 3 && isRefValid(img3))
                  {
                        img3.current.src = oldPic3;
                        setPic3(null);
                  }
                  else
                  {
                        img4.current.src = oldPic4;
                        setPic4(null);
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
                        if (number === 1 && isRefValid(img1))
                              img1.current.src = url;
                        else if (number === 2 && isRefValid(img2))
                              img2.current.src = url;
                        else if (number === 3 && isRefValid(img3))
                              img3.current.src = url;
                        else
                              img4.current.src = url;
                  };
            }
      }

      const updateGame = async (event) =>
      {
            event.preventDefault();

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
            await axios.post(`http://${ domain }/admin/game/update`, formData)
                  .then(res =>
                  {
                        console.log(res);
                  }).catch(err => console.log(err));

            const formData1 = new FormData();
            formData1.append("codes", codes);
            formData1.append("id", id);
            await axios.post(`http://${ domain }/admin/game/addCode`, formData1).then(Response =>
            {
                  console.log(Response);
            }).catch(error => { console.log(error); });

            const formData2 = new FormData();
            formData2.append("tag", tag);
            formData2.append("id", id);
            await axios.post(`http://${ domain }/admin/game/addTag`, formData2).then(Response =>
            {
                  console.log(Response);
            }).catch(error => { console.log(error); });

            setRender(!render);
      }

      const stopChoosing = () =>
      {
            for (let i = 0; i < checkbox.current.length; i++)
            {
                  if (oldTag.includes(checkbox.current[i].value))
                        checkbox.current[i].checked = true;
                  else
                        checkbox.current[i].checked = false;
            }
            if (isRefValid(choose_categories)) choose_categories.current.style.display = "none";
            setTag(oldTag);
            setRemovedTag([]);
      }

      const chooseCategories = () =>
      {
            if (isRefNotValid(root) && isRefValid(renderTarget))
                  root.current = ReactDOM.createRoot(renderTarget.current);
            if (isRefValid(choose_categories))
                  choose_categories.current.style.display = "flex";
            let elementPerLine;
            if (window.innerWidth < 375)
                  elementPerLine = 1;
            else if (window.innerWidth < 996)
                  elementPerLine = 2;
            else if (window.innerWidth <= 1920)
                  elementPerLine = 3;
            else
                  elementPerLine = 4;
            axios.get(`http://${ domain }/admin/game/categories`).then(res =>
            {
                  const totalLines = Math.ceil(res.data.length / elementPerLine);
                  const temp = [];
                  for (let i = 0; i < totalLines; i += 1)
                  {
                        if (elementPerLine === 1)
                              temp.push(<Line key={ i } elementPerLine={ elementPerLine } i={ i } data={ [res.data[i]] } checkbox={ checkbox } tag={ tag } setTag={ setTag } setRemovedTag={ setRemovedTag } />);
                        else if (elementPerLine === 2)
                              temp.push(<Line key={ i } elementPerLine={ elementPerLine } i={ i } data={ [res.data[i * 2], res.data[i * 2 + 1]] } checkbox={ checkbox } tag={ tag } setTag={ setTag } setRemovedTag={ setRemovedTag } />);
                        else if (elementPerLine === 3)
                              temp.push(<Line key={ i } elementPerLine={ elementPerLine } i={ i } data={ [res.data[i * 3], res.data[i * 3 + 1], res.data[i * 3 + 2]] } checkbox={ checkbox } tag={ tag } setTag={ setTag } setRemovedTag={ setRemovedTag } />);
                        else
                              temp.push(<Line key={ i } elementPerLine={ elementPerLine } i={ i } data={ [res.data[i * 4], res.data[i * 4 + 1], res.data[i * 4 + 2], res.data[i * 4 + 3]] } checkbox={ checkbox } tag={ tag } setTag={ setTag } setRemovedTag={ setRemovedTag } />);
                  }
                  root.current.render(<>{ temp }</>);
            }).catch(error => { console.log(error); })
      }

      return (
            <div className='w-100 h-100 d-flex flex-column align-items-center justify-content-center'>
                  <div className={ `${ styles.categories } position-absolute flex-column align-items-center` } ref={ choose_categories }>
                        <h1>Choose categories</h1>
                        <div className={ `w-100 flex-grow-1 mb-2 overflow-auto` } ref={ renderTarget }></div>
                        <div className='mt-auto mb-3'>
                              <button className={ `mx-3 ${ styles.cancel }` } onClick={ stopChoosing }>Cancel</button>
                              <button className={ `mx-3 ${ styles.confirm }` } onClick={ () => { if (isRefValid(choose_categories)) choose_categories.current.style.display = "none"; } }>Confirm</button>
                        </div>
                  </div>
                  <div className={ `d-flex flex-column align-items-center justify-content-center w-100 ${ styles.titleBoard } mb-2` }>
                        <div className={ `d-flex align-items-center justify-content-center ${ styles.title }` }>
                              <h2 className='d-flex align-items-center' style={ { color: "red" } }>Edit game</h2>
                        </div>
                  </div>
                  <div className='flex-grow-1 w-100 overflow-auto d-flex flex-column mb-1'>
                        <div className={ `mt-2 w-100 d-flex justify-content-center align-items-center` }>
                              <input type="text" placeholder="Enter game's name" ref={ nameRef } className={ `${ styles.name }` } onChange={ (e) =>
                              {
                                    if (e.target.value !== "")
                                    {
                                          setName(e.target.value);
                                          clearTimeout(timer);
                                    }
                                    else
                                    {
                                          timer = setTimeout(() =>
                                          {
                                                setName(oldName);
                                                if (isRefValid(nameRef))
                                                      nameRef.current.val = oldName;
                                          }, 2000);
                                    }
                              } }></input>
                        </div>
                        <div className={ `d-xxl-flex w-100 mt-3` }>
                              <div className='d-flex flex-column flex-lg-row w-100'>
                                    <div className={ `d-flex flex-column justify-content-center align-items-center ${ styles.image_block }` }>
                                          <img ref={ img1 } alt="" className={ `${ styles.images }` } src={ pic1 }></img>
                                          <div className='d-flex align-items-center'>
                                                <label className={ `${ styles.browse }  mt-3 mb-3` }>
                                                      <input type='file' className={ `d-none` } onChange={ (e) => { loadPicture(e, 1) } } accept=".jpg,.jpeg,.png"></input>
                                                      Choose file
                                                </label>
                                                { pic1 && <p className='ms-1 mb-0'>{ pic1.name }</p> }
                                          </div>
                                    </div>
                                    <div className={ `d-flex flex-column justify-content-center align-items-center ${ styles.image_block }` }>
                                          <img ref={ img2 } alt="" className={ `${ styles.images }` } src={ pic2 }></img>
                                          <div className='d-flex align-items-center'>
                                                <label className={ `${ styles.browse }  mt-3 mb-3` }>
                                                      <input type='file' className={ `d-none` } onChange={ (e) => { loadPicture(e, 2) } } accept=".jpg,.jpeg,.png"></input>
                                                      Choose file
                                                </label>
                                                { pic2 && <p className='ms-1 mb-0'>{ pic2.name }</p> }
                                          </div>
                                    </div>
                              </div>
                              <div className='d-flex flex-column flex-lg-row w-100'>
                                    <div className={ `d-flex flex-column justify-content-center align-items-center ${ styles.image_block }` }>
                                          <img ref={ img3 } alt="" className={ `${ styles.images }` } src={ pic3 }></img>
                                          <div className='d-flex align-items-center'>
                                                <label className={ `${ styles.browse }  mt-3 mb-3` }>
                                                      <input type='file' className={ `d-none` } onChange={ (e) => { loadPicture(e, 3) } } accept=".jpg,.jpeg,.png"></input>
                                                      Choose file
                                                </label>
                                                { pic3 && <p className='ms-1 mb-0'>{ pic3.name }</p> }
                                          </div>
                                    </div>
                                    <div className={ `d-flex flex-column justify-content-center align-items-center ${ styles.image_block }` }>
                                          <img ref={ img4 } alt="" className={ `${ styles.images }` } src={ pic4 }></img>
                                          <div className='d-flex align-items-center'>
                                                <label className={ `${ styles.browse }  mt-3 mb-3` }>
                                                      <input type='file' className={ `d-none` } onChange={ (e) => { loadPicture(e, 4) } } accept=".jpg,.jpeg,.png"></input>
                                                      Choose file
                                                </label>
                                                { pic4 && <p className='ms-1 mb-0'>{ pic4.name }</p> }
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <div className={ `d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-lg-around w-100 mt-lg-5 mb-lg-3` }>
                              <div className="d-flex align-items-center mb-3 mb-lg-0 text-center">
                                    <p className={ `mb-0` }>Price ($)</p>
                                    &nbsp;&nbsp;
                                    <input type="number" placeholder='Enter a price' ref={ priceRef } onChange={ (e) =>
                                    {
                                          if (e.target.value !== "")
                                                setPrice(e.target.value);
                                          else
                                                setPrice(null);
                                    } }></input>
                              </div>
                              <div className="d-flex align-items-center mb-3 mb-lg-0 text-center" >
                                    <p className={ `mb-0` }>Discount (%)</p>
                                    &nbsp;&nbsp;
                                    <input type="number" ref={ discountRef } onChange={ (e) =>
                                    {
                                          console.log(e.target.value);
                                          if (e.target.value !== "")
                                                setDiscount(e.target.value);
                                          else
                                                setDiscount(null);
                                    } }></input>
                              </div>
                              <div className="d-flex align-items-center mb-3 mb-lg-0 text-center">
                                    <p className={ `mb-0` }>Tag</p>
                                    &nbsp;&nbsp;
                                    <button className={ `${ styles.choose_categories }` } onClick={ chooseCategories }>Browse</button>
                              </div>
                        </div>
                        <div className={ `d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-lg-around w-100 mt-lg-3 mb-lg-3` }>
                              <div className="d-flex align-items-center mb-3 mb-lg-0 text-center">
                                    {/* The format of the file content should be <code1>, <code2>, <code3>, ... */ }
                                    <p className={ `mb-0` }>Codes</p>
                                    &nbsp;&nbsp;
                                    <label className={ `${ styles.browse }` }>
                                          <input type='file' className={ `d-none` } accept=".txt" onChange={ (e) => { setCodes(e.target.files[0]); } }></input>
                                          Choose file
                                    </label>
                                    { codes && <p className='ms-1 mb-0'>{ codes.name }</p> }
                              </div>
                              <div className="d-flex align-items-center mb-3 mb-lg-0 text-center">
                                    <p className={ `mb-0` }>Description</p>
                                    &nbsp;&nbsp;
                                    <label className={ `${ styles.browse }` }>
                                          <input type='file' className={ `d-none` } accept=".txt" onChange={ (e) => { setDescription(e.target.files[0]); } }></input>
                                          Choose file
                                    </label>
                                    { description && <p className='ms-1 mb-0'>{ description.name }</p> }
                              </div>
                        </div>
                        <div className={ `d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-lg-around w-100 mt-lg-3 mb-lg-3` }>
                              <div className="d-flex align-items-center mb-3 mb-lg-0 text-center">
                                    <p className={ `mb-0` }>Minimum system requirement</p>
                                    &nbsp;&nbsp;
                                    <label className={ `${ styles.browse }` }>
                                          <input type='file' className={ `d-none` } accept=".txt" onChange={ (e) => { setMinSpec(e.target.files[0]); } }></input>
                                          Choose file
                                    </label>
                                    { minSpec && <p className='ms-1 mb-0'>{ minSpec.name }</p> }
                              </div>
                              <div className="d-flex align-items-center mb-3 mb-lg-0 text-center">
                                    <p className={ `mb-0` }>Recommended system requirement</p>
                                    &nbsp;&nbsp;
                                    <label className={ `${ styles.browse }` }>
                                          <input type='file' className={ `d-none` } accept=".txt" onChange={ (e) => { setRecSpec(e.target.files[0]); } }></input>
                                          Choose file
                                    </label>
                                    { recSpec && <p className='ms-1 mb-0'>{ recSpec.name }</p> }
                              </div>
                        </div>
                        <div className={ `d-flex align-items-center justify-content-center mt-auto mb-1` }>
                              <button type='button' className={ `${ styles.cancel } me-3` } onClick={ () => { Navigate(-1); } }>Cancel</button>
                              <button type="button" className={ `${ styles.confirm } ms-3` } onClick={ updateGame }>Confirm</button>
                        </div>
                  </div>
            </div >
      );
}

export default EditGame;