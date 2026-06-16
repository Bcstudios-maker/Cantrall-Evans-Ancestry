import '../styles/component_styles/DocumentCard.css'

import { useLoaderData } from "react-router-dom";
import { structureDate } from "../utils/structureDate";

function DocumentCard({ document, user }) {


    const dateAdded = structureDate(document.date_added);
    return (
        <a className='document-link' href={document.filepath}>
            <div className="document-content">
                <h2 className='document-name'>{document.filename}</h2>
                <p className='document-date'>{dateAdded}</p>
            </div>
        </a>
    );
}

export default DocumentCard;