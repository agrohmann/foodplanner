import { set_busy, set_hidden_busy } from '../actions.js';

let runningActions = {},
    hiddenActions = {};

export const handleAssync = store => next => action => {
    if (action.status === 'initialized') {
        if (!Object.keys(runningActions).length) {
            store.dispatch(set_busy(true));
        }
        runningActions[action.actionId] = 'running';
    } else if (action.status === 'hidden') {
        if (!Object.keys(runningActions).length) {
            store.dispatch(set_hidden_busy(true));
        }
        hiddenActions[action.actionId] = 'running';
    } else if (action.status === 'complete' || action.status === 'failure') {
        delete runningActions[action.actionId];
        delete hiddenActions[action.actionId];
        if (!Object.keys(runningActions).length) {
            store.dispatch(set_busy(false));
        }
        if (!Object.keys(hiddenActions).length) {
            store.dispatch(set_hidden_busy(false));
        }
    }
    next(action);
}