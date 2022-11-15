const taskManager = new TaskManager();
taskManager.load();
taskManager.render();


const validFormFieldInput = (data) => {
    data.preventDefault();

    const newTaskName = document.querySelector('#formGroupTaskName');
    const taskName = newTaskName.value;

    const newTaskDescription = document.querySelector('#formGroupTaskDescription');
    const taskDescription = newTaskDescription.value;

    const newGroupAssignedTo = document.querySelector('#formGroupAssignedTo');
    const taskAssignedTo = newGroupAssignedTo.value;

    const newDueDate = document.querySelector('#formGroupDueDate');
    const taskDueDate = newDueDate.value;

    const newTaskStatus = document.querySelector('#formTaskStatus');
    const taskStatus = newTaskStatus.value;

    const todaysDate = dateValidation();


    if (taskDueDate <= todaysDate) {
        alert('You cannot have a due date in the past.');
        document.querySelector('#alertDiv').innerHTML = 'Form not submitted, you must fix the error and resubmit';
        document.querySelector('#alertDiv').style.background = 'red';
        document.querySelector('#alertDiv').style.display = 'block';
    } else {
        document.querySelector('#alertDiv').style.background = 'white';
        document.querySelector('#alertDiv').style.display = 'none';
        taskManager.addTask(taskName, taskDescription, taskAssignedTo, taskDueDate, taskStatus)
        taskManager.render();
        taskManager.save();
        document.querySelector('#taskFormEntry').reset();

    }


}


const dateValidation = () => {
    const date = new Date();
    let todaysDay = date.getDate();
    let todaysMonth = date.getMonth() + 1;
    const todaysYear = date.getFullYear();

    if (todaysDay < 10) {
        todaysDay = '0' + todaysDay;
    }
    if (todaysMonth < 10) {
        todaysMonth = '0' + todaysMonth;
    }
    const tDate = todaysYear + '-' + todaysMonth + '-' + todaysDay;
    return (tDate);
}


const runButton = document.querySelector('#taskFormEntry');
runButton.addEventListener('submit', validFormFieldInput);

const doneClick = document.querySelector('#taskList');
doneClick.addEventListener('click', (event) => {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement.parentElement;
        const taskId = parseInt(parentTask.dataset.taskId);
        const task = taskManager.getTaskById(taskId);
        task.status = "Done";
        taskManager.render(task);
        taskManager.save();
    } else 
    
        
    if (event.target.classList.contains('delete-button')) {
        const parentTask = event.target.parentElement.parentElement.parentElement;
        const taskId = parseInt(parentTask.dataset.taskId);
        taskManager.deleteTask(taskId);
        taskManager.save();
        taskManager.render();
    }
});

