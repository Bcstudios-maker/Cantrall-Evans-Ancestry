import { Link } from 'react-router-dom';
import '../styles/component_styles/TreeCard.css'

function TreeCard({ tree }) {

    const tree_id = tree.tree_id;
    
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
                <Link to={{pathname: `/Trees/Ancestors/${tree_id}`}} style={{textDecoration: 'none', alignSelf: 'center'}}><button className='tree-button' id='view-tree' alt='View Tree' >⌕</button></Link>
            </div>
        </div>
    );
}

export default TreeCard;