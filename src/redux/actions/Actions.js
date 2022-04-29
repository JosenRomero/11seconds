import * as types from './types';

export const addUserAction = (user) => ({
    type: types.ADD_USER,
    payload: user
});

export const addErrorMessageAction = (errorMessage) => ({
    type: types.ADD_ERROR,
    payload: errorMessage
});

export const DeleteErrorMessageAction = () => ({
    type: types.DELETE_ERROR,
    payload: ""
});