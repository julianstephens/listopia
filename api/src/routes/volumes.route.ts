import VolumesController from '@/controllers/volumes.controller';
import { VolumesSearchParams } from '@/dtos/volumes.dto';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class VolumesRoute implements Routes {
  path: string = '/volumes';
  router = Router();
  //  volumesController = new VolumesController();

  constructor(private volumesController: VolumesController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, validationMiddleware(VolumesSearchParams, 'body'), this.volumesController.getVolumeById);
    this.router.get(`${this.path}/`, validationMiddleware(VolumesSearchParams, 'body'), this.volumesController.searchVolumes);
  }
}

export default VolumesRoute;
