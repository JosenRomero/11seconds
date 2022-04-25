import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import VideosPage from '../pages/VideosPage';
import VideoDetailsPage from '../pages/VideoDetailsPage';
import UploadVideoPage from '../pages/UploadVideoPage';
import SignUpOrLogInPage from '../pages/SignUpOrLogInPage';
import NotFoundPage from '../pages/NotFoundPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Layout>
                <Routes>

                    <Route exact path="/" 
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        } 
                    />
                    <Route exact path="/videos"
                        element={
                            <PrivateRoute>
                                <VideosPage />
                            </PrivateRoute>
                        }
                    />
                    <Route exact path="/video/:videoId"
                        element={
                            <PrivateRoute>
                                <VideoDetailsPage />
                            </PrivateRoute>
                        }
                    />
                    <Route exact path="/upload"
                        element={
                            <PrivateRoute>
                                <UploadVideoPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/signup" 
                        element={
                            <PublicRoute>
                                <SignUpOrLogInPage title="Sign Up" />
                            </PublicRoute>
                        } 
                    />
                    <Route path="/login" 
                        element={
                            <PublicRoute>
                                <SignUpOrLogInPage title="Log In" />
                            </PublicRoute>
                        } 
                    />

                    <Route path="*" element={<NotFoundPage />} />

                </Routes>
            </Layout>
        </BrowserRouter>
    );

}

export default AppRouter