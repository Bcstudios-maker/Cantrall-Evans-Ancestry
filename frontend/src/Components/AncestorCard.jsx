function AncestorCard({ancestor}){
    return (
        <div className="ancestor-card">
            <div className="ancestor-image">
                <img src={ancestor.url} alt={ancestor.firstname}/>
            </div>
            <div className="ancestor-description">
                <h3>{ancestor.firstname} {ancestor.lastname}</h3>
                <h2>ID: {ancestor.ancestor_id}</h2>
            </div>
        </div>
    );
}

export default AncestorCard;