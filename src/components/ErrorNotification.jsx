import { useSelector, useDispatch } from 'react-redux';
import { DeleteErrorMessageAction } from '../redux/actions/Actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ErrorNotification = () => {

    const errorMessage = useSelector((state) => state.errorMessage); // reducers/index.js
    const dispatch = useDispatch();

    const close = () => {
        dispatch(DeleteErrorMessageAction());
    }

    const showError = () => {
        toast.error(errorMessage, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            toastId: "customId",
            onClose: () => close()
        });
    }

    if (errorMessage === "") return

    return (
        <>
            {errorMessage && showError()}
            <ToastContainer />
        </>
    );

}

export default ErrorNotification
