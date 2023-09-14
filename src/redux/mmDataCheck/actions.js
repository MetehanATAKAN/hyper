import { MMDataCheckTypes } from './constant';


export const wantsFilter = (filter) => {

    return{
        type:MMDataCheckTypes.WANT_FILTER,
        payload:filter
    }
}

