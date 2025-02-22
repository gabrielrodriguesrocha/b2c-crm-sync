'use strict';

// Initialize module dependencies
const config = require('config');

// Initialize the CLI api
const cliAPI = require('../../index');

// Initialize local libraries
const cliUi = require('../../lib/cli-interface/ui');

// Retrieve the helper function that calculates the default program option value
const getProgramOptionDefault = require('../../lib/cli-api/_common/_getProgramOptionDefault');

/**
 * @function openScratchOrg
 * @description This function is used to open an sfdx scratch org using a configured profile.
 *
 * @param {Object} commandProgram Represents the CLI program to which the getEnvironment command is appended
 * @return {Object} Returns the updated commandProgram -- including the command that was just attached
 */
module.exports = commandProgram => {

    // Append the environment-get command to the parent program
    commandProgram
        .command('crm-sync:sf:org:open')
        .requiredOption(config.get('cliOptions.sfScratchOrgUsername.cli'), config.get('cliOptions.sfScratchOrgUsername.description'), getProgramOptionDefault('sfScratchOrgUsername'))
        .description('Open a scratch-org leveraging the userName specified via the CLI -- defaults to the .env; can be overridden via the CLI')
        .action(async commandObj => {

            // Initialize constants
            const commandOptions = commandObj.opts();
            // Retrieve the runtime environment
            const environmentDef = cliAPI.getRuntimeEnvironment(commandOptions);

            try {

                // Open the bookend and output the environment details
                cliUi.cliCommandBookend(commandObj._name, 'start');
                console.log(' -- Attempting to open the scratch org');

                // Open the scratchOrg via the CLI
                const resultObj = await cliAPI.sfScratchOrgOpen(environmentDef);
                cliUi.outputResults([resultObj.outputDisplay], undefined, 'cliTableConfig.scratchOrgResults');
                console.log(`Org URL: ${resultObj.result.url}`);

            } catch (e) {

                cliUi.outputResults(undefined, e);

            } finally {

                cliUi.cliCommandBookend(commandObj._name, 'end');

            }

        });

    // Return the program with the appended command
    return commandProgram;
};
