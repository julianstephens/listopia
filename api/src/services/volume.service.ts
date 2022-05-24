import { VolumesDto, VolumesResponse, VolumesSearchParams } from '@/dtos/volumes.dto';
import { HttpException } from '@exceptions/HttpException';
import axios from 'axios';

class VolumeService {
  private apiKey: string = process.env.BOOKS_KEY;
  private urlStem: string = `https://www.googleapis.com/books/v1/volumes`;

  async getVolumeById(volumeId: string): Promise<VolumesResponse> {
    const url: string = `${this.urlStem}/${volumeId}?projection=lite&key=${this.apiKey}`;

    try {
      const res = await axios.get(url);
      const volume: VolumesDto = VolumesDto.toDto(res.data);

      return { status: res.status, data: volume };
    } catch (error) {
      throw new HttpException(error.response.status, error.response.message);
    }
  }

  async searchVolumes(params: VolumesSearchParams): Promise<any> {
    const formattedParams = VolumesSearchParams.toString(params);
    const url: string = `${this.urlStem}?${formattedParams}&key=${this.apiKey}`;

    try {
      const res = await axios.get(url);

      // const volume: VolumesDto = VolumesDto.toDto(res.data);

      return res;
    } catch (error) {
      throw new HttpException(error.response.status, error.response.message);
    }
  }
}

export default VolumeService;
