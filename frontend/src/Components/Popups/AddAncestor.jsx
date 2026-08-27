import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { createDeate } from '../../utils/structureDate';
import { addAncestor } from '../../middleware/api';

function AddAncestor({ show, handleHide, ancestor }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDOB] = useState(null);
    const [dod, setDOD] = useState(null);
    const [imageLink, setImageLink] = useState(null);

    const [gender, setGender] = useState('m');
    const [relationType, setRelationType] = useState('');

    const handleAddAncestor = async () => {
        
        let spouseId = null;
        if(ancestor.spouse){
            spouseId = ancestor.spouse.ancestor_id;
        }
        console.log(firstName, lastName, dob, dod, imageLink);
        await addAncestor({ firstName: firstName, lastName: lastName, dob: dob, dod: dod, imageLink: imageLink, gender: gender, relationType: relationType, ancestorId: ancestor.ancestor_id, ancestorGender: ancestor.gender, spouseAncestorId: spouseId});
    }


    return (
        <Modal show={show} onHide={handleHide} backdrop='static'>
            <Modal.Header closeButton>
                <Modal.Title>Add Ancestor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form method='POST' className='add-ancestor-form' style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '75%', justifySelf: 'center'}}>
                    <input className='add-ancestor-input' placeholder='Enter Ancestor First Name...' onChange={(e) => setFirstName(e.target.value)}></input>
                    <input className='add-ancestor-input' placeholder='Enter Ancestor Last Name...' onChange={(e) => setLastName(e.target.value)}></input>
                    <input className='add-ancestor-input' placeholder='Enter Date of Birth...' onChange={(e) => setDOB(e.target.value)}></input>
                    <input className='add-ancestor-input' placeholder='Enter Date of Death...' onChange={(e) => setDOD(e.target.value)}></input>
                    <input className='add-ancestor-input' placeholder='Enter Ancestor Image Link...' onChange={(e) => setImageLink(e.target.value)}></input>
                    <select className='ancestor-gender-dropdown' onChange={(e) => setGender(e.target.value)}>
                        <option className='add-ancestor-option' value='m'>Male</option>
                        <option className='add-ancestor-option' value='f'>Female</option>
                    </select>
                    <select className="ancestor-dropdown" onChange={(e) => setRelationType(e.target.value)}>
                        {}
                        {!ancestor.spouse && (<><option className='add-ancestor-option' value="wife">Husband</option><option className='add-ancestor-option' value="husband">Wife</option></>)}
                        {ancestor.spouse && (<><option className='add-ancestor-option' value="child">Son</option><option className='add-ancestor-option' value="child">Daughter</option></>)}
                    </select>
                </form>

            </Modal.Body>
            <Modal.Footer>
                <form method='POST' onSubmit={handleAddAncestor} style={{display: 'flex', gap: '10px'}}>
                    <Button variant="secondary" onClick={handleHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleHide} type='submit'>
                        Add Ancestor
                    </Button>
                </form>
            </Modal.Footer>
        </Modal>
    );
}

export default AddAncestor;