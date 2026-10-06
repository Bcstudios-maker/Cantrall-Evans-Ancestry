import { Handle, Position } from '@xyflow/react';
import AncestorCard from './AncestorCard';
import '../styles/component_styles/SpouseCard.css';

function SpouseCard({ data }) {
    const spouseCardId = Number(data.ancestor_id) + Number(data.spouse.ancestor_id);
    return (
        <div className="spouse-card" >
            {data.spouse && (
                <>
                    <Handle type='target' position={Position.Top} id={`st${data.ancestor_id}`} style={{left: '225px'}}/>
                    <Handle type='target' position={Position.Top} id={`st${data.spouse.ancestor_id}`} style={{left: '727px'}}/>
                    <Handle type="source" position={Position.Bottom} id={`ss${spouseCardId}`} />
                </>
            )}

            {data.spouse && (
                <>
                    <AncestorCard data={data} isChild/>
                    <span> + </span>
                    <AncestorCard data={data.spouse} isChild/>
                </>
            )}
        </div>
    );
}
export default SpouseCard;