import '../styles/page_styles/Home.css';

import DocumentCard from '../Components/DocumentCard';
import { useState, useEffect } from "react";
import { getDocuments } from "../middleware/api";
import NavBar from '../Components/NavBar';


function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    const [finalQuery, setFinalQuery] = useState("");

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        setSearchQuery(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setFinalQuery(searchQuery);
    }

    return (
        <>
            <NavBar />
            <main className="home-content" style={{ position: 'absolute' }}>
                <section className="home-banner">
                    <div className='logo-container'></div>
                    <h1 className='logo-title'>CANTRALL EVANS ANCESTRY</h1>
                </section>
                <section className='about-us'>
                    <img className='about-img'></img>
                    <div className='about-content'>
                        <h1>ABOUT US</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.


                        </p>
                    </div>
                </section>
                <section className="document-search">
                    <h2 className='search-header'>SEARCH THROUGH ALL ANCESTOR DOCUMENTATION</h2>
                    <form onSubmit={handleSubmit} className="search-form">
                        <input type="text" placeholder="Search for documents..." className="search-input" value={searchQuery} onChange={handleSearch} />
                        <button type="submit" className='search-btn'>SEARCH</button>
                    </form>
                </section>
                <section className="documents-grid">
                    <ul style={{ listStyle: 'none', padding: '0px', marginTop: '50px', marginBottom: '50px' }}>
                        {documents.map((document) => (String(document.filename.toLowerCase()).startsWith(finalQuery.toLowerCase())) && <li><DocumentCard document={document} key={document.info_id} /></li>)}
                    </ul>
                </section>
            </main>
        </>
    );

}
export default Home;