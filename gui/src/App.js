import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/Register/Register";
import Profile from './components/Profile/Profile';
import Updateuser from './components/UpdateUser/Updateuser';

function App() {
  const {user}=useContext(AuthContext);
  return (
    
    <Router>
      <Routes>
        {/* <Route path="/body" element={<Home/>}/> */}
        <Route exact path="/" element={user?<Home/>:<SignUp/>}/>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/signUp" element={user ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/profile/:username" element={<Profile/>}/>
        <Route path="/update/:id" element={<Updateuser/>}/>
      </Routes>
    </Router>
  );
}

export default App;
