import { Injectable, BadRequestException } from "@nestjs/common";
import { ConectionService } from "./../connection/connection.service";
import * as Knex from 'Knex'

@Injectable()
export class MigrationService{ 

  private connection: Knex ; 

  constructor(private readonly conectionService : ConectionService ) {
    this.connection = this.conectionService.getConnection()
  }

  async runMigration() { 
    try {
      const dropTableTaks = await this.dropTableTask()
      const create        = await this.createTableTaks()
      const seed          = await this.seedTask()

      return {msg: "migrations executadas com sucesso"}
    } catch (error) {
      throw new BadRequestException("Ocorreu um erro ao rodar as migrações")
    }
  }

  async dropTableTask( ) { 
    return await this.connection.schema.dropTableIfExists('tasks')
  }

  async createTableTaks() {     
    return await this.connection.schema.createTable('tasks', (table) => {
      table.increments('id')
      table.string('title')
      table.string('description')
      table.string('status')
    })
  }

  async seedTask() { 
    const seedsTask  = [
      {
        title: 'Verificar regra do novo arquivo', 
        description: 'Ligar para RH e verificar a regra do arquivo', 
        status: 'CONCLUIDO'
      }, 
      {
        title: 'Incluir regra do arquivo as validações ', 
        description: 'Inserir as regras novas no arquivo de configuração do sistema e testar ', 
        status: 'FAZENDO'
      }, 
      
      {
        title: 'Importar o novo arquivo', 
        description: 'Importar o novo arquivo para alimentar base de testes', 
        status: 'PENDENTE'
      }, 
      
      {
        title: 'Agendar Ferias', 
        description: 'Agendar Ferias no sistema', 
        status: 'PENDENTE'
      }, 
      
      {
        title: 'Atualizar VSCode', 
        description: 'Atualizar VsCode para versao 1.4.8.9', 
        status: 'PENDENTE'
      }, 
      
      {
        title: 'Entregar projeto para equipe de testes', 
        description: 'Entregar o projeto V2 para o tie de testes', 
        status: 'PENDENTE'
      }, 

      {
        title: 'Entregar justificativa de horario', 
        description: 'Entregar justificativa de horario ', 
        status: 'FEITO'
      },       
     ]

    return await this.connection.insert(seedsTask).into('tasks')
  }


}