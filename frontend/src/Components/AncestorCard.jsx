import { useEffect, useState } from 'react';
import '../styles/component_styles/AncestorCard.css'
import { Handle, Position } from '@xyflow/react';
import { Link } from 'react-router-dom';
import { structureDate } from '../utils/structureDate';
import AddAncestor from './Popups/AddAncestor';
const AncestorCard = ({ data, isChild = false }) => {
    if (!data) return null;

    const birthDate = structureDate(data.date_of_birth);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    let deathDate = null;
    if (data.date_of_death) {
        deathDate = structureDate(data.date_of_death);

    }


    return (

        <div className="ancestor-card" >
            <Link to={{ pathname: `/Ancestors/${data.ancestor_id.toString()}` }} state={data} style={{ textDecoration: 'none' }} >
                {!isChild && (
                    <>
                        <Handle type='target' position={Position.Top} id='top' />
                        <Handle type='source' position={Position.Bottom} id='bottom' />
                    </>
                )}
                <div className="ancestor-image">

                </div>
                <div className="ancestor-description" >
                    <h3>{data.first_name} {data.last_name}</h3>
                    <p>Date of Birth: {birthDate}</p>
                    {data.date_of_death ? (<p>Date of Death: {deathDate}</p>) : (<p>Unknown</p>)}

                </div>
            </Link>
            <AddAncestor show={show} handleHide={handleHide} ancestor={data}/>
            <div className='ancestor-buttons'>
                <button className='ancestor-button' id='edit-ancestor'>✎</button>
                <button className='ancestor-button' id='add-ancestor' style={{fontSize: '22px', paddingBottom: '5px'}} onClick={handleShow}>+</button>
                <button className='ancestor-button' id='remove-ancestor'>X</button>
            </div>
        </div>

    );
}

export default AncestorCard;