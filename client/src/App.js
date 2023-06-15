import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* Customer pages */
// Authentication pages
import CustomerLogin from './Component/Customer/Authentication/Login/Login';
import CustomerRecovery from './Component/Customer/Authentication/Recovery/Recovery';
import CustomerSignUp from './Component/Customer/Authentication/SignUp/SignUp';

// Customer navbar
import CustomerMenu from './Component/Customer/Menu/menu';

// Customer Personal Info

// Customer Home
import CustomerHome from './Component/Customer/Home/Home';

// Customer Game List
import CustomerGameList from './Component/Customer/Games/List/GameList';

// Customer Wish List

// Customer Shopping Cart

import CusPersonalInfo from './Component/Customer/personalInfo';
import CustomerWishlist from './Component/Customer/wishlist';
import { Cart } from './Component/Customer/cart';
import { Product } from './Component/Customer/product';

/* Admin pages */
// Authentication pages
import AdminLogin from './Component/Admin/Authentication/Login/Login.jsx';
import AdminRecovery from './Component/Admin/Authentication/Recovery/Recovery';

// Admin navbar
import AdminMenu from './Component/Admin/Menu/menu';

// Admin Personal Info
import AdminPersonalInfo from './Component/Admin/PersonalInfomation/PersonalInfomation';

// Admin Home
import AdminHome from './Component/Admin/Home/Home.jsx';

// Admin Customers
import CustomerList from './Component/Admin/Customer/List/CustomerList';
import CustomerDetail from './Component/Admin/Customer/Detail/CustomerDetail';

// Admin Games
import GameList from './Component/Admin/Game/List/GameList';
import AdminGameDetail from './Component/Admin/Game/Detail/GameDetail';
import AddGame from './Component/Admin/Game/Add/AddGame';
import EditGame from './Component/Admin/Game/Edit/EditGame';

// Admin Statistics

function App()
{

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* Authentication pages */ }
            <Route index element={ <CustomerLogin /> } />
            <Route path="recovery" element={ <CustomerRecovery /> } />
            <Route path="signUp" element={ <CustomerSignUp /> } />
            {/* Main pages */ }
            <Route element={ <CustomerMenu /> }>
              {/* Personal Info */ }

              {/* Home */ }
              <Route path="home" element={ <CustomerHome /> } />

              {/* Game List */ }
              <Route path="games" element={ <CustomerGameList /> } />
              <Route path="games/:id" />

              {/* Wish List */ }

              {/* Shopping Cart */ }

              <Route path="myself" element={ <CusPersonalInfo /> } />
              <Route path="home" element={ <CustomerHome /> } />
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
              <Route path='profile' element={ <AdminPersonalInfo /> } />
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
                <Route path="game-list/:id/edit" element={ <EditGame /> } />
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



