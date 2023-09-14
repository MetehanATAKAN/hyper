// @flow
import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import VisitMixSaga from './VisitMix/saga';


export default function* rootSaga(): any {
    yield all([authSaga(), layoutSaga(),VisitMixSaga()]);
}
