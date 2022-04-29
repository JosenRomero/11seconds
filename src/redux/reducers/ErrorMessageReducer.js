import * as types from '../actions/types';

const ErrorMessageReducer = (state = "", action) => {

    switch(action.type) {
        case types.ADD_ERROR:
            return action.payload;
        case types.DELETE_ERROR:
            return ""
        default:
            return state;
    }

}

export default ErrorMessageReducer