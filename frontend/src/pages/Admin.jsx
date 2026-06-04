import AdminNav from "../Components/AdminNav";
import NavBar from "../Components/NavBar";

function Admin(){
    return (
        <>
            <NavBar/>
            <div className="admin-panel">
                <h1>ADMINISTRATOR PANEL</h1>
                <div className="admin-add-user">
                    <form>
                        <input placeholder="Enter username..." className="add-input"></input>
                        <input placeholder="Enter password..." className="add-input"></input>
                    </form>
                </div>
                <div className="admin-remove-user">
                    
                </div>
            </div>
        </>
    );
}
export default Admin;