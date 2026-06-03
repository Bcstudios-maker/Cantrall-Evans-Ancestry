import { Navigate } from "react-router-dom";

function AdminRoute({children}) {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role.toLowerCase() === 'admin' ? children : <Navigate to='/Home' />;
}
export default AdminRoute;