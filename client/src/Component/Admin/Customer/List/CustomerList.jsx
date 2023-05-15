import { BsSearch } from 'react-icons/bs';
import { useEffect, useRef, useState, } from 'react';
import axios from 'axios';
import styles from './CustomerList.module.css';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { domain } from '../../../tools/domain';

const Customer = (props) =>
{

    return (
        <tr className={ `${ styles.detail }` } onClick={ () =>
        {
            if (props.refCheckboxes.current[props.i] !== null && props.refCheckboxes.current[props.i] !== undefined && props.refCheckboxes.current[props.i].style.display !== "block")
                props.Navigate(`./${ props.id }`);
        } }>
            <td className='col-1 text-center'>
                <div className={ `w-100 h-100 d-flex align-items-center justify-content-center` }>
                    <strong ref={ el => (props.refNumbers.current[props.i] = el) }>{ props.i + 1 }</strong>
                    <input ref={ el => (props.refCheckboxes.current[props.i] = el) } type='checkbox' className={ `${ styles.checkbox }` } value={ props.id }></input>
                </div>
            </td>
            <td className='col-3 text-center'>{ props.name }</td>
            <td className='col-3 text-center'>{ props.email }</td>
            <td className='col-3 text-center'>{ props.phone }</td>
            <td className='col-2 text-center'>{ props.spending }</td>
        </tr>
    );
}

export default function CustomerList()
{
    const [renderTrigger, setRenderTrigger] = useState(true);

    const cancel = useRef(null);
    const deleteButton = useRef(null);
    const confirm = useRef(null);
    const search = useRef(null);

    const tableBody = useRef(null);
    const target = useRef(null);
    const numberTag = useRef(null);
    const selectAll = useRef(null);
    const checkboxes = useRef([]);
    const numbers = useRef([]);



    const Navigate = useNavigate();

    useEffect(() =>
    {
        if ((target.current === null || target.current === undefined) && tableBody.current !== null && tableBody.current !== undefined)
            target.current = ReactDOM.createRoot(tableBody.current);

        axios.get(`http://${ domain }/admin/customer/getList`)
            .then(res =>
            {
                checkboxes.current = [];
                numbers.current = [];

                const temp = [];
                for (let i = 0; i < res.data.length; i++)
                    temp.push(<Customer Navigate={ Navigate } refCheckboxes={ checkboxes } refNumbers={ numbers } key={ i } i={ i } name={ res.data[i].name } email={ res.data[i].email } phone={ res.data[i].phone } spending={ res.data[i].total_spending } id={ res.data[i].id } />);
                if (target.current !== null && target.current !== undefined)
                    target.current.render(<>{ temp }</>);
            })
            .catch(error => console.log(error));

    }, [renderTrigger, Navigate]);

    let timerId;
    const searchCustomer = () =>
    {
        clearTimeout(timerId);
        timerId = setTimeout(() =>
        {
            const formData = new FormData();
            formData.append("data", (search.current !== null && search.current !== undefined) ? search.current.value : "");
            axios.post(`http://${ domain }/admin/customer/find`, formData)
                .then(res =>
                {
                    checkboxes.current = [];
                    numbers.current = [];

                    const temp = [];
                    for (let i = 0; i < res.data.length; i++)
                        temp.push(<Customer Navigate={ Navigate } key={ i } i={ i } refNumbers={ numbers } refCheckboxes={ checkboxes } name={ res.data[i].name } email={ res.data[i].email } phone={ res.data[i].phone } spending={ res.data[i].total_spending } id={ res.data[i].id } />);
                    if (target.current !== null && target.current !== undefined)
                        target.current.render(<>{ temp }</>);
                })
                .catch(error => console.log(error));
        }, 500);
    }

    const toggleDelete = () =>
    {
        if (cancel.current !== null && cancel.current !== undefined)
        {
            if (cancel.current.style.display === "" || cancel.current.style.display === "none")
            {
                cancel.current.style.display = "block";
                if (confirm.current !== null && confirm.current !== undefined)
                    confirm.current.style.display = "block";
                if (deleteButton.current !== null && deleteButton.current !== undefined)
                    deleteButton.current.style.display = "none";
                if (selectAll.current !== null && selectAll.current !== undefined)
                    selectAll.current.style.display = "block";
                if (numberTag.current !== null && numberTag.current !== undefined)
                    numberTag.current.style.display = "none";
                for (let i = 0; i < checkboxes.current.length; i++)
                {
                    if (checkboxes.current[i] !== null && checkboxes.current[i] !== undefined)
                        checkboxes.current[i].style.display = "block";
                    if (numbers.current[i] !== null && numbers.current[i] !== undefined)
                        numbers.current[i].style.display = "none";
                }
            }
            else
            {
                cancel.current.style.display = "none";
                if (deleteButton.current !== null && deleteButton.current !== undefined)
                    deleteButton.current.style.display = "block";
                if (confirm.current !== null && confirm.current !== undefined)
                    confirm.current.style.display = "none";
                if (selectAll.current !== null && selectAll.current !== undefined)
                    selectAll.current.style.display = "none";
                if (numberTag.current !== null && numberTag.current !== undefined)
                    numberTag.current.style.display = "block";
                for (let i = 0; i < checkboxes.current.length; i++)
                {
                    if (checkboxes.current[i] !== null && checkboxes.current[i] !== undefined)
                    {
                        checkboxes.current[i].style.display = "none";
                        checkboxes.current[i].checked = false;
                    }
                    if (numbers.current[i] !== null && numbers.current[i] !== undefined)
                        numbers.current[i].style.display = "block";
                }
            }
        }
    }

    const deleteCustomer = () =>
    {
        const temp = [];

        for (let i = 0; i < checkboxes.current.length; i++)
            if (checkboxes.current[i] !== null && checkboxes.current[i] !== undefined && checkboxes.current[i].checked === true)
                temp.push(checkboxes.current[i].value);

        const formData = new FormData();
        formData.append("IDs", temp);
        axios.post(`http://${ domain }/admin/customer/delete`, formData)
            .then(res =>
            {
                console.log(res);
                toggleDelete();
                setRenderTrigger(!renderTrigger);
            })
            .catch(error => console.log(error));
    }

    const selectAllCheckboxes = () =>
    {
        for (let i = 0; i < checkboxes.current.length; i++)
        {
            if (checkboxes.current[i] !== null && checkboxes.current[i] !== undefined)
                checkboxes.current[i].checked = selectAll.current.checked;
        }
    }

    return (
        <div className='w-100 h-100 d-flex flex-column align-items-center'>
            <div className={ `d-flex flex-column align-items-center justify-content-center w-100 ${ styles.titleBoard }` }>
                <div className={ `d-flex align-items-center justify-content-center ${ styles.title }` }>
                    <h2 className='d-flex align-items-center' style={ { color: "red" } }>Customers</h2>
                </div>
                <div className={ `h-100 mt-2 d-flex align-items-center me-md-4 ${ styles.searchEngine }` }>
                    <input ref={ search } type='text' className={ `${ styles.search }` } placeholder='Find' onChange={ searchCustomer }></input>
                    <BsSearch id='scope' className={ `${ styles.search_icon }` } />
                </div>
            </div>
            <div className={ `flex-grow-1 w-100 overflow-auto mt-3 px-md-2` }>
                <table className="table table-hover" style={ { borderCollapse: 'separate' } }>
                    <thead style={ { position: "sticky", top: "0", backgroundColor: "#BFBFBF" } }>
                        <tr>
                            <th scope="col" className='col-1 text-center'>
                                <div className={ `w-100 h-100 d-flex align-items-center justify-content-center` }>
                                    <strong ref={ numberTag }>#</strong>
                                    <input ref={ selectAll } type='checkbox' className={ `${ styles.checkbox }` } onChange={ selectAllCheckboxes }></input>
                                </div>
                            </th>
                            <th scope="col" className='col-3 text-center'>Customer</th>
                            <th scope="col" className='col-3 text-center'>Email</th>
                            <th scope="col" className='col-3 text-center'>Phone number</th>
                            <th scope="col" className='col-2 text-center'>Total spending</th>
                        </tr>
                    </thead>
                    <tbody ref={ tableBody }>
                    </tbody>
                </table>
            </div >
            <div className='w-100 d-flex justify-content-center align-items-center mb-3' style={ { height: "100px" } }>
                <button className={ `${ styles.delete } mx-3` } onClick={ toggleDelete } ref={ deleteButton }>Delete user</button>
                <button className={ `${ styles.cancel } mx-3` } onClick={ toggleDelete } ref={ cancel }>Cancel</button>
                <button className={ `${ styles.delete } mx-3` } value="Confirm" onClick={ deleteCustomer } ref={ confirm }>Confirm</button>
            </div>
        </div >
    )
}