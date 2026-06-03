import './styles/App.css';
import Home from './pages/Home';
import Ancestors from './pages/Ancestors';
import NavBar from './Components/NavBar';
import {Routes, Route} from 'react-router-dom';

function App() {
  const ancestorIdNumber = 1;

  return (
    <div>
      <NavBar/>
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Ancestors' element={<Ancestors/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
