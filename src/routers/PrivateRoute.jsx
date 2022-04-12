import { useSelector } from 'react-redux';
import { Navigate }  from 'react-router-dom';
import Loading from '../components/Loading';

const PrivateRoute = ({children}) => {

    const user = useSelector((state) => state.user); // reducers/index.js

    if(!user.email) return <Navigate to="/login" />
    
    if(user.email) return <>{children}</>

    return (
        <Loading />
    );

}

export default PrivateRoute