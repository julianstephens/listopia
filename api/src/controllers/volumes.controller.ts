import VolumeService from '@services/volume.service';
import { NextFunction, Request, Response } from 'express';

class VolumesController {
  constructor(private volumeService: VolumeService) { }

  getVolumeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const volumeId = req.params.id;
      const volumeResp = await this.volumeService.getVolumeById(volumeId);

      res.status(volumeResp.status).json(volumeResp.data);
    } catch (error) {
      next(error);
    }
  };

  searchVolumes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params = req.body;
      const volume = await this.volumeService.searchVolumes(params);

      res.status(volume.status).json(volume.data)
    } catch (error) {
      next(error);
    }
  };
}

export default VolumesController;
