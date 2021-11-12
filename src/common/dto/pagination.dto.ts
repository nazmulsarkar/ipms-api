import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @IsPositive()
  size?: number = 100;
}
