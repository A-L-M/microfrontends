import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

// Mount function to startup the app
const mount = (elem) => {
    ReactDOM.render(
        <App />,
        elem
    );
};

// If we are in development and in isolation,
// call mount immediately
if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');
    if(devRoot) {
        mount(devRoot);
    }
}

// We are running through container
// and we should export the mount function
export {mount};