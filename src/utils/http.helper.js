import { config } from '../config';

export const FetchApiPost = (endpoint, method, data) => {
    return fetch(`${config.API_URL}/${endpoint}`, {
        method: `${method}`,
        body: JSON.stringify(data),
        headers: {
            'access-control-allow-origin': '*',
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
        },
    });
};
export const FetchApiGet = async (endpoint, method) => {
    return fetch(`${config.API_URL}/${endpoint}`, {
        method: `${method}`,
        headers: {
            'access-control-allow-origin': '*',
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
        },
    });
};
