import { useParams } from "react-router-dom";
import { addDocument } from "../../middleware/api";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

function AddDocument({ show, handleHide }) {

    
    const { ancestor_id: ancestorId } = useParams();
    const [ filePath, setFilePath ] = useState(null);
    const [ fileName, setFileName ] = useState(null);

    const handleAddDocument = async (e) => {
        const anyEmptyFields = (filePath.toString().trim().length === 0 || fileName.toString().trim().length === 0) ? true : false;
        await addDocument({filepath: filePath, filename: fileName, ancestor_id: ancestorId });
        window.location.reload();
    }

    return (
        <Modal show={show} onHide={handleHide} backdrop='static'>
            <Modal.Header closeButton>
                <Modal.Title>Add Document for Ancestor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form method='POST' onSubmit={handleAddDocument}>
                    <input placeholder="Please Enter a Name for the Document....." style={{ width: '100%' }} onChange={(e) => setFileName(e.target.value)}></input>
                    <input placeholder="Please Enter a File Path....." style={{ width: '100%' }} onChange={(e) => setFilePath(e.target.value)}></input>
                    <button type="submit">Add Document</button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default AddDocument;