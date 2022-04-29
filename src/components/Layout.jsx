import Menu from './Menu';
import Footer from './Footer';
import ErrorNotification from './ErrorNotification';

const Layout = ({children}) => {

    return(
        <>
            <Menu />
            <ErrorNotification />
            <div className="min-vh-100">
                {children}
            </div>
            <Footer />
        </>
    )

}

export default Layout;