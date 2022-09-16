import axios from 'axios';

export const getAllDogs = () => {
    return async function (dispatch) {
        var allDogs = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: 'GET_ALL_DOGS',
            payload: allDogs.data
        });
    };
};

export const getAllTempers = () => {
    return async function (dispatch) {
        var allTempers = await axios.get('http://localhost:3001/temperaments');
        return dispatch({
            type: 'GET_ALL_TEMPERS',
            payload: allTempers.data
        });
    };
};

export const searchByName = (payload) => {
    return {
        type: 'SEARCH_BY_NAME',
        payload
    };
};

export const getDogDetails = (id) => {
    return async function (dispatch) {
        var dogDetails = await axios.get(`http://localhost:3001/dogs/${id}`);
        return dispatch({
            type: 'GET_DOG_DETAILS',
            payload: dogDetails.data
        });
    };
};
