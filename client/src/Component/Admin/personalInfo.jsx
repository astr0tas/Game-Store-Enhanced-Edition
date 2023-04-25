import { useNavigate } from 'react-router-dom';
import styles from '../../css/Admin/personalInfo.module.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import ReactDOM from 'react-dom/client';
import { checkCookie } from '../tools/cookie';
import { domain } from '../tools/domain';


export default function AdminInfo()
{
    const render = useRef(false);
    const [admin, setAdmin] = useState({ name: "N/A", email: "N/A", phone: "N/A", address: "N/A", username: null });
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const Navigate = useNavigate();

    useEffect(() =>
    {
        if (!checkCookie("PHPSESSID"))
            Navigate("/");

        if (!render.current)
        {
            $("#admin").css("color", "white");
            $("#admin").css("background-color", "#00B3EC");

            axios.get(`http://${ domain }/admin/myself`, { withCredentials: true })
                .then(res =>
                {
                    console.log(res);
                    setAdmin({
                        name: res.data.name,
                        email: res.data.email,
                        phone: res.data.phone === null ? admin.phone : res.data.phone,
                        address: res.data.address === null ? admin.address : res.data.address,
                        username: res.data.username
                    });
                })
            render.current = true;
        }
    });

    const changeInfo = () =>
    {
        $(".diplayPart").css("display", "none");
        $(".diplayPart1").css("display", "none");
        $(`.${ styles.edit }`).css("display", "none");
        $(`.${ styles.update }`).css("display", "inline-block");
        $('.admin_name_input').val(admin.name);
        $('.admin_email_input').val(admin.email);
        $('.admin_phone_input').val(admin.phone === "N/A" ? "" : admin.phone);
        $('.admin_address_input').val(admin.address === "N/A" ? "" : admin.address);
        $('.username_input').val(admin.username);
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

    const goBack = () =>
    {
        Navigate(-1);
    }

    function containsAlphabets(str)
    {
        for (let i = 0; i < str.length; i++)
            if ((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z')) return true;
        return false;
    }

    const confirmChange = () =>
    {
        if ($(".admin_name_input").val() === "")
            $(`.${ styles.pop_up_3 }`).css("display", "flex");
        else if ($(".admin_email_input").val() === "")
            $(`.${ styles.pop_up_1 }`).css("display", "flex");
        else if ($(".admin_phone_input").val() === "")
            $(`.${ styles.pop_up_5 }`).css("display", "flex");
        else if (containsAlphabets($(".admin_phone_input").val()))
            $(`.${ styles.pop_up_2 }`).css("display", "flex");
        else if (password !== repassword)
            $(`.${ styles.pop_up_4 }`).css("display", "flex");
        else
        {
            const formData = new FormData();
            formData.append("name", $(`.admin_name_input`).val());
            formData.append("email", $(`.admin_email_input`).val());
            formData.append("phone", $(`.admin_phone_input`).val() === "" ? null : $(`.admin_phone_input`).val());
            formData.append("address", $(`.admin_address_input`).val() === "" ? null : $(`.admin_address_input`).val());
            formData.append("password", password === "" ? null : password);
            axios.post(`http://${ domain }/admin/myself/edit`, formData, { withCredentials: true })
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
                <div className={ `d-flex align-items-center justify-content-end w-100 ${ styles.dummy }` }>
                    <button className={ `mx-3 ${ styles.back }` } onClick={ goBack }>Back</button>
                </div>
                <div className={ `d-flex flex-row align-items-center justify-content-around w-100 ${ styles.info_board }` }>
                    <img className={ `${ styles.img }` } src={ require('../../img/defaultavt.jpg') } alt='avatar' />
                    <div className={ `d-flex flex-column justify-content-center ${ styles.info }` }>
                        <p>Name: &nbsp;
                            <span className="diplayPart">{ admin.name }</span>
                            <input type="text" className={ `${ styles.update } admin_name_input ${ styles.input }` }></input>
                        </p>
                        <p>Email: &nbsp;
                            <span className="diplayPart">{ admin.email }</span>
                            <input type="text" className={ `${ styles.update } admin_email_input ${ styles.input }` }></input>
                        </p>
                        <p>Phone number: &nbsp;
                            <span className="diplayPart">{ admin.phone }</span>
                            <input type="text" className={ `${ styles.update } admin_phone_input ${ styles.input }` } maxLength='10'></input>
                        </p>
                        <p>Address: &nbsp;
                            <span className="diplayPart">{ admin.address }</span>
                            <input type="text" className={ `${ styles.update } admin_address_input ${ styles.input }` }></input>
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
            <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up_5 }` }>
                <h3>Your phone number can not be empty!</h3>
                <button className={ `${ styles.OK }` } onClick={ () =>
                {
                    $(`.${ styles.pop_up_5 }`).css("display", "none");
                } }>OKAY</button>
            </div>
        </div>
    )
}