import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Component/Customer/Login';
import Signup from './Component/Customer/Signup';
import ForgotPassword from './Component/Customer/ForgotPassword';
import CreateNewPassWord from './Component/Customer/CreateNewPassword';
import CustomerMenu from './Component/Customer/menu';
import CusDetail from './Component/Admin/cusdetail';
import CusList from './Component/Admin/cuslist';
// import Stat from './Component/Admin/Stat';

import AdminMenu from './Component/Admin/menu';
import AdminHome from './Component/Admin/home';
import GameList from './Component/Admin/gamelist';
import { AddGame, EditGame } from './Component/Admin/add_edit_game';
import GameDetail from './Component/Admin/gamedetail';
import CustomerHome from './Component/Customer/home';
import AdminCreateNewPassword from './Component/Admin/CreateNewPassword';
import AdminForgotPassword from './Component/Admin/ForgotPassword';
import AdminLogin from './Component/Admin/Login';

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
            <Route element={ <CustomerMenu /> }>
              <Route path="home" element={ <CustomerHome /> } />
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
                <Route path="gamelist/:id" element={ <GameDetail /> } />
                <Route path="gamelist/:id/edit" element={ <EditGame /> } />
                <Route path="addgame" element={ <AddGame /> } />
              </Route>
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;



