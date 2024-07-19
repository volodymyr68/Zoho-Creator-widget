import { drawPage } from './utils/domUtils.js';


    const initializeZohoCreator = async () => {
        try {
            await ZOHO.CREATOR.init();
            await drawPage();
        } catch (error) {
            console.error("Error initializing Zoho Creator:", error);
        }
    }

    initializeZohoCreator();
