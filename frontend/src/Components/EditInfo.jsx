import Modal from 'react-bootstrap/Modal'

function EditInfo({ show, handleHide, document }) {
    return (

        <Modal show={show} onHide={handleHide} backdrop='static'>
            <Modal.Header closeButton>
                <Modal.Title>Edit Document Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='edit-form'>
                    <p>File name:</p>
                    <input placeholder={document.filename} style={{'width': '100%'}}></input>
                    <p>File path:</p>
                    <input placeholder={document.filepath} style={{'width': '100%'}}></input>
                </form>
            </Modal.Body>
        </Modal>
    );
}
export default EditInfo;