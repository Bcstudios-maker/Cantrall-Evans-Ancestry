import '../styles/component_styles/DocumentCard.css'

import { useLoaderData } from "react-router-dom";
import { structureDate } from "../utils/structureDate";

function DocumentCard({ document, user }) {

    const isAdmin = user?.role === 'admin' ? true : false;

    const dateAdded = structureDate(document.date_added);

    const handleDelete = (e) => {
        e.preventDefault();
        alert('Are you sure you wish to delete this document?')
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