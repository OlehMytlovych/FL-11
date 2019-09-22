import {FILTER_CHANGE, ADD_MORE, REMOVE_USER} from '../constants/index';
import users from '../data';

const initialState = {
    users: users,
    usersToDisplay: users,
    usersToDisplayCounter: 5,
    filterValue: ''
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
    case FILTER_CHANGE:
        return {
            ...state,
            usersToDisplay: state.users.filter((user) => {
                return user.name.toLowerCase().includes(action.filterValue.toLowerCase());
            }),
            usersToDisplayCounter: 5
        };
    case REMOVE_USER:
        return {
            ...state,
            users: state.users.filter((user) => user.id !== action.payload),
            usersToDisplay: state.usersToDisplay.filter((user) => user.id !== action.payload),
            usersToDisplayCounter: (state.usersToDisplayCounter === state.usersToDisplay.length) ?
                state.usersToDisplayCounter - 1 : state.usersToDisplayCounter
        };
    case ADD_MORE:
        return {
            ...state,
            usersToDisplayCounter: ((state.usersToDisplayCounter + 5) > state.usersToDisplay.length) ?
                state.usersToDisplay.length : state.usersToDisplayCounter + 5
        };
    default:
        return state;
    }
};

export default Reducer;
