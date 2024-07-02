

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
      SlpNodejs.findSrvTypes("LOCAL", true).then((result: string[]) => {
        return resolve(result);
      }).catch((error: any) => {
        console.error(error);
        return reject(error);
      });
    });
  }

  public getServers(type: string): Promise<Object[]>{
    return new Promise((resolve, reject) => {
      SlpNodejs.findSrvs(type, "LOCAL", true).then((result: string[]) => {
        return resolve(result);
      }).catch((error: any) => {
        console.error(error);
        return reject(error);
      });
    });
  }

  public getAttributes(url: string): Promise<Object>{
    return new Promise((resolve, reject) => {
      SlpNodejs.findAllAttrs(url, "LOCAL", true)
        .then((result: Object) => {
          return resolve(result);
        }).catch((error: any) => {
          console.error(error);
          return reject(error);
        });
    });
  }

}
