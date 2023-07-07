import {
  POST,
  PUT,
  PATCH,
  DELETE,
  GET,
} from './../../decorators/routes/handlers.decorator';
import Controller from '../../decorators/routes/controller.decorator';
import { Request, Response } from 'express';
import UsersService from './users.service';
import { injectable, inject } from 'tsyringe';
import IUsersService from './IUsers.service';

@injectable()
@Controller('/api/users')
export default class UsersController {
  constructor(@inject('IUsersService') private UsersService: IUsersService) {}
  @POST('')
  public async createUser(req: Request, res: Response): Promise<any> {
    res.status(200).json({ data: await this.UsersService.create(req.body) });
  }

  @GET('')
  public async getUsers(req: Request, res: Response): Promise<any> {
    res.status(200).json({ name: 'working ' });
  }

  @GET('/:id')
  public async getUser(req: Request, res: Response): Promise<any> {
    res.status(200).json({ name: 'working ' });
  }

  @PUT('/:id')
  public async updateUser(req: Request, res: Response): Promise<any> {
    res.status(200).json({ name: 'working ' });
  }

  @PATCH('/:id')
  public async editUser(req: Request, res: Response): Promise<any> {
    res.status(200).json({ name: 'working ' });
  }

  @DELETE('/:id')
  public async deleteUser(req: Request, res: Response): Promise<any> {
    res.status(200).json({ name: 'working ' });
  }
}
