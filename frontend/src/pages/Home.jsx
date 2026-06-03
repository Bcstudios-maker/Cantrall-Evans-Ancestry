import AncestorCard from "../Components/AncestorCard";
import { useState, useEffect } from "react";
import { getTrees, getAncestors } from "../middleware/api";
import NavBar from "../Components/NavBar";

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

    useEffect(() => {
        const loadAncestors = async () => {
            try{
                const ancestors = await getAncestors();
                setAncestors(ancestors);
            } catch(err) {
                console.log(err.message);
                setError("Failed to load Ancestors");
            } finally {
                setLoading(false);
            }
        }
        loadAncestors();
    }, []);


    const handleSearch = (e) => {
        e.preventDefault();

    };

    return (
        <>
            <NavBar />
            <main className="home-content">
                <div className="home">
                    <form onSubmit={handleSearch} className="search-form">
                        <input type="text" placeholder="Search for ancestor..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                        <button type="submit" className="search-button">Search</button>
                    </form>
                    <div className="ancestors-grid">
                        {ancestors.map((ancestor) => (<AncestorCard ancestor={ancestor} key={ancestor.ancestor_id}/>))}
                    </div>
                </div>
            </main>
        </>
    );

}
export default Home;