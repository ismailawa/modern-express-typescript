export default interface IUsersService {
  create(payload: any): Promise<any>;

  find(payload: any): Promise<any>;

  findOne(payload: any): Promise<any>;

  update(payload: any): Promise<any>;

  delete(payload: any): Promise<any>;
}
