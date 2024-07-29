import {initializeZohoConstants, SPRINT_CONFIG, TASK_CONFIG, ZOHO_CONSTANTS} from '../utils/zohoConstants.js';
import {modalSuccess} from "../utils/zohoHelpers.js";

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
        modalSuccess(response);
    } catch (error) {
        alert("Error updating contact developer");
        console.error("Error updating record:", error);
        throw error;
    }
};

export const setBacklogToTasks = async (config) => {
    try {
        const response = await ZOHO.CREATOR.API.updateRecord(config);
        modalSuccess(response);
    } catch (error) {
        alert("Error setting backlog to tasks");
        console.error("Error setting backlog to tasks:", error);
        throw error;
    }
}

export const updateData = async (sprintRecords) => {
     try{
        await sprintUpdate(sprintRecords);
     }catch (error) {
         console.error("Error updating data:", error);
     }
     try{
        await updateTasks();
     }catch (error) {
         console.error("Error updating tasks:", error);
     }

};

const sprintUpdate = async (sprintRecords) => {
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


        const SPRINT_CONFIG = {
            appName: ZOHO_CONSTANTS.APP_LINK_NAME || "",
            reportName: "All_Sprints",
            id: sprintID,
            data: formData
        };

        try{
            await updateSprint(SPRINT_CONFIG);
        }catch (error){
            alert("Error updating sprint");
            console.error("Error updating sprint:", error);
        }

    });
}

const updateTasks = async () => {
    document.getElementById("backlog").addEventListener("click", () => {
    let selectedTaskIds = [];
    const checkboxes = document.querySelectorAll('.task-checkbox:checked');
    checkboxes.forEach(checkbox => {
        selectedTaskIds.push(checkbox.id);
    });

        selectedTaskIds.forEach(item=>{
           const TASKS_CONFIG = {
                 appName: ZOHO_CONSTANTS.APP_LINK_NAME || "",
                 reportName: "All_Tasks",
                 id: item,
                 data : {data:{Status:"Backlog",Sprint:null}}
             };
             setBacklogToTasks(TASKS_CONFIG);
        });
    });
}

