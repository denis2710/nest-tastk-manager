import { Controller, Get , Post, Put, Delete, Param, Body} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTask } from "./dto/create-task.dto";
import { GetTask } from "./dto/get-task.dto";
import { UpdateTask } from "dist/tasks/dto/update-task.dto";

@Controller('/task')
export class TasksController{ 

  constructor(private readonly tasksService: TasksService) { }

  @Get()
  async getAllTaks(): Promise<GetTask[]> { 
    return await this.tasksService.getAllTask()
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<GetTask> { 
    return await this.tasksService.getTask(id)
  }

  @Post('')
  async createNewTask(@Body() createTask : CreateTask) { 
    return await this.tasksService.create(createTask)
  }

  @Put('/:id')
  async updateTaks(@Param('id') id : number, @Body() createTask : CreateTask ) { 
    const updateTaks: UpdateTask = { id, ...createTask}
    return await this.tasksService.update(updateTaks)
  }

  @Delete('/:id') 
  async deleteTask(@Param('id') id: number) { 
    return await this.tasksService.delete(id)
  }


}