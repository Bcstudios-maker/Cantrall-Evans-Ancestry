import '../styles/component_styles/DocumentCard.css'

import { useLoaderData } from "react-router-dom";
import { structureDate } from "../utils/structureDate";
import { deleteDocument } from '../middleware/api';
import DeleteModal from './Popups/DeleteModal';
import { useState } from 'react';
import EditInfo from './Popups/EditInfo';
function DocumentCard({ document, user }) {


    const isAdmin = user?.role === 'admin' ? true : false;

    const dateAdded = structureDate(document.date_added);

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleShowEdit = () => setShowEdit(true);
    const handleShowDelete = () => setShowDelete(true);
    const handleHide = () => {setShowEdit(false); setShowDelete(false);}

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
            <EditInfo show={showEdit} handleHide={handleHide} document={document}/>
            <DeleteModal show={showDelete} handleHide={handleHide} data={document}/>
            {isAdmin && (
                <div className='document-buttons' >
                    <button className='document-button' id='delete-document' alt='Delete Document' onClick={handleShowDelete}>X</button>
                    <button className='admin-button' id='edit-info' alt='Edit Ancestor Info' onClick={handleShowEdit}>✎</button>
                </div>
            )}
        </div>

    );
}

export default DocumentCard;