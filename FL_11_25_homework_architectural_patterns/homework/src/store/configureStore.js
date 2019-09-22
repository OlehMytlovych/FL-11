import {createStore} from 'redux';
import reducer from '../reducers';
import users from '../data';

const {devToolsExtension} = window;
const state = {
    users,
    usersToDisplay: users,
    usersToDisplayCounter: 5,
    filterValue: ''
};

export default function configureStore(initialState = state) {
    return createStore(
        reducer,
        initialState,
        devToolsExtension && devToolsExtension()
    );
}