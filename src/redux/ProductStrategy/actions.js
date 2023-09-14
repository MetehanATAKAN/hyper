import { ProductStrategyActionTypes } from './constants';

export const setProfileData = (data) => {
    return {
        type: ProductStrategyActionTypes.PROFILE_DATA,
        payload: data,
    };
};
export const setStrategypages = (data) => {
    return {
        type: ProductStrategyActionTypes.STRATEGY_PAGES,
        payload: data,
    };
};
