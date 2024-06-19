import axios, { AxiosInstance } from 'axios';
import StatusCode from 'status-code-enum';

// - Models
import { Singleton } from 'src/shared/models/abstract-singleton';

export class ObscamTalker extends Singleton<ObscamTalker>(){
  private static _OBSCAM_API_PATH_CAMERA_ZOOM = `/zoom_level`;

  private _axiosInstance: AxiosInstance = axios.create({
    timeout: 5000,
  });

  protected constructor() {
    super();
  }

  // -- PUBLIC FUNCTIONS -- //

  // - Zoom level
  /**
   * Set the zoom level in Obscam
   * @param { number } zoomLevel - The zoom level to set
   * @returns { Promise<ApiCode> } - API code
   *                               - SUCCESS if the zoom has been updated
   *                               - ERROR_INCORRECT_VALUE if the zoom level is incorrect
   *                               - ERROR_WHILE_PROCESSING if an error occurred while processing the request
   */
  public async setZoomLevel(url: string, zoomLevel: number): Promise<boolean> {
    try {
      const resp: any = await this._axiosInstance.put("http://" + url + ObscamTalker._OBSCAM_API_PATH_CAMERA_ZOOM, { zoom_level: zoomLevel });
      if(resp.status !== StatusCode.SuccessOK) {
        return false;
      }
      return true;
    } catch (error: unknown) {
      console.error(error);
      return false;
    }
  }
}
