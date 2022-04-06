import * as types from '../actions/types';

const UserReducer = (state = {}, action) => {

    switch(action.type) {
        case types.ADD_USER:
            return action.payload;
        default:
            return state;
    }

}

export default UserReducer