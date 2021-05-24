'use strict';

/**
 * @function buildSCAPIUrl
 * @description Builds the SCAPI Url used to drive a request
 *
 * @param {String} endpoint API endpoint upon which the URL will be created
 * @param {String} apiVersion Represents the API version to include in the OCAPI url
 * @param {String} urlSuffix Represents any suffix being added to the url
 * @returns {Object} Returns the OCAPI Url created using the argument properties
 */
module.exports = (endpoint, apiVersion, urlSuffix) => {
    // Build out the SCAPI url -- including the API version, endpoint and URL suffix
    return `${endpoint}/${apiVersion}/${urlSuffix}`;
};
