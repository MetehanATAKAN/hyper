import { CalendarActionTypes } from './constants';

// type CalendarAction = { type: string, payload?: string | null };

// type State = { refresh?: boolean };

// const Calendar = (state: State = CalendarActionTypes, action) => {

//     switch(action.type){
//         case CalendarActionTypes.REFRESH_CALENDAR:
//             // state = [...state, action.payload];
//             return{
//                 ...state,
//                 refresh: action.payload,
//                 };
//         default:
//             return state;
//     }
// };

// export default Calendar;

const initialState = {
    calendarDate: null,
    activityTypeName: null,
    eventBgColor: null,
    dateIsShow: null,
    cancelModelShow: null,
    eventData: null,
    appStatus: null,
    eventId: null,
    skuAbb: null,
    pharmacy: null,
    changePage: 1,
    pharmacyData: null,
    showSplitModal: null,
    splitModaReportPage:false,
    changeSplitPage: 1,
    showCompetitorModal: null,
    changeCompetitorPage: 1,
    competitorBrand: null,
    competitorId: null,
    showObjectionModal: null,
    changeObjectionPage: 1,
    pharmacyDatasBody: null,
    competitorDisadvantageData: null,
    dateInfo: null,
    holidays: null,
    eventDetailId: null
};

const Calendar = (state = initialState, action) => {
    switch (action.type) {
        case CalendarActionTypes.CALENDAR_DATE:
            return {
                ...state,
                calendarDate: action.payload,
            };
        case CalendarActionTypes.ACTİVİTY_TYPE_NAME:
            return {
                ...state,
                activityTypeName: action.payload,
            };
        case CalendarActionTypes.EVENT_BACKGROUNDCOLOR:
            return {
                ...state,
                eventBgColor: action.payload,
            };
        case CalendarActionTypes.CLİCK_CALENDAR_DATE:
            return {
                ...state,
                dateIsShow: action.payload,
            };
        case CalendarActionTypes.CANCEL_CLICK_EVENT:
            return {
                ...state,
                cancelModelShow: action.payload,
            };
        case CalendarActionTypes.EVENT_DATA:
            return {
                ...state,
                eventData: action.payload,
            };
        case CalendarActionTypes.EVENT_ID:
            return {
                ...state,
                eventId: action.payload,
            };
        case CalendarActionTypes.GLOBAL_SKU_ABB:
            return {
                ...state,
                skuAbb: action.payload,
            };
        case CalendarActionTypes.GET_PHARMACY_SPLIT:
            return {
                ...state,
                pharmacy: action.payload,
            };
        case CalendarActionTypes.APP_STATUS:
            return {
                ...state,
                appStatus: action.payload,
            };
        case CalendarActionTypes.CHANGE_PAGE_NEXT:
            return {
                ...state,
                changePage: state.changePage + 1,
            };
        case CalendarActionTypes.CHANGE_PAGE_BACK:
            return {
                ...state,
                changePage: state.changePage - 1,
            };
        case CalendarActionTypes.RESET_PAGE_COUNT:
            return {
                ...state,
                changePage: 1,
            };
        case CalendarActionTypes.PHARMACY_DATA:
            return {
                ...state,
                pharmacyData: action.payload,
            };
        case CalendarActionTypes.CHANGE_SPLIT_PAGE:
            return {
                ...state,
                changeSplitPage: action.payload,
            };
        case CalendarActionTypes.SHOW_SPLIT_MODAL:
            return {
                ...state,
                showSplitModal: action.payload,
            };
        case CalendarActionTypes.CHANGE_COMPETİTOR_PAGE_BACK:
            return {
                ...state,
                changeCompetitorPage: state.changeCompetitorPage - 1,
            };
        case CalendarActionTypes.CHANGE_COMPETİTOR_PAGE_NEXT:
            return {
                ...state,
                changeCompetitorPage: state.changeCompetitorPage + 1,
            };
        case CalendarActionTypes.RESET_COMPETİTOR_PAGE:
            return {
                ...state,
                changeCompetitorPage: 1,
            };
        case CalendarActionTypes.SHOW_COMPETİTOR_MODAL:
            return {
                ...state,
                showCompetitorModal: action.payload,
            };
        case CalendarActionTypes.COMPETİTOR_BRAND_NAME:
            return {
                ...state,
                competitorBrand: action.payload,
            };
        case CalendarActionTypes.COMPETİTOR_BRAND_ID:
            return {
                ...state,
                competitorId: action.payload,
            };
        case CalendarActionTypes.SHOW_OBJECTION_MODAL:
            return {
                ...state,
                showObjectionModal: action.payload,
            };
        case CalendarActionTypes.CHANGE_OBJECTION_PAGE_BACK:
            return {
                ...state,
                changeObjectionPage: state.changeObjectionPage - 1,
            };
        case CalendarActionTypes.CHANGE_OBJECTION_PAGE_NEXT:
            return {
                ...state,
                changeObjectionPage: state.changeObjectionPage + 1,
            };
        case CalendarActionTypes.PHARMACY_DATAS_BODY:
            return {
                ...state,
                pharmacyDatasBody: action.payload,
            };
        case CalendarActionTypes.RESET_OBJECTION_PAGE:
            return {
                ...state,
                changeObjectionPage: 1,
            };
        case CalendarActionTypes.COMPETITOR_DISADVANTAGE_DATA:
            return {
                ...state,
                competitorDisadvantageData: action.payload,
            };
        case CalendarActionTypes.DATE_INFO:
            return {
                ...state,
                dataInfo: action.payload,
            };
        case CalendarActionTypes.HOLIDAYS:
            return {
                ...state,
                holidays: action.payload,
            };
            case CalendarActionTypes.SPLIT_MODAL_IS_REPORT_PAGE:
            return {
                ...state,
                splitModaReportPage : action.payload,
            };
        case CalendarActionTypes.SET_EVENT_DETAIL_ID:
            return {
                ...state,
                eventDetailId: action.payload
            }
        default:
            return {
                ...state,
            };
    }
};

export default Calendar;
