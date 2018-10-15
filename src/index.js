import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {News} from './news';

ReactDOM.render(<News />, document.getElementById('root'));

serviceWorker.unregister();
