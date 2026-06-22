import '../styles/component_styles/TreeCard.css'

function TreeCard({ tree }) {

    
    return (
        <div className="card-content">
            <h2>{tree.family_name}</h2>
            <div className="tree-image">
                image placeholder
            </div>
            <div className="tree-info">
                Tree information placeholder
            </div>
            <div className="tree-buttons">
                <button className='tree-button' id='view-tree' alt='View Tree'>⌕</button>
            </div>
        </div>
    );
}

export default TreeCard;