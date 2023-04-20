import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Component/Customer/Login';
import Signup from './Component/Customer/Signup';
import ForgotPassword from './Component/Customer/ForgotPassword';
import CreateNewPassWord from './Component/Customer/CreateNewPassword';
import Confirmation from './Component/Customer/Confirmation';
import CustomerMenu from './Component/Customer/menu';
import CusDetail from './Component/Admin/cusdetail';
import CusList from './Component/Admin/cuslist';
// import Stat from './Component/Admin/Stat';

import AdminMenu from './Component/Admin/menu';
import AdminHome from './Component/Admin/home';
import AdminLogin from './Component/Admin/Login';
import AdminForgotPassword from './Component/Admin/ForgotPassword';
import AdminCreateNewPassword from './Component/Admin/CreateNewPassword';
import GameList from './Component/Admin/gamelist';

function App()
{
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={ <Login /> } />
            <Route path="sign_up" element={ <Signup /> } />
            <Route path="forgot_password" element={ <ForgotPassword /> } />
            <Route path="create_new_password" element={ <CreateNewPassWord /> } />
            <Route path="confirm" element={ <Confirmation /> } />
            <Route path="test" element={ <CustomerMenu /> }> {/*this is only temporary */ }
            
            </Route>
          </Route>

          <Route path="/admin">
            <Route index element={ <AdminLogin /> } />
            <Route path="forgot_password" element={ <AdminForgotPassword /> } />
            <Route path="create_new_password" element={ <AdminCreateNewPassword /> } />
            <Route element={ <AdminMenu /> }>
              <Route path="home" element={ <AdminHome /> } />
              <Route>
                <Route path="customerlist" element={ <CusList /> } />
                <Route path="customerlist/:id" element={ <CusDetail /> } />
              </Route>
              <Route>
                <Route path="gamelist" element={ <GameList /> } />
              </Route>
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;



