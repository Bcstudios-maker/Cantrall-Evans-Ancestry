import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../styles/component_styles/LocalAncestorCard.css'

function LocalAncestorCard({ ancestorData, relation_type, currentAncestorGender }) {

    const [relation, setRelation] = useState('');

    useEffect(() => {

        const SetRelation = () => {
            switch (relation_type) {
                case 'child':
                    if (currentAncestorGender === 'm') {
                        setRelation('Father');
                    } else {
                        setRelation('Mother');
                    }
                    break;
                case 'parent':
                    if (currentAncestorGender === 'm') {
                        setRelation('Son');
                    } else {
                        setRelation('Daughter');
                    }
                    break;
                case 'spouse':
                    if (currentAncestorGender === 'm') {
                        setRelation('Husband');
                    } else {
                        setRelation('Wife');
                    }
                    break;
                default:
                    console.log('Failed to determine relation.');
                    break;
            }
        }

        SetRelation();

    }, [ancestorData])

    return (
        <div className='local-ancestor-card' >
            <p>{String(relation)} of</p>
            <h4>{ancestorData.first_name} {ancestorData.last_name}</h4>
        </div>
    );
}

export default LocalAncestorCard;