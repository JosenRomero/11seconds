import { Form } from 'react-bootstrap';

const FormGroup = ({ id, label, errorMessage, ...moreprops }) => {
    // if you add errorMessage then you need to add required
    return (
        <Form.Group className="mb-3" controlId={id}>
            <Form.Label>{label}</Form.Label> {/* for={id} */}
            <Form.Control {...moreprops}/> {/* id={id} */}
            {errorMessage !== undefined && (
                <Form.Control.Feedback type="invalid">
                    {errorMessage}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    );

}

export default FormGroup