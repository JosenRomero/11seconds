import { Navigate }  from 'react-router-dom';
import Loading from '../components/Loading';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({children}) => {

    const { isAuth } = useAuth();

    if(isAuth === "signed out") return <Navigate to="/login" />
    
    if(isAuth === "signed in") return <>{children}</>

    return (
        <Loading />
    );

}

export default PrivateRoute