import { useEffect } from 'react';
import '../styles/component_styles/AncestorCard.css'
import { Handle, Position } from '@xyflow/react';

const AncestorCard = ({data}) => {

    return (
        <div className="ancestor-card" > 
            <Handle type='source' position={Position.Top} id='bottom' />
            <Handle type='target' position={Position.Bottom} id='top'/>
           
            <div className="ancestor-image">
                
            </div>
            <div className="ancestor-description">
                <h3>{data.first_name} {data.last_name}</h3>
                <h2>ID: {data.ancestor_id}</h2>
            </div>

        </div>
    );
}

export default AncestorCard;