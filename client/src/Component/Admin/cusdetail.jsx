import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../css/Admin/cusdetail.module.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import { BiTrash } from 'react-icons/bi';
import ReactDOM from 'react-dom/client';

const History = (props) =>
{
    return (
        <tr>
            <td className='col-3'>{ props.name }</td>
            <td className='col-3'>{ props.code }    </td>
            <td className='col-2'>{ props.date }</td>
            <td className='col-2'>${ props.price }</td>
            <td className='col-2'>{ props.method }</td>
        </tr>
    );
}


export default function CusDetail()
{
    const id = useParams().id;
    const render = useRef(false);
    const [customer, setCustomer] = useState({ name: "N/A", email: "N/A", phone: "N/A", spending: "N/A", rank: "N/A", discount: "N/A" });
    const Navigate = useNavigate();

    useEffect(() =>
    {
        if (!render.current)
        {
            $("#customer").css("color", "white");
            $("#customer").css("background-color", "#00B3EC");

            const formData = new FormData();
            formData.append("data", id);
            axios.post('http://localhost/admin/customer/detail', formData)
                .then(res =>
                {
                    setCustomer({
                        name: res.data.name,
                        email: res.data.email,
                        phone: res.data.phone === null ? customer.phone : res.data[0].phone,
                        spending: res.data.total_spending,
                        rank: res.data.membership_rank,
                        discount: res.data.membership_discount
                    });
                    $(".select_menu").val(res.data.membership_rank);
                    $(".discount_input").val(res.data.membership_discount);
                })
            render.current = true;
        }
    });

    const getHistory = () =>
    {
        const formData = new FormData();
        formData.append("data", id);
        axios.post('http://localhost/admin/customer/detail/history', formData)
            .then(res =>
            {
                let temp = [];
                const root = ReactDOM.createRoot(document.getElementById('history'));
                for (let i = 0; i < res.data.length; i++)
                    temp.push(<History key={ i } name={ res.data[i].name } code={ res.data[i].code } date={ res.data[i].date } price={ res.data[i].price } method={ res.data[i].method } />);
                root.render(<>{ temp }</>);
            })
            .catch(error => console.log(error));
    }

    const selectHandler = (event) =>
    {
        if (event.target.value === "None")
            $(`.discount_input`).val(0).prop('disabled', true);
        else if (event.target.value === "Silver")
            $(`.discount_input`).val(1).prop('disabled', true);
        else if (event.target.value === "Gold")
            $(`.discount_input`).val(2).prop('disabled', true);
        else if (event.target.value === "Diamond")
            $(`.discount_input`).val(3).prop('disabled', true);
        else
            $(`.discount_input`).prop('disabled', false).val('');
    }

    const changeInfo = () =>
    {
        $(".rank").css("display", "none");
        $(".discount").css("display", "none");
        $(`.${ styles.edit }`).css("display", "none");
        $(`.${ styles.update }`).css("display", "inline-block");
        $(".select_menu").val(customer.rank);
        $(`.discount_input`).val(customer.discount);
        if ($(".select_menu").val() === "Special")
            $(`.discount_input`).prop('disabled', false).val(customer.discount);
    }

    const cancelUpdate = () =>
    {
        $(".rank").css("display", "inline");
        $(".discount").css("display", "inline");
        $(`.${ styles.edit }`).css("display", "inline-block");
        $(`.${ styles.update }`).css("display", "none");
    }

    const confirmChange = () =>
    {
        if ($(`.select_menu`).val() === "Special" && ($(`.discount_input`).val() > 5 || $(`.discount_input`).val() < 0))
            $(`.${ styles.pop_up }`).css("display", "flex");
        else
        {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("rank", $(`.select_menu`).val());
            formData.append("discount", $(`.discount_input`).val());
            axios.post('http://localhost/admin/customer/detail/edit', formData)
                .then(res =>
                {
                    console.log(res);
                })
                .catch(error => { console.log(error); })
            window.location.reload();
        }
    }

    const question = () =>
    {
        $(`.${ styles.delete_pop_up }`).css("display", "flex");
    }

    const deleteCustomer = () =>
    {
        const formData = new FormData();
        formData.append("id", id);
        axios.post('http://localhost/admin/customer/delete', formData)
            .then(res =>
            {
                console.log(res);
                Navigate("../customerList");
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
            <div className={ `${ styles.detail_board }` }>
                <div className="d-flex align-items-center justify-content-between w-100" style={ { height: "50px" } }>
                    <BiTrash className={ `mx-3 ${ styles.trash }` } onClick={ question } />
                    <button className={ `mx-3 ${ styles.back }` }><a href="../customerList">Back</a></button>
                </div>
                <div className={ `d-flex align-items-center justify-content-around w-100` } style={ { height: "40%" } }>
                    <img src={ require('../../img/defaultavt.jpg') } alt='avatar' />
                    <div className={ `w-50 h-100 d-flex flex-column justify-content-center ${ styles.info }` }>
                        <p>Name: { customer.name }</p>
                        <p>Email: { customer.email }</p>
                        <p>Phone number: { customer.phone }</p>
                        <p>Total spending: { customer.spending }</p>
                        <p>
                            Membership rank: &nbsp;
                            <span className="rank">{ customer.rank }</span>
                            <select className={ `${ styles.update } select_menu` } onChange={ selectHandler }>
                                <option value="None">None</option>
                                <option value="Silver">Silver</option>
                                <option value="Gold">Gold</option>
                                <option value="Diamond">Diamond</option>
                                <option value="Special">Special</option>
                            </select>
                        </p>
                        <p>Membership discount: <span className="discount">{ customer.discount }</span><input type="number" className={ `${ styles.update } discount_input` } disabled></input></p>
                        <button className={ `${ styles.edit }` } onClick={ changeInfo }>Edit</button>
                        <div className={ `${ styles.update }` }>
                            <button className={ `${ styles.cancel } ` } onClick={ cancelUpdate }>Cancel</button>
                            <button className={ `${ styles.confirm } mx-3` } onClick={ confirmChange }>Confirm</button>
                        </div>
                    </div>
                </div>
                <div className={ `w-100 h-50 ${ styles.history_section }` }>
                    <button className={ `${ styles.history }` } onClick={ getHistory }>Get history purchases</button>
                    <table className={ `table table-hover mx-auto mt-3 mb-0 ${ styles.table_head }` } style={ { width: '90%' } }>
                        <thead>
                            <tr style={ { borderBottom: "2px solid black" } }>
                                <th scope="col" className={ `col-3 ${ styles.head }` }>Game name</th>
                                <th scope="col" className={ `col-3 ${ styles.head }` }>Code</th>
                                <th scope="col" className={ `col-2 ${ styles.head }` }>Date</th>
                                <th scope="col" className={ `col-2 ${ styles.head }` }>Price</th>
                                <th scope="col" className={ `col-2 ${ styles.head }` }>Method</th>
                            </tr>
                        </thead>
                    </table>
                    <div className={ `mt-2 overflow-auto mx-auto ${ styles.table_body }` } style={ { width: '90%' } }>
                        <table className="table table-hover mx-auto my-0 w-100 h-100">
                            <tbody id='history'>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up }` }>
                <h3>Discount value should be greater or equal to 0% and less than or equal to 5% only!</h3>
                <button className={ `${ styles.OK }` } onClick={ () =>
                {
                    $(`.${ styles.pop_up }`).css("display", "none");
                } }>OKAY</button>
            </div>
            <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.delete_pop_up }` }>
                <h3>Are you really want to delete this customer's information?</h3>
                <div>
                    <button className={ `${ styles.delete_cancel } mx-3` } onClick={ () =>
                    {
                        $(`.${ styles.delete_pop_up }`).css("display", "none");
                    } }>Cancel</button>
                    <button className={ `${ styles.delete_confirm } mx-3` } onClick={ () =>
                    {
                        $(`.${ styles.delete_pop_up }`).css("display", "none"); deleteCustomer();
                    } }>Confirm</button>
                </div>
            </div>
        </div>
    )
}