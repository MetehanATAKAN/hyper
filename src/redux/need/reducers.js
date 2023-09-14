import { NeedsType } from "./constant"

const initialState = {
    needTypeName: 'Need',
    benefitTabName: 'Benefit',
    disadvantageTabName: 'Disadvantages',
    pageListPlus: false,
    needPageButtonDatas: {
        product: {
            value: null,
            label: null,
            id: null
        },
        indication: {
            value: null,
            label: null,
            id: null
        },
        profile: {
            value: null,
            label: null,
            id: null
        },
        specialization: []
    },
    benefitPageButtonDatas: {
        product: {
            value: null,
            label: null,
        },
        indication: {
            value: null,
            label: null,
        },
        profile: {
            value: null,
            label: null,
        },
        need: {
            value: null,
            label: null,
        },
        specialization: []
    },
    disadvantagePageButtonDatas: {
        product: {
            value: null,
            label: null,
            id: null
        },
        indication: {
            value: null,
            label: null,
            id: null
        },
        profile: {
            value: null,
            label: null,
            id: null
        },
        need: {
            value: null,
            label: null,
            id: null
        },
        specialization: [],
        status: {
            value: null,
            label: null,
            id: null
        }
    },
    filterFunct: null
}


const Need = (state = initialState, action) => {
    switch (action.type) {
        case NeedsType.NEEDSTAB:
            return {
                ...state, needTypeName: action.payload
            }
        case NeedsType.BENEFITTAB:
            return {
                ...state, benefitTabName: action.payload
            }
        case NeedsType.NEEDPAGE_BUTTON_DATAS:
            return {
                ...state, needPageButtonDatas: action.payload
            }
        case NeedsType.BENEFIT_BUTTON_DATAS:
            return {
                ...state, benefitPageButtonDatas: action.payload
            }
        case NeedsType.DISADVANTAGE_BUTTON_DATAS:
            return {
                ...state, disadvantagePageButtonDatas: action.payload
            }
        case NeedsType.DISADVANTAGE_TAB:
            return {
                ...state, disadvantageTabName: action.payload
            }
        case NeedsType.PAGE_LIST_PLUS:
            return {
                ...state, pageListPlus: action.payload
            }
        case NeedsType.FILTER:
            return {
                ...state, filterFunct: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default Need