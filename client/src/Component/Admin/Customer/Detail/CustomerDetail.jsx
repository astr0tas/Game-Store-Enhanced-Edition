import { useNavigate, useParams } from 'react-router-dom';
import styles from './CustomerDetail.module.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BiTrash } from 'react-icons/bi';
import ReactDOM from 'react-dom/client';
import { domain } from '../../../General/tools/domain';
import { isRefValid, isRefNotValid } from '../../../General/tools/refChecker';
import '../../../General/css/scroll.css';

const History = (props) =>
{
    return (
        <tr>
            <td className='col-3 text-center'>{ props.name }</td>
            <td className='col-3 text-center'>{ props.code }</td>
            <td className='col-2 text-center'>{ props.date }</td>
            <td className='col-2 text-center'>${ props.price }</td>
            <td className='col-2 text-center'>{ props.method }</td>
        </tr>
    );
}


export default function CustomerDetail()
{
    const id = useParams().id;
    const [customer, setCustomer] = useState({ name: "N/A", email: "N/A", phone: "N/A", spending: "N/A", rank: "N/A", discount: "N/A", image: "N/A", dob: "N/A" });
    const [renderTrigger, setRenderTrigger] = useState(true);
    const Navigate = useNavigate();

    const select_menu = useRef(null);
    const rank = useRef(null);
    const discount = useRef(null);
    const discount_input = useRef(null);
    const customer_email = useRef(null);
    const customer_email_input = useRef(null);
    const customer_phone = useRef(null);
    const customer_phone_input = useRef(null);
    const edit = useRef(null);
    const update = useRef(null);
    const history = useRef(null);

    const bigDiv = useRef(null);
    const div1Height = useRef(null);
    const div2Height = useRef(null);
    const buttonHeight = useRef(null);

    const delete_pop_up = useRef(null);
    const pop_up = useRef(null);
    const pop_up_1 = useRef(null);
    const pop_up_2 = useRef(null);
    const pop_up_3 = useRef(null);
    const update_pop_up = useRef(null);

    const target = useRef(null);

    const calculateRemainHeight = () =>
    {
        if (isRefValid(bigDiv) && isRefValid(div1Height) && isRefValid(div2Height) && isRefValid(buttonHeight))
        {
            const height = bigDiv.current.offsetHeight - div1Height.current.offsetHeight - buttonHeight.current.offsetHeight - 50;
            div2Height.current.style.height = `calc(${ height }px)`;
        }
    }

    useEffect(() =>
    {
        const formData = new FormData();
        formData.append("id", id);
        axios.post(`http://${ domain }/admin/customer/detail`, formData)
            .then(res =>
            {
                document.title = `Customer ${ res.data.name }`;
                setCustomer({
                    name: res.data.name,
                    email: res.data.email,
                    phone: res.data.phone === null ? 'N/A' : res.data.phone,
                    spending: res.data.total_spending,
                    rank: res.data.membership_rank,
                    discount: res.data.membership_discount,
                    image: res.data.image === null ? "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA=" : `http://${ domain }/model/data/customers/${ res.data.image }`,
                    dob: res.data.dob === null ? "N/A" : res.data.dob
                });
                if (isRefValid(select_menu))
                    select_menu.current.value = res.data.membership_rank;
                if (isRefValid(discount_input))
                    discount_input.current.value = res.data.membership_discount;
            })

        calculateRemainHeight();

        window.addEventListener('resize', calculateRemainHeight);

    }, [renderTrigger, id]);

    const getHistory = () =>
    {
        const formData = new FormData();
        formData.append("id", id);
        axios.post(`http://${ domain }/admin/customer/detail/history`, formData)
            .then(res =>
            {
                if (res.data.length !== 0)
                    if (isRefValid(div2Height)) div2Height.current.style.display = "block";

                let temp = [];
                for (let i = 0; i < res.data.length; i++)
                    temp.push(<History key={ i } name={ res.data[i].name } code={ res.data[i].code } date={ res.data[i].date } price={ res.data[i].price } method={ res.data[i].method } />);

                if (isRefNotValid(target))
                    target.current = ReactDOM.createRoot(history.current);
                target.current.render(<>{ temp }</>);
            })
            .catch(error => console.log(error));
    }

    const selectHandler = (event) =>
    {
        if (isRefValid(discount_input))
        {
            if (event.target.value === "None")
            {
                discount_input.current.value = 0;
                discount_input.current.disabled = true;
            }
            else if (event.target.value === "Silver")
            {
                discount_input.current.value = 1;
                discount_input.current.disabled = true;
            }
            else if (event.target.value === "Gold")
            {
                discount_input.current.value = 2;
                discount_input.current.disabled = true;
            }
            else if (event.target.value === "Diamond")
            {
                discount_input.current.value = 3;
                discount_input.current.disabled = true;
            }
            else
            {
                discount_input.current.value = "";
                discount_input.current.disabled = false;
            }
        }
    }

    const changeInfo = () =>
    {
        if (isRefValid(rank))
            rank.current.style.display = "none";
        if (isRefValid(discount))
            discount.current.style.display = "none";
        if (isRefValid(customer_email))
            customer_email.current.style.display = "none";
        if (isRefValid(customer_phone))
            customer_phone.current.style.display = "none";
        if (isRefValid(edit))
            edit.current.style.display = "none";
        if (isRefValid(update))
            update.current.style.display = "flex";
        if (isRefValid(select_menu))
        {
            select_menu.current.style.display = "inline";
            select_menu.current.value = customer.rank;
        }
        if (isRefValid(discount_input))
        {
            discount_input.current.style.display = "inline";
            discount_input.current.value = customer.discount;
        }
        if (isRefValid(customer_email_input))
        {
            customer_email_input.current.style.display = "inline";
            customer_email_input.current.value = customer.email;
        }
        if (isRefValid(customer_phone_input))
        {
            customer_phone_input.current.style.display = "inline";
            customer_phone_input.current.value = customer.phone === "N/A" ? "" : customer.phone;
        }
        if (isRefValid(select_menu) && select_menu.current.value === "Special")
        {
            if (isRefValid(discount_input))
            {
                discount_input.current.disabled = false;
                discount_input.current.value = customer.discount;
            }
        }
    }

    const cancelUpdate = () =>
    {
        if (isRefValid(rank))
            rank.current.style.display = "inline";
        if (isRefValid(discount))
            discount.current.style.display = "inline";
        if (isRefValid(customer_email))
            customer_email.current.style.display = "inline";
        if (isRefValid(customer_phone))
            customer_phone.current.style.display = "inline";
        if (isRefValid(edit))
            edit.current.style.display = "inline-block";
        if (isRefValid(update))
            update.current.style.display = "none";
        if (isRefValid(discount_input))
            discount_input.current.style.display = "none";
        if (isRefValid(customer_email_input))
            customer_email_input.current.style.display = "none";
        if (isRefValid(customer_phone_input))
            customer_phone_input.current.style.display = "none";
        if (isRefValid(select_menu))
            select_menu.current.style.display = "none";
    }

    function containsAlphabets(str)
    {
        for (let i = 0; i < str.length; i++)
            if ((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z')) return true;
        return false;
    }

    const confirmChange = () =>
    {
        if (isRefValid(customer_email_input) && customer_email_input.current.value === "")
        {
            if (isRefValid(pop_up_1)) pop_up_1.current.style.display = "flex";
        }
        else if (isRefValid(customer_phone_input) && containsAlphabets(customer_phone_input.current.value))
        {
            if (isRefValid(pop_up_2)) pop_up_2.current.style.display = "flex";
        }
        else if (isRefValid(select_menu) && select_menu.current.value === "Special" && isRefValid(discount_input) && (discount_input.current.value > 5 || discount_input.current.value < 0))
        {
            if (isRefValid(pop_up)) pop_up.current.style.display = "flex";
        }
        else if (isRefValid(select_menu) && select_menu.current.value === "Special" && isRefValid(discount_input) && discount_input.current.value === "")
        {
            if (isRefValid(pop_up_3)) pop_up_3.current.style.display = "flex";
        }
        else
        {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("rank", select_menu.current.value);
            formData.append("discount", discount_input.current.value);
            formData.append("email", customer_email_input.current.value);
            formData.append("phone", customer_phone_input.current.value === "" ? null : customer_phone_input.current.value);
            axios.post(`http://${ domain }/admin/customer/detail/update`, formData)
                .then(res =>
                {
                    console.log(res);
                    cancelUpdate();
                    setRenderTrigger(!renderTrigger);
                })
                .catch(error => { console.log(error); })
        }
    }

    const deleteCustomer = () =>
    {
        const formData = new FormData();
        formData.append("id", id);
        axios.post(`http://${ domain }/admin/customer/delete`, formData)
            .then(res =>
            {
                console.log(res);
                Navigate(-1);
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="d-flex flex-column align-items-center w-100 h-100">
            <div className="d-flex align-items-center w-100" style={ { height: "50px" } }>
                <BiTrash className={ `ms-auto ms-md-3 me-md-0 me-3 ${ styles.trash }` } onClick={ () => { if (isRefValid(delete_pop_up)) delete_pop_up.current.style.display = "flex"; } } />
                <button className={ `ms-md-auto me-md-3 me-auto ms-3 btn btn-secondary btn-sm` } onClick={ () => { Navigate(-1); } }>Back</button>
            </div>
            <div className={ `flex-grow-1 w-100 mt-3 overflow-auto hideBrowserScrollbar mb-3` } ref={ bigDiv }>
                <div className={ `d-flex flex-column flex-md-row align-items-center justify-content-md-between align-items-md-start w-100` } ref={ div1Height }>
                    <img className={ `${ styles.img } ms-md-5` } src={ customer.image } alt='avatar' />
                    <div className={ `d-flex flex-column justify-content-center align-items-center ${ styles.info } mt-2 mt-md-0 me-xxl-5` }>
                        <div style={ { marginBottom: '16px' } }>Name: &nbsp;{ customer.name }</div>
                        <div style={ { marginBottom: '16px' } }>Date of birth: &nbsp;{ customer.dob }</div>
                        <div className='text-center' style={ { marginBottom: '16px' } }>Email: &nbsp;
                            <span ref={ customer_email }>{ customer.email }</span>
                            <input type="text" className={ `${ styles.update } ` } ref={ customer_email_input }></input>
                        </div>
                        <div className='text-center' style={ { marginBottom: '16px' } }>Phone number: &nbsp;
                            <span ref={ customer_phone }>{ customer.phone }</span>
                            <input type="text" className={ `${ styles.update } ` } ref={ customer_phone_input } maxLength='10'></input>
                        </div>
                        <div className='text-center' style={ { marginBottom: '16px' } }>Total spending: &nbsp;${ customer.spending }</div>
                        <div className='text-center' style={ { marginBottom: '16px' } }>
                            Membership rank: &nbsp;
                            <span ref={ rank }>{ customer.rank }</span>
                            <select className={ `${ styles.update }` } onChange={ selectHandler } ref={ select_menu }>
                                <option value="None">None</option>
                                <option value="Silver">Silver</option>
                                <option value="Gold">Gold</option>
                                <option value="Diamond">Diamond</option>
                                <option value="Special">Special</option>
                            </select>
                        </div>
                        <div className='text-center' style={ { marginBottom: '16px' } }>
                            Membership discount: &nbsp;
                            <span ref={ discount }>{ customer.discount }%</span>
                            <input type="number" className={ `${ styles.update }` } disabled ref={ discount_input }></input>
                        </div>
                        <button className={ `btn btn-sm btn-primary` } onClick={ changeInfo } ref={ edit }>Edit</button>
                        <div className={ `${ styles.buttons } w-100 align-items-center justify-content-center` } ref={ update }>
                            <button className={ `btn btn-sm btn-danger` } onClick={ cancelUpdate }>Cancel</button>
                            <button className={ `btn btn-sm btn-primary mx-3` } onClick={ () => { if (isRefValid(update_pop_up)) update_pop_up.current.style.display = "flex"; } }>Confirm</button>
                        </div>
                    </div>
                </div>
                <button className={ `btn btn-sm btn-primary ms-md-5 ms-4 mt-2` } onClick={ getHistory } ref={ buttonHeight }>Get history purchases</button>
                <div className={ `w-100 mt-2 overflow-auto ${ styles.table }` } ref={ div2Height } style={ { minHeight: '250px' } }>
                    <table className={ `table table-hover mx-auto mb-0 w-100` }>
                        <thead style={ { position: "sticky", top: '0', backgroundColor: "#BFBFBF" } }>
                            <tr>
                                <th scope="col" className={ `col-3 text-center` }>Game name</th>
                                <th scope="col" className={ `col-3 text-center` }>Code</th>
                                <th scope="col" className={ `col-2 text-center` }>Date</th>
                                <th scope="col" className={ `col-2 text-center` }>Price</th>
                                <th scope="col" className={ `col-2 text-center` }>Method</th>
                            </tr>
                        </thead>
                        <tbody ref={ history }>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up }` } ref={ pop_up }>
                <h3>Discount value should be greater or equal to 0% and less than or equal to 5% only!</h3>
                <button className={ `btn btn-primary` } onClick={ () =>
                {
                    if (isRefValid(pop_up)) pop_up.current.style.display = "none";
                } }>OKAY</button>
            </div>
            <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up }` } ref={ pop_up_1 }>
                <h3>Customer email can not be empty!</h3>
                <button className={ `btn btn-primary` } onClick={ () =>
                {
                    if (isRefValid(pop_up_1)) pop_up_1.current.style.display = "none";
                } }>OKAY</button>
            </div>
            <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up }` } ref={ pop_up_2 }>
                <h3>Customer phone number can not contain alphabetical characters!</h3>
                <button className={ `btn btn-primary` } onClick={ () =>
                {
                    if (isRefValid(pop_up_2)) pop_up_2.current.style.display = "none";
                } }>OKAY</button>
            </div>
            <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up }` } ref={ pop_up_3 }>
                <h3>Discount value can not be empty!</h3>
                <button className={ `btn btn-primary` } onClick={ () =>
                {
                    if (isRefValid(pop_up_3)) pop_up_3.current.style.display = "none";
                } }>OKAY</button>
            </div>
            <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up }` } ref={ delete_pop_up }>
                <h3 className='mx-2'>Do you really want to delete this customer?</h3>
                <div className='d-flex flex-row align-items-center justify-content-center'>
                    <button className={ `btn btn-primary mx-3` } onClick={ () =>
                    {
                        if (isRefValid(delete_pop_up)) delete_pop_up.current.style.display = "none";
                    } }>Cancel</button>
                    <button className={ `btn btn-danger mx-3` } onClick={ () =>
                    {
                        if (isRefValid(delete_pop_up)) delete_pop_up.current.style.display = "none";
                        deleteCustomer();
                    } }>Confirm</button>
                </div>
            </div>
            <div className={ `position-absolute flex-column align-items-center justify-content-around ${ styles.pop_up }` } ref={ update_pop_up }>
                <h3 className='mx-2'>Do you really want to update this customer info?</h3>
                <div className='d-flex flex-row align-items-center justify-content-center'>
                    <button className={ `btn btn-danger mx-3` } onClick={ () =>
                    {
                        if (isRefValid(update_pop_up)) update_pop_up.current.style.display = "none";
                    } }>Cancel</button>
                    <button className={ `btn btn-primary mx-3` } onClick={ () =>
                    {
                        if (isRefValid(update_pop_up)) update_pop_up.current.style.display = "none";
                        confirmChange();
                    } }>Confirm</button>
                </div>
            </div>
        </div>
    )
}