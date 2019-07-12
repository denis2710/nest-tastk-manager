import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { ConectionService } from "./../connection/connection.service";


@Module({
  controllers: [TasksController], 
  providers: [TasksService, ConectionService]
})
export class TasksModule {}