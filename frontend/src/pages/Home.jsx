import AncestorCard from "../Components/AncestorCard";
import NavBar from "../Components/NavBar";

import  DocumentCard  from '../Components/DocumentCard'
import { useState, useEffect } from "react";
import { getDocuments } from "../middleware/api";


function Home() {

    const [ searchQuery, setSearchQuery ] = useState("");

    const [ documents, setDocuments ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const loadDocuments = async () => {
            try {
                const documents = await getDocuments();
                setDocuments(documents);
            } catch (err) {
                console.log(err.message);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadDocuments();
    }
    , [])

    const handleSearch = (e) => {
        e.preventDefault();

    };

    return (
        <>
            <NavBar />
            <main className="home-content">
                <div className="home">
                    <form onSubmit={handleSearch} className="search-form">
                        <input type="text" placeholder="Search for documents..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                        <button type="submit">SEARCH</button>
                    </form>
                </div>
                <div className="documents-grid">
                    <ul>
                        {documents.map((document) => (searchQuery.startsWith) && <li><DocumentCard document={document} key={document.info_id}/></li>)}

                    </ul>
                </div>
            </main>
        </>
    );

}
export default Home;