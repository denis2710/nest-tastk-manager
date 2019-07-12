import { Controller, Get } from "@nestjs/common";
import { MigrationService } from "./migrations.service";
import { ConectionService } from "./../connection/connection.service";

@Controller('migration')
export class MigrationController { 
  
  constructor(private readonly migrationsService: MigrationService){
   }

  @Get()
  runMigrations(){ 
    return this.migrationsService.runMigration(); 
  }

  async createTableTasks() { 

  }
}