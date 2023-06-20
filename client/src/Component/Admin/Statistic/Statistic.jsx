import styles from './Statistic.module.css';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { domain } from '../../General/tools/domain';
import '../../General/css/modal.css';
import { isRefNotValid, isRefValid } from '../../General/tools/refChecker';
import ReactDOM from 'react-dom/client';

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

const DrawPieChart = () =>
{
      const [choice, setChoice] = useState(0);
      const [data, setData] = useState([]);

      useEffect(() =>
      {
            const formData = new FormData();
            formData.append('choice', choice);
            axios.post(`http://${ domain }/getOverall`, formData)
                  .then(res =>
                  {
                        console.log(res);
                        // if (res.data.length)
                        // {
                        //       for (let i = 0; i < res.data.length; i++)
                        //             res.data[i].value = parseInt(res.data[i].value);
                        //       setData(res.data);
                        // }
                  })
                  .catch(err => console.log(err));
      }, [choice])

      return (
            <div className='w-100' style={ { maxHeight: '500px' } }>
                  <fieldset className='mx-auto mt-3 d-flex align-items-center'>
                        <div className='me-sm-5 me-2'>
                              <label htmlFor="daily" className={ `me-2 ${ styles.fonts }` }>Daily</label>
                              <input type="radio" id="daily" name="choice1" className={ `${ styles.hover }` } checked={ choice === 0 } onChange={ () => setChoice(0) }></input>
                        </div>
                        <div>
                              <label htmlFor="weekly" className={ `me-2 ${ styles.fonts }` }>Weekly</label>
                              <input type="radio" id="weekly" name="choice1" className={ `${ styles.hover }` } checked={ choice === 1 } onChange={ () => setChoice(1) }></input>
                        </div>
                        <div className='ms-sm-5 ms-2'>
                              <label htmlFor="monthly" className={ `me-2 ${ styles.fonts }` }>Monthly</label>
                              <input type="radio" id="monthly" name="choice1" className={ `${ styles.hover }` } checked={ choice === 2 } onChange={ () => setChoice(2) }></input>
                        </div>
                  </fieldset>
                  {/* <ResponsiveContainer width='100%' height='100%'>
                        <PieChart width='100%' height='100%'>
                              <Pie data={ data } dataKey="value" cx="50%" cy="50%" outerRadius="100%">
                                    { data.map((entry, index) => (
                                          <Cell key={ `cell-${ index }` } fill={ colors[index % colors.length] } />
                                    )) }
                              </Pie>
                              <Legend wrapperStyle={ { width: '75%', marginLeft: 'auto', marginRight: 'auto' } } />
                              <Tooltip wrapperStyle={ { background: 'rgba(255, 255, 255, 0.5)', padding: '5px', borderRadius: '5px' } }
                                    formatter={ (value) => `${ value } units` } />
                        </PieChart>
                  </ResponsiveContainer> */}
            </div>
      )
}

const Category = (props) =>
{
      return (
            <div className={ `d-flex align-items-center col-${ 12 / props.length } mb-3` }>
                  <input name='choice3' style={ { minWidth: '1.2rem', minHeight: '1.2rem' } } type="radio" ></input>
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
            // console.log(props);
            if (isRefNotValid(root) && isRefValid(target)) root.current = ReactDOM.createRoot(target.current);
            const temp = [];
            for (let i = 0; i < props.data.length; i++)
            {
                  if (props.data[i] !== undefined)
                        temp.push(<Category length={ props.data.length } key={ i } category={ props.data[i].type } />);
            }
            if (isRefValid(root))
                  root.current.render(<>{ temp }</>);
      });

      return (
            <div className='row mx-auto' ref={ target } style={ { width: '95%' } }>
            </div>
      )
}

const DrawBarChar = ({ div }) =>
{
      const [choice, setChoice] = useState(0);
      const [category, setCategory] = useState('First-Person Shooter');
      const [render, setRender] = useState(false);

      const [showPopup, setShowPopup] = useState(false);

      const fieldRef = useRef(null);
      const target = useRef(null);
      const breakpoint = useRef(0);

      const temp = [];


      useEffect(() =>
      {
            if (isRefNotValid(target) && isRefValid(fieldRef))
                  target.current = ReactDOM.createRoot(fieldRef.current);

            let elementPerLine;
            if (window.innerWidth < 375)
                  elementPerLine = 1;
            else if (window.innerWidth < 992)
                  elementPerLine = 2;
            else if (window.innerWidth < 2400)
                  elementPerLine = 3;
            else
                  elementPerLine = 4;
            axios.get(`http://${ domain }/admin/game/categories`)
                  .then(res =>
                  {
                        const totalLines = Math.ceil(res.data.length / elementPerLine);
                        for (let i = 0; i < totalLines; i += 1)
                        {
                              if (elementPerLine === 1)
                                    temp.push(<Line key={ i } elementPerLine={ elementPerLine } i={ i } data={ [res.data[i]] } />);
                              else if (elementPerLine === 2)
                                    temp.push(<Line key={ i } elementPerLine={ elementPerLine } i={ i } data={ [res.data[i * 2], res.data[i * 2 + 1]] } />);
                              else if (elementPerLine === 3)
                                    temp.push(<Line key={ i } elementPerLine={ elementPerLine } i={ i } data={ [res.data[i * 3], res.data[i * 3 + 1], res.data[i * 3 + 2]] } />);
                              else
                                    temp.push(<Line key={ i } elementPerLine={ elementPerLine } i={ i } data={ [res.data[i * 4], res.data[i * 4 + 1], res.data[i * 4 + 2], res.data[i * 4 + 3]] } />);
                        }
                        // if (isRefValid(target))
                        //       target.current.render(<fieldset>{ temp }</fieldset>);
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

            window.addEventListener('resize', handleResize);

            return () =>
            {
                  window.removeEventListener('resize', handleResize);
            }
      }, [choice, category, render]);

      // const data = [
      //       {
      //             name: 'Page A',
      //             uv: 4000,
      //             pv: 2400,
      //             amt: 2400,
      //       },
      //       {
      //             name: 'Page B',
      //             uv: 3000,
      //             pv: 1398,
      //             amt: 2210,
      //       },
      //       {
      //             name: 'Page C',
      //             uv: 2000,
      //             pv: 9800,
      //             amt: 2290,
      //       },
      //       {
      //             name: 'Page D',
      //             uv: 2780,
      //             pv: 3908,
      //             amt: 2000,
      //       },
      //       {
      //             name: 'Page E',
      //             uv: 1890,
      //             pv: 4800,
      //             amt: 2181,
      //       },
      //       {
      //             name: 'Page F',
      //             uv: 2390,
      //             pv: 3800,
      //             amt: 2500,
      //       },
      //       {
      //             name: 'Page G',
      //             uv: 3490,
      //             pv: 4300,
      //             amt: 2100,
      //       },
      // ];

      return (
            <>
                  <div className='mx-auto d-flex align-items-center mt-3'>
                        <p style={ { marginBottom: '0', marginRight: '10px' } } className={ `${ styles.fonts }` }>Category: </p>
                        <Button variant='primary' size='sm' onClick={ () => setShowPopup(true) }>Choose</Button>
                  </div>
                  <fieldset className='mx-auto mt-3 d-flex align-items-center'>
                        <div className='me-sm-5 me-2'>
                              <label htmlFor="daily" className={ `me-2 ${ styles.fonts }` }>Daily</label>
                              <input type="radio" id="daily" name="choice2" className={ `${ styles.hover }` } checked={ choice === 0 } onChange={ () => setChoice(0) }></input>
                        </div>
                        <div>
                              <label htmlFor="weekly" className={ `me-2 ${ styles.fonts }` }>Weekly</label>
                              <input type="radio" id="weekly" name="choice2" className={ `${ styles.hover }` } checked={ choice === 1 } onChange={ () => setChoice(1) }></input>
                        </div>
                        <div className='ms-sm-5 ms-2'>
                              <label htmlFor="monthly" className={ `me-2 ${ styles.fonts }` }>Monthly</label>
                              <input type="radio" id="monthly" name="choice2" className={ `${ styles.hover }` } checked={ choice === 2 } onChange={ () => setChoice(2) }></input>
                        </div>
                  </fieldset>

                  {/* <ResponsiveContainer>
                        <BarChart
                              data={ data }
                        >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="pv" fill="#8884d8" />
                              <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                  </ResponsiveContainer> */}

                  <Modal show={ showPopup } onHide={ () => setShowPopup(false) } dialogClassName={ `${ styles.dialog }` } className={ `reAdjustModel ${ styles.modal }` } container={ div.current }>
                        <Modal.Header closeButton>
                              <h4>Choose a category</h4>
                        </Modal.Header>
                        <Modal.Body className='d-flex justify-content-center overflow-auto'>
                              <fieldset>{ temp }</fieldset>
                        </Modal.Body>
                        <Modal.Footer className='justify-content-center'>
                              <button className='btn btn-primary ms-2 ms-md-4' onClick={ () => setShowPopup(false) }>Okay</button>
                        </Modal.Footer>
                  </Modal>
            </>
      )
}

const Statistic = () =>
{
      document.title = "Statistics";

      const div = useRef(null);

      return (
            <div className='w-100 h-100 d-flex flex-column align-items-center' ref={ div }>
                  <div className='w-100 d-flex align-items-center justify-content-center'>
                        <div className={ `d-flex align-items-center justify-content-center ${ styles.title }` }>
                              <h2 className='d-flex align-items-center' style={ { color: "red" } }>Statistics</h2>
                        </div>
                  </div>
                  <div className='flex-grow-1 w-100 overflow-auto mt-3 d-flex flex-column'>
                        <h2 className='mx-auto mt-2'>Overall solds</h2>
                        <DrawPieChart />
                        <h2 className='mx-auto mt-5'>Category solds</h2>
                        <DrawBarChar div={ div } />
                  </div>
            </div>
      )
}

export default Statistic;