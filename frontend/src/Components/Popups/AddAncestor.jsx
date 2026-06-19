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
    const [imageLink, setImageLink] = useState('');

    const [gender, setGender] = useState('m');
    const [relationType, setRelationType] = useState('');

    const handleAddAncestor = async () => {
        await addAncestor({firstName: firstName, lastName: lastName, dob: dob, dod: dod, imageLink: imageLink, gender: gender, relationType: relationType, ancestorId: ancestor.ancestor_id});
    }



    return (
        <Modal show={show} onHide={handleHide} backdrop='static'>
            <Modal.Header closeButton>
                <Modal.Title>Add Ancestor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='add-ancestor'>
                    <form method='POST'>
                        <input placeholder='Enter Ancestor First Name...' onChange={(e) => setFirstName(e.target.value)}></input>
                        <input placeholder='Enter Ancestor Last Name...' onChange={(e) => setLastName(e.target.value)}></input>
                        <input placeholder='Enter Date of Birth...' onChange={(e) => setDOB(e.target.value)}></input>
                        <input placeholder='Enter Date of Death...' onChange={(e) => setDOD(e.target.value)}></input>
                        <input placeholder='Enter Ancestor Image Link...' onChange={(e) => setImageLink(e.target.value)}></input>
                        <select className='ancestor-gender-dropdown' onChange={(e) => setGender(e.target.value)}>
                            <option value='m'>Male</option>
                            <option value='f'>Female</option>
                        </select>
                        <select className="ancestor-dropdown" onChange={(e) => setRelationType(e.target.value)}>
                            {!ancestor.spouse && (<><option value="wife">Husband</option><option value="husband">Wife</option></>)}
                            {ancestor.spouse && (<><option value="father">Son</option><option value="mother">Daughter</option></>)}
                        </select>
                    </form>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAddAncestor} type='submit'>
                    Add Ancestor
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddAncestor;