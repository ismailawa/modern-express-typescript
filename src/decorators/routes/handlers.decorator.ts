import MetadataKeys from '../../utils/metadata.keys';

export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export interface IRouter {
  method: Methods;
  middlewares?: any[];
  handlerPath: string;
  handlerName: string | symbol;
}

const decoratorsFactory =
  (method: Methods) =>
  (path: string, middlewares?: any[]): MethodDecorator =>
  (target, propertyKey) => {
    const controllerClass = target.constructor;
    const routes: IRouter[] = Reflect.hasMetadata(
      MetadataKeys.ROUTERS,
      controllerClass
    )
      ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
      : [];

    routes.push({
      method,
      middlewares,
      handlerPath: path,
      handlerName: propertyKey,
    });

    Reflect.defineMetadata(MetadataKeys.ROUTERS, routes, controllerClass);
  };

export const POST = decoratorsFactory(Methods.POST);
export const GET = decoratorsFactory(Methods.GET);
export const PUT = decoratorsFactory(Methods.PUT);
export const PATCH = decoratorsFactory(Methods.PATCH);
export const DELETE = decoratorsFactory(Methods.DELETE);
