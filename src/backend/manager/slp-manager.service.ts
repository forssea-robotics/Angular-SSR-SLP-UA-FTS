

// - Bindings
import { SlpNodejs } from '@forssea_robotics/slp-api-nodejs';

// - Models
import { Singleton } from 'src/shared/models/abstract-singleton';


export class SlpManagerService extends Singleton<SlpManagerService>() {

  private static readonly _EMPTY_SCOPE = 'DEFAULT';

  protected constructor() {
    super();
  }

  public getServersTypes(): Promise<string[]>{
    return new Promise((resolve, reject) => {
      SlpNodejs.findSrvTypes(false).then((result: string[]) => {
        return resolve(result);
      }).catch((error: any) => {
        console.error(error);
        return reject(error);
      });
    });
  }

  public getServers(type: string): Promise<Object[]>{
    return new Promise((resolve, reject) => {
      SlpNodejs.findSrvs(type, SlpManagerService._EMPTY_SCOPE, false).then((result: string[]) => {
        return resolve(result);
      }).catch((error: any) => {
        console.error(error);
        return reject(error);
      });
    });
  }
    });
  }

}
