import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import SignUpPage from '../pages/SignUpPage';
import LogIn from '../pages/LogIn';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Layout>
                <Routes>

                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LogIn />} />

                    <Route path="*" element={<NotFoundPage />} />

                </Routes>
            </Layout>
        </BrowserRouter>
    );

}

export default AppRouter