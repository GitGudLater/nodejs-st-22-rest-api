import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GroupController } from 'src/routers/controllers/group/group.controller';
import { UserController } from 'src/routers/controllers/user/user.controller';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private logger = new Logger();

  public catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const context = host.switchToHttp();

    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const message = exception.message;
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(statusCode).json({ message, statusCode });

    this.logException(request, response, message);
  }

  private logException(
    request: Request,
    response: Response,
    message: string,
  ): void {
    const errorSource = this.getMethodName(request);
    const { params, query, body } = request;

    console.error(response);
    console.error(request);

    this.logger.error(`Source: ${errorSource}`);
    this.logger.error(`Message: ${message}`);
    this.logger.error({ params, query, body });
  }

  private getMethodName(request: Request): string {
    const { method, params, query } = request;
    const [, , endpointName]: string[] = request.url.split('/');

    if (endpointName === 'user') {
      const controllerName = UserController.name;
      switch (method) {
        case 'GET':
          if (params.id)
            return `${controllerName}.${UserController.prototype.getUserById.name}`;
          else if (query)
            return `${controllerName}.${UserController.prototype.getAutoSuggestUsers.name}`;
          return `${controllerName}.${UserController.prototype.getUsers.name}`;
        case 'POST':
          return `${controllerName}.${UserController.prototype.addUser.name}`;
        case 'PUT':
          return `${controllerName}.${UserController.prototype.updateUser.name}`;
        case 'DELETE':
          return `${controllerName}.${UserController.prototype.markAsDelete.name}`;
      }
    }

    if (endpointName === 'groups') {
      const controllerName = GroupController.name;
      switch (method) {
        case 'GET':
          if (params.id)
            return `${controllerName}.${GroupController.prototype.getGroupById.name}`;
          return `${controllerName}.${GroupController.prototype.getGroups.name}`;
        case 'POST':
          if (params.id)
            return `${controllerName}.${GroupController.prototype.addUsersToGroup.name}`;
          return `${controllerName}.${GroupController.prototype.addGroup.name}`;
        case 'PUT':
          return `${controllerName}.${GroupController.prototype.updateGroup.name}`;
        case 'DELETE':
          return `${controllerName}.${GroupController.prototype.markAsDelete.name}`;
      }
    }

    return 'Unknown error';
  }
}
