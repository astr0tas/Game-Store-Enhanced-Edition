import { BsSearch } from 'react-icons/bs';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './CustomerList.module.css';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { domain } from '../../../tools/domain';

const Customer = (props) =>
{
    return (
        <tr>
            <td scope='row' className='col-1'>{ props.i + 1 }</td>
            <td className='col-3'>{ props.name }</td>
            <td className='col-2'>{ props.email }</td>
            <td className='col-2'>{ props.phone }</td>
            <td className='col-2'>{ props.spending }</td>
            <td className='col-2'>
                <a href={ `./customerlist/${ props.id }` } className='detail'>Detail</a>
                <input type='checkbox' className='checkbox' value={ props.id }></input>
            </td>
        </tr>
    );
}

export default function CustomerList()
{
    const cancel = useRef(null);
    const deleteButton = useRef(null);
    const confirm = useRef(null);
    const tableBody = useRef(null);


    const Navigate = useNavigate();

    useEffect(() =>
    {
        axios.get(`http://${ domain }/admin/customer/getList`)
            .then(res =>
            {
                console.log(res);
                // let temp = [];
                // for (let i = 0; i < res.data.length; i++)
                //     temp.push(<Customer key={ i } i={ i } name={ res.data[i].name } email={ res.data[i].email } phone={ res.data[i].phone } spending={ res.data[i].total_spending } id={ res.data[i].id } />);
                // const target = ReactDOM.createRoot(document.getElementById('table_body'));
                // target.render(<>{ temp }</>);
            })
            .catch(error => console.log(error));
    }, []);

    // const delete_user = () =>
    // {

    //     const checkedValues = $('input[type="checkbox"]:checked').map(function ()
    //     {
    //         return $(this).val();
    //     }).get();

    //     for (let i = 0; i < checkedValues.length; i++)
    //     {
    //         const formData = new FormData();
    //         formData.append("id", checkedValues[i]);
    //         axios.post(`http://${domain}/admin/customer/delete`, formData)
    //             .then(res =>
    //             {
    //                 console.log(res);
    //             })
    //             .catch(error => console.log(error));
    //     }
    //     window.location.reload();
    // }

    // const search = () =>
    // {
    //     $("#table_body").empty();
    //     const formData = new FormData();
    //     formData.append("data", $("#search").val());
    //     axios.post(`http://${domain}/admin/customer/find`, formData)
    //         .then(res =>
    //         {
    //             let temp = [];
    //             for (let i = 0; i < res.data.length; i++)
    //                 temp.push(<Customer key={ i } i={ i } name={ res.data[i].name } email={ res.data[i].email } phone={ res.data[i].phone } spending={ res.data[i].total_spending } id={ res.data[i].id } />);
    //             const target = ReactDOM.createRoot(document.getElementById('table_body'));
    //             target.render(<>{ temp }</>);
    //         })
    //         .catch(error => console.log(error));
    // }

    const searchCustomer = () =>
    {

    }

    const toggleDelete = () =>
    {
        if (cancel.current !== null && cancel.current !== undefined && (cancel.current.style.display === "" || cancel.current.style.display === "none"))
        {
            cancel.current.style.display = "inline-block";
            if (confirm.current !== null && confirm.current !== undefined)
                confirm.current.style.display = "inline-block";
            if (deleteButton.current !== null && deleteButton.current !== undefined)
                deleteButton.current.style.display = "none";
        }
        else
        {
            cancel.current.style.display = "none";
            if (deleteButton.current !== null && deleteButton.current !== undefined)
                deleteButton.current.style.display = "inline-block";
            if (confirm.current !== null && confirm.current !== undefined)
                confirm.current.style.display = "none";
        }
    }

    const deleteCustomer = () =>
    {

    }

    return (
        <div className='w-100 h-100 d-flex flex-column align-items-center'>
            <div className={`d-flex flex-column align-items-center justify-content-center w-100 ${styles.titleBoard}`}>
                <div className={ `d-flex align-items-center justify-content-center ${ styles.title }` }>
                    <h2 className='d-flex align-items-center' style={ { color: "red" } }>Customers</h2>
                </div>
                <div className={`h-100 mt-2 d-flex align-items-center me-md-4 ${styles.searchEngine}`}>
                    <input type='text' className={ `${ styles.search }` } placeholder='Find'></input>
                    <BsSearch id='scope' className={ `${ styles.search_icon }` } onClick={ searchCustomer } />
                </div>
            </div>
            <div className={ `flex-grow-1 w-100 overflow-auto mt-3 px-md-2` }>
                <table className="table table-hover mb-0">
                    <thead style={ { position: "sticky", top: "0", backgroundColor: "#BFBFBF" } }>
                        <tr>
                            <th scope="col" className='col-1'>#</th>
                            <th scope="col" className='col-3'>Customer</th>
                            <th scope="col" className='col-2'>Email</th>
                            <th scope="col" className='col-2'>Phone number</th>
                            <th scope="col" className='col-2 text-center'>Total spending</th>
                            <th scope="col" className='col-2 text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>ASDASDDDDDDDDDDDASD</td>
                            <td>nnnnnnnnnnnndddfffffff</td>
                            <td>0000000000000000000000000000000000</td>
                            <td>Test</td>
                            <td>Test</td>
                        </tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                        <tr><td>Test</td></tr>
                    </tbody>
                </table>
            </div >
            <div className='w-100 d-flex justify-content-center align-items-center mb-3 mt-2' style={ { height: "100px" } }>
                <button className={ `${ styles.delete } mx-3` } onClick={ toggleDelete } ref={ deleteButton }>Delete user</button>
                <button className={ `${ styles.cancel } mx-3` } onClick={ toggleDelete } ref={ cancel }>Cancel</button>
                <button className={ `${ styles.delete } mx-3` } value="Confirm" onClick={ deleteCustomer } ref={ confirm }>Confirm</button>
            </div>
        </div >
    )
}