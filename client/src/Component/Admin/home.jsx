import '../../css/Admin/home.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';


export default function AdminHome()
{
      // const [limit, setLimit] = useState(4);
      // const [size, setSize] = useState(window.innerWidth);

      // const handleResize = () => setSize(window.innerWidth);

      // window.addEventListener('resize', handleResize);

      const effectRan = useRef(false);


      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  document.getElementById("home").style.backgroundColor = "blue";
                  document.getElementById("home").style.color = "white";

                  axios.post('http://localhost/admin/best_seller.php')
                        .then(res =>
                        {
                              for (let i = 0; i < res.data.length; i++)
                              {
                                    // console.log(res.data[i]);
                                    // const data = new Uint8Array(Object.values(res.data[i].picture_1));
                                    // const blob = new Blob([data], { type: "image/png" });
                                    // const url = URL.createObjectURL(blob);

                                    // let div = $("<div>");
                                    // div.addClass("sale");
                                    // div.append($("<img>").addClass("pic").attr("src", url).attr("alt","picture"));
                                    // div.append($("<p>").text("$" + res.data[i].price).addClass("price"));
                                    // div.append($("<p>").text("SOLD: " + res.data[i].total_sale));
                                    // $(".toppage").append(div);

                              }
                        })
                        .catch(error => console.log(error));

                  console.log("render");
                  effectRan.current = true;

            }

      }, []);

      return (
            <div className='d-flex flex-column align-items-center h-100 w-100 admin-home'>
                  <div className="d-flex align-items-center justify-content-center mb-5">
                        <h1>Best seller</h1>
                  </div>
                  <div className="best-sellers">
                        <div className="group">
                              <div className='d-flex flex-column align-items-center justify-content-center sale'>
                                    <img className='pic' alt='' src="https://images2.thanhnien.vn/Uploaded/phongdt/2022_04_22/god-7624.png" />
                                    <div className='price'>
                                          $70
                                    </div>
                                    <p>SOLD: XXX</p>
                              </div>
                              <div className='d-flex flex-column align-items-center justify-content-center sale'>
                                    <img className='pic' alt='' src="https://images2.thanhnien.vn/Uploaded/phongdt/2022_04_22/god-7624.png" />
                                    <div className='price'>
                                          $70
                                    </div>
                                    <p>SOLD: XXX</p>
                              </div>
                              <div className='d-flex flex-column align-items-center justify-content-center sale'>
                                    <img className='pic' alt='' src="https://images2.thanhnien.vn/Uploaded/phongdt/2022_04_22/god-7624.png" />
                                    <div className='price'>
                                          $70
                                    </div>
                                    <p>SOLD: XXX</p>
                              </div>
                        </div>
                        <div className="group">
                              <div className='d-flex flex-column align-items-center justify-content-center sale'>
                                    <img className='pic' alt='' src="https://images2.thanhnien.vn/Uploaded/phongdt/2022_04_22/god-7624.png" />
                                    <div className='price'>
                                          $70
                                    </div>
                                    <p>SOLD: XXX</p>
                              </div>
                              <div className='d-flex flex-column align-items-center justify-content-center sale'>
                                    <img className='pic' alt='' src="https://images2.thanhnien.vn/Uploaded/phongdt/2022_04_22/god-7624.png" />
                                    <div className='price'>
                                          $70
                                    </div>
                                    <p>SOLD: XXX</p>
                              </div>
                        </div>
                  </div>
            </div>
      )
}