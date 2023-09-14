// @flow
import React, { useEffect, useState } from 'react';
import Routes from './routes/Routes';

// setup fake backend
import { ConfigureFakeBackend } from './helpers';
// Themes

// For Saas import Saas.scss
import './assets/scss/Saas.scss';
// For Dark import Saas-Dark.scss
// import './assets/scss/Saas-Dark.scss';

// For Modern demo import Modern.scss
// import './assets/scss/Modern.scss';
// For Modern dark demo import Modern-Dark.scss
// import './assets/scss/Modern-Dark.scss';

// For Creative demo import Creative.scss
// import './assets/scss/Creative.scss';
// For Creative dark demo import Creative-Dark.scss
// import './assets/scss/Creative-Dark.scss';

//Page Tour Css
import 'intro.js/introjs.css';
import 'tippy.js/dist/tippy.css';
// configure fake backend

ConfigureFakeBackend();

type AppProps = {};

/**
 * Main app component
 */
const App = (props: AppProps): React$Element<any> => {
    return (
        <>
            <Routes></Routes>
        </>
    );
};

export default App;
