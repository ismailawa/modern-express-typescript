import {
  POST,
  PUT,
  PATCH,
  DELETE,
} from './../../decorators/routes/handlers.decorator';
import Controller from '../../decorators/routes/controller.decorator';
import { Request, Response } from 'express';
import { GET } from '../../decorators/routes/handlers.decorator';

@Controller('/api/users')
export default class UsersController {
  @POST('')
  public async createUser(req: Request, res: Response): Promise<any> {
    res.status(200).json({ name: 'working ' });
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
