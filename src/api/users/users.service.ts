import { injectable, inject } from 'tsyringe';
import IUsersService from './IUsers.service';

@injectable()
export default class UsersService implements IUsersService {
  public async create(payload: any): Promise<any> {
    return payload;
  }

  public async find(payload: any): Promise<any> {
    return payload;
  }

  public async findOne(payload: any): Promise<any> {
    return payload;
  }

  public async update(payload: any): Promise<any> {
    return payload;
  }

  public async delete(payload: Record<string, unknown>): Promise<any> {
    return payload;
  }
}
