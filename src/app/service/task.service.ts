import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Task } from '../models/task';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasksCollection:AngularFirestoreCollection<Task>;
  tasks:Observable<Task[]>;
  taskDoc:AngularFirestoreDocument<Task>;

  constructor(public db: AngularFirestore) {
    //this.tasks = this.db.collection('tasks').valueChanges(); //Consulta directa a bd sin id
    this.tasksCollection = this.db.collection('tasks');
    this.tasks = this.tasksCollection.snapshotChanges().pipe(map(actions =>{
      return actions.map(a => {
        const data = a.payload.doc.data() as Task;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
   }

   getTasks(){
     return this.tasks;
   }

   createTask(task:Task){
    this.tasksCollection.add(task);
   }

   updateTask(task:Task){
    this.taskDoc = this.db.doc('tasks/'+task.id);
    this.taskDoc.update(task);
   }

   deleteTask(task:Task){
    this.taskDoc = this.db.doc('tasks/'+task.id);
    this.taskDoc.delete();
   }
}
