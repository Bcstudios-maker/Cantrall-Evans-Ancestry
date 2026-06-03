import './styles/App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Ancestors from './pages/Ancestors';
import NavBar from './Components/NavBar';
import {Routes, Route} from 'react-router-dom';

function App() {

  return (
    <main className='main-content'>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Ancestors' element={<Ancestors/>}/>
      </Routes>
    </main>
  );
}

export default App;
