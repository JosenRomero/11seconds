import { Button, Form } from 'react-bootstrap';

const FormGroup = ({ id, label, btn, errorMessage, ...moreprops }) => {

    // if you add errorMessage then you need to add required
    // if you add btn then you need to add hidden (for input type="file")

    const openInputFile = () => document.getElementById(id).click();

    const getBtn = () => (<Button className="btnToOpenInputFile position-absolute" variant="light" onClick={() => openInputFile()}>{btn}</Button>)

    const getLabel = () => (<Form.Label>{label}</Form.Label>) // for={id}

    return (
        <Form.Group className="mb-3" controlId={id}>
            { btn ? getBtn() : getLabel() }
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