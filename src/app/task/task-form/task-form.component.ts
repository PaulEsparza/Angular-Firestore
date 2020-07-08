import { Component, OnInit } from '@angular/core';

import { TaskService } from '../../service/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task = {} as Task;

  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
  }

  createTask(){
    //console.log(this.task);
    if(this.task.tite != '' && this.task.description != '' && this.task.priority != 0){
      this.taskService.createTask(this.task);
      this.task = {} as Task;
    }
  }

}
