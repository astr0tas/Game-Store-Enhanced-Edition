import styles from './Statistic.module.css';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { domain } from '../../General/tools/domain';
import '../../General/css/modal.css';
import { isRefNotValid, isRefValid } from '../../General/tools/refChecker';
import ReactDOM from 'react-dom/client';
import '../../General/css/scroll.css';
import { BsSearch } from 'react-icons/bs';
import { CiDiscount1 } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';


function generateUniqueRGBAColors(n)
{
      const colorArray = [];
      while (colorArray.length < n)
      {
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            const alpha = (Math.random() * 0.2) + 0.8; // Range: 0.8-1.0
            const rgbaColor = `rgba(${ red }, ${ green }, ${ blue }, ${ alpha.toFixed(2) })`;

            if (!colorArray.includes(rgbaColor))
                  colorArray.push(rgbaColor);
      }

      return colorArray;
}

const colors = generateUniqueRGBAColors(200);

const DrawOverall = () =>
{
      const [choice, setChoice] = useState(0);
      const [data, setData] = useState([]);

      useEffect(() =>
      {
            const formData = new FormData();
            formData.append('choice', choice);
            axios.post(`http://${ domain }/admin/getOverall`, formData)
                  .then(res =>
                  {
                        if (res.data.length)
                        {
                              for (let i = 0; i < res.data.length; i++)
                                    res.data[i].value = parseInt(res.data[i].value);
                              setData(res.data);
                        }
                        else
                              setData([]);
                  })
                  .catch(err => console.log(err));
      }, [choice])

      return (
            <div className='w-100 mb-5' style={ { maxHeight: data.length ? '500px' : '50px', maxWidth: '800px' } }>
                  <fieldset className='mx-auto mt-3 d-flex align-items-center justify-content-sm-center justify-content-around'>
                        <div className='me-sm-5 me-2 text-center'>
                              <label htmlFor="daily" className={ `me-2 ${ styles.fonts }` }>Daily</label>
                              <input type="radio" id="daily" name="choice1" className={ `${ styles.hover }` } checked={ choice === 0 } onChange={ () => setChoice(0) }></input>
                        </div>
                        <div className='text-center'>
                              <label htmlFor="weekly" className={ `me-2 ${ styles.fonts }` }>Weekly</label>
                              <input type="radio" id="weekly" name="choice1" className={ `${ styles.hover }` } checked={ choice === 1 } onChange={ () => setChoice(1) }></input>
                        </div>
                        <div className='ms-sm-5 ms-2 text-center'>
                              <label htmlFor="monthly" className={ `me-2 ${ styles.fonts }` }>Monthly</label>
                              <input type="radio" id="monthly" name="choice1" className={ `${ styles.hover }` } checked={ choice === 2 } onChange={ () => setChoice(2) }></input>
                        </div>
                        <div className='ms-sm-5 ms-2 text-center'>
                              <label htmlFor="annually" className={ `me-2 ${ styles.fonts }` }>Annually</label>
                              <input type="radio" id="annually" name="choice1" className={ `${ styles.hover }` } checked={ choice === 3 } onChange={ () => setChoice(3) }></input>
                        </div>
                  </fieldset>
                  <ResponsiveContainer width='100%' height='100%'>
                        <PieChart width='100%' height='100%' >
                              <Pie data={ data } dataKey="value" cx="50%" cy="50%" outerRadius="100%">
                                    { data.map((entry, index) => (
                                          <Cell key={ `cell-${ index }` } fill={ colors[index % colors.length] } style={ { outline: 'none' } } />
                                    )) }
                              </Pie>
                              <Legend />
                              <Tooltip wrapperStyle={ { background: 'rgba(255, 255, 255, 0.5)', padding: '5px', borderRadius: '5px' } }
                                    formatter={ (value) => `${ value } units sold` } />
                        </PieChart>
                  </ResponsiveContainer>
            </div>
      )
}

const Category = (props) =>
{
      return (
            <div className={ `d-flex align-items-center col-${ 12 / props.length } mb-3` }>
                  <input name='choice3' className={ `${ styles.hover }` } type="radio" checked={ props.category === props.InitCategory } onChange={ () => props.setCategory(props.category) }></input>
                  <p className={ `ms-2 mb-0 ${ styles.fonts }` }>{ props.category }</p>
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
                        temp.push(<Category setCategory={ props.setCategory } InitCategory={ props.category } length={ props.data.length } key={ i } category={ props.data[i].type } />);
            }
            if (isRefValid(root))
                  root.current.render(<>{ temp }</>);
      });

      return (
            <div className='row mx-auto' ref={ target } style={ { width: '98%' } }>
            </div>
      )
}

const Game = (props) =>
{
      const [status, setStatus] = useState("N/A");

      useEffect(() =>
      {
            const formData = new FormData();
            formData.append("id", props.id);
            axios.post(`http://${ domain }/admin/game/status`, formData)
                  .then(res =>
                  {
                        if (res.data)
                              setStatus("Available");
                        else
                              setStatus("Out of stock");
                  })
                  .catch(err => console.log(err))
      }, [props.id]);

      return (
            <tr className={ `${ styles.rows }` } onClick={ () => props.Navigate(`/admin/game-list/${ props.id }`) }>
                  <td className='text-center'>{ props.i }</td>
                  <td className='text-center'   >{ props.name }</td>
                  <td className='d-flex align-items-center justify-content-center'>
                        { !props.price && 'N/A' }{ props.price && '$' }{ props.discount === '0' && props.price }{ props.discount !== '0' && props.discount !== null && ((parseFloat(props.price) + 0.01) * (100 - parseFloat(props.discount)) / 100).toFixed(2) - 0.01 }
                        { props.discount !== null && parseFloat(props.discount) !== 0 && <CiDiscount1 style={ {
                              fontSize: '1.5rem',
                              color: 'red',
                              marginLeft: '10px'
                        } } /> }
                        { props.discount !== null && parseFloat(props.discount) !== 0 && <p style={ { color: 'red', marginBottom: '0' } }>{ props.discount }%</p> }
                  </td>
                  <td className='text-center'>{ props.solds } units</td>
                  <td className='text-center' style={ { color: status === "Available" ? 'green' : 'red' } }>{ status }</td>
            </tr>
      )
}

const DrawGameTable = ({ div, Navigate }) =>
{
      const [choice, setChoice] = useState(0);
      const [category, setCategory] = useState('First-Person Shooter');
      const [search, setSearch] = useState("");
      const [content, setContent] = useState(<></>);

      const [searchTable, setSearchTable] = useState("");
      const [tableContent, setTableContent] = useState([]);

      const [render, setRender] = useState(false);

      const [showPopup, setShowPopup] = useState(false);

      const breakpoint = useRef(0);

      let timer, timer1;


      useEffect(() =>
      {
            let elementPerLine;
            if (window.innerWidth < 375)
                  elementPerLine = 1;
            else if (window.innerWidth < 992)
                  elementPerLine = 2;
            else if (window.innerWidth < 2400)
                  elementPerLine = 3;
            else
                  elementPerLine = 4;

            const formData = new FormData();
            formData.append('name', search);
            axios.post(`http://${ domain }/admin/getCategories`, formData)
                  .then(res =>
                  {
                        const totalLines = Math.ceil(res.data.length / elementPerLine);
                        const temp = [];
                        for (let i = 0; i < totalLines; i += 1)
                        {
                              if (elementPerLine === 1)
                                    temp.push(<Line setCategory={ setCategory } category={ category } key={ i } elementPerLine={ elementPerLine } i={ i } data={ [res.data[i]] } />);
                              else if (elementPerLine === 2)
                                    temp.push(<Line setCategory={ setCategory } category={ category } key={ i } elementPerLine={ elementPerLine } i={ i } data={ [res.data[i * 2], res.data[i * 2 + 1]] } />);
                              else if (elementPerLine === 3)
                                    temp.push(<Line setCategory={ setCategory } category={ category } key={ i } elementPerLine={ elementPerLine } i={ i } data={ [res.data[i * 3], res.data[i * 3 + 1], res.data[i * 3 + 2]] } />);
                              else
                                    temp.push(<Line setCategory={ setCategory } category={ category } key={ i } elementPerLine={ elementPerLine } i={ i } data={ [res.data[i * 4], res.data[i * 4 + 1], res.data[i * 4 + 2], res.data[i * 4 + 3]] } />);
                        }
                        setContent(temp);
                  })
                  .catch(err => console.log(err));

            const handleResize = () =>
            {
                  if (window.innerWidth < 375 && breakpoint.current !== 1)
                  {
                        breakpoint.current = 1;
                        setRender(!render);
                  }
                  else if (window.innerWidth < 992 && window.innerWidth >= 375 && breakpoint.current !== 2)
                  {
                        breakpoint.current = 2;
                        setRender(!render);
                  }
                  else if (window.innerWidth < 2400 && window.innerWidth >= 992 && breakpoint.current !== 3)
                  {
                        breakpoint.current = 3;
                        setRender(!render);
                  }
                  else if (window.innerWidth >= 2400 && breakpoint.current !== 4)
                  {
                        breakpoint.current = 4;
                        setRender(!render);
                  }
            }

            const formData1 = new FormData();
            formData1.append('choice', choice);
            formData1.append('category', category);
            formData1.append('name', searchTable);

            axios.post(`http://${ domain }/admin/getStats`, formData1)
                  .then(res =>
                  {
                        if (res.data.length)
                        {
                              const temp = [];
                              for (let i = 0; i < res.data.length; i++)
                                    temp.push(<Game Navigate={ Navigate } i={ i + 1 } id={ res.data[i].id } solds={ res.data[i].solds } name={ res.data[i].name } price={ res.data[i].price } discount={ res.data[i].discount } key={ i } />);
                              setTableContent(temp);
                        }
                        else
                              setTableContent([]);


                  })
                  .catch(err => console.log(err));

            window.addEventListener('resize', handleResize);

            return () =>
            {
                  window.removeEventListener('resize', handleResize);
            }
      }, [choice, category, render, search, searchTable, Navigate]);

      return (
            <>
                  <div className='mx-auto d-flex align-items-center mt-3'>
                        <p style={ { marginBottom: '0', marginRight: '10px' } } className={ `${ styles.fonts }` }>Category: </p>
                        <Button variant='primary' size='sm' onClick={ () => setShowPopup(true) }>Choose</Button>
                  </div>
                  <fieldset className='mx-auto mt-3 d-flex align-items-center'>
                        <div className='me-sm-5 me-2 text-center'>
                              <label htmlFor="daily1" className={ `me-2 ${ styles.fonts }` }>Daily</label>
                              <input type="radio" id="daily1" name="choice2" className={ `${ styles.hover }` } checked={ choice === 0 } onChange={ () => setChoice(0) }></input>
                        </div>
                        <div className='text-center'>
                              <label htmlFor="weekly1" className={ `me-2 ${ styles.fonts }` }>Weekly</label>
                              <input type="radio" id="weekly1" name="choice2" className={ `${ styles.hover }` } checked={ choice === 1 } onChange={ () => setChoice(1) }></input>
                        </div>
                        <div className='ms-sm-5 ms-2 text-center'>
                              <label htmlFor="monthly1" className={ `me-2 ${ styles.fonts }` }>Monthly</label>
                              <input type="radio" id="monthly1" name="choice2" className={ `${ styles.hover }` } checked={ choice === 2 } onChange={ () => setChoice(2) }></input>
                        </div>
                        <div className='ms-sm-5 ms-2 text-center'>
                              <label htmlFor="annually1" className={ `me-2 ${ styles.fonts }` }>Annually</label>
                              <input type="radio" id="annually1" name="choice2" className={ `${ styles.hover }` } checked={ choice === 3 } onChange={ () => setChoice(3) }></input>
                        </div>
                  </fieldset>

                  <input type='text' placeholder='Search game' className={ `border border-dark rounded ${ styles.fonts } mt-3 mb-3` } onChange={ e =>
                  {
                        clearTimeout(timer1);

                        timer1 = setTimeout(() =>
                        {
                              setSearchTable(e.target.value);
                        }, 1000);
                  } }></input>

                  <div className='overflow-auto hideBrowserScrollbar mb-2' style={ { minHeight: tableContent.length ? '400px' : '50px', width: '95%' } }>
                        <table className="table table-hover" style={ { borderCollapse: 'separate' } }>
                              <thead style={ { position: "sticky", top: "0", backgroundColor: "#BFBFBF" } }>
                                    <tr>
                                          <th scope='col' className='col-1 text-center'>#</th>
                                          <th scope="col" className='col-4 text-center'>Game</th>
                                          <th scope="col" className='col-3 text-center'>Price</th>
                                          <th scope="col" className='col-2 text-center'>Total solds</th>
                                          <th scope="col" className='col-2 text-center'>Sell status</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    { tableContent }
                              </tbody>
                        </table>
                  </div>

                  <Modal show={ showPopup } onHide={ () =>
                  {
                        setShowPopup(false);
                        setSearch("");
                  } } dialogClassName={ `${ styles.dialog }` } className={ `reAdjustModel ${ styles.modal } hideBrowserScrollbar` } container={ div.current }>
                        <Modal.Header className='d-flex align-items-center justify-content-lg-between flex-column flex-lg-row'>
                              <h4 className='mb-0'>Choose a category</h4>
                              <div className='w-50 ms-lg-3 mt-2 mt-lg-0 me-lg-3 d-flex justify-content-end'>
                                    <input type='text' className='w-100 pe-4' style={ { maxWidth: '250px' } } placeholder='Search category' onChange={ e =>
                                    {
                                          clearTimeout(timer);

                                          timer = setTimeout(() => setSearch(e.target.value), 1000);
                                    } }></input>
                                    <BsSearch className='position-absolute mt-1' style={ { fontSize: '1.5rem' } } />
                              </div>
                        </Modal.Header>
                        <Modal.Body className={ `d-flex justify-content-center overflow-auto ${ styles.modal_body }` }>
                              <fieldset className='w-100'>
                                    { content }
                              </fieldset>
                        </Modal.Body>
                  </Modal>
            </>
      )
}

const DrawCustomerTale = ({ Navigate }) =>
{
      const [tableContent, setTableContent] = useState([]);

      useEffect(() =>
      {
            axios.get(`http://${ domain }/admin/getTopCustomers`)
                  .then(res =>
                  {
                        if (res.data.length)
                        {
                              const temp = [];
                              for (let i = 0; i < res.data.length; i++)
                                    temp.push(
                                          <tr key={ i } className={ `${ styles.rows }` } onClick={ () => Navigate(`/admin/customer-list/${ res.data[i].id }`) }>
                                                <td className='text-center'>{ i + 1 }</td>
                                                <td className='text-center'>{ res.data[i].name }</td>
                                                <td className='text-center'>{ res.data[i].email }</td>
                                                <td className='text-center'>${ res.data[i].total_spending }</td>
                                          </tr>
                                    );
                              setTableContent(temp);
                        }
                        else
                              setTableContent([]);
                  })
                  .catch(err => console.log(err));
      }, [Navigate]);

      return (
            <div className='overflow-auto hideBrowserScrollbar mb-2' style={ { minHeight: tableContent.length ? '300px' : '50px', width: '95%' } }>
                  <table className="table table-hover" style={ { borderCollapse: 'separate' } }>
                        <thead style={ { position: "sticky", top: "0", backgroundColor: "#BFBFBF" } }>
                              <tr>
                                    <th scope='col' className='col-1 text-center'>#</th>
                                    <th scope="col" className='col-4 text-center'>Name</th>
                                    <th scope="col" className='col-4 text-center'>Email</th>
                                    <th scope="col" className='col-3 text-center'>Total spendings</th>
                              </tr>
                        </thead>
                        <tbody>
                              { tableContent }
                        </tbody>
                  </table>
            </div>
      )
}

const Statistic = () =>
{
      document.title = "Statistics";

      const div = useRef(null);

      const Navigate = useNavigate();

      return (
            <div className='w-100 h-100 d-flex flex-column align-items-center' ref={ div }>
                  <div className='w-100 d-flex align-items-center justify-content-center'>
                        <div className={ `d-flex align-items-center justify-content-center ${ styles.title }` }>
                              <h2 className='d-flex align-items-center' style={ { color: "red" } }>Statistics</h2>
                        </div>
                  </div>
                  <div className='flex-grow-1 w-100 overflow-auto mt-3 d-flex flex-column align-items-center'>
                        <h2 className='mt-2'>Overall solds</h2>
                        <DrawOverall />
                        <h2 className='mt-5'>Category solds</h2>
                        <DrawGameTable div={ div } Navigate={ Navigate } />
                        <h2 className='mt-5'>Top 10    customers</h2>
                        <DrawCustomerTale Navigate={ Navigate } />
                  </div>
            </div>
      )
}

export default Statistic;