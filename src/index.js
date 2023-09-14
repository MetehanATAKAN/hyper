import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import App from './App';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import 'react-toastify/dist/ReactToastify.css';

// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

ReactDOM.render(
    <Provider store={configureStore({})}>
            <App /> 
    </Provider>,
    document.getElementById('root')
);
