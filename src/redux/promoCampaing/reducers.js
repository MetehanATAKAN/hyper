import { PromoCampaingActionTypes } from './constants';

const initialState = {
    year: null,
    cycleData: null,
    filtersData:null
};
const PromoCampaing = (state = initialState, action) => {
    switch (action.type) {
        case PromoCampaingActionTypes.SET_YEAR:
            return {
                ...state,
                year: action.payload,
            };
        case PromoCampaingActionTypes.FOR_POST_GET_CYCLE_DATA:
            return {
                ...state,
                cycleData: action.payload,
            };
        case PromoCampaingActionTypes.FILTER_DATA:
            return {
                ...state,
                filtersData: action.payload,
            };
        default:
            return state;
    }
};
export default PromoCampaing;
