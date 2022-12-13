

//This will populate the empty html element into the index.html file for each card.

const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const html = `<li class="list-group-item" data-task-id=${id}>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Description</h6>
        <p class="card-text">${description}</p>
        <p>Assigned to: ${assignedTo}</p>
        <p>Due Date: ${dueDate}</p>
        <button type="button" class="btn btn-success btn-sm">${status}</button>
        <a href="#" class="btn done-button btn-secondary">Mark As Done</a>
        <a href="#" class="btn btn-primary delete-button">Delete</a>
      </div>
    </div>  
  </li>`
  return html;
}



//This class is the main createor for all of the actions that can be accomplished.
  
class TaskManager {
  constructor(tasks, currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

 //This adds an additional task to the array. 
  
  addTask(taskName, taskDescription, taskAssignedTo, taskDueDate, taskStatus) {
    const task = {
      id: ++this.currentId,
      name: taskName,
      description: taskDescription,
      assignedTo: taskAssignedTo,
      dueDate: taskDueDate,
      status: taskStatus
    }
    this.tasks.push(task);
  }

  
  //This runs the method that will display the new card to the browser.
  
  render() {
    const taskHtmlList = [];

    for (let i = 0; i < taskManager.tasks.length; i++) {
      const workingTask = taskManager.tasks[i];
      const date = new Date(`${workingTask.dueDate}T00:00`);
      const formattedDate = date.toString().substring(0, 15);
      const taskHtml = createTaskHtml(workingTask.id, workingTask.name, workingTask.description, workingTask.assignedTo, formattedDate, workingTask.status);
      taskHtmlList.push(taskHtml);
    }
    const tasksHtml = taskHtmlList.join('\n');
    document.querySelector('#taskList').innerHTML = tasksHtml;
  }

  
  //This checks each id# in the array until it matches the test case and returns the id# of the match. 
  
  getTaskById(taskId) {
    let foundTask;
    for (let i = 0; i < taskManager.tasks.length; i++) {
      const task = taskManager.tasks[i];
      if (task.id === taskId) {
        foundTask = task;
      }
    }
    return foundTask;
  }

  
   //This method activates local storage so your tasks persist across losing focus and/or closing the browser window.
  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJson);
    const currentId = JSON.stringify(this.currentId);
    localStorage.setItem('currentId', currentId);
  }

  //This is used in conjunction with save() to to load items from local storage. 
  load() {
    if (localStorage.getItem('tasks')) {
      const tasksJson = JSON.parse(localStorage.getItem('tasks'));
      this.tasks = tasksJson;
      const currentId = JSON.parse(localStorage.getItem('currentId'));
      this.currentId = parseInt(currentId);
    }
  }
  
  
  //This method removes a task from the array by reforming the array without it.
  deleteTask(taskId) {
    const newTasks = [];
    for (let i = 0; i < taskManager.tasks.length; i++) {
      const task = taskManager.tasks[i];
      if (task.id != taskId) {
        newTasks.push(task);
      }
    }
    this.tasks = newTasks;
  }

}


module.exports = TaskManager;
