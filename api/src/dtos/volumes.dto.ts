import { IsArray, IsNumber, IsString } from 'class-validator';

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

  static toDto(res): VolumesDto {
    let vDto = new VolumesDto();
    {
      (vDto.id = res.id),
        (vDto.title = res.volumeInfo.title),
        (vDto.authors = res.volumeInfo.authors),
        (vDto.description = res.volumeInfo.description),
        (vDto.avgRating = res.volumeInfo.averageRating),
        (vDto.ratingsCount = res.volumeInfo.ratingsCount),
        (vDto.thumbnailLink = res.volumeInfo.imageLinks.smallThumbnail);
    }

    return vDto;
  }
}

export class VolumesSearchParams {
  text: string;
  intitle?: string;
  inauthor?: string;
  inpublisher?: string;
  insubject?: string;   // keyword found in category list
  isbn?: string;
  lccn?: string;   // Library of Congress Control Number
  oclc?: string;   // Online Computer Library Center number
  startIndex?: number;
  maxResults?: number;

  static toString(params: VolumesSearchParams): string {
    let res = `&text:${params.text}`;

    if (params.intitle) {
      res += `&intitle:${params.intitle}`;
    }
    if (params.inauthor) {
      res += `&inauthor:${params.inauthor}`;
    }
    if (params.inpublisher) {
      res += `&inpublisher=${params.inpublisher}`;
    }
    if (params.insubject) {
      res += `&insubject=${params.insubject}`;
    }
    if (params.isbn) {
      res += `&isbn=${params.isbn}`;
    }
    if (params.lccn) {
      res += `&lccn=${params.lccn}`;
    }
    if (params.oclc) {
      res += `&oclc=${params.oclc}`;
    }
    res += '&projection=lite';

    return res;
  }
}

export class VolumesResponse {
  status: number;
  data: VolumesDto;
}
