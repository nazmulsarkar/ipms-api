import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsPositive()
  pageNumber?: number = 1;

  @IsOptional()
  @IsPositive()
  pageSize?: number = 100;
}
