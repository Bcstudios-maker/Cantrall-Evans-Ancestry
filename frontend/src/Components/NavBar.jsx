import {Link} from 'react-router-dom';
import '../styles/NavBar.css';
function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className='nav-link'>Home</Link>
            </div>
            <div className='navbar-links'>
                <Link to='/Ancestors' className='nav-link'>Ancestors</Link>
                <Link to='/Trees' className='nav-link'>Family Trees</Link>
            </div>
        </nav>
    );
}
export default NavBar;