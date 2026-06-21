import Button from "react-bootstrap/Button"

import Modal from "react-bootstrap/Modal"

function DeleteModal({ show, handleHide, data }) {

    const handleDelete = () => {

    };

    return (
        <Modal show={show} onHide={handleHide} backdrop='static'>
            <Modal.Header closeButton>
                {data.info_id ? (<Modal.Title>Are you sure you want to delete {data.filename}?</Modal.Title>) : (<Modal.Title>Are you sure you want to delete {data.first_name} {data.last_name}?</Modal.Title>)}
            </Modal.Header>
            <Modal.Footer>
                <form method="POST" style={{display: 'flex', gap: '10px'}} >
                    <Button variant='secondary' onClick={handleHide}>No</Button>
                    <Button variant='primary' onClick={handleHide} type="submit">Yes</Button>
                </form>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;