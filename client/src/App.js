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

// Customer pages
import CustomerList from './Component/Admin/Customer/List/CustomerList';
import CustomerDetail from './Component/Admin/Customer/Detail/CustomerDetail';

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
              <Route path='profile' element={ <AdminInfo /> } />
              <Route path="home" element={ <AdminHome /> } />
              {/* Customer pages */ }
              <Route>
                <Route path="customer-list" element={ <CustomerList /> } />
                <Route path="customer-list/:id" element={ <CustomerDetail /> } />
              </Route>
              {/* Game pages */ }
              <Route>
                <Route path="game-list" element={ <GameList /> } />
                <Route path="game-list/:id" element={ <GameDetail /> } />
                <Route path="game-list/:id/edit" element={ <EditGame /> } />
                <Route path="add-game" element={ <AddGame /> } />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;



