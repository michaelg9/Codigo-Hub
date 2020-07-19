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

    return async (dispatch) => {

        dispatch(fetchEthereumAuth());

        try {
            // Request account access if needed
            const ethereumAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Authenticate and the users 3box and app space
            const box = await Box.create(window.ethereum);
            const spaces = ['código-user-space'];
            await box.auth(spaces, {address: ethereumAddress[0]});
            await box.syncDone;

            // Accounts now exposed
            dispatch(ethereumAuthSuccess({
                ethereumAddress: ethereumAddress,
                userBox: box,
                userSpace: spaces[0]
            }));


        } catch (error) {
            // User denied account access...
            console.log('error caught', error);
            dispatch(ethereumAuthError(error));
        }
    }
}


// Firmware Management

export const FIRMWARE_SUCCESS = 'FIRMWARE_SUCCESS';
export const FIRMWARE_FAILURE = 'FIRMWARE_FAILURE';

export function firmwareLinkSuccess(payload) {
    return {
        type: FIRMWARE_SUCCESS,
        payload
    };
}

function firmwareLinkFailure(payload) {
    return {
        type: FIRMWARE_FAILURE,
        payload,
    };
}

/**
 * Tries to enable the users Ethereum Account and returns the address if successful. The enabled status of ethereum
 * is false by default to allow for setting by external provider.
 * @returns {function(...[*]=)}
 */
export function linkUserToFirmware() {

    return async (dispatch) => {

        try {

            // Call contract.challenge(address_to_claim) generates a random challenge, stores it in the smart contract and returns it
            // Sign the challenge with web3.eth.sign(challenge, address_to_claim) to produce the response, as far as I understand it goes to the attached wallet to look up the associated private key
            // Call contract.response(response) to return the response, the smart contract checks the signature and if correct stores a mapping sender_address -> claimed_address
            // Any client can call contract.get_paired_address(address) to see if there is an associated address
            const networkAddress = '';

            // Accounts now exposed
            dispatch(firmwareLinkSuccess(networkAddress));

        } catch (error) {
            // User denied account access...
            console.log('firmware link error caught', error);
            dispatch(firmwareLinkFailure(error));
        }
    }
}
