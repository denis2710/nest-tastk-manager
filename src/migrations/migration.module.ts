import { Module } from "@nestjs/common";
import { MigrationController } from "./migrations.controller";
import { MigrationService } from "./migrations.service";
import { ConectionService } from "./../connection/connection.service";

@Module({
  imports: [], 
  controllers:[MigrationController], 
  providers: [MigrationService, ConectionService]
})
export class MigrationModule{}