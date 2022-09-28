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
            const allDogsByName = state.allDogs;
            const dogsByName = allDogsByName.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()));
            return {
                ...state,
                dogs: dogsByName
            }
        case 'ORDER_BY_ORIGIN':
            const allDogsByOrigin = state.allDogs;
            const dogsByOrigin = action.payload === 'Created' ? allDogsByOrigin.filter(e => e.inDB) : 
                allDogsByOrigin.filter(e => !e.inDB);
            return {
                ...state,
                dogs: action.payload === 'All' ? allDogsByOrigin : dogsByOrigin
            }
        case 'ORDER_BY_TEMPER':
            const allDogsByTemper = state.allDogs;
            if(action.payload === 'No temper') {
                var dogsByTemper = allDogsByTemper.filter(e => !e.temper && !e.tempers);
                var dogsByTemperDb = allDogsByTemper.filter(e => e.tempers);
                dogsByTemperDb = dogsByTemperDb.filter(e => e.tempers[0].name === action.payload);
                dogsByTemper = dogsByTemper.concat(dogsByTemperDb);
            }
            if(action.payload !== 'No temper') {
                dogsByTemper = allDogsByTemper.filter(e => e.temper)
                    .filter(e => e.temper.toLowerCase().includes(action.payload.toLowerCase()));
                dogsByTemperDb = allDogsByTemper.filter(e => e.tempers)
                    .filter(e => e.tempers[0].name.toLowerCase().includes(action.payload.toLowerCase()));
                dogsByTemper = dogsByTemper.concat(dogsByTemperDb);
            }
            console.log(dogsByTemper);
            return {
                ...state,
                dogs: action.payload === 'All' ? allDogsByTemper : dogsByTemper
            }
        case 'ORDER_BY_ALPHABET':
            const allDogsByAlphabet = state.allDogs;
            let dogsByAlphabet = action.payload === 'Asc' ? allDogsByAlphabet.sort(function(a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase()< b.name.toLowerCase()) return -1;
                return 0;
            }) : allDogsByAlphabet.sort(function(a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                return 0;
            });
            return {
                ...state,
                dogs: dogsByAlphabet
            }
        case 'ORDER_BY_WEIGHT':
            const allDogsByWeight = state.allDogs;
            let dogsByWeight = action.payload === 'Peso+' ? allDogsByWeight.sort(function(a, b) {
                if(a.name === 'Smooth Fox Terrier') {
                    a.weight = 18;
                }
                if (parseInt(a.weight) > parseInt(b.weight)) return -1;
                if (parseInt(a.weight) < parseInt(b.weight)) return 1;
                return 0;
            }) : allDogsByWeight.sort(function(a, b) {
                if(a.name === 'Smooth Fox Terrier') {
                    a.weight = 18;
                }
                if (parseInt(a.weight) > parseInt(b.weight)) return 1;
                if (parseInt(a.weight) < parseInt(b.weight)) return -1;
                return 0;
            });
            return {
                ...state,
                dogs: action.payload === 'Unordered' ? state.allDogs.sort(function(a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    if (a.name.toLowerCase()< b.name.toLowerCase()) return -1;
                    return 0;
                }) : dogsByWeight
            }
        case 'GET_DOG_DETAILS':
            return {
                ...state,
                dogDetails: action.payload
            }
        case 'CREATE_NEW_DOG':
            return {
                ...state
            }
        case 'FILTER_BY_LIFE':
            const allDogsByLife = state.allDogs;
            const dogsFiltered = allDogsByLife.filter(d => d.yearsOld.slice(0, 2) > 10);
            return {
                ...state,
                dogs: dogsFiltered
            }
        default:
            return state;
    };
};

export default rootReducer;