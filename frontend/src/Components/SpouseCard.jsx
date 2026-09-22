import { Handle, Position } from '@xyflow/react';
import AncestorCard from './AncestorCard';
import '../styles/component_styles/SpouseCard.css';

function SpouseCard({ data }) {

    return (
        <div className="spouse-card" >
            {data.spouse && (
                <>
                    <Handle type='source' position={Position.Bottom} className='handle source-h' id='bottom' />
                </>
            )}

            {data.spouse && (
                <>
                    <AncestorCard data={data} isChild />
                    <span> + </span>
                    <AncestorCard data={data.spouse} isChild />
                </>
            )}
        </div>
    );
}
export default SpouseCard;