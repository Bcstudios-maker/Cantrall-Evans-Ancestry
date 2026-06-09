import { deleteUser } from '../middleware/api';
import '../styles/component_styles/UserCard.css';
import {useState} from 'react';

function UserCard({user}) {

    const handleDeleteUser = async (e) => {
        alert('User ' + user.username + ' is being deleted!');
        await deleteUser({user_id: user.user_id});
        window.location.reload();
    }


    return (
        <div className="user-card">
            <h2 id="user-username">{user.username}</h2>
            <p>User ID: {user.user_id}</p>
            <p>User Role: {user.role}</p>
            <button onClick={handleDeleteUser}>DELETE</button>
        </div>
    );
}
export default UserCard;