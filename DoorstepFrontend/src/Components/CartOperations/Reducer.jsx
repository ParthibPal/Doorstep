// export const cartReducer = (state, action) => {
//     switch (action.type) {
//         case "ADD_TO_CART":
//             return { ...state, cart: [...state.cart, action.payload] };

//         case "REMOVE_FROM_CART":
//             return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) };

//         case "EMPTY_CART":
//             return { ...state, cart: [] };

//         default:
//             return state;
//     }
// };


export const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return { 
                ...state, 
                cart: [...state.cart, action.payload],
                total: state.total + Number(action.payload.price)
            };

        case "REMOVE_FROM_CART":
            return { 
                ...state, 
                cart: state.cart.filter(item => item.id !== action.payload.id),
                total: state.total - Number(action.payload.price)
            };

        case "EMPTY_CART":
            return { ...state, cart: [], total: 0 };

        default:
            return state;
    }
};