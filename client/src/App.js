import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Component/Login';
import Signup from './Component/Signup';
import ForgotPassword from './Component/ForgotPassword';
import CreateNewPassWord from './Component/CreateNewPassword';
import Confirmation from './Component/Confirmation';
function App() {
  return (
    <div className="App">
      <Confirmation/>     
    </div>
  );
}

export default App;
