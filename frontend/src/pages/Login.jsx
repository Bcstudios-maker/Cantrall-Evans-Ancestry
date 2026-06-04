import '../styles/Login.css'
import { useState } from 'react';
import { loginUser } from '../middleware/api'
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser({username: username, password: password});
        

        localStorage.setItem("user", JSON.stringify(response.user));
        
        if(response.user.role.toLowerCase() === 'admin'){
            navigate('/Admin')
        } else {
            navigate('/Home')
        }
        
        console.log(response);
    };
    return (
        <div className='login-page'>     
            <div className="login-container">
                <h2>LOGIN</h2>
                <div className="login-divider"></div>
                <form onSubmit={handleSubmit} className="login-form">
                    <input type="text" placeholder="Enter your Username..." id='login-username' className="login-input" onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Enter your password..." id='login-password' className="login-input" onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit" className='login-submit'>LOGIN</button>
                </form>
            </div>
        </div>
    );
}
export default Login;