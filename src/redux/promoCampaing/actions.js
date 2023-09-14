import { PromoCampaingActionTypes } from './constants';

export const setYearRedux = (data) => {
    return {
        type: PromoCampaingActionTypes.SET_YEAR,
        payload: data,
    };
};

export const setCycleData = (data) => {
    return {
        type: PromoCampaingActionTypes.FOR_POST_GET_CYCLE_DATA,
        payload: data,
    };
};

export const filterData = (data) => {
    return {
        type: PromoCampaingActionTypes.FILTER_DATA,
        payload: data,
    };
};
