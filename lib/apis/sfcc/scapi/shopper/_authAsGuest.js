'use strict';

// Initialize local libraries
const requestLib = require('../../../../../lib/_common/request');

/**
 * @function _authAsGuest
 * @description Attempts to generate a shop-session authorizing a user as a guest
 *
 * @param {Object} environmentDef Represents the environment where a given code-version will be activated
 * @returns {Promise} Returns a promise that announces the execution results
 */
module.exports = (environmentDef, organizationId) => new Promise(async (resolve, reject) => {

    // Initialize local variables
    const endpoint = '/customer/shopper-customers/';
    const scapiUrlSuffix = `/organizations/${organizationId}/customers/actions/login`;

    try {

        // Initialize the request instance and definition
        const b2cRequestInstance = requestLib.createRequestInstance(environmentDef);
        let thisRequestDef = requestLib.createSCAPIRequestDef(endpoint, scapiUrlSuffix);

        // Define the request body details
        thisRequestDef.body = {
            type: 'guest'
        };

        // Execute and process the request; wait for the results
        const responseObj = await b2cRequestInstance.post(thisRequestDef.url, thisRequestDef.body, thisRequestDef);

        // Initialize the output property
        let output = {
            success: true,
            headers: responseObj.headers,
            status: responseObj.status,
            data: responseObj.data
        }

        // Was an authorization token found?
        if (output.headers.hasOwnProperty('authorization')) {

            // If so, then append it to the output
            output.authToken = output.headers.authorization.split(' ').pop();

        }

        // Process the results
        resolve(output);

    } catch (e) {

        // Indicate an error occurred
        e.success = false;

        // Otherwise -- throw an error
        reject(e);

    }

});
