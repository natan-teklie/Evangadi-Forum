import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, createContext } from 'react';

export const AppState = createContext();
function App() {
  
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  async function checkUser(){
    try {
     const { data } = await axios.get('/users/check', {
        headers:{
          Authorization: 'Bearer ' + token,
        },
      });

      setUser(data)
      console.log(data)
    } catch (error) {
      console.log(error.response);
      navigate('/login');
    }
  }

  useEffect(()=>{
    checkUser()
  }, [])

  return (
    <AppState.Provider value={{ user, setUser }} classname ="app">
    
    <Routes>
      <Route path='/' element= {<Home/>}/>
      <Route  path='/login' element ={ <Login/>}/>
      <Route path='/register' element ={<Register/>}/>
    </Routes>

    </AppState.Provider>
  );
}

export default App;
