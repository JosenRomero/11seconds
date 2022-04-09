import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import SignUpOrLogInPage from '../pages/SignUpOrLogInPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Layout>
                <Routes>

                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/signup" element={<SignUpOrLogInPage title="Sign Up" />} />
                    <Route path="/login" element={<SignUpOrLogInPage title="Log In" />} />

                    <Route path="*" element={<NotFoundPage />} />

                </Routes>
            </Layout>
        </BrowserRouter>
    );

}

export default AppRouter