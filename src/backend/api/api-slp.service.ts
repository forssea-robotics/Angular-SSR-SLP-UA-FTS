// - Server imports
import { Request, Response } from 'express';
import StatusCode from 'status-code-enum';

// - API service abstract class
import { AbstractApiSingleton } from './abstract-api-singleton.service';
import { SlpManagerService } from '../manager/slp-manager.service';

export class ApiSlpService extends AbstractApiSingleton<ApiSlpService>() {

  private static _slpManager: SlpManagerService;

  protected constructor() {
    super();

    ApiSlpService._slpManager = SlpManagerService.getInstance();

    // Servers types route
    this.Router.route('/api/slp/servers/').get(ApiSlpService._getServersTypes);

    // Servers route
    this.Router.route('/api/slp/servers/:type').get(ApiSlpService._getServers);

    // attributes route
    this.Router.route('/api/slp/attributes/:serverName').get(ApiSlpService._getAttributes);
  }

  @ApiSlpService.checkInstantiated
  private static async _getServersTypes(_req: Request, res: Response): Promise<Response> {
    const result = await ApiSlpService._slpManager.getServersTypes();

    return res.status(StatusCode.SuccessOK).send(JSON.stringify(result));
  }

  private static async _getServers(req: Request, res: Response): Promise<Response> {
    const type = req.params['type'];
    try {
      const result = await ApiSlpService._slpManager.getServers(type);
      return res.status(StatusCode.SuccessOK).send(JSON.stringify(result));
    } catch (error: any) {
      return res.status(StatusCode.ClientErrorNotFound).send({msg: error});
    }

  }

  private static async _getAttributes(req: Request, res: Response): Promise<Response> {
    const serverName = req.params['serverName'];
    try {
      const result = await ApiSlpService._slpManager.getAttributes(serverName);
      return res.status(StatusCode.SuccessOK).send(JSON.stringify(result));
    } catch (error: any) {
      return res.status(StatusCode.ClientErrorNotFound).send({msg: error});
    }

  }
}
