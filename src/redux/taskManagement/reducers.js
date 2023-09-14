import { TaskManagementActionTypes } from './constants';
const initialState = {
    recurrenceData: null,
    parentProcessId: null,
    recurrenceType: null,
    newSubProcessId: 0,
    oldSubProcessId: null,
    filterShow: null,
    recurrenceUpdateData: null,
};
const TaskManagement = (state = initialState, action) => {
    switch (action.type) {
        case TaskManagementActionTypes.RECURRENCE_DATA:
            return {
                ...state,
                recurrenceData: action.payload,
            };
        case TaskManagementActionTypes.PARENT_PROCESS_ID:
            return {
                ...state,
                parentProcessId: action.payload,
            };
        case TaskManagementActionTypes.RECURRENCE_TYPE:
            return {
                ...state,
                recurrenceType: action.payload,
            };
        case TaskManagementActionTypes.CLEAN_UP_RECURRENCE_DATA:
            return {
                ...state,
                recurrenceData: null,
                parentProcessId: null,
                recurrenceType: null,
            };
        case TaskManagementActionTypes.NEW_SUB_PROCESS_ID:
            return {
                ...state,
                newSubProcessId: action.payload,
            };
        case TaskManagementActionTypes.OLD_SUB_PROCESS_ID:
            return {
                ...state,
                oldSubProcessId: action.payload,
            };
        case TaskManagementActionTypes.FILTER_SHOW:
            return {
                ...state,
                filterShow: action.payload,
            };
        case TaskManagementActionTypes.RECURRENCE_UPDATE_DATA:
            return {
                ...state,
                recurrenceUpdateData: action.payload,
            };
        default:
            return state;
    }
};
export default TaskManagement;
