import { useNavigate } from 'react-router-dom';
import styles from '../../css/Customer/personalInfo.module.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import ReactDOM from 'react-dom/client';
import { checkCookie } from '../tools/cookie';
import { domain } from '../tools/domain';

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


export default function CusPersonalInfo()
{
    const render = useRef(false);
    const [customer, setCustomer] = useState({ name: "N/A", email: "N/A", phone: "N/A", spending: "N/A", rank: "N/A", discount: "N/A", username: null });
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const Navigate = useNavigate();

    useEffect(() =>
    {
        if (!checkCookie("PHPSESSID"))
            Navigate("/");

        if (!render.current)
        {
            $("#customer").css("color", "white");
            $("#customer").css("background-color", "#00B3EC");

            axios.get(`http://${domain}/myself`, { withCredentials: true })
                .then(res =>
                {
                    console.log(res);
                    setCustomer({
                        name: res.data.name,
                        email: res.data.email,
                        phone: res.data.phone === null ? customer.phone : res.data.phone,
                        spending: res.data.total_spending,
                        rank: res.data.membership_rank,
                        discount: res.data.membership_discount,
                        username: res.data.username
                    });
                })
            render.current = true;
        }
    });

    const getHistory = () =>
    {
        axios.get(`http://${domain}/myself/history`, { withCredentials: true })
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
    const changeInfo = () =>
    {
        $(".diplayPart").css("display", "none");
        $(".diplayPart1").css("display", "none");
        $(`.${ styles.edit }`).css("display", "none");
        $(`.${ styles.update }`).css("display", "inline-block");
        $('.customer_name_input').val(customer.name);
        $('.customer_email_input').val(customer.email);
        $('.customer_phone_input').val(customer.phone === "N/A" ? "" : customer.phone);
        $('.username_input').val(customer.username);
    }

    const cancelUpdate = () =>
    {
        $(".diplayPart").css("display", "inline");
        $(".diplayPart1").css("display", "block");
        $(`.${ styles.edit }`).css("display", "inline-block");
        $(`.${ styles.update }`).css("display", "none");
        setPassword("");
        setRepassword("");
        $('.password_input').val("");
    }

    function containsAlphabets(str)
    {
        for (let i = 0; i < str.length; i++)
            if ((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z')) return true;
        return false;
    }

    const confirmChange = () =>
    {
        if ($(".customer_name_input").val() === "")
            $(`.${ styles.pop_up_3 }`).css("display", "flex");
        else if ($(".customer_email_input").val() === "")
            $(`.${ styles.pop_up_1 }`).css("display", "flex");
        else if (containsAlphabets($(".customer_phone_input").val()))
            $(`.${ styles.pop_up_2 }`).css("display", "flex");
        else if (password !== repassword)
            $(`.${ styles.pop_up_4 }`).css("display", "flex");
        else
        {
            const formData = new FormData();
            formData.append("name", $(`.customer_name_input`).val());
            formData.append("email", $(`.customer_email_input`).val());
            formData.append("phone", $(`.customer_phone_input`).val() === "" ? null : $(`.customer_phone_input`).val());
            formData.append("password", password === "" ? null : password);
            axios.post(`http://${domain}/myself/edit`, formData, { withCredentials: true })
                .then(res =>
                {
                    console.log(res);
                })
                .catch(error => { console.log(error); })
            window.location.reload();
        }
    }
    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
            <div className={ `${ styles.detail_board }` }>
                <div className="d-flex align-items-center justify-content-end w-100" style={ { height: "60px" } }>
                    <button className={ `mx-3 ${ styles.back }` }><a href="../customerList">Back</a></button>
                </div>
                <div className={ `d-flex flex-column flex-md-row align-items-center justify-content-around w-100 ${styles.info_board}` }>
                    <img className={ `${ styles.img }` } src={ require('../../img/defaultavt.jpg') } alt='avatar' />
                    <div className={ `d-flex flex-column justify-content-center ${ styles.info }` }>
                        <p>Name: &nbsp;
                            <span className="diplayPart">{ customer.name }</span>
                            <input type="text" className={ `${ styles.update } customer_name_input ${ styles.input }` }></input>
                        </p>
                        <p>Email: &nbsp;
                            <span className="diplayPart">{ customer.email }</span>
                            <input type="text" className={ `${ styles.update } customer_email_input ${ styles.input }` }></input>
                        </p>
                        <p>Phone number: &nbsp;
                            <span className="diplayPart">{ customer.phone }</span>
                            <input type="text" className={ `${ styles.update } customer_phone_input ${ styles.input }` } maxLength='10'></input>
                        </p>
                        <p className="diplayPart1">Total spending: &nbsp;${ customer.spending }</p>
                        <p className="diplayPart1">
                            Membership rank: &nbsp;{ customer.rank }
                        </p>
                        <p className="diplayPart1">
                            Membership discount: &nbsp;{ customer.discount }%
                        </p>
                        <span className={ `${ styles.update }` }>
                            Username: &nbsp;
                            <input type="text" style={ { marginBottom: '16px' } } disabled className={ `${ styles.input } username_input` }></input>
                        </span>
                        <span className={ `${ styles.update }` }>
                            Password: &nbsp;
                            <input type="password" style={ { marginBottom: '16px' } } className={ `${ styles.input } password_input` } onChange={ (e) => { setPassword(e.target.value); } }></input>
                        </span>
                        <span className={ `${ styles.update }` }>
                            Re-enter password: &nbsp;
                            <input type="password" style={ { marginBottom: '16px' } } className={ `${ styles.input } password_input` } onChange={ (e) => { setRepassword(e.target.value); } }></input>
                        </span>
                        <button className={ `${ styles.edit }` } onClick={ changeInfo }>Edit</button>
                        <div className={ `${ styles.update }` }>
                            <button className={ `${ styles.cancel } ` } onClick={ cancelUpdate }>Cancel</button>
                            <button className={ `${ styles.confirm } mx-3` } onClick={ confirmChange }>Confirm</button>
                        </div>
                    </div>
                </div>
                <div className={ `w-100 ${ styles.history_section }` }>
                    <button className={ `${ styles.history }` } onClick={ getHistory }>Get history purchases</button>
                    <table className={ `table table-hover mx-auto mt-2 mb-0 ${ styles.table_head }` } style={ { width: '90%' } }>
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
            <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up_1 }` }>
                <h3>Your email can not be empty!</h3>
                <button className={ `${ styles.OK }` } onClick={ () =>
                {
                    $(`.${ styles.pop_up_1 }`).css("display", "none");
                } }>OKAY</button>
            </div>
            <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up_2 }` }>
                <h3>Your phone number can not contain alphabetical characters!</h3>
                <button className={ `${ styles.OK }` } onClick={ () =>
                {
                    $(`.${ styles.pop_up_2 }`).css("display", "none");
                } }>OKAY</button>
            </div>
            <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up_3 }` }>
                <h3>Your name can not be empty!</h3>
                <button className={ `${ styles.OK }` } onClick={ () =>
                {
                    $(`.${ styles.pop_up_3 }`).css("display", "none");
                } }>OKAY</button>
            </div>
            <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up_4 }` }>
                <h3>Passwords are not matched!</h3>
                <button className={ `${ styles.OK }` } onClick={ () =>
                {
                    $(`.${ styles.pop_up_4 }`).css("display", "none");
                } }>OKAY</button>
            </div>
        </div>
    )
}