import NavBar from "../Components/NavBar";
import TreeCard from "../Components/TreeCard";
import { GetTrees } from "../middleware/api";
import '../styles/page_styles/Trees.css';
import { useEffect, useState } from "react";

function Trees() {

    const [trees, setTrees] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleGetTrees = async () => {
            try {
                const result = await GetTrees();
                console.log(result);
                setTrees(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        handleGetTrees();
    }, []);

    return (
        <>
            <NavBar />
            <div className="trees-content">
                <h1>Family Trees</h1>
                <div className="grid-container">
                    <div className="trees-grid">
                        {trees?.map((tree) => (<TreeCard tree={tree}/>))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Trees;