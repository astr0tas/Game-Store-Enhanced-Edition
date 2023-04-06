import { BsSearch } from 'react-icons/bs';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import '../../css/Admin/cuslist.css';

export default function CusList()
{
    const render = useRef(false);

    useEffect(() =>
    {
        if (!render.current)
        {
            axios.get('http://localhost/admin/get_customer_list.php')
                .then(res =>
                {
                    for (let i = 0; i < res.data.length; i++)
                    {
                        $(".table_body").append($("<tr>").append($("<th>").attr("scope", "row").text(i + 1))
                            .append($("<td>").text(res.data[i].name))
                            .append($("<td>").text(res.data[i].email))
                            .append($("<td>").text(res.data[i].phone))
                            .append($("<td>").text(res.data[i].total_spending))
                            .append($("<td>").addClass("d-flex").addClass("align-items-center")
                                .append($("<a>").text("Detail").addClass("detail").attr("href", "./" + res.data[i].id))
                                .append($("<input>").addClass("checkbox").attr("type", "checkbox").attr("value", res.data[i].id))
                            )
                        );
                    }
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
            axios.post('http://localhost/admin/delete_customer_list.php', formData)
                .then(res =>
                {
                    console.log(res.data);
                })
                .catch(error => console.log(error));
        }
        window.location.href = "./customerlist";
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
            $(".detail").css("display", "block");
            $(".checkbox").css("display", "none");
        }
    }

    const search = () =>
    {
        $(".table_body").empty();
        const formData = new FormData();
        formData.append("data", $("#search").val());
        axios.post('http://localhost/admin/find_customer.php', formData)
            .then(res =>
            {
                for (let i = 0; i < res.data.length; i++)
                {
                    $(".table_body").append($("<tr>").append($("<th>").attr("scope", "row").text(i + 1))
                        .append($("<td>").text(res.data[i].name))
                        .append($("<td>").text(res.data[i].email))
                        .append($("<td>").text(res.data[i].phone))
                        .append($("<td>").text(res.data[i].total_spending))
                        .append($("<td>").addClass("d-flex").addClass("align-items-center")
                            .append($("<a>").text("Detail").addClass("detail").attr("href", "./" + res.data[i].id))
                            .append($("<input>").addClass("checkbox").attr("type", "checkbox").attr("value", res.data[i].id))
                        )
                    );
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
            <div className='cus_list_pop_up'>
                <div className='d-flex flex-column align-items-center justify-content-around w-100 h-100'>
                    <h2>Do you want to delete the selected user(s)?</h2>
                    <div>
                        <button className='no' onClick={ () => { $(".cus_list_pop_up").css("display", "none"); } }>No</button>
                        <button className='yes' onClick={ () => { delete_user(); $(".cus_list_pop_up").css("display", "none"); } }>Yes</button>
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
                    <div className='w-100' style={ { height: "calc(100% - 100px)", overflow: "auto" } }>
                        <table className="table table-hover mx-auto mt-3" style={ { width: "90%" } }>
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
                            <tbody className="table_body">
                            </tbody>
                        </table>
                    </div>
                    <div className='w-100 d-flex justify-content-center align-items-center' style={ { height: "100px" } }>
                        <button type="button" className='delete' onClick={ toggle_delete }>Delete user</button>
                        <button type="button" className='back' onClick={ toggle_delete }>Back</button>
                        <button type="button" className='delete' value="Confirm" onClick={ () => { $(".cus_list_pop_up").css("display", "block"); } }>Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    )
}