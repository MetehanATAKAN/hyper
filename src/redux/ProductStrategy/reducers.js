import { ProductStrategyActionTypes } from './constants';

const initialState = {
    profiles: null,
    strategyPages: null,
};
const ProductStrategy = (state = initialState, action) => {
    switch (action.type) {
        case ProductStrategyActionTypes.PROFILE_DATA:
            return {
                ...state,
                profiles: action.payload,
            };
        case ProductStrategyActionTypes.STRATEGY_PAGES:
            return {
                ...state,
                strategyPages: action.payload,
            };
        default:
            return state;
    }
};
export default ProductStrategy;
