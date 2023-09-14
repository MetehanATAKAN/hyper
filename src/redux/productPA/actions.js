import { ProductPATypes } from './constant';


export const productPaSelectQuarter = (quarter) => {
    return{
        type:ProductPATypes.SELECT_QUARTER,
        payload:quarter
    }
}

export const productPaFilters = (filters) => {
    return{
        type:ProductPATypes.FILTERS,
        payload:filters
    }
}

export const productPaSelectFilterName = (filterName) => {
    return{
        type:ProductPATypes.SELECT_FILTER_NAME,
        payload:filterName
    }
}