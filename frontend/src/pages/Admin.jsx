import { useState } from "react";
import NavBar from "../Components/NavBar";
import UserCard from "../Components/UserCard";
import { addUser, getUsers } from "../middleware/api";
import '../styles/Admin.css';
import { useEffect } from "react";

function Admin() {


    const [users, setUsers] = useState([]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('viewer');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleAddUser = async (e) => {
        e.preventDefault();
        console.log({username,password,role});

        await addUser({username: username, password: password, role: role});
       
    }


    useEffect(() => {
        const loadUsers = async () => {
            try {
                const users = await getUsers();
                setUsers(users);
            } catch (err){
                console.log(err);
                setError('Failed to load users...');
            } finally {
                setLoading(false);
            }
        }
        loadUsers();
    }, [])

    return (
        <>
            <NavBar />
            <div className="admin-panel">
                <h1>ADMINISTRATOR PANEL</h1>
                <div className="admin-divider"></div>
                <div className="admin-add-user">
                    <h2>ADD USERS</h2>
                    <form className="add-form">
                        <input type='text' placeholder="Enter username..." className="add-input" onChange={(e) => setUsername(e.target.value)}></input>
                        <input type='password' placeholder="Enter password..." className="add-input" onChange={(e) => setPassword(e.target.value)}></input>
                    </form>
                    <div className="add-dropdown">
                        <form className="dropdown-form" onSubmit={handleAddUser} >
                            <select className="dropdown-select" onChange={(e) => setRole(e.target.value)}>
                                <option value="viewer">Viewer</option>
                                <option value="mod">Moderator</option>
                                <option value="admin">Administrator</option>
                            </select>
                            <button className="dropdown-button" type="submit">ADD USER</button>
                        </form>
                    </div>
                </div>
                <div className="admin-remove-user">
                    <h2 id="removeUsers">REMOVE USERS</h2>
                    <div className="users-grid">
                        {users.map((user) => (<UserCard user={user} key={user.user_id}/>))}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Admin;