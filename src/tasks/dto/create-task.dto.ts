import { IsString, IsNotEmpty } from 'class-validator'
import { StatusTask } from '../enum/status-task';

export class CreateTask{ 
  @IsNotEmpty()
  @IsString()
  readonly title: string 
  
  @IsString()
  @IsNotEmpty()
  readonly description: string
  
  @IsString()
  @IsNotEmpty()
  readonly status: StatusTask 
}