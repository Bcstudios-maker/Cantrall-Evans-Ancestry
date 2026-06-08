function Document({document}){
    return (
        <div className="document-content">
            <h1>{document.filename}</h1>
            <a href={document.filepath}>{document.filename}</a>
            <p>{document.date_added}</p>
        </div>
    );
}

export default Document;