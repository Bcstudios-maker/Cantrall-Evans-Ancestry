import { useState } from "react";
import Modal from "react-bootstrap/Modal"
import Button from 'react-bootstrap/Button';



function EditBiography({ show, handleHide, ancestor }) {

    const [bio, setBio] = useState('');

    return (
        <Modal show={show} onHide={handleHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit {ancestor.first_name} {ancestor.last_name}'s Biography</Modal.Title>
            </Modal.Header>
            <form className='edit-form' method='POST' onAbort={handleHide} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Modal.Body>
                    <label>Insert {ancestor.first_name}'s Biography:</label>
                    <textarea id='bio-textarea' placeholder={`Insert Biography for ${ancestor.first_name}...`} value={bio} rows={10} cols={53} onChange={(e) => setBio(e.target.value)}></textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHide}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Edit Bio
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );

}

export default EditBiography;