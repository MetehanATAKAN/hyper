import { ProductPATypes } from "./constant";

const initialState = {
    selectQuarter:null,
    selectAllFilters:null,
    selectFilterName:null
}


const ProductPA = (state = initialState,action) => {

    switch (action.type) {
        case ProductPATypes.SELECT_QUARTER:
            return {
                ...state,
                selectQuarter :action.payload
            }
        case ProductPATypes.FILTERS:
            return {
                ...state,
                selectAllFilters :action.payload
            }
            case ProductPATypes.SELECT_FILTER_NAME:
            return {
                ...state,
                selectFilterName :action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default ProductPA