import '../styles/component_styles/AncestorCard.css'

const AncestorCard = ({ancestor}) => {
    return (
        <div className="ancestor-card">
            <div className="ancestor-image">
                <img src={ancestor.url} alt={ancestor.first_name}/>
            </div>
            <div className="ancestor-description">
                <h3>{ancestor.first_name} {ancestor.last_name}</h3>
                <h2>ID: {ancestor.ancestor_id}</h2>
            </div>
            { ancestor.parents?.length > 0 && (
                <div className="ancestor-parents">
                    { ancestor.parents.map(a => (<AncestorCard ancestor={a} key={a.ancestor_id} />))}
                </div>
            )};
        </div>
    );
}

export default AncestorCard;