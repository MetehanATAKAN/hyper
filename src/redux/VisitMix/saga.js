import { all, call, fork, takeEvery, put } from "redux-saga/effects";
import { VisitMixActionTypes } from "./constant";
import { getVisitMixCalendarDataBody} from "./actions";

let countryData=[];

async function fetchVisitMixCalendarBody(data){
   console.log(data);
}

function* setVisitMixCalendarBody(data){
    yield call(fetchVisitMixCalendarBody(data));
    console.log(countryData);
    yield put(getVisitMixCalendarDataBody());
}

/**
 * Watchers
 */

export function* watchVisitMixCalendarData(data){
    yield takeEvery(VisitMixActionTypes.VM_GET_CALENDAR_DATA_BODY,setVisitMixCalendarBody(data))
}

function* VisitMix(){
    yield all([
        fork(watchVisitMixCalendarData)
    ])
}

export default VisitMix