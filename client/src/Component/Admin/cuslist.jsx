import { Link } from 'react-router-dom';
import { MdOutlineClear } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { confirm } from "react-confirm-box";

import '../../css/Admin/cuslist.css';

export default function CusList()
{
    const [detail, setDetail] = useState('');
    const [check, setCheck] = useState('none');
    const [conf, setConfirm] = useState('none');
    const [del, setDel] = useState('');
    const [value, setValue] = useState('');
    const options = {
        render: (message, onConfirm, onCancel) =>
        {
            return (
                <div className='confirmbox'>
                    <h1> { message } </h1>
                    <Button onClick={ onConfirm }
                        style={ {
                            background: '#00B3EC',
                            width: '200px',
                            height: '50px',
                            borderRadius: '20px',
                            fontSize: 'large',
                        } }> Yes </Button>
                    <Button onClick={ onCancel }
                        style={ {
                            background: '#FF0000',
                            width: '200px',
                            height: '50px',
                            borderRadius: '20px',
                            fontSize: 'large',
                        } }> No </Button>
                </div>
            );
        }
    }

    const nocheck = {
        render: (message, onConfirm, onCancel) =>
        {
            return (
                <div className='confirmbox'>
                    <h1> { message } </h1>
                    <Button onClick={ onConfirm }
                        style={ {
                            background: '#00B3EC',
                            width: '200px',
                            height: '50px',
                            borderRadius: '20px',
                            fontSize: 'large',
                        } }> Confirm </Button>
                </div>
            );
        }
    }

    const clear = () =>
    {
        setValue('');
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
            <div className="cusList">
                <div className='d-flex justify-content-end align-items-center'>
                    <input className='search' id='search' type='text' placeholder='Game' value={ value } onChange={ (e) => setValue(e.target.value) } />
                    <BsSearch id='scope' class="search_icon" size={ 20 } />
                </div>
                {/* <div className="searchfield">
                    <div className='searchbox'><i><BsSearch id='scope' /></i><input className='search' id='search' type='text' placeholder='name' value={ value } onChange={ (e) => setValue(e.target.value) } /> <Button onClick={ clear }><MdOutlineClear /></Button></div>
                </div> */}
                <div className='list'>
                    <table id='customers' style={ { margin: 'auto' } }>
                        <tr>
                            <th style={ { width: '100px' } }> Customer</th>
                            <th style={ { width: '200px' } }> Email</th>
                            <th style={ { width: '200px' } }> Phone number</th>
                            <th style={ { width: '200px' } }> Total spending</th>
                            <th style={ { width: '100px' } }> Detail</th>
                        </tr>
                        <tr>
                            <td> ABC</td>
                            <td> ABC@gmail.com</td>
                            <td> 0123456789</td>
                            <td> $400</td>
                            <td> <Link to='./detail'><Button style={ { display: `${ detail }` } }>Detail</Button></Link> <input type='checkbox' style={ { display: `${ check }` } } onChange={ (e) => handleChange(e) } /></td>
                            {/* change onChange function  */ }
                        </tr>
                    </table>
                    <button type='submit' onClick={ () =>
                    {
                        setDetail('none');
                        setCheck('');
                        setDel('none');
                        setConfirm('');
                    } } style={ { display: `${ del }`, margin: 'auto', backgroundColor: 'red', color: 'white', width: '100px', height: '50px', fontSize: 'large', borderRadius: '15px' } }> Delete user
                    </button>
                    <button onClick={ async () =>
                    {
                        const result = await confirm("Do you want to delete the selected user(s)?", options);
                        if (result)
                        {
                            setDetail('');
                            setCheck('none');
                            setDel('');
                            setConfirm('none');
                            console.log("You click yes!");
                            if (list_del.length === 0)
                            {
                                await confirm("No users selected!", nocheck);
                            }
                            else
                            {
                                await confirm("Users deleted!", nocheck);
                            }
                            return;
                        }
                        console.log("You click No!");
                    } } style={ { display: `${ conf }`, margin: 'auto', backgroundColor: 'red', color: 'white', width: '100px', height: '50px', fontSize: 'large', borderRadius: '15px' } }> Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

const list_del = [];
const handleChange = (e) =>
{
    let isChecked = e.target.checked;
    if (isChecked)
    {
        list_del.push("ABC");
    }
    else
    {
        list_del.pop();
    }
}