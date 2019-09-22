import {REMOVE_USER} from '../constants/index';

const removeUser = (id) => {
    return {
        type: REMOVE_USER,
        payload: id
    };
};

export default removeUser;