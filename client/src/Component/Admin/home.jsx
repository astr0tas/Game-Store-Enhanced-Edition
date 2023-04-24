import '../../css/Admin/home.css';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import { TbFlame } from 'react-icons/tb';


export default function AdminHome()
{

      const effectRan = useRef(false);


      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  document.getElementById("home").style.backgroundColor = "blue";
                  document.getElementById("home").style.color = "#00B3EC";

                  axios.get('http://localhost/admin/getBestSeller')
                        .then(res =>
                        {
                              for (let i = 0; i < res.data.length; i++)
                              {
                                    const data = new Uint8Array(Object.values(res.data[i].picture_1));
                                    const blob = new Blob([data], { type: "image/jpg" });
                                    const url = URL.createObjectURL(blob);

                                    let div = $("<div>");
                                    div.addClass("sale").addClass("d-flex").addClass("flex-column").addClass("align-items-center");
                                    div.append($("<img>").addClass("pic").attr("src", url).attr("alt", "picture"));
                                    div.append(
                                          $("<div>").addClass("section").append(
                                                $("<button>").addClass("detail").addClass("mt-4").text("$" + res.data[i].price).on("click", function ()
                                                {
                                                      window.location.href = `/admin/gamelist/${ res.data[i].id }`;
                                                })
                                          )
                                                .append($("<p>").addClass("sold").addClass("mt-4").text("SOLD: " + res.data[i].total_sale))
                                    );
                                    if (i < 3)
                                          $(".group").first().append(div);
                                    else
                                          $(".group").last().append(div.addClass("mx-5"));

                              }
                        })
                        .catch(error => console.log(error));

                  console.log("render");
                  effectRan.current = true;

            }

      }, []);

      return (
            <div className='d-flex flex-column justify-content-center align-items-center h-100 w-100 admin-home'>
                  <div className='board'>
                        <div className="d-flex align-items-center justify-content-center best_sellers">
                              <h2 className='d-flex align-items-center' style={ { color: "red" } }><TbFlame />Best sellers<TbFlame /></h2>
                        </div>
                        <div className="best-sellers">
                              <div className="group">
                              </div>
                              <div className="group">
                              </div>
                        </div>
                  </div>
            </div>
      )
}