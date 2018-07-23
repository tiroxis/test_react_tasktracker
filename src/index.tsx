import App from "./App";
import registerServiceWorker from './registerServiceWorker';

import {Provider} from "react-redux";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./store";




ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
