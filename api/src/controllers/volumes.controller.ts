import VolumeService from '@services/volume.service';
import { NextFunction, Request, Response } from 'express';

class VolumesController {
  private volumeService: VolumeService = new VolumeService();

  getVolumeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const volumeId = req.params.id + '';
      const volumeResp = await this.volumeService.getVolumeById(volumeId);

      res.status(volumeResp.status).json(volumeResp.data);
    } catch (error) {
      next(error);
    }
  };

  searchVolumes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params = req.body;
      const volumes = await this.volumeService.searchVolumes(params);

      res.status(volumes.status).json(volumes.data);
    } catch (error) {
      next(error);
    }
  };
}

export default VolumesController;
