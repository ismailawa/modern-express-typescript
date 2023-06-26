import express, { Application, Handler, Router } from 'express';
import morgan from 'morgan';
import path from 'path';
import logger from './libs/logger';
import MetadataKeys from './utils/metadata.keys';
import { IRouter } from './decorators/routes/handlers.decorator';

class ExpressApplication {
  private app?: Application;
  constructor(
    private port: string | number,
    private middlewares: any[],
    private controllers: any[]
  ) {
    this.app = express();
    this.port = port;

    this.setupMiddleware(middlewares);
    this.setupRoutes(controllers);
    this.configureAssets();
    this.setupMorganLogger();
  }

  private setupMiddleware(middlewares: any[]) {
    middlewares.forEach((middleware) => {
      this.app?.use(middleware);
    });
  }

  private configureAssets() {
    this.app?.use(express.static(path.join(__dirname, '../public')));
  }

  private setupMorganLogger() {
    if (process.env.NODE_ENV === 'development') {
      this.app?.use(morgan('dev'));
    }
  }

  private setupRoutes(controllers: any[]) {
    const info: Array<{ api: string; handler: string }> = [];
    controllers.forEach((controller) => {
      const controllerInstance: { [handlerName: string]: Handler } =
        new controller();
      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        controller
      );

      const router = Router();
      const routes: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        controller
      );

      routes.forEach(({ method, handlerPath, middlewares, handlerName }) => {
        if (middlewares) {
          router[method](
            handlerPath,
            ...middlewares,
            controllerInstance[String(handlerName)].bind(controllerInstance)
          );
        } else {
          router[method](
            handlerPath,
            controllerInstance[String(handlerName)].bind(controllerInstance)
          );
        }
        info.push({
          api: `${method.toLowerCase()} ${basePath + String(handlerPath)}`,
          handler: `${controller.name}.${String(handlerName)}`,
        });
      });
      this.app?.use(basePath, router);
    });

    console.table(info);
  }

  public start() {
    return this.app?.listen(this.port, () => {
      logger.info('Server running on http://localhost:' + this.port);
    });
  }
}

export default ExpressApplication;
