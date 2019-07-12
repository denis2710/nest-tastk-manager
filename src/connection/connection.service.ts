import { Injectable } from "@nestjs/common";
import * as Knex from 'knex'

@Injectable()
export class ConectionService{ 

  getConnection() : Knex { 
    const config: Knex.Config = { 
      client: 'mysql', 
      connection: { 
        host: '192.168.1.60', 
        database: 'teste_denis', 
        user: 'root', 
        password: 'advantech', 
        insecureAuth: true, 
        debug: false      
      }
    }

    return Knex(config)
  }
}