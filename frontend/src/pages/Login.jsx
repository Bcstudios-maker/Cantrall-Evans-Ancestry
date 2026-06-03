import '../styles/Login.css'

function Login() {
    return (
        <div className='login-page'>     
            <div className="login-container">
                <h2>LOGIN</h2>
                <div className="login-divider"></div>
                <form className="login-form">
                    <input type="text" placeholder="Enter your Username..." id='login-username' className="login-input" />
                    <input type="password" placeholder="Enter your password..." id='login-password' className="login-input" />
                    <button type="submit" className='login-submit'>LOGIN</button>
                </form>
            </div>
        </div>
    );
}
export default Login;