import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function AddAncestor({ show, handleHide, ancestor }) {
    return (
        <Modal show={show} onHide={handleHide} backdrop='static'>
            <Modal.Header closeButton>
                <Modal.Title>Add Ancesetor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='add-ancestor'>
                    <form method='POST'>
                        <input placeholder='Enter Ancestor Name...'></input>
                        <input placeholder='Enter Date of Birth...'></input>
                        <input placeholder='Enter Date of Death...'></input>
                        <input placeholder='Enter Ancestor Image Link...'></input>
                        <select className='ancestor-gender-dropdown'>
                            <option value='m'>Male</option>
                            <option value='f'>Female</option>
                        </select>
                        <select className="ancestor-dropdown">
                            <option value="husband">Husband</option>
                            <option value="wife">Wife</option>
                            <option value="father">Father</option>
                            <option value="mother">Mother</option>
                        </select>
                    </form>
                    <form className='dropdown-menu'>

                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleHide}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddAncestor;