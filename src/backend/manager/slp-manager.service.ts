

// - Bindings
import { SlpNodejs } from '@forssea_robotics/slp-api-nodejs';

// - Models
import { SLPServer, SLPAttribute } from '@forssea_robotics/slp-api-nodejs';
import { Singleton } from 'src/shared/models/abstract-singleton';


export class SlpManagerService extends Singleton<SlpManagerService>() {

  protected constructor() {
    super();
  }

  public getServersTypes(): Promise<string[]>{
    return new Promise((resolve, reject) => {
      SlpNodejs.findSrvTypes("NETWORK").then((result: string[]) => {
        return resolve(result);
      }).catch((error: any) => {
        console.error(error);
        return reject(error);
      });
    });
  }

  public getServers(type: string): Promise<SLPServer[]>{
    return new Promise((resolve, reject) => {
      SlpNodejs.findSrvs(type, "NETWORK").then((result: SLPServer[]) => {
        return resolve(result);
      }).catch((error: any) => {
        console.error(error);
        return reject(error);
      });
    });
  }

  public getAttributes(url: string): Promise<SLPAttribute[]>{
    return new Promise((resolve, reject) => {
      SlpNodejs.findAllAttrs(url, "NETWORK")
        .then((result: SLPAttribute[]) => {
          return resolve(result);
        }).catch((error: any) => {
          console.error(error);
          return reject(error);
        });
    });
  }

}
