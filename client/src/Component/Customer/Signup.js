import '../../css/Customer/Signup.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Signup()
{
  const Navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  const formChange = (event) =>
  {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const formSubmit = (event) =>
  {
    event.preventDefault();
    let ok = true;
    if (inputs.password !== inputs.re_password)
    {
      alert("Passwords are not match!"); // This can be replace with a pop-up
      ok = false;
    }

    if (ok)
    {
      const formData = new FormData();
      formData.append("name", inputs.name);
      formData.append("email", inputs.email);
      formData.append("username", inputs.username);
      formData.append("password", inputs.password);
      if (inputs.phone)
        formData.append("phone", inputs.phone);
      axios.post('http://localhost/customer/sign_up.php', formData)
        .then(res =>
        {
          if (res.data === "email")
          {
            alert("This email is already used!"); // This can be replace with a pop-up
            document.getElementById("signUpForm").reset();
          }
          else if (res.data === "username")
          {
            alert("This username is already used!"); // This can be replace with a pop-up
            document.getElementById("signUpForm").reset();
          }
          else
          {
            alert("Register successfully!"); // This can be replace with a pop-up
            Navigate("/");
          }
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <div class="Signup  d-flex align-items-center">
      <div class="container d-flex justify-content-end align-items-center ">
        <form class="form-sign-up col-4 me-5 w-25 border p-3 rounded rounded-3 bg-info bg-gradient shadow-lg" onSubmit={ formSubmit } id="signUpForm">
          <h1 class="text-center mb-5">Register</h1>
          <input type="text" class="form-control mb-4 rounded-pill" placeholder="Your name" name="name" onChange={ formChange } /> {/*This is required*/ }
          <input type="text" class="form-control mb-4 rounded-pill" placeholder="Your email" name="email" onChange={ formChange } /> {/*This is required*/ }
          <input type="text" class="form-control mb-4 rounded-pill" placeholder="Your phone number" name="phone" onChange={ formChange } />
          <input type="text" class="form-control mb-4 rounded-pill" placeholder="Your username" name="username" onChange={ formChange } /> {/*This is required*/ }
          <input type="password" class="form-control mb-4 rounded-pill" placeholder="Your password" name="password" onChange={ formChange } /> {/*This is required*/ }
          <input type="password" class="form-control mb-4 rounded-pill" placeholder="Re-enter your password" name="re_password" onChange={ formChange } /> {/*This is required*/ }
          <input type="submit" class="btn btn-primary rounded-pill w-100 my-4" />
          <div class="text-center">Already have an account? <a href="/">Sign in</a></div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
