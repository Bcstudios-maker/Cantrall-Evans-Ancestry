import AncestorCard from "../Components/AncestorCard";
import { useState, useEffect } from "react";
import { getTrees, getAncestors } from "../middleware/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const [trees, setTrees] = useState([]);
    const [ancestors, setAncestors] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFamilyTrees = async () => {
            try {
                const familyTrees = await getTrees();
                setTrees(familyTrees);
            } catch (err) {
                console.log(err);
                setError("Failed to load family trees");
            }
            finally {
                setLoading(false);
            }
        }

        loadFamilyTrees();
    }, []);



    const handleSearch = (e) => {
        e.preventDefault();

    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for ancestor..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <button type="submit" className="search-button">Search</button>
            </form>
            <div className="ancestors-grid">
                {ancestors.map((ancestor) => ancestor.name.toLowerCase().startsWith(searchQuery.toLowerCase()) && (<AncestorCard ancestor={ancestor} key={ancestor.id}/>))}
            </div>
        </div>
    );

}
export default Home;