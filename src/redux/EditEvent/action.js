import { EditEventTypes } from "./constant";

export const pharmacySplitData = (data) => {
    return {
        type:EditEventTypes.PHARMACY_SPLIT_DATA,
        payload:data
    }
}