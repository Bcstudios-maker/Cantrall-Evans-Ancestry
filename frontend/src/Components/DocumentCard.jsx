import '../styles/component_styles/DocumentCard.css'

import { useLoaderData } from "react-router-dom";
import { structureDate } from "../utils/structureDate";
import { deleteDocument } from '../middleware/api';

function DocumentCard({ document, user }) {

    console.log(user);

    const isAdmin = user?.role === 'admin' ? true : false;

    const dateAdded = structureDate(document.date_added);

    const handleDelete = () => {
        if(!isAdmin) return;

        deleteDocument({info_id: document.info_id, user: user});
        window.location.reload();
    }
    return (

        <div className="document-content">
            <a className='document-link' href={document.filepath}>
                <h2 className='document-name'>{document.filename}</h2>
                <p className='document-date'>Date Added: {dateAdded}</p>
            </a>
            {isAdmin && (
                <div className='document-buttons' >
                    <button className='document-button' id='delete-document' alt='Delete Document' onClick={handleDelete}>X</button>
                </div>
            )}
        </div>

    );
}

export default DocumentCard;