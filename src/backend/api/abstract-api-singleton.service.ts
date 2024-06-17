import { Request, Response, Router } from 'express';
import { Router as RouterWs } from 'express-ws';
import StatusCode from 'status-code-enum';

// - Models
import { Singleton } from 'src/shared/models/abstract-singleton';


// This has to be done with a function since static members cannot reference type parameters of the class.
export function AbstractApiSingleton<T>() {
  return class AbstractApiSingleton extends Singleton<T>() {
    private _router: RouterWs;

    get Router(): RouterWs {
      return this._router;
    }

    // - Constructor must be protected in order to force the use of the getInstance Singleton function
    protected constructor() {
      super();
      this._router = Router();
    }

    /**
     * Decorator to check if ensure service has been instantiated before doing API Stuff
     */
    public static checkInstantiated(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
      let originalMethod = descriptor.value;

      // wrapping the original method
      descriptor.value = function (req: Request, res: Response) {
        if (!AbstractApiSingleton.exists()) {
          res.sendStatus(StatusCode.ServerErrorServiceUnavailable);
          return;
        }
        return originalMethod.apply(this, [req, res]);
      };
    }
  }
}
