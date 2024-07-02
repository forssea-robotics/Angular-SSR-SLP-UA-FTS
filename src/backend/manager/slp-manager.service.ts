

// - Bindings
import { SlpNodejs } from '@forssea_robotics/slp-api-nodejs';

// - Models
import { Singleton } from 'src/shared/models/abstract-singleton';


export class SlpManagerService extends Singleton<SlpManagerService>() {

  protected constructor() {
    super();
  }

  public getServersTypes(): Promise<string[]>{
    return new Promise((resolve, reject) => {
      SlpNodejs.findSrvTypes("NETWORK,LOCAL", false).then((result: string[]) => {
        return resolve(result);
      }).catch((error: any) => {
        console.error(error);
        return reject(error);
      });
    });
  }

  public getServers(type: string): Promise<Object[]>{
    return new Promise((resolve, reject) => {
      SlpNodejs.findSrvs(type, "NETWORK", false).then((result: string[]) => {
        return resolve(result);
      }).catch((error: any) => {
        console.error(error);
        return reject(error);
      });
    });
  }

  public getAttributes(serverName: string): Promise<Object>{
    return new Promise((resolve, reject) => {
      SlpNodejs.findAllAttrs(TODO)
        .then((result: Object) => {
          return resolve(result);
        }).catch((error: any) => {
          console.error(error);
          return reject(error);
        });
    });
  }

}
