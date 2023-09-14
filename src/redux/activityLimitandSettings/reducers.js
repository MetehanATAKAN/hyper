import { ActivityLimitandSettingsType } from './constant';


const initialState = {
    activityLimitSelectYear: null,
    ownersCompany: null,
    ownersBusinessUnite: null,
    ownersPosition: null,
    ownersProductZonerorArea: null,
    ownersTableDatas: [],
    allCompany: null,
    allBusinessUnite: null,
    allPosition: null,
    activityIsDisabled: false,
    ownersIsDisabled: false,
    participantsIsDisabled: false,
    activityLocationData: 1,
    activityId: 0,
    ownersTableDataMain: [],
    isTotal: null,
    participantTableDatas: [],
    alsModal: false,
    alsFilterData: [],
    alsFilterYear: [],
    alsFilterActivityType: [],
    alsFilterMainProcess: [],
    alsFilterBusinessProcess: [],
    alsFilterProcess: [],
    alsFilterBody: null,
    alsUpdateData: null,
    alsUpdateDisabled: false,
    pageDesignTemplateId:1
}

const ActivityLimit = (state = initialState, action) => {
    switch (action.type) {
        case ActivityLimitandSettingsType.OWNERS_COMPANY:
            return {
                ...state, ownersCompany: action.payload
            }
        case ActivityLimitandSettingsType.OWNERS_BUSINESS_UNITE:
            return {
                ...state, ownersBusinessUnite: action.payload
            }
        case ActivityLimitandSettingsType.OWNERS_POSITION:
            return {
                ...state, ownersPosition: action.payload
            }
        case ActivityLimitandSettingsType.OWNERS_PRODUCT_ZONE_OR_AREA:
            return {
                ...state, ownersProductZonerorArea: action.payload
            }
        case ActivityLimitandSettingsType.OWNERS_TABLE_DATA:
            return {
                ...state, ownersTableDatas: action.payload
            }
        case ActivityLimitandSettingsType.ALL_COMPANY:
            return {
                ...state, allCompany: action.payload
            }
        case ActivityLimitandSettingsType.ALL_BUSINESS_UNITE:
            return {
                ...state, allBusinessUnite: action.payload
            }
        case ActivityLimitandSettingsType.ACTIVITY_LIMIT_YEAR:
            return {
                ...state, activityLimitSelectYear: action.payload
            }
        case ActivityLimitandSettingsType.ALL_POSITION:
            return {
                ...state, allPosition: action.payload
            }
        case ActivityLimitandSettingsType.ACTIVITY_IS_DISABLED:
            return {
                ...state, activityIsDisabled: action.payload
            }
        case ActivityLimitandSettingsType.OWNERS_IS_DISABLED:
            return {
                ...state, ownersIsDisabled: action.payload
            }
        case ActivityLimitandSettingsType.PARTICIPANTS_IS_DISABLED:
            return {
                ...state, participantsIsDisabled: action.payload
            }
        case ActivityLimitandSettingsType.ACTIVITY_LOCATION_DATA:
            return {
                ...state, activityLocationData: action.payload
            }
        case ActivityLimitandSettingsType.ACTIVITY_ID:
            return {
                ...state, activityId: action.payload
            }
        case ActivityLimitandSettingsType.OWNERS_TABLE_DATA_MAIN:
            return {
                ...state, ownersTableDataMain: action.payload
            }
        case ActivityLimitandSettingsType.IS_TOTAL_MAIN_TABLE:
            return {
                ...state, istotal: action.payload
            }
        case ActivityLimitandSettingsType.PARTICIPANT_TABLE_DATAS:
            return {
                ...state, participantTableDatas: action.payload
            }
        case ActivityLimitandSettingsType.ALS_MODAL:
            return {
                ...state, alsModal: action.payload
            }
        case ActivityLimitandSettingsType.ALS_GET_ACTIVITY_FILTER:
            return {
                ...state, alsFilterData: action.payload
            }

        case ActivityLimitandSettingsType.ALS_FILTER_YEAR:
            return {
                ...state, alsFilterYear: action.payload
            }
        case ActivityLimitandSettingsType.ALS_FILTER_ACTIVITY_TYPE:
            return {
                ...state, alsFilterActivityType: action.payload
            }
        case ActivityLimitandSettingsType.ALS_FILTER_BUSINESS_PROCESS:
            return {
                ...state, alsFilterBusinessProcess: action.payload
            }
        case ActivityLimitandSettingsType.ALS_FILTER_MAIN_PROCESS:
            return {
                ...state, alsFilterMainProcess: action.payload
            }
        case ActivityLimitandSettingsType.ALS_FILTER_PROCESS:
            return {
                ...state, alsFilterProcess: action.payload
            }
        case ActivityLimitandSettingsType.ALS_GET_FILTER_BODY:
            return {
                ...state, alsFilterBody: action.payload
            }
        case ActivityLimitandSettingsType.ALS_UPDATE_DATA:
            return {
                ...state, alsUpdateData: action.payload
            }
        case ActivityLimitandSettingsType.ALS_UPDATE_DISABLED:
            return {
                ...state, alsUpdateDisabled: action.payload
            }
        case ActivityLimitandSettingsType.PAGE_DESIGN_TEMPLATE:
                return {
                    ...state, pageDesignTemplateId: action.payload
                }
        default:
            return {
                ...state
            }
    }
}

export default ActivityLimit