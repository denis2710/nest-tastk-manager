import { Injectable, NotFoundException } from "@nestjs/common";
import { ConectionService } from "./../connection/connection.service";
import * as Knex from 'knex'
import { CreateTask } from "./dto/create-task.dto";
import { UpdateTask } from "./dto/update-task.dto";
import { GetTask } from "./dto/get-task.dto";

@Injectable()
export class TasksService{ 

  private conection: Knex; 

  constructor(conectionService: ConectionService) { 
    this.conection = conectionService.getConnection()
  }
  
  async getAllTask(): Promise<GetTask[]> { 
    const tasks: GetTask[] = await this.conection.from('tasks')
    return tasks
  }

  async getTask(id: number): Promise<GetTask> { 
    const tasks: GetTask = await this.conection.from('tasks').where({ id }).first()
    
    if(!tasks) throw new NotFoundException("Tarefa nao encontrada") 
    
    return tasks
  }

  async create(createTask: CreateTask) : Promise<GetTask> { 
    const id = await this.conection.from('tasks').insert(createTask)
    return this.getTask(id[0])
  }

  async update(updateTask: UpdateTask)  {
    const taskId = updateTask.id 
    const task = await this.getTask(taskId)

    let newUpdateTask: UpdateTask = task 

    if(updateTask.description) { 
      newUpdateTask.description = updateTask.description
    }

    if(updateTask.title) { 
      newUpdateTask.title = updateTask.title
    }

    if(updateTask.status) { 
      newUpdateTask.status = updateTask.status
    }

    await this.conection.from('tasks').update(newUpdateTask).where({ id: taskId })
    
    return newUpdateTask

  }

  async delete(id): Promise<GetTask> { 
    const task = await this.getTask(id)
    await this.conection.from('tasks').where({ id }).del()
    return task
  }



}