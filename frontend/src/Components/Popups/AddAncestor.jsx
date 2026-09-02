import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { createDeate } from '../../utils/structureDate';
import { addAncestor } from '../../middleware/api';
import { useParams } from 'react-router-dom';

function AddAncestor({ show, handleHide, ancestor }) {
    
    

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDOB] = useState(null);
    const [dod, setDOD] = useState(null);
    const [imageLink, setImageLink] = useState(null);

    const [gender, setGender] = useState('m');
    const [relationType, setRelationType] = useState(ancestor.spouse ? 'child' : 'spouse');

    const {tree_id: tree_id} = useParams();


    const handleAddAncestor = async (e) => {

        e.preventDefault();
        
        await addAncestor({ tree_id: tree_id ? tree_id : null, firstName: firstName, lastName: lastName, dob: dob, dod: dod, imageLink: imageLink, gender: gender, relationType: relationType ? relationType : null, ancestorId: ancestor.ancestor_id ? ancestor.ancestor_id : null, ancestorGender: ancestor.gender ? ancestor.gender : null, spouseAncestorId: ancestor.spouse ? ancestor.spouse.ancestor_id : null});
        handleHide();

    }




    return (
        <Modal show={show} onHide={handleHide} backdrop='static'>
            <Modal.Header closeButton>
                <Modal.Title>Add Ancestor</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleAddAncestor}>
                <Modal.Body>
                    <div className='add-ancestor-form' style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '75%', justifySelf: 'center'}}>
                        <input className='add-ancestor-input' placeholder='Enter Ancestor First Name...' onChange={(e) => setFirstName(e.target.value)}></input>
                        <input className='add-ancestor-input' placeholder='Enter Ancestor Last Name...' onChange={(e) => setLastName(e.target.value)}></input>
                        <input className='add-ancestor-input' placeholder='Enter Date of Birth...' onChange={(e) => setDOB(e.target.value)}></input>
                        <input className='add-ancestor-input' placeholder='Enter Date of Death...' onChange={(e) => setDOD(e.target.value)}></input>
                        <input className='add-ancestor-input' placeholder='Enter Ancestor Image Link...' onChange={(e) => setImageLink(e.target.value)}></input>
                        <select className='ancestor-gender-dropdown' value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option className='add-ancestor-option' value='m'>Male</option>
                            <option className='add-ancestor-option' value='f'>Female</option>
                        </select>
                        <select className="ancestor-dropdown" value={relationType} onChange={(e) => setRelationType(e.target.value)}>
                            {(!ancestor.spouse || ancestor.spouse.length === 0) && (<><option className='add-ancestor-option' value="husband">Husband</option><option className='add-ancestor-option' value="wife">Wife</option></>)}
                            {(!ancestor.parents || ancestor.parents.length === 0) && (<><option className='add-ancestor-option' value="son">Father</option><option className='add-ancestor-option' value="daughter">Mother</option></>)}
                            {(ancestor.parents && ancestor.spouse) && (<><option className='add-ancestor-option' value="mChild">Son</option><option className='add-ancestor-option' value="wChild">Daughter</option></>)}
                        </select>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" type='button' onClick={handleHide}>Close</Button>
                        <Button variant="primary" type='submit'>Add Ancestor</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default AddAncestor;