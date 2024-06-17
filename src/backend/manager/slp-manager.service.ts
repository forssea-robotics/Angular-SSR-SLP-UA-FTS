
const slp = require('@forssea_robotics/node-slp');

// - Models
import { Singleton } from 'src/shared/models/abstract-singleton';


export class SlpManagerService extends Singleton<SlpManagerService>() {

  protected constructor() {
    super();
  }

  public getDA(): Promise<any>{
    return new Promise((resolve, reject) => {
      slp.FindSrvTypes('*', 'DEFAULT').then((result: any) => {
        console.log(result);
        resolve(result);
      }).catch((error: any) => {
        console.error(error);
        reject(error);
      });
    });
  }

}
