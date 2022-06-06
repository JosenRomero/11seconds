import { Navigate }  from 'react-router-dom';
import Loading from '../components/Loading';
import { useAuth } from '../hooks/useAuth';

const PublicRoute = ({children}) => {

    const { isAuth } = useAuth();

    if(isAuth === "signed in") return <Navigate to="/" />

    if(isAuth === "signed out") return <>{children}</>

    return (
        <Loading />
    );

}

export default PublicRoute