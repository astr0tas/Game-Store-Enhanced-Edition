import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* Customer pages */
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

/* Admin pages */
// Login pages
import AdminLogin from './Component/Admin/Authentication/Login/Login.jsx';
import AdminRecovery from './Component/Admin/Authentication/Recovery/Recovery';

// Admin navbar
import AdminMenu from './Component/Admin/Menu/menu';

// Admin Personal Info
import AdminInfo from './Component/Admin/personalInfo';

// Admin Home
import AdminHome from './Component/Admin/Home/Home.jsx';

// Admin Customers
import CustomerList from './Component/Admin/Customer/List/CustomerList';
import CustomerDetail from './Component/Admin/Customer/Detail/CustomerDetail';

// Admin Games
import GameList from './Component/Admin/Game/List/GameList';
import AdminGameDetail from './Component/Admin/Game/Detail/GameDetail';

import { AddGame, EditGame } from './Component/Admin/add_edit_game';

// Admin Statistics

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
              {/* Personal Info */ }
              <Route path='profile' element={ <AdminInfo /> } />
              {/* Home */ }
              <Route path="home" element={ <AdminHome /> } />
              {/* Customers */ }
              <Route>
                <Route path="customer-list" element={ <CustomerList /> } />
                <Route path="customer-list/:id" element={ <CustomerDetail /> } />
              </Route>
              {/* Games */ }
              <Route>
                <Route path="game-list" element={ <GameList /> } />
                <Route path="game-list/:id" element={ <AdminGameDetail /> } />
                <Route path="game-list/:id/update" element={ <EditGame /> } />
                <Route path="game-list/add" element={ <AddGame /> } />
              </Route>
              {/* Statistics */ }
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;



