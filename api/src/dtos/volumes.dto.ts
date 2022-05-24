import { GBVolume } from '@/utils/types';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class VolumesDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsArray()
  authors: string[];

  @IsString()
  description: string;

  @IsNumber()
  avgRating: number;

  @IsNumber()
  ratingsCount: number;

  @IsString()
  thumbnailLink: string;

  /**
   * Converts GBVolume to VolumesDto
   * @param res - Books API response
   * @returns formatted volume
   */
  static BuildDto(res: GBVolume): VolumesDto {
    const vDto = new VolumesDto();
    {
      (vDto.id = res.id),
        (vDto.title = res?.volumeInfo?.title),
        (vDto.authors = res?.volumeInfo?.authors),
        (vDto.description = res?.volumeInfo?.description),
        (vDto.avgRating = res?.volumeInfo?.averageRating),
        (vDto.ratingsCount = res?.volumeInfo?.ratingsCount),
        (vDto.thumbnailLink = res?.volumeInfo?.imageLinks?.smallThumbnail);
    }

    return vDto;
  }

  /**
   * Converts GBVolumeList to VolumesDto
   * @param res - Books API response
   * @returns formatted list of volumes
   */
  static BuildDtoList(res: GBVolume[]): VolumesDto[] {
    let dtoArr: VolumesDto[] = [];

    for (const v of res) {
      dtoArr.push(this.BuildDto(v));
    }

    return dtoArr;
  }
}

export class VolumesSearchParams {
  @IsOptional()
  @IsString()
  intitle?: string;

  @IsOptional()
  @IsString()
  inauthor?: string;

  @IsOptional()
  @IsString()
  inpublisher?: string;

  @IsOptional()
  @IsString()
  insubject?: string; // keyword found in category list

  @IsOptional()
  @IsString()
  isbn?: string;

  @IsOptional()
  @IsString()
  lccn?: string; // Library of Congress Control Number

  @IsOptional()
  @IsString()
  oclc?: string; // Online Computer Library Center number
  @IsOptional()
  @IsNumber()
  startIndex?: number = 0;

  /**
   * Formats query parameters to url safe string
   * @param params {VolumesSearchParams} - API query parameters
   * @returns {string}
   */
  static toString(params: VolumesSearchParams): string {
    let queries = [];
    if (params.intitle) {
      queries.push(`intitle:${params.intitle}`);
    }
    if (params.inauthor) {
      queries.push(`inauthor:${params.inauthor}`);
    }
    if (params.inpublisher) {
      queries.push(`inpublisher=${params.inpublisher}`);
    }
    if (params.insubject) {
      queries.push(`insubject=${params.insubject}`);
    }
    if (params.isbn) {
      queries.push(`isbn=${params.isbn}`);
    }
    if (params.lccn) {
      queries.push(`lccn=${params.lccn}`);
    }
    if (params.oclc) {
      queries.push(`oclc=${params.oclc}`);
    }

    let urlString = 'q=';
    urlString += queries[0];

    if (queries.length === 1) {
      return urlString;
    }

    queries.shift();
    for (let q of queries) {
      urlString += `&${q}`;
    }

    return urlString;
  }
}

export class VolumesSearchResp {
  @IsNumber()
  totalItems: number;

  @IsNumber()
  nextIndex: number;

  @IsNumber()
  @ValidateNested()
  items: VolumesDto[];
}
