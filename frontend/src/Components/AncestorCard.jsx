function AncestorCard({ancestor}){
    return (
        <div className="ancestor-card">
            <div className="ancestor-image">
                <img src={ancestor.url} alt={ancestor.name}/>
            </div>
            <div className="ancestor-description">
                <h3>{ancestor.name}</h3>
                <h2>ID: {ancestor.id}</h2>
                <p>{ancestor.description}</p>
            </div>
        </div>
    );
}

export default AncestorCard;