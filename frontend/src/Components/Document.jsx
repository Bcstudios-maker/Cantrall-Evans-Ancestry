function Document({document}){
    return (
        <div className="document-content">
            <h1>{document.title}</h1>
            <a href={document.url}></a>
        </div>
    );
}

export default Document;