import '../../css/Admin/home.css';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';


export default function AdminHome()
{

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
                                    console.log(res.data[i]);
                                    const data = new Uint8Array(Object.values(res.data[i].picture_1));
                                    const blob = new Blob([data], { type: "image/jpg" });
                                    const url = URL.createObjectURL(blob);

                                    let div = $("<div>");
                                    div.addClass("sale").addClass("d-flex").addClass("flex-column").addClass("align-items-center").addClass("justify-content-center");
                                    div.append($("<img>").addClass("pic").attr("src", url).attr("alt", "picture"));
                                    div.append($("<p>").text("$" + res.data[i].price));
                                    div.append($("<p>").text("SOLD: " + res.data[i].total_sale));
                                    if (i < 3)
                                          $(".group").first().append(div);
                                    else
                                          $(".group").last().append(div);

                              }
                        })
                        .catch(error => console.log(error));

                  console.log("render");
                  effectRan.current = true;

            }

      }, []);

      return (
            <div className='d-flex flex-column align-items-center h-100 w-100 admin-home'>
                  <div className="d-flex align-items-center justify-content-center">
                        <h2>Best seller</h2>
                  </div>
                  <div className="best-sellers">
                        <div className="group">
                        </div>
                        <div className="group h">
                        </div>
                  </div>
            </div>
      )
}