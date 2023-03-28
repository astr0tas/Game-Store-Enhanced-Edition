import { Link} from 'react-router-dom';
import {BsTrash} from 'react-icons/bs';
import '../../css/Admin/cusdetail.css';
import { useState } from 'react';
import { confirm } from "react-confirm-box";

export default function CusDetail() {
    
    const [dsp, setDsp] = useState('none');
    const show = ()=> {
        if (dsp==='none'){
            setDsp('');
        }
        else{
            setDsp('none');
        }
    }

    return (
        <div className="container">
            <div className='detail'>
                <div id='top'>
                    <button className="delete" onClick={del}><BsTrash/></button>
                    <Link to='../customer'><button className="back">Back</button></Link>
                </div>
                <div className="overall">
                    <div className='img'>
                        <img src={require('../img/admin.png')} alt='avatar'/>
                    </div>
                    <div className='info'>
                        <p><b>Name:</b> ABC</p>
                        <p><b>Email:</b> abc@gmail.com</p>
                        <p><b>Phone number:</b> 0123456789</p>
                        <p><b>Total spending:</b> $400</p>
                        <p>
                            <label for="rank"><b>Membership:</b></label>
                            <select name="rank" id="rank" onChange={(e)=>ranked(e)}>
                                <option value="Silver">Silver</option>
                                <option value="Gold">Gold</option>
                                <option value="Diamond">Diamond</option>
                                <option value="Special">Special</option>
                            </select>
                        </p>
                        <p>
                            <b>Membership discount:</b> <input type="text" name="discount" id="discount" placeholder={dis + "%"} />
                        </p>
                    </div>
                    <button type='submit' className='submit'>Confirm</button>
                </div>
                <div className="transactions">
                    <button className='getHistory' onClick={show}>Get transactions history</button>
                        <table style={{display: `${dsp}`, width: '100%', textAlign: 'left'}}>
                            <tr>
                                <td style={{width: '35%'}}>Sekiro: Shadow die twice</td>
                                <td style={{width: '30%'}}>$70</td>
                                <td style={{width: '35%'}}>01/01/2020</td>
                            </tr>
                            <tr>
                                <td >Elden Ring</td>
                                <td >$70</td>
                                <td >01/01/2022</td>
                            </tr>
                        </table>
                </div>
            </div>
        </div>
    )
}
const options = {
    render: (message, onConfirm, onCancel) => {
        return (
            <div className='confirmbox'>
                <h1> {message} </h1>
                <button onClick={onConfirm} 
                style = {{
                    background: '#00B3EC', 
                    width: '200px',
                    height: '50px',
                    borderRadius: '20px',
                    fontSize: 'large',
                }}> Confirm </button>
                <button onClick={onCancel} 
                style = {{
                    background: '#FF0000',
                    width: '200px',
                    height: '50px',
                    borderRadius: '20px',
                    fontSize: 'large',
                }}> Cancel </button>
            </div>
        );
    }
}
const nocheck = {
    render: (message, onConfirm, onCancel) => {
        return (
            <div className='confirmbox'>
                <h1> {message} </h1>
                <button onClick={onConfirm} 
                style = {{
                    background: '#00B3EC', 
                    width: '200px',
                    height: '50px',
                    borderRadius: '20px',
                    fontSize: 'large',
                }}> Confirm </button>
            </div>
        );
    }
}
const del = async () => {
    //do sth like send delete request
    const result = await confirm("Do you want to delete the selected user(s)?", options);
    if (result){
        await confirm("User deleted successfully", nocheck);
    }
}
var rank;
var dis = 0;
const ranked = (e) =>{
    rank = e.target.value;
    switch(rank){
        case "Silver": dis = 1; break;
        case "Gold": dis = 2; break;
        case "Diamond": dis = 3; break;
        case "Special": dis = 5; break;
        default: dis =0;
    }
}