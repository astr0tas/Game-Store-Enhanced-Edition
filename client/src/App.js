import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

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


import CusDetail from './Component/Admin/cusdetail';
import CusList from './Component/Admin/cuslist';
import AdminMenu from './Component/Admin/menu';
import AdminHome from './Component/Admin/home';
import GameList from './Component/Admin/gamelist';
import { AddGame, EditGame } from './Component/Admin/add_edit_game';
import GameDetail from './Component/Admin/gamedetail';
import AdminCreateNewPassword from './Component/Admin/CreateNewPassword';
import AdminForgotPassword from './Component/Admin/ForgotPassword';
import AdminLogin from './Component/Admin/Login';
import AdminInfo from './Component/Admin/personalInfo';


//test cart

import Shop from './Component/test/pages/shop/shop';
import Cart from './Component/test/pages/cart/cart';
import { ShopContextProvider } from './Component/test/context/shop-context';
import Payout from './Component/test/pages/cart/payout'
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
            </Route>
          </Route>

          <Route path="/admin">
            <Route index element={ <AdminLogin /> } />
            <Route path="forgot_password" element={ <AdminForgotPassword /> } />
            <Route path="create_new_password" element={ <AdminCreateNewPassword /> } />
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
      <ShopContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={ <CustomerMenu /> }>
              <Route path="shop/cart" element={ <Cart /> } />
              <Route path="shop" element={ <Shop /> } />
              <Route path="/payout" element={ <Payout /> } />

            </Route>

          </Routes>
        </BrowserRouter>
      </ShopContextProvider>
    </div >
  );
}

export default App;



