import { ReconciliationtActionTypes } from "./constants";

const initialState = {
    filterData:null
}

const Reconciliation = (state = initialState, action) => {
    switch (action.type) {
        case ReconciliationtActionTypes.RECONCILIATION_FILTER_DATA:
            return {
                ...state,
                filterData: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};


export default Reconciliation