const initialState = {
    dogs: [],
    allDogs: [],
    tempers:[],
    dogDetails: []
};

function rootReducer(state=initialState, action) {
    switch(action.type) {
        case 'GET_ALL_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case 'GET_ALL_TEMPERS':
            return {
                ...state,
                tempers: action.payload
            }
        case 'SEARCH_BY_NAME':
            const allDogs = state.allDogs;
            const dogByName = allDogs.filter(e => e.name.includes(action.payload));
            return {
                ...state,
                dogs: dogByName
            }
        case 'GET_DOG_DETAILS':
            return {
                ...state,
                dogDetails: action.payload
            }
        default:
            return state;
    };
};

export default rootReducer;