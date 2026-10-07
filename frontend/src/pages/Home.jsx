import '../styles/page_styles/Home.css';

import  DocumentCard  from '../Components/DocumentCard';
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
            <main className="home-content">
                <div className="home-banner">
                    <div className='logo-container'></div>
                    <h1 className='logo-title'>CANTRALL EVANS ANCESTRY</h1>
                </div>
                <div className="document-search">
                    <form onSubmit={handleSearch} className="search-form">
                        <input type="text" placeholder="Search for documents..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                        <button type="submit">SEARCH</button>
                    </form>
                </div>
                <div className="documents-grid">
                    <ul style={{listStyle: 'none', padding: '0px', marginTop: '50px', marginBottom: '50px'}}>
                        {documents.map((document) => (searchQuery.startsWith) && <li><DocumentCard document={document} key={document.info_id}/></li>)}
                    </ul>
                </div>
            </main>
        </>
    );

}
export default Home;