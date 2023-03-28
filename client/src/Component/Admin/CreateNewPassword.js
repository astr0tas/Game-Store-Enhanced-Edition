import '../../css/Customer/CreateNewPassword.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { username } from './ForgotPassword';


function AdminCreateNewPassword()
{
  const Navigate = useNavigate();

  const [password, setPassword] = useState();
  const [repassword, setRepassword] = useState();

  const formSubmit = (e) =>
  {
    e.preventDefault();
    if (password !== repassword)
    {
      alert("Passwords are not match!"); // This can be replaced with a pop-up
      document.getElementById("new_password").reset();
    }
    else
    {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      axios.post('http://localhost/admin/new_password.php', formData)
        .then(res =>
        {
          console.log(res.data);
          alert("Password changed successfully!"); // This can be replaced with a pop-up
          Navigate("/admin");
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <div class="CreateNewPassword  d-flex align-items-center">
      <div class="container d-flex justify-content-end align-items-center ">
        <div class="form-sign-up col-4 me-5 w-25 border p-3 rounded rounded-3 bg-info bg-gradient shadow-lg">
          <h1 class="text-center mb-5">Enter your new password</h1>
          <form onSubmit={ formSubmit } id="new_password">
            <input type="password" class="form-control mb-4 rounded-pill" placeholder="Password" onChange={ (e) => setPassword(e.target.value) } />
            <input type="password" class="form-control mb-4 rounded-pill" placeholder="Re-enter password" onChange={ (e) => setRepassword(e.target.value) } />
            <input type="submit" class="btn btn-primary rounded-pill w-100 my-4" value="Done" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateNewPassword;
