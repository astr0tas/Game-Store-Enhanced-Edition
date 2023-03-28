import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Component/Customer/Login';
import Signup from './Component/Customer/Signup';
import ForgotPassword from './Component/Customer/ForgotPassword';
import CreateNewPassWord from './Component/Customer/CreateNewPassword';
import Confirmation from './Component/Customer/Confirmation';
import CustomerMenu from './Component/Customer/menu';
// import CusDetail from './Component/Admin/cusdetail';
// import CusList from './Component/Admin/cuslist';
import Dashboard from './Component/Admin/menu';
import Stat from './Component/Admin/Stat';
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
            <Route element={ <Dashboard /> }>
              <Route index element={ <Stat /> } />{/*this is only temporary */ }
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
