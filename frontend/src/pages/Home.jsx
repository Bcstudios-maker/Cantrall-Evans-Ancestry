import AncestorCard from "../Components/AncestorCard";
import NavBar from "../Components/NavBar";

import  Document  from '../Components/Document'
import { useState, useEffect } from "react";
import { getTrees, getAncestors } from "../middleware/api";


function Home() {

    const [ searchQuery, setSearchQuery ] = useState("");

    const [ documents, setDocuments ] = useState([]);


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
                    {documents.map(documents => <Document document={documents}/>)}
                </div>
            </main>
        </>
    );

}
export default Home;