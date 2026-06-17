import Modal from 'react-bootstrap/Modal'
import { useState } from 'react';
import { editDocument } from '../../middleware/api';

function EditInfo({ show, handleHide, document }) {
    
    const [filename, setFilename] = useState(document.filename.toString());
    const [filepath, setFilepath] = useState(document.filepath.toString());

    const handleSubmit = async (e) => {
        await editDocument({filename: filename, filepath: filepath, ancestor_id: document.ancestor_id, info_id: document.info_id});
        window.location.reload();
    }

    return (
        <Modal show={show} onHide={handleHide} backdrop='static'>
            <Modal.Header closeButton>
                <Modal.Title>Edit Document Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='edit-form' method='POST' onSubmit={handleSubmit}>
                    <p>File name:</p>
                    <input placeholder={document.filename} style={{'width': '100%'}} onChange={(e) => setFilename(e.target.value)}></input>
                    <p></p>
                    <p>File path:</p>
                    <input placeholder={document.filepath} style={{'width': '100%'}} onChange={(e) => setFilepath(e.target.value)}></input>
                    <button type='submit' >SUBMIT EDIT</button>
                </form>
            </Modal.Body>
        </Modal>
    );
}
export default EditInfo;