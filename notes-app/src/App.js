import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './component/Home';
import Login from './component/Login';
import Header from './component/Header';
import Register from './component/Register';

function App() {
const [logoutUser, setLogoutUser] = useState();
const savedId = () =>  localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).userId : '';
const[userId, setUserId] = useState(savedId);

  return (
    <BrowserRouter>
      <div className="App">
        <Header logoutUser={logoutUser} setLogoutUser={setLogoutUser}/>
        <Routes>
          <Route path='/' element={<Home logoutUser={logoutUser} setLogoutUser={setLogoutUser} userId={userId} setUserId={setUserId} />} />
          <Route path='login' element={<Login setLogoutUser={setLogoutUser} userId={userId} setUserId={setUserId} />} />
          <Route path='register' element={<Register setLogoutUser={setLogoutUser} userId={userId} setUserId={setUserId}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
