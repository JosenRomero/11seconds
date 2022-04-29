import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import ErrorMessageReducer from './ErrorMessageReducer';

export default combineReducers({
    user: UserReducer,
    errorMessage: ErrorMessageReducer
});