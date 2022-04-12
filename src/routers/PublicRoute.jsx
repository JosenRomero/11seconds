import { useSelector } from 'react-redux';
import { Navigate }  from 'react-router-dom';
import Loading from '../components/Loading';

const PublicRoute = ({children}) => {

    const user = useSelector((state) => state.user); // reducers/index.js

    if(user.email) return <Navigate to="/" />

    if(!user.email) return <>{children}</>

    return (
        <Loading />
    );

}

export default PublicRoute