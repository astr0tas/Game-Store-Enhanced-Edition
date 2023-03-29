import '../../css/Admin/home.css';
import { useEffect, useState } from 'react';


export default function AdminHome()
{
      const [limit, setLimit] = useState(4);
      const [size, setSize] = useState(window.innerWidth);

      const handleResize = () => setSize(window.innerWidth);

      window.addEventListener('resize', handleResize);

      useEffect(() =>
      {
            document.getElementById("home").style.backgroundColor = "rgb(0, 123, 255)";
            document.getElementById("home").style.color = "white";

            console.log("render")

      }, [limit]);

      return (
            <div className='toppage'>
                  <div className='sale'>
                        <img className='pic' alt='' src="https://images2.thanhnien.vn/Uploaded/phongdt/2022_04_22/god-7624.png" />
                        <div className='price'>
                              $70
                        </div>
                        <p>SOLD: XXX</p>
                  </div>
                  <div className='sale'>
                        <img className='pic' alt='' src="https://images2.thanhnien.vn/Uploaded/phongdt/2022_04_22/god-7624.png" />
                        <div className='price'>
                              $70
                        </div>
                        <p>SOLD: XXX</p>
                  </div>
                  <div className='sale'>
                        <img className='pic' alt='' src="https://images2.thanhnien.vn/Uploaded/phongdt/2022_04_22/god-7624.png" />
                        <div className='price'>
                              $70
                        </div>
                        <p>SOLD: XXX</p>
                  </div>
                  <div className='sale'>
                        <img className='pic' alt='' src="https://images2.thanhnien.vn/Uploaded/phongdt/2022_04_22/god-7624.png" />
                        <div className='price'>
                              $70
                        </div>
                        <p>SOLD: XXX</p>
                  </div>
            </div>
      )
}