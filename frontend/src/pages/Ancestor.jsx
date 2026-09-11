import '../styles/page_styles/Ancestor.css';

import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import { getAncestorDocuments, GetLocalAncestors } from "../middleware/api";
import AddDocument from '../Components/Popups/AddDocument';
import NavBar from "../Components/NavBar";
import { useLocation, useParams } from "react-router-dom";
import DocumentCard from "../Components/DocumentCard";
import { structureDate } from '../utils/structureDate';
import EditInfo from '../Components/Popups/EditInfo';
import LocalAncestorCard from '../Components/LocalAncestorCard';
import { BuildLocalAncestors } from '../utils/BuildLocalAncestors';
import EditBiography from '../Components/Popups/EditBiography';

function Ancestor() {

    const location = useLocation();
    const data = location.state;

    const user = JSON.parse(localStorage.getItem('user'));

    const isAdmin = user?.role === 'admin' ? true : false;

    const { ancestor_id: ancestorId } = useParams();
    const [documents, setDocuments] = useState([]);
    const [localAncestors, setLocalAncestors] = useState([]);
    const [bio, setBio] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [show, setShow] = useState(false);
    const [showEditBio, setShowEditBio ] = useState(false);

    const handleShow = () => setShow(true);
    const handleShowEditBio = () => setShowEditBio(true);
    const handleHide = () => {setShow(false); setShowEditBio(false);}



    /**
     * Load Documents and Local Ancestors for a specific ancestor ID
     */

    useEffect(() => {
        const loadDocuments = async () => {

            try {

                const documentData = await getAncestorDocuments({ ancestor_id: ancestorId });
                setDocuments(documentData);

            } catch (err) {

                setError(err);
                { <h1>FAILURE RETRIEVING DOCUMENT DATA... PLEASE TRY AGAIN LATER</h1> }
                console.log(err);

            } finally {

                setLoading(false);

            }

        }

        const loadLocalAncestors = async () => {

            // Set both loading and error to their default values. This allows user to fetch local ancestors even if they cant load documents.
            setLoading(true);
            setError(null);

            try {

                const localAncestorData = await GetLocalAncestors({ ancestor_id: ancestorId });
                const { ancestors, relationships } = localAncestorData;

                const localBuild = BuildLocalAncestors(ancestorId, ancestors, relationships);
                setLocalAncestors(localBuild);
                console.log(localBuild.spouse);
                console.log(localBuild.children);
                console.log(localBuild.parents);
            } catch (err) {

                setError(err);
                { <h1>FAILURE RETRIEVING LOCAL ANCESTOR DATA... PLEASE TRY AGAIN LATER</h1> }
                console.log(err);

            } finally {

                setLoading(false);

            }

        }

        if (ancestorId) {

            loadDocuments();
            loadLocalAncestors();

        }

    }, [ancestorId]);

    const birthDate = structureDate(data.date_of_birth);
    let deathDate = null;

    if (data.date_of_death) {

        deathDate = structureDate(data.date_of_death);

    }

    if (!data) { return (<><NavBar /><p>Ancestor not Found</p></>); }

    return (
        <>
            <NavBar />
            <AddDocument show={show} handleHide={handleHide} />
            <EditBiography show={showEditBio} ancestor={data} handleHide={handleHide} />
            <div className='ancestor-body-container' style={{ display: 'flex', flexDirection: 'row', justifySelf: 'center', width: '95%', marginTop: '15px' }}>
                <div className='local-ancestor-relationships'>
                    <div className='ancestor-relationship' id='children'>CHILDREN<div className='ancestor-relationship-seperator' />{localAncestors.children?.map((child) => (<LocalAncestorCard ancestorData={child} relation_type={'child'} currentAncestorGender={data.gender} key={child.ancestor_id} />))}</div>
                    <div className='ancestor-relationship' id='spouse'>SPOUSE<div className='ancestor-relationship-seperator' />{localAncestors.spouse && (<LocalAncestorCard ancestorData={localAncestors.spouse} relation_type={'spouse'} currentAncestorGender={data.gender} key={localAncestors.spouse.ancestor_id} />)}</div>
                    <div className='ancestor-relationship' id='parents'>PARENTS<div className='ancestor-relationship-seperator' />{localAncestors.parents?.map((parent) => (<LocalAncestorCard ancestorData={parent} relation_type={'parent'} currentAncestorGender={data.gender} key={parent.ancestor_id} />))}</div>
                </div>
                <div className="ancestor-info-container">
                    <div className='ancestor-info'>
                        <h1 className='ancestor-name'>{data.first_name} {data.last_name}</h1>
                        <h2>{isAdmin && (data.ancestor_id)}</h2>
                        <h2 className='ancestor-dates'>Born: {birthDate}</h2>
                        <h2 className='ancestor-dates'>Died: {data.date_of_death ? (deathDate) : 'Unknown'}</h2>
                    </div>
                </div>
            </div>
            <div className='ancestor-bio-container'>
                <div className='ancestor-bio'>
                    <div className='ancestor-bio-headerbutton'>
                        {isAdmin ? (<button className='admin-button' id='edit-bio' alt='Edit Biography' title='Edit Biography' onClick={handleShowEditBio}>✎</button>) : null}
                        <h2 className='bio-header'>{data.first_name} {data.last_name}'s Biography: </h2>
                    </div>
                    <div className='biography-container'>
                        {bio ? (<p>BLAH BLAH BLAH</p>) : (<p>NO ANCESTOR BIOGRAPHY</p>)}
                    </div>
                </div>
                <div className='ancestor-documents'>
                    {
                        isAdmin ?
                            (
                                <div className='admin-buttons' id='admin-buttons-container'>
                                    <button className='admin-button' id='add-document' alt='Add Document' title='Add Document' onClick={handleShow}>+</button>
                                </div>
                            ) : null
                    }
                    <ul className="document-grid">
                        {documents?.map((document) => (<li key={document.info_id}><DocumentCard document={document} user={user} key={document.info_id} /></li>))}
                    </ul>
                </div>
            </div>
        </>

    );
}

export default Ancestor;