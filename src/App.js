import AppRouter from './routers/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import './App.css';

const App = () => {

    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );

}

export default App;