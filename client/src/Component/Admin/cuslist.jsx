import { BsSearch } from 'react-icons/bs';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import '../../css/Admin/cuslist.css';
import ReactDOM from 'react-dom/client';

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

export default function CusList()
{
    const render = useRef(false);

    useEffect(() =>
    {
        if (!render.current)
        {
            $("#customer").css("color", "white");
            $("#customer").css("background-color", "#00B3EC");

            axios.get('http://localhost/admin/customer/getList')
                .then(res =>
                {
                    let temp = [];
                    for (let i = 0; i < res.data.length; i++)
                        temp.push(<Customer key={ i } i={ i } name={ res.data[i].name } email={ res.data[i].email } phone={ res.data[i].phone } spending={ res.data[i].total_spending } id={ res.data[i].id } />);
                    const target = ReactDOM.createRoot(document.getElementById('table_body'));
                    target.render(<>{ temp }</>);
                })
                .catch(error => console.log(error));
            render.current = true;
        }
    });

    const delete_user = () =>
    {

        const checkedValues = $('input[type="checkbox"]:checked').map(function ()
        {
            return $(this).val();
        }).get();

        for (let i = 0; i < checkedValues.length; i++)
        {
            const formData = new FormData();
            formData.append("id", checkedValues[i]);
            axios.post('http://localhost/admin/customer/delete', formData)
                .then(res =>
                {
                    console.log(res);
                })
                .catch(error => console.log(error));
        }
        window.location.reload();
    }

    const toggle_delete = () =>
    {
        $(".checkbox").prop("checked", false);
        if ($(".delete").first().css("display") === "block")
        {
            $(".delete").last().css("display", "block");
            $(".back").css("display", "block");
            $(".delete").first().css("display", "none");
            $(".detail").css("display", "none");
            $(".checkbox").css("display", "block");
        }
        else
        {
            $(".delete").last().css("display", "none");
            $(".back").css("display", "none");
            $(".delete").first().css("display", "block");
            $(".detail").css("display", "inline-block");
            $(".checkbox").css("display", "none");
        }
    }

    const search = () =>
    {
        $("#table_body").empty();
        const formData = new FormData();
        formData.append("data", $("#search").val());
        axios.post('http://localhost/admin/customer/find', formData)
            .then(res =>
            {
                let temp = [];
                for (let i = 0; i < res.data.length; i++)
                    temp.push(<Customer key={ i } i={ i } name={ res.data[i].name } email={ res.data[i].email } phone={ res.data[i].phone } spending={ res.data[i].total_spending } id={ res.data[i].id } />);
                const target = ReactDOM.createRoot(document.getElementById('table_body'));
                target.render(<>{ temp }</>);
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
            <div className="w-100 h-100 pop_up_container">
                <div className='cus_list_pop_up'>
                    <div className='d-flex flex-column align-items-center justify-content-around w-100 h-100'>
                        <h3 className="confirm_title">Do you want to delete the selected user(s)?</h3>
                        <div className='confirm_boxes d-flex justify-content-between align-items-center'>
                            <button className='no' onClick={ () => { $(".pop_up_container").css("display", "none"); } }>No</button>
                            <button className='yes' onClick={ () => { delete_user(); $(".pop_up_container").css("display", "none"); } }>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cusList">
                <div className='d-flex justify-content-end align-items-center w-100'>
                    <form className='d-flex justify-content-end align-items-center w-100' style={ { height: "40px" } }>
                        <input className='search' id='search' type='text' placeholder='Find' onKeyUp={ search } />
                        <BsSearch id='scope' className="search_icon" size={ 20 } />
                    </form>
                </div>
                <form className="w-100" style={ { height: "calc(100% - 40px)" } }>
                    <div className='w-100'>
                        <table className="table table-hover mx-auto mt-3 mb-0" style={ { width: "90%" } }>
                            <thead style={ { borderBottom: "2px solid black" } }>
                                <tr>
                                    <th scope="col" className='col-1'>#</th>
                                    <th scope="col" className='col-3'>Customer</th>
                                    <th scope="col" className='col-2'>Email</th>
                                    <th scope="col" className='col-2'>Phone number</th>
                                    <th scope="col" className='col-2'>Total spending</th>
                                    <th scope="col" className='col-2'>Action</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className='w-100' style={ { height: "calc(100% - 150px)", overflow: "auto" } }>
                        <table className="table table-hover mx-auto mt-1" style={ { width: "90%" } }>
                            <tbody id="table_body">
                            </tbody>
                        </table>
                    </div>
                    <div className='w-100 d-flex justify-content-center align-items-center' style={ { height: "100px" } }>
                        <button type="button" className='delete' onClick={ toggle_delete }>Delete user</button>
                        <button type="button" className='back' onClick={ toggle_delete }>Back</button>
                        <button type="button" className='delete' value="Confirm" onClick={ () => { $(".pop_up_container").css("display", "flex"); } }>Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    )
}