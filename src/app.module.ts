import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MigrationModule } from './migrations/migration.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [MigrationModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
