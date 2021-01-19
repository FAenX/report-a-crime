function setStates(state, action) {
    if (typeof state === 'undefined') {
      return {coordinates: '', details: '', name: '', category: '', data: {byDate: {}}};
    }

    switch (action.type) {
        case 'SETCOORDS':          
            return {
                ...state,
                coordinates: action.coordinates
            };
        case 'SETNAME':          
            return {
                ...state,
                name: action.name
            };
        case 'SETDETAILS':          
            return {
                ...state,
                details: action.details
            };

        case 'SETCATEGORY':          
            return {
                ...state,
                category: action.category
            };

        case 'SETDATA':          
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
        
    }
}


export const store = Redux.createStore(setStates); 