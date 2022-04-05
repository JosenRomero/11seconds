import Menu from './Menu';
import Footer from './Footer';

const Layout = ({children}) => {

    return(
        <>
            <Menu />
            <div className="min-vh-100">
                {children}
            </div>
            <Footer />
        </>
    )

}

export default Layout;