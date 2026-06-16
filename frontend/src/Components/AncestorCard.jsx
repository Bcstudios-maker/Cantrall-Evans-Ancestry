import { useEffect } from 'react';
import '../styles/component_styles/AncestorCard.css'
import { Handle, Position } from '@xyflow/react';
import { Link } from 'react-router-dom';
import { structureDate } from '../utils/structureDate';
const AncestorCard = ({data, isChild = false}) => {
    if(!data) return null;

    const birthDate = structureDate(data.date_of_birth);

    let deathDate = null;
    if(data.date_of_death){
        deathDate = structureDate(data.date_of_death);

    }


    return (
        <Link to={{pathname: `/Ancestors/${data.ancestor_id.toString()}`}} state={data} style={{textDecoration: 'none'}} >
            <div className="ancestor-card" >
                {!isChild && (
                    <>
                        <Handle type='target' position={Position.Top} id='top' />
                        <Handle type='source' position={Position.Bottom} id='bottom'/>
                    </>
                )}
                <div className="ancestor-image">
                    
                </div>
                <div className="ancestor-description" >
                    <h3>{data.first_name} {data.last_name}</h3>
                    <p>Date of Birth: {birthDate}</p>
                    {data.date_of_death ? (<p>Date of Death: {deathDate}</p>) : (<p>Unknown</p>)}
                    <h2>ID: {data.ancestor_id}</h2>
                </div>

            </div>
        </Link>
    );
}

export default AncestorCard;