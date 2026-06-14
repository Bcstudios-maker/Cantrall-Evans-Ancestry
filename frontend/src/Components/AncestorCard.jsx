import { useEffect } from 'react';
import '../styles/component_styles/AncestorCard.css'
import { Handle, Position } from '@xyflow/react';

const AncestorCard = ({data, isChild = false}) => {
    if(!data) return null;

    const birth = data.date_of_birth.toString();
    
    const birthDate = birth.substring(0, birth.indexOf('T'));

    const deathDate = null;
    if(data.date_of_death){
        const death = data.date_of_death.toString();
        const deathDate = death.substring(0, death.indexOf('T'));

    }
    
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
                <p>Date of Birth: {birthDate}</p>
                {data.date_of_death && (<p>Date of Death: {deathDate}</p>)}

                <h2>ID: {data.ancestor_id}</h2>
            </div>

        </div>
    );
}

export default AncestorCard;