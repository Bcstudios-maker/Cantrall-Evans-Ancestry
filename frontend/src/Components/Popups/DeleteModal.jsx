import Button from "react-bootstrap/Button"

import Modal from "react-bootstrap/Modal"
import { deleteDocument, deleteAncestor } from "../../middleware/api";

function DeleteModal({ show, handleHide, data }) {

    const isAncestor = data.ancestor_id ? true : false;
    const isDocument = data.info_id ? true : false;

    const handleDelete = async (e) => {
        e.preventDefault();
        if (isAncestor) await deleteAncestor({ ancestor_id: data.ancestor_id });
        if (isDocument) await deleteDocument({info_id: data.info_id, user: user});

        handleHide();

    };

    return (
        <Modal show={show} onHide={handleHide} backdrop='static'>
            <Modal.Header closeButton>
                {data.info_id ? (<Modal.Title>Are you sure you want to delete {data.filename}?</Modal.Title>) : (<Modal.Title>Are you sure you want to delete {data.first_name} {data.last_name}?</Modal.Title>)}
            </Modal.Header>
            <Modal.Footer>
                <form method="POST" style={{ display: 'flex', gap: '10px' }} onSubmit={handleDelete} >
                    <Button variant='secondary' onClick={handleHide}>No</Button>
                    <Button variant='primary' type="submit">Yes</Button>
                </form>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;