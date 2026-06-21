import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react';
import { structureDate } from '../../utils/structureDate';
import Button from 'react-bootstrap/Button';

function EditAncestor({ show, handleHide, ancestor }) {

    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.role?.toLowerCase() === 'admin' ? true : false;

    if(!isAdmin) return (<alert>Cannot Edit Ancestor if you're not an admin.</alert>);
    const [firstName, setFirstName] = useState(ancestor.first_name.toString());
    const [lastName, setLastName] = useState(ancestor.last_name.toString());
    const [dob, setDOB] = useState(structureDate(ancestor.date_of_birth));
    const [dod, setDOD] = useState(structureDate(ancestor.date_of_death));
    const [gender, setGender] = useState(ancestor.gender);
    const [ancestorImage, setAncestorImage] = useState(ancestor.ancestor_image);


    return (
        <Modal show={show} onHide={handleHide} backdrop='static'>
            <Modal.Header closeButton>
                <Modal.Title>Edit Document Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='edit-form' method='POST' onAbort={handleHide}>
                    {(ancestorImage != '') ? (<input placeholder='Please Enter Image Link...' className='edit-input'/>) : (<input placeholder={ancestorImage} className='edit-input'></input>)}
                    <input placeholder={firstName} className='edit-input'></input>
                    <input placeholder={lastName} className='edit-input'></input>
                    <input placeholder={dob} className='edit-input'></input>
                    <input placeholder={dod} className='edit-input'></input>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <form method='POST' style={{display: 'flex', gap: '10px'}}>
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
export default EditAncestor;