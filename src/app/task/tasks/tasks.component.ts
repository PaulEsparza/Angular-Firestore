import { Component, OnInit } from '@angular/core';

import { TaskService } from '../../service/task.service'
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks = [];
  editingTask:Task;
  editing:boolean = false;

  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(data =>{
      //console.log(data);
      this.tasks = data;
    });
  }

  editTask(task){
    //console.log(task);
    this.editingTask = task;
    this.editing = !this.editing;
  }

  deleteTask(task){
    this.taskService.deleteTask(task);
    this.editing = false;
  }

  updateTask(){
    //console.log(this.editingTask);
    this.taskService.updateTask(this.editingTask);
    this.editingTask = {} as Task;
    this.editing = false;
  }

}
