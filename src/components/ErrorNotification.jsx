import { Alert, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteErrorMessageAction } from '../redux/actions/Actions';

const ErrorNotification = () => {

    const errorMessage = useSelector((state) => state.errorMessage); // reducers/index.js
    const dispatch = useDispatch();

    const close = () => {
        dispatch(DeleteErrorMessageAction());
    }

    if (errorMessage === "") return

    return (
        <Container className='mt-2'>
            <Alert variant="danger" onClose={close} dismissible>
                <Alert.Heading>{errorMessage}</Alert.Heading>
            </Alert>
        </Container>
    );

}

export default ErrorNotification
