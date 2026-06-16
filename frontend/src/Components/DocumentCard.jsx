import { structureDate } from "../utils/structureDate";

function DocumentCard({document}){


    const dateAdded = structureDate(document.date_added);
    return (
        <div className="document-content">
            <h2>{document.filename}</h2>
            <a href={document.filepath}>{document.filename}</a>
            <p>{dateAdded}</p>
        </div>
    );
}

export default DocumentCard;