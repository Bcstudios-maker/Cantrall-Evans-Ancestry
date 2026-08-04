import '../styles/page_styles/Ancestor.css';

import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import { getAncestorDocuments } from "../middleware/api";
import AddDocument from '../Components/Popups/AddDocument';
import NavBar from "../Components/NavBar";
import { useLocation, useParams } from "react-router-dom";
import DocumentCard from "../Components/DocumentCard";
import { structureDate } from '../utils/structureDate';
import EditInfo from '../Components/Popups/EditInfo';

function Ancestor() {
    
    const location = useLocation();
    const data = location.state;

    const user = JSON.parse(localStorage.getItem('user'));

    const isAdmin = user?.role === 'admin' ? true : false;
    
    const {ancestor_id: ancestorId} = useParams();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);


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
            <AddDocument show={show} handleHide={handleHide}/>
            {
                isAdmin ?  
                (
                    <div className='admin-buttons'>
                        <button className='admin-button' id='add-document' alt='Add Document' onClick={handleShow}>+</button>
                    </div>
                ) : null
            }
            <div className='ancestor-container' style={{display: 'flex', flexDirection: 'row', justifySelf: 'center', width: '95%', marginTop: '15px'}}>

                <div className='ancestor-relationships'>
                    <div className='ancestor-relationship' id='children'><span className='ancestor-relationship-seperator'></span>children</div>
                    <div className='ancestor-relationship' id='spouse'><span className='ancestor-relationship-seperator'></span>spouse</div>
                    <div className='ancestor-relationship' id='parents'><span className='ancestor-relationship-seperator'></span>parents</div>
                </div>
                <div className="ancestor-info">
                    <h1 className='ancestor-name'>{data.first_name} {data.last_name}</h1>
                    <h2 className='ancestor-dates'>Born: {birthDate}</h2>
                    <h2 className='ancestor-dates'>Died: {data.date_of_death ? (deathDate) : 'Unknown'}</h2>
                    <div className='ancestor-documents'>
                        <ul className="document-grid">
                            {documents?.map((document) => (<li key={document.info_id}><DocumentCard document={document} user={user} key={document.info_id}/></li>))}
                        </ul>
                        
                    </div>
                </div>
            </div>
        </>

    );
}

export default Ancestor;