

// - Models
import { Singleton } from 'src/shared/models/abstract-singleton';
import { ObscamTalker } from '../talker/obscam-talker';


export class CameraManagerService extends Singleton<CameraManagerService>() {
  private _obscamTalker: ObscamTalker;

  protected constructor() {
    super();

    this._obscamTalker = ObscamTalker.getInstance();
  }

  public setZoom(url: string, percentage: number): Promise<boolean>{
    return this._obscamTalker.setZoomLevel(url, percentage);
  }

}
