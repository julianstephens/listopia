import { VolumesDto, VolumesSearchParams } from '@/dtos/volumes.dto';
import { logger } from '@/utils/logger';
import { APIResp } from '@/utils/types';
import { isEmpty } from '@/utils/util';
import { HttpException } from '@exceptions/HttpException';
import axios from 'axios';

// TODO: remove logger calls
class VolumeService {
  private apiKey: string = process.env.BOOKS_KEY;
  private urlStem = `https://www.googleapis.com/books/v1/volumes`;

  /**
   * Gets specific volume
   * @param volumeId {string} - Books API volume ID
   * @returns API response status and formatted payload
   */
  async getVolumeById(volumeId: string): Promise<APIResp<VolumesDto>> {
    const url = `${this.urlStem}/${volumeId}?projection=lite&key=${this.apiKey}`;
    logger.info(`[GET] ${url}`);

    try {
      const res = await axios.get(url);
      const volume: VolumesDto = VolumesDto.BuildDto(res.data);

      return { status: res.status, data: volume };
    } catch (error) {
      throw new HttpException(error.status, "There was an issue finding this volume. Please try again.");
    }
  }

  /**
   * Fuzzy search volumes
   * @param params {VolumesSearchParams} - Books API query parameters
   * @returns API response status and formatted payload
   */
  async searchVolumes(params: VolumesSearchParams): Promise<APIResp<VolumesDto[]>> {
    if (isEmpty(params)) throw new HttpException(400, "Please provide valid search parameters.");

    const formattedParams = VolumesSearchParams.toString(params);
    const url = `${this.urlStem}?${formattedParams}&key=${this.apiKey}`;
    logger.info(`[GET] ${url}`);

    try {
      const res = await axios.get(url);
      const volumes: VolumesDto[] = VolumesDto.BuildDtoList(res.data.items);

      return { status: res.status, data: volumes };
    } catch (error) {
      throw new HttpException(error.status, "There was an issue with your search. Please try again.");
    }
  }
}

export default VolumeService;
