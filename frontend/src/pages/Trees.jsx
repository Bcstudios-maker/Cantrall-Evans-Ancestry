import NavBar from "../Components/NavBar";
import TreeCard from "../Components/TreeCard";
import '../styles/page_styles/Trees.css';

function Trees() {
    return (
        <>
            <NavBar />
            <div className="trees-content">
                <h1>Family Trees</h1>
                <div className="grid-container">
                    <div className="trees-grid">
                        <TreeCard></TreeCard>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Trees;