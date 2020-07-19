// Login Management

import Box from '3box';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin() {
    return {
        type: LOGIN_SUCCESS
    };
}

function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('authenticated');
        dispatch(receiveLogout());
    };
}

export function loginUser(creds) {
    // TODO this is where we implement an actual login implementation
    return (dispatch) => {

        dispatch(receiveLogin());

        if (creds.email.length > 0 && creds.password.length > 0) {
            localStorage.setItem('authenticated', true)
        } else {
            dispatch(loginError('Something was wrong. Try again'));
        }
    }
}

// Ethereum Management

export const ETHEREUM_FETCHING = 'ETHEREUM_FETCHING';
export const ETHEREUM_SUCCESS = 'ETHEREUM_SUCCESS';
export const ETHEREUM_FAILURE = 'ETHEREUM_FAILURE';


export function fetchEthereumAuth() {
    // console.log('fetching ethereum auth');
    return {
        type: ETHEREUM_FETCHING
    };
}

export function ethereumAuthSuccess(payload) {
    return {
        type: ETHEREUM_SUCCESS,
        payload
    };
}

function ethereumAuthError(payload) {
    return {
        type: ETHEREUM_FAILURE,
        payload,
    };
}

/**
 * Tries to enable the users Ethereum Account and returns the address if successful. The enabled status of ethereum
 * is false by default to allow for setting by external provider.
 * @returns {function(...[*]=)}
 */
export function enableUserEthereum() {

    return (dispatch) => {

        dispatch(fetchEthereumAuth());
        // console.log('changed')
        try {
            // Request account access if needed
            let ethereumAddress = window.ethereum.enable();

            // // Authenticate and the users 3box and app space
            const userBox = Box.openBox(ethereumAddress, window.ethereum);
            const userSpace = userBox.openSpace('codigo-user-space');

            // Accounts now exposed
            dispatch(ethereumAuthSuccess({
                ethereumAddress: ethereumAddress,
                user3Box: userBox,
                user3Space: userSpace
            }));
        } catch (error) {
            // User denied account access...
            // console.log('error caught')
            dispatch(ethereumAuthError(error));
        }
    }
}
