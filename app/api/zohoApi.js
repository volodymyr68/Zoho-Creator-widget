import {initializeZohoConstants, SPRINT_CONFIG, TASK_CONFIG, ZOHO_CONSTANTS} from '../utils/zohoConstants.js';

export const getAllSprints = async () => {
    try {
        await initializeZohoConstants();
        const response = await ZOHO.CREATOR.API.getAllRecords(SPRINT_CONFIG);
        return response.data;
    } catch (error) {
        console.error("Error fetching records:", error);
        throw error;
    }
};

export const getAllTasks = async () => {
    try {
        await initializeZohoConstants();
        const response = await ZOHO.CREATOR.API.getAllRecords(TASK_CONFIG);
        return response.data;
    } catch (error) {
        console.error("Error fetching records:", error);
        throw error;
    }
};

export const updateSprint = async (config) => {
    try {
        const response = await ZOHO.CREATOR.API.updateRecord(config);
    } catch (error) {
        console.error("Error updating record:", error);
        throw error;
    }
};

export const updateData = (sprintRecords) => {
    document.getElementById("submit").addEventListener('click', async () => {
        const sprintSelect = document.getElementById('sprintSelect');
        const sprintID = sprintSelect.value;

        const selectedTaskIds = [];
        const checkboxes = document.querySelectorAll('.task-checkbox:checked');
        checkboxes.forEach(checkbox => {
            selectedTaskIds.push(checkbox.id);
        });

        if (selectedTaskIds.length === 0) {
            alert('Please select at least one task.');
            return;
        }

        const sprintTasks = sprintRecords.find(sprint => sprint.ID === sprintID).Tasks.map(task => task.ID);
        const allTasks =  [...sprintTasks, ...selectedTaskIds];

        const formData = { data : {Tasks: allTasks} };


        const UPDATE_CONFIG = {
            appName: ZOHO_CONSTANTS.APP_LINK_NAME || "",
            reportName: "All_Sprints",
            id: sprintID,
            data: formData
        };

        await updateSprint(UPDATE_CONFIG);
    });
};


