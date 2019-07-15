import { PipeTransform, BadRequestException } from "@nestjs/common";
import { StatusTask } from "../enum/status-task";

export class TaskStatusValidationPipe implements PipeTransform{
  readonly alowedStatusTaks  = [
    StatusTask.PENDENTE, 
    StatusTask.EM_EXECUCAO, 
    StatusTask.FINALIZADO
  ]

  transform(value: any){ 

    if(value.status){
      if(!this.isStatusValid(value.status)){ 
        throw new BadRequestException('status invaido')
      }

    }
    return value
  }

  isStatusValid(status: any){ 
    const idx = this.alowedStatusTaks.indexOf(status)
    return idx !== -1
  }
}