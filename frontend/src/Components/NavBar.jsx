import {Link} from 'react-router-dom';
import '../styles/NavBar.css';
function NavBar() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    return (

        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/Home" className='nav-link'>Home</Link>
            </div>
            <div className='navbar-links'>
                <Link to='/Ancestors' className='nav-link'>Ancestors</Link>
                <Link to='/Trees' className='nav-link'>Family Trees</Link>
                {user?.role?.toLowerCase() === 'admin' && (<Link to='/Admin' className='nav-link'>Admin Panel</Link>)}
            </div>
        </nav>
    );
}
export default NavBar;