import {getAllSprints, getAllTasks} from "./zohoApi.js";

export let SPRINTS = ""

export let TASKS = ""

export const setData = async () =>{
    SPRINTS = await getAllSprints();
    TASKS = await getAllTasks();
}