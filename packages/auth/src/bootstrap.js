import React from 'react';
import ReactDOM from 'react-dom';

import {createMemoryHistory, createBrowserHistory} from 'history';
import { App } from './App';

// Mount function to startup the app
const mount = (elem, {onSignIn, onNavigate, initialPathname, defaultHistory}) => {
    const history = defaultHistory || createMemoryHistory();

    if(onNavigate) {
        history.listen(onNavigate);
    }

    if (initialPathname) {
        const { pathname } = history.location;
        if (pathname !== initialPathname) {
          history.push(initialPathname);
        }
    }

    ReactDOM.render(
        <App onSignIn={onSignIn} history={history}/>,
        elem
    );

    // Functions to send to the container app
    return {
        onParentNavigate({pathname: nextPathName}) {
            const {pathname} = history.location;

            if(pathname !== nextPathName) {
                history.push(nextPathName);
            }
        },
    };
};

// If we are in development and in isolation,
// call mount immediately
if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');
    if(devRoot) {
        mount(devRoot, {defaultHistory: createBrowserHistory()});
    }
}

// We are running through container
// and we should export the mount function
export {mount};