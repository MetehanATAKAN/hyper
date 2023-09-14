import { ReconciliationtActionTypes } from "./constants";

export const reconciliationFilterDatas = (data) => {
    return {
        type: ReconciliationtActionTypes.RECONCILIATION_FILTER_DATA,
        payload: data,
    };
};
