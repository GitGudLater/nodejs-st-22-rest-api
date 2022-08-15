import { ConsoleLogger, Injectable, Scope } from "@nestjs/common";
import { GroupDTO } from "src/interfaces/dto/groupdto";
import { UserDTO } from "src/interfaces/dto/userdto";
import { Argument } from "src/interfaces/models/argument";

@Injectable({ scope: Scope.TRANSIENT})
export class ServiceLogger extends ConsoleLogger {
    serviceMethodLog(method: string, args: Argument[] | null) {
        args ? this.log(`invoked method ${method} with arguments ${args}`) : this.log(`invoked method ${method} with no arguments`);
    }
  }
}