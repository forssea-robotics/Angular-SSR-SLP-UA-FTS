// - Server imports
import { Request, Response } from 'express';
import StatusCode from 'status-code-enum';

// - API service abstract class
import { AbstractApiSingleton } from './abstract-api-singleton.service';
import { CameraManagerService } from '../manager/camera-manager.service';

export class ApiCamera extends AbstractApiSingleton<ApiCamera>() {

  private static _cameraManager: CameraManagerService;

  protected constructor() {
    super();

    ApiCamera._cameraManager = CameraManagerService.getInstance();

    // Servers types route
    this.Router.route('/api/camera/zoom').put(ApiCamera._updateZoom);

  }

  @ApiCamera.checkInstantiated
  private static async _updateZoom(req: Request, res: Response): Promise<Response> {
    const body: { url: string, percentage: number } = req.body;
    const result = await ApiCamera._cameraManager.setZoom(body.url, body.percentage);

    return res.status(StatusCode.SuccessOK).send(JSON.stringify(result));
  }
}
