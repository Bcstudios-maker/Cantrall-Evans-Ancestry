import '../styles/UserCard.css'
function UserCard({user}) {
    return (
        <div className="user-card">
            <h2>{user.username}</h2>
            <p>User ID: {user.user_id}</p>
            <p>User Role: {user.role}</p>
            <button type="submit">DELETE</button>
        </div>
    );
}
export default UserCard;