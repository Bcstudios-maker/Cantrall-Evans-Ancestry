import { Handle, Position } from '@xyflow/react';
import AncestorCard from './AncestorCard';
import '../styles/component_styles/SpouseCard.css';

function SpouseCard({data}){

    return (
        <div className="spouse-card" >
            
            <Handle type='target' position={Position.Top} id='top' />
            <Handle type='source' position={Position.Bottom} id='bottom'/>
            <AncestorCard data={data} isChild/>
            {data.spouse && (
                <>
                    <span>+</span>
                    <AncestorCard data={data.spouse} isChild/>
                </>
            )}
        </div>
    );
}
export default SpouseCard;