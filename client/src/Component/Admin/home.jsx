import '../../css/Admin/home.css';
import { useEffect } from 'react';

export default function AdminHome()
{
      useEffect(() =>
      {
            document.getElementById("home").style.backgroundColor = "rgb(0, 123, 255)";
            document.getElementById("home").style.color = "white";
      }, []);

      return (
            <div className="container">
                  <div className='toppage'>
                        <div className='sale'>
                              <img className='item' alt='' />
                              <div className='price'>
                                    $70
                              </div>
                              SOLD: XXX
                        </div>
                        <div className='sale'>
                              <img className='item' alt='' />
                              <div className='price'>
                                    $70
                              </div>
                              SOLD: XXX
                        </div>
                        <div className='sale'>
                              <img className='item' alt='' />
                              <div className='price'>
                                    $70
                              </div>
                              SOLD: XXX
                        </div>
                        <div className='sale'>
                              <img className='item' alt='' />
                              <div className='price'>
                                    $70
                              </div>
                              SOLD: XXX
                        </div>
                        <div className='sale'>
                              <img className='item' alt='' />
                              <div className='price'>
                                    $70
                              </div>
                              SOLD: XXX
                        </div>
                  </div>
            </div>
      )
}