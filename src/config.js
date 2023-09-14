const dev = {
    API_URL: 'http://178.18.200.171:5000',
};
const dev2 = {
    API_URL: 'http://178.18.200.171:5001',
};

const prod = {
    API_URL: 'http://178.18.196.202:5000',
};
const prod2 = {
    API_URL: 'http://178.18.196.202:5001',
};

//COMPETITOR ADD EXTERNAL PAGE
// for development
const competitorAddRouteDev = {
    API_URL: 'http://178.18.200.171:7002',
};
// for production
const competitorAddRouteProd = {
    API_URL: 'https://my-possibility.eu',
};

/**SETTINGS ASSIGN USER */
//prod
const settingsAsssignUserProd = {
    API_URL: 'http://178.18.196.202:5001',
};

// const config = process.env.NODE_ENV === 'development' ? dev : prod;
const config = dev; // :5000
const config2 = dev2; // :5001
const competitorRoute = competitorAddRouteDev;
const settingsAsssignUser = dev2; /**dev2 or settingsAsssignUserProd */

export { config, config2, competitorRoute, settingsAsssignUser };
