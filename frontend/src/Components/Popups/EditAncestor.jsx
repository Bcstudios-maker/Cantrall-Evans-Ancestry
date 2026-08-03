import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react';
import { structureDate } from '../../utils/structureDate';
import Button from 'react-bootstrap/Button';
import { editAncestor } from '../../middleware/api';

function EditAncestor({ show, handleHide, ancestor }) {

    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.role?.toLowerCase() === 'admin' ? true : false;

    if(!isAdmin) return (<alert>Cannot Edit Ancestor if you're not an admin.</alert>);
    const [firstName, setFirstName] = useState(ancestor.first_name);
    const [lastName, setLastName] = useState(ancestor.last_name);
    const [dob, setDOB] = useState(structureDate(ancestor.date_of_birth));
    const [dod, setDOD] = useState(structureDate(ancestor.date_of_death));
    const [gender, setGender] = useState(ancestor.gender);
    const [ancestorImage, setAncestorImage] = useState(ancestor.ancestor_image);

    const handleEdit = async (e) => {
        e.preventDefault();
        await editAncestor({imageLink: ancestorImage, firstName: firstName, lastName: lastName, dob: dob, dod: dod, ancestor_id: ancestor.ancestor_id});
        handleHide();
    }

    return (
        <Modal show={show} onHide={handleHide} backdrop='static'>
            <Modal.Header closeButton>
                <Modal.Title>Edit Ancestor Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='edit-form' method='POST' onAbort={handleHide} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    {(ancestorImage != '') ? (<input placeholder='Please Enter Image Link...' className='edit-input' onChange={(e) => setAncestorImage(e.target.value)}/>) : (<input placeholder={ancestorImage} className='edit-input' onChange={(e) => setAncestorImage(e.target.value)}></input>)}
                    <input placeholder={firstName} className='edit-input' onChange={(e) => setFirstName(e.target.value)}></input>
                    <input placeholder={lastName} className='edit-input' onChange={(e) => setLastName(e.target.value)}></input>
                    <input placeholder={dob} className='edit-input' onChange={(e) => setDOB(e.target.value)}></input>
                    <input placeholder={dod != null ? dod : 'Please Enter a Date of Death'} className='edit-input' onChange={(e) => setDOD(e.target.value)}></input>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <form method='POST' style={{display: 'flex', gap: '10px'}} onSubmit={handleEdit}>
                    <Button variant="secondary" onClick={handleHide}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Edit Ancestor
                    </Button>
                </form>
            </Modal.Footer>
        </Modal>
    );
}
export default EditAncestor;