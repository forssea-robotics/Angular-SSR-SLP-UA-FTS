// - Server imports
import { Request, Response } from 'express';
import StatusCode from 'status-code-enum';
import * as ws from 'ws';

// - API service abstract class
import { AbstractApiSingleton } from './abstract-api-singleton.service';
import { SlpManagerService } from '../manager/slp-manager.service';

export class ApiSlpService extends AbstractApiSingleton<ApiSlpService>() {

  private static _slpManager: SlpManagerService;

  protected constructor() {
    super();

    ApiSlpService._slpManager = SlpManagerService.getInstance();

    // Trim route
    this.Router.route('/slp/discovery').get(ApiSlpService._getDA);
  }

  @ApiSlpService.checkInstantiated
  private static async _getDA(_req: Request, res: Response): Promise<Response> {
    const result = await ApiSlpService._slpManager.getDA();

    return res.status(StatusCode.SuccessOK).send(JSON.stringify(result));
  }
}
