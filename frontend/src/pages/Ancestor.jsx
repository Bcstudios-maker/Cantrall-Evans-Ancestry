import '../styles/page_styles/Ancestor.css';

import { useEffect, useState } from "react";
import { getAncestorDocuments } from "../middleware/api";
import NavBar from "../Components/NavBar";
import { useLocation, useParams } from "react-router-dom";
import DocumentCard from "../Components/DocumentCard";
import { structureDate } from '../utils/structureDate';

function Ancestor() {
    
    const location = useLocation();
    const data = location.state;

    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.role === 'admin' ? true : false;
    
    const {ancestor_id: ancestorId} = useParams();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDocuments = async () => {
            try {
                const documentData = await getAncestorDocuments({ancestor_id: ancestorId});

                console.log(documentData);
                setDocuments(documentData);
            } catch (err) {
                setError(err);
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        if(ancestorId){
            loadDocuments();
        }
    }, [ancestorId]);

    const birthDate = structureDate(data.date_of_birth);

    let deathDate = null;
    if (data.date_of_death) {
        deathDate = structureDate(data.date_of_death);

    }
    if (!data) {return (<><NavBar /><p>Ancestor not Found</p></>);}
    return (
        <>
            <NavBar />
            {
                isAdmin && 
                (
                    <div className='admin-buttons'>
                        <button className='admin-button' id='add-document' alt='Add Document'>+</button>
                        <button className='admin-button' id='edit-info' alt='Edit Ancestor Info'>✎</button>
                    </div>
                )
            }
            <div className="ancestor-info">
                <h1 className='ancestor-name'>{data.first_name} {data.last_name}</h1>
                <h2 className='ancestor-dates'>Born: {birthDate}</h2>
                <h2 className='ancestor-dates'>Died: {data.date_of_death ? (deathDate) : 'Unknown'}</h2>
                <div className='ancestor-documents'>
                    <ul className="document-grid">
                        {documents?.map((document) => (<li><DocumentCard document={document} key={document.info_id}/></li>))}
                    </ul>
                    
                </div>
            </div>
        </>

    );
}

export default Ancestor;