import { Handle, Position } from '@xyflow/react';
import AncestorCard from './AncestorCard';
import '../styles/component_styles/SpouseCard.css';

function SpouseCard({data}){

    return (
        <div className="spouse-card" >
            
            <Handle type='source' position={Position.Top} id='bottom' />
            <Handle type='target' position={Position.Bottom} id='top'/>
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