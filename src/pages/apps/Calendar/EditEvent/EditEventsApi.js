import { FetchApiGet } from './../../../../utils/http.helper';


export const visitEvulotionPromoApi = (eventId) => {
       return  FetchApiGet(`services/daywork/eventreport/GetEventReportPromoProductsByEventId?eventId=${eventId}`, 'GET')
    .then(res => res.json())
    //{...item, productPercent: item.productPercent ? item.productPercent : null}
}