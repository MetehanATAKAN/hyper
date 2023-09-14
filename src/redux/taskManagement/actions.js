import { TaskManagementActionTypes } from './constants';

export const setRecurrenceData = (data) => {
    return {
        type: TaskManagementActionTypes.RECURRENCE_DATA,
        payload: data,
    };
};
export const setParentProcessId = (data) => {
    return {
        type: TaskManagementActionTypes.PARENT_PROCESS_ID,
        payload: data,
    };
};
export const setRecurrenceType = (data) => {
    return {
        type: TaskManagementActionTypes.RECURRENCE_TYPE,
        payload: data,
    };
};
export const cleanUpRecurrenceData = () => {
    return {
        type: TaskManagementActionTypes.CLEAN_UP_RECURRENCE_DATA,
    };
};
export const setNewSubProcessId = (data) => {
    return {
        type: TaskManagementActionTypes.NEW_SUB_PROCESS_ID,
        payload: data,
    };
};
export const setOldSubProcessId = (data) => {
    return {
        type: TaskManagementActionTypes.OLD_SUB_PROCESS_ID,
        payload: data,
    };
};
export const setFilterShow = (data) => {
    return {
        type: TaskManagementActionTypes.FILTER_SHOW,
        payload: data,
    };
};
export const setRecurrenceUpdateData = (data) => {
    return {
        type: TaskManagementActionTypes.RECURRENCE_UPDATE_DATA,
        payload: data,
    };
};
