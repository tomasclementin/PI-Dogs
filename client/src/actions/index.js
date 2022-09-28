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

export const orderByOrigin = (payload) => {
    return {
        type: 'ORDER_BY_ORIGIN',
        payload
    };
};

export const orderByTemper = (payload) => {
    return {
        type: 'ORDER_BY_TEMPER',
        payload
    };
};

export const orderByAlphabet = (payload) => {
    return {
        type: 'ORDER_BY_ALPHABET',
        payload
    };
};

export const orderByWeight = (payload) => {
    return {
        type: 'ORDER_BY_WEIGHT',
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

export const createNewDog = (payload) => {
    return async function (dispatch) {
        if (!payload.img.length) {
            var res = await axios.post('http://localhost:3001/dogs', {
                name: payload.name,
                height: payload.height,
                weight: payload.weight,
                yearsOld: payload.yearsOld,
                temper: payload.temper
            });
            return res;
        }
        var response = await axios.post('http://localhost:3001/dogs', payload);
        return response;
    };
};