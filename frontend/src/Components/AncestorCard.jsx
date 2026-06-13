import { useEffect } from 'react';
import '../styles/component_styles/AncestorCard.css'
import { Handle, Position } from '@xyflow/react';

const AncestorCard = ({data, isChild = false}) => {
    if(!data) return null;
    return (
        <div className="ancestor-card" >
            {!isChild && (
                <>
                    <Handle type='target' position={Position.Top} id='top' />
                    <Handle type='source' position={Position.Bottom} id='bottom'/>
                </>
            )}
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