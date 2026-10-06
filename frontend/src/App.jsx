import './styles/App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Ancestors from './pages/Ancestors';
import NavBar from './Components/NavBar';
import Document from './pages/Document';
import Admin from './pages/Admin';
import AdminRoute from './Routes/AdminRoute';
import Trees from './pages/Trees';
import Ancestor from './pages/Ancestor';
import {Routes, Route} from 'react-router-dom';

function App() {

  return (
    <main className='main-content'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Ancestors' element={<Ancestors/>}/>
        <Route path='/Trees' element={<Trees/>}/>
        <Route path='/Trees/Ancestors/:tree_id' element={<Ancestors/>}/>
        <Route path='/Admin' element={<AdminRoute><Admin /></AdminRoute>}/>
        <Route path='/Ancestors/:ancestor_id' element={<Ancestor/>}/>
        <Route path='/Document/:info_id' element={<Document/>}/>
      </Routes>
    </main>
  );
}

export default App;
