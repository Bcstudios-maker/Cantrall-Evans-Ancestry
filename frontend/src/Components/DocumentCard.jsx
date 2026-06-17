import '../styles/component_styles/DocumentCard.css'

import { useLoaderData } from "react-router-dom";
import { structureDate } from "../utils/structureDate";
import { deleteDocument } from '../middleware/api';
import { useState } from 'react';
import EditInfo from './Popups/EditInfo';
function DocumentCard({ document, user }) {


    const isAdmin = user?.role === 'admin' ? true : false;

    const dateAdded = structureDate(document.date_added);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    const handleDelete = () => {
        if (!isAdmin) return;

        deleteDocument({ info_id: document.info_id, user: user });
        window.location.reload();
    }
    return (

        <div className="document-content">
            <a className='document-link' href={document.filepath}>
                <h2 className='document-name'>{document.filename}</h2>
                <p className='document-date'>Date Added: {dateAdded}</p>
            </a>
            <EditInfo show={show} handleHide={handleHide} document={document}/>
            {isAdmin && (
                <div className='document-buttons' >
                    <button className='document-button' id='delete-document' alt='Delete Document' onClick={handleDelete}>X</button>
                    <button className='admin-button' id='edit-info' alt='Edit Ancestor Info' onClick={handleShow}>✎</button>
                </div>
            )}
        </div>

    );
}

export default DocumentCard;