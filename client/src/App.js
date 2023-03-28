import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Component/Customer/Login';
import Signup from './Component/Customer/Signup';
import ForgotPassword from './Component/Customer/ForgotPassword';
import CreateNewPassWord from './Component/Customer/CreateNewPassword';
import Confirmation from './Component/Customer/Confirmation';
function App()
{
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={ <Login /> } />
          <Route path="sign_up" element={ <Signup /> } />
          <Route path="forgot_password" element={ <ForgotPassword /> } />
          <Route path="create_new_password" element={ <CreateNewPassWord /> } />
          <Route path="confirm" element={ <Confirmation /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
