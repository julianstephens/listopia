import VolumesController from '@/controllers/volumes.controller';
import { VolumesSearchParams } from '@/dtos/volumes.dto';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class VolumesRoute implements Routes {
  private volumesController: VolumesController = new VolumesController();

  path: string = '/volumes';
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.volumesController.getVolumeById);
    this.router.get(`${this.path}/`, validationMiddleware(VolumesSearchParams, 'body'), this.volumesController.searchVolumes);
  }
}

export default VolumesRoute;
