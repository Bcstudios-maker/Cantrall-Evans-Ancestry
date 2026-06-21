import { useEffect, useState } from 'react';
import '../styles/component_styles/AncestorCard.css'
import { Handle, Position } from '@xyflow/react';
import { Link } from 'react-router-dom';
import { structureDate } from '../utils/structureDate';
import AddAncestor from './Popups/AddAncestor';
import EditAncestor from './Popups/EditAncestor';
import DeleteModal from './Popups/DeleteModal';
const AncestorCard = ({ data, isChild = false }) => {
    if (!data) return null;

    const birthDate = structureDate(data.date_of_birth);

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleShowAdd = () => setShowAdd(true);
    const handleShowEdit = () => setShowEdit(true);
    const handleShowDelete = () => setShowDelete(true);
    const handleHide = () => {
        setShowAdd(false); setShowEdit(false); setShowDelete(false);
    };

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
            <AddAncestor show={showAdd} handleHide={handleHide} ancestor={data} />
            <EditAncestor show={showEdit} handleHide={handleHide} ancestor={data} />
            <DeleteModal show={showDelete} handleHide={handleHide} data={data} />
            <div className='ancestor-buttons'>
                <button className='ancestor-button' id='edit-ancestor' onClick={handleShowEdit}>✎</button>
                <button className='ancestor-button' id='add-ancestor' style={{ fontSize: '22px', paddingBottom: '5px' }} onClick={handleShowAdd}>+</button>
                <button className='ancestor-button' id='remove-ancestor' onClick={handleShowDelete}>X</button>
            </div>
        </div>

    );
}

export default AncestorCard;