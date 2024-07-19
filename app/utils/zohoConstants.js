import { getQueryParams, getInitParams } from './zohoHelpers.js';

export const ZOHO_CONSTANTS = {
    SCOPE: '',
    ENV_URL_FRAGMENT: '',
    APP_LINK_NAME: '',
    LOGIN_USER: '',
    PROJECT_ID: ''
};

export const SPRINT_CONFIG = {
    appName: "",
    reportName: "All_Sprints",
    criteria: "",
    page: 1,
    pageSize: 200,
}

export const TASK_CONFIG = {
    appName: "",
    reportName: "All_Tasks",
    criteria: "",
    page: 1,
    pageSize: 200,
}

export const initializeZohoConstants = async () => {
    try {
        const queryParams = await getQueryParams();
        const initParams = await getInitParams();

        ZOHO_CONSTANTS.SCOPE = initParams.scope || '';
        ZOHO_CONSTANTS.ENV_URL_FRAGMENT = initParams.envUrlFragment || '';
        ZOHO_CONSTANTS.APP_LINK_NAME = initParams.appLinkName || '';
        ZOHO_CONSTANTS.LOGIN_USER = initParams.loginUser || '';
        ZOHO_CONSTANTS.PROJECT_ID = queryParams.projectId || '';

        SPRINT_CONFIG.appName = ZOHO_CONSTANTS.APP_LINK_NAME || '';
        SPRINT_CONFIG.criteria = `Project == ${ZOHO_CONSTANTS.PROJECT_ID}`;

        TASK_CONFIG.appName = ZOHO_CONSTANTS.APP_LINK_NAME || '';
        TASK_CONFIG.criteria = `Projects == ${ZOHO_CONSTANTS.PROJECT_ID} && Status != "Closed"  && Status != "Cancel"`;


    } catch (error) {
        console.error("Error initializing Zoho constants:", error);
    }
};