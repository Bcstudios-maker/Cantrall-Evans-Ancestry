import AncestorCard from "../Components/AncestorCard";
import { useState, useEffect } from "react";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");


    const ancestors = [
        { id: 0, name: 'Benjamin Martel Cantrall', description: 'WOWZERS' },
        { id: 1, name: 'James Robert Cantrall', description: 'WOWZERS' },
        { id: 2, name: 'Sharon Marie Cantrall (Evans)', description: 'WOWZERS' }
    ];

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