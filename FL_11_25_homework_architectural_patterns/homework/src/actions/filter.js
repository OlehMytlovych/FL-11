import {FILTER_CHANGE} from '../constants/index';

const changeFilter = (filterValue) => {
    return {
        type: FILTER_CHANGE,
        filterValue
    };
};

export default changeFilter;