import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './Component/Customer/Login';
import Signup from './Component/Customer/Signup';
import ForgotPassword from './Component/Customer/ForgotPassword';
import CreateNewPassWord from './Component/Customer/CreateNewPassword';
import CustomerMenu from './Component/Customer/menu';
import CusPersonalInfo from './Component/Customer/personalInfo';
import CustomerHome from './Component/Customer/home';
import CustomerWishlist from './Component/Customer/wishlist';
import CustomerGame from './Component/Customer/all_game';
import CGameDetail from './Component/Customer/cgamedetail'
import { Cart } from './Component/Customer/cart';
import { Product } from './Component/Customer/product';

// Admin pages
// Login pages
import AdminLogin from './Component/Admin/Authentication/Login/Login.jsx';
import AdminRecovery from './Component/Admin/Authentication/Recovery/Recovery';

// Admin navbar
import AdminMenu from './Component/Admin/Menu/menu';

import CusDetail from './Component/Admin/cusdetail';
import CusList from './Component/Admin/cuslist';
import AdminHome from './Component/Admin/Home/Home.jsx';
import GameList from './Component/Admin/gamelist';
import { AddGame, EditGame } from './Component/Admin/add_edit_game';
import GameDetail from './Component/Admin/gamedetail';
import AdminInfo from './Component/Admin/personalInfo';

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
              <Route path="myself" element={ <CusPersonalInfo /> } />
              <Route path="home" element={ <CustomerHome /> } />
              <Route path="allgames" element={ <CustomerGame /> } />
              <Route path="allgames/:id" element={ <CGameDetail /> } />
              <Route path="wishlist" element={ <CustomerWishlist /> } />
              <Route path="cart" element={ <Cart /> } />
              <Route path="product" element={ <Product /> } />
            </Route>
          </Route>

          <Route path="/admin">
            {/* Authentication pages */ }
            <Route index element={ <AdminLogin /> } />
            <Route path="recovery" element={ <AdminRecovery /> } />
            {/* Main pages */ }
            <Route element={ <AdminMenu /> }>
              <Route path='myself' element={ <AdminInfo /> } />
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



