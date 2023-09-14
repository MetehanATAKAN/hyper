// @flow
import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import Calendar from './calendar/reducers';
import PrePlanTable from './prePlanTable/reducers';
import VisitMix from './VisitMix/reducers';
import ActivityLimit from './activityLimitandSettings/reducers';
import TaskManagement from './taskManagement/reducers';
import Need from './need/reducers';
import Brochure from './brochure/reducers';
import PromoSubject from './promoSubject/reducers';
import Survey from './survey/reducers';
import Settings from './settings/reducers';
import VisitContent from './visitContent/reducers';
import AnnualProductMix from './annualProductMix/reducers';
import ProductPA from './productPA/reducers';
import EditEvent from './EditEvent/reducers';
import MMDataCheck from './mmDataCheck/reducers';
import Reconciliation from './reconciliation/reducers';

import PromoCampaing from './promoCampaing/reducers';
import MicroTarget from './microtarget/reducers';

import ProductStrategy from './ProductStrategy/reducers';
import UserPermission from './permission/reducers';

import SubProcess from './subProcess/reducers';

export default (combineReducers({
    Auth,
    Layout,
    Calendar,
    PrePlanTable,
    ActivityLimit,
    VisitMix,
    TaskManagement,
    Need,
    Brochure,
    PromoSubject,
    Survey,
    Settings,
    VisitContent,
    AnnualProductMix,
    ProductPA,
    EditEvent,
    MMDataCheck,
    Reconciliation,
    PromoCampaing,
    MicroTarget,
    ProductStrategy,
    UserPermission,
    SubProcess
}): any);
