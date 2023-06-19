import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';

/* Customer pages */
// Authentication pages
import CustomerLogin from './Component/Customer/Authentication/Login/Login';
import CustomerRecovery from './Component/Customer/Authentication/Recovery/Recovery';
import CustomerSignUp from './Component/Customer/Authentication/SignUp/SignUp';
// Customer navbar
import CustomerMenu from './Component/Customer/Menu/menu';
// Customer Personal Info
import CustomerPersonalInfo from './Component/Customer/PersonalInformation/PersonalInformation';
// Customer Home
import CustomerHome from './Component/Customer/Home/Home';
// Customer Games
import CustomerGameList from './Component/Customer/Games/List/GameList';
import CustomerGameDetail from './Component/Customer/Games/Detail/GameDetail';
// Customer Wishlist
import CustomerWishList from './Component/Customer/WishList/WishList';
// Customer Shopping Cart
import Cart from './Component/Customer/ShoppingCart/Cart/Cart';
import Receipt from './Component/Customer/ShoppingCart/Receipt/Receipt';

/* Admin pages */
// Authentication pages
import AdminLogin from './Component/Admin/Authentication/Login/Login.jsx';
import AdminRecovery from './Component/Admin/Authentication/Recovery/Recovery';
// Admin navbar
import AdminMenu from './Component/Admin/Menu/menu';
// Admin Personal Info
import AdminPersonalInfo from './Component/Admin/PersonalInformation/PersonalInformation';
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
import Statistic from './Component/Admin/Statistic/Statistic';

const NotFound = () =>
{
  document.title = "Page not found";
  return (
    <div className='w-100 h-100 d-flex flex-column'>
      <p className='text-center' style={ { fontSize: '10rem' } }>404</p>
      <h1 className='text-center' style={ { fontSize: '2rem' } }>Ooops, page not found</h1>
      <p className='mb-0 text-center'>The page you are looking for does not exist on the server or an error has occurred.</p>
      <p className='text-center'>Go back or choose a new direction!</p>
    </div>
  )
}

function App()
{
  const [isPaid, setIsPaid] = useState(false);

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
              <Route path="profile" element={ <CustomerPersonalInfo /> } />
              {/* Home */ }
              <Route path="home" element={ <CustomerHome /> } />
              {/* Game List */ }
              <Route path="games" element={ <CustomerGameList /> } />
              <Route path="games/:id" element={ <CustomerGameDetail /> } />
              {/* Wish List */ }
              <Route path='wish-list' element={ <CustomerWishList /> } />
              {/* Shopping Cart */ }
              <Route>
                <Route path='cart' element={ <Cart setIsPaid={ setIsPaid } /> } />
                <Route path='cart/receipt' element={ <Receipt isPaid={ isPaid } /> } />
              </Route>
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
              <Route path="statistic" element={ <Statistic /> } />
            </Route>
          </Route>
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;



