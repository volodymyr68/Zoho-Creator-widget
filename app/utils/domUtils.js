import {setData, SPRINTS, TASKS} from "../api/zohoResponses.js";
import {updateData} from "../api/zohoApi.js";

export const drawPage = async () =>{
    await setData()
    const sprintRecords =  SPRINTS;
    const taskRecords =  TASKS;
    taskEventListener();
    await updateData(sprintRecords);
    drawSprints(sprintRecords);
    drawTasks(taskRecords);
}

const drawSprints =  (sprintRecords) =>{
    let sprintSelect = document.getElementById("sprintSelect");
    sprintRecords.forEach(record =>{
        let option = document.createElement("option");
        option.value = record.ID;
        option.text = record.Sprint_Name;
        sprintSelect.appendChild(option);
    });
    let selectAllTasks = document.getElementById("selectAllTasksLabel");

    selectAllTasks.textContent = `Project : ${sprintRecords[0].Project.display_value}`;
}

const drawTasks =  (taskRecords) =>{

    let taskList = document.getElementById("taskList");
    taskRecords.forEach(record =>{
        let li = document.createElement("li");
        li.className = "list-group-item";
        let input = document.createElement("input");
        input.type = "checkbox";
        input.className = "custom-control-input task-checkbox";
        input.id = record.ID;
        let label = document.createElement("label");
        label.className = "custom-control-label";
        label.setAttribute("for", record.ID);
        label.textContent = `${record.Task_Name} - ${record.Task_Number} : ${record.Status}`;
        li.appendChild(input);
        li.appendChild(label);
        taskList.appendChild(li);
    });
}

const taskEventListener = ()=> {
        document.getElementById('selectAllTasks').addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.task-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
}