const { assert } = require('chai');
const { describe, it } = require('mocha');
const TaskManager = require('../assets/scripts/taskManager');
const taskTest = new TaskManager();

describe("taskTest", () => {
describe("addTask", () => {
    it('adds a task to the array', () => {
        //setup
        //const inputData = (); 
        const expectedResult = [{id: 1, name: "Laundry", description:"Wash the clothes" , assignedTo: "Phil" ,dueDate: "12/24/22", status: "To Do"}];
        //exercise
        const result = taskTest.addTask("Laundry", "Wash the clothes", "Phil", "12/24/22", "To Do");

        console.log(result);
        //verify
        assert.ok(result == expectedResult);

    });
});

describe("getTaskById", () => {
    it('retrieves array entry at #Id', () => {
        //setup
        const inputData = 1; 
        const expectedResult = {id: 1, name: "Laundry", description:"Wash the clothes" , assignedTo: "Phil" ,dueDate: "12/24/22", status: "To Do"};
        //exercise
        const result = taskTest.getTaskById(inputData);

        //verify
        assert.ok(result == expectedResult);
    });
});


describe("deleteTask", () => {
    it('reforms array without entry #Id', () => {
        //setup
        const inputData = 1; 
        const expectedResult = undefined;
        //exercise
        const result = taskTest.deleteTask(inputData);

        //verify
        assert.ok(result == expectedResult);
    });
});

});