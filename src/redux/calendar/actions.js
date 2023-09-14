import { CalendarActionTypes } from './constants';

type CalendarAction = { type: string, payload: {} | string };

export const refreshCalendar = (change: string): CalendarAction => ({
    type: CalendarActionTypes.REFRESH_CALENDAR,
    payload: { change },
});
export const calendarDate = (date) => {
    return {
        type: CalendarActionTypes.CALENDAR_DATE,
        payload: date,
    };
};
//activity type adını tutuyoruz
export const activityTypeName = (typeName) => {
    return {
        type: CalendarActionTypes.ACTİVİTY_TYPE_NAME,
        payload: typeName,
    };
};
export const eventBackgroundColor = (color) => {
    return {
        type: CalendarActionTypes.EVENT_BACKGROUNDCOLOR,
        payload: color,
    };
};

export const clickCalendarDate = (isShow) => {
    return {
        type: CalendarActionTypes.CLİCK_CALENDAR_DATE,
        payload: isShow,
    };
};
export const cancelClickEvent = (isShow) => {
    return {
        type: CalendarActionTypes.CANCEL_CLICK_EVENT,
        payload: isShow,
    };
};
export const eventDataGet = (data) => {
    return {
        type: CalendarActionTypes.EVENT_DATA,
        payload: data,
    };
};
export const eventId = (id) => {
    return {
        type: CalendarActionTypes.EVENT_ID,
        payload: id,
    };
};
export const skuAbb = (name) => {
    return {
        type: CalendarActionTypes.GLOBAL_SKU_ABB,
        payload: name,
    };
};
export const pharmacySplit = (data) => {
    return {
        type: CalendarActionTypes.GET_PHARMACY_SPLIT,
        payload: data,
    };
};
export const sendAppStatus = (data) => {
    return {
        type: CalendarActionTypes.APP_STATUS,
        payload: data,
    };
};
export const changePageNext = () => {
    return {
        type: CalendarActionTypes.CHANGE_PAGE_NEXT,
    };
};
export const changePageBack = () => {
    return {
        type: CalendarActionTypes.CHANGE_PAGE_BACK,
    };
};
export const resetPageCount = () => {
    return {
        type: CalendarActionTypes.RESET_PAGE_COUNT,
    };
};
export const pharmacyDataSend = (data) => {
    return {
        type: CalendarActionTypes.PHARMACY_DATA,
        payload: data,
    };
};
export const changeSplitPage = (num) => {
    return {
        type: CalendarActionTypes.CHANGE_SPLIT_PAGE,
        payload: num,
    };
};
export const showSplitModal = (isShow) => {
    return {
        type: CalendarActionTypes.SHOW_SPLIT_MODAL,
        payload: isShow,
    };
};

export const splitModalsReportPage = (bool) => {
    return {
        type: CalendarActionTypes.SPLIT_MODAL_IS_REPORT_PAGE,
        payload: bool,
    };
};
export const changeCompetitorPageBack = () => {
    return {
        type: CalendarActionTypes.CHANGE_COMPETİTOR_PAGE_BACK,
    };
};
export const changeCompetitorPageNext = () => {
    return {
        type: CalendarActionTypes.CHANGE_COMPETİTOR_PAGE_NEXT,
    };
};
export const resetCompetitorPage = () => {
    return {
        type: CalendarActionTypes.RESET_COMPETİTOR_PAGE,
    };
};

export const showCompetitorModal = (isShow) => {
    return {
        type: CalendarActionTypes.SHOW_COMPETİTOR_MODAL,
        payload: isShow,
    };
};
export const competitorBrandName = (name) => {
    return {
        type: CalendarActionTypes.COMPETİTOR_BRAND_NAME,
        payload: name,
    };
};
export const competitorBrandId = (id) => {
    return {
        type: CalendarActionTypes.COMPETİTOR_BRAND_ID,
        payload: id,
    };
};
export const showObjectionModal = (isShow) => {
    return {
        type: CalendarActionTypes.SHOW_OBJECTION_MODAL,
        payload: isShow,
    };
};
export const changeObjectionPageBack = () => {
    return {
        type: CalendarActionTypes.CHANGE_OBJECTION_PAGE_BACK,
    };
};
export const changeObjectionPageNext = () => {
    return {
        type: CalendarActionTypes.CHANGE_OBJECTION_PAGE_NEXT,
    };
};
export const resetObjectionPage = () => {
    return {
        type: CalendarActionTypes.RESET_OBJECTION_PAGE,
    };
};

export const pharmacyDatasApiBody = (body) => {
    return {
        type: CalendarActionTypes.PHARMACY_DATAS_BODY,
        payload: body,
    };
};
export const competitorDisadvantageData = (data) => {
    return {
        type: CalendarActionTypes.COMPETITOR_DISADVANTAGE_DATA,
        payload: data,
    };
};

export const dateInfo = (data) => {
    return {
        type: CalendarActionTypes.DATE_INFO,
        payload: data,
    };
};

export const holidays = (data) => {
    return {
        type: CalendarActionTypes.HOLIDAYS,
        payload: data
    }
}

export const setEventDetailId = (id) => {
    return {
        type: CalendarActionTypes.SET_EVENT_DETAIL_ID,
        payload: id
    }
}