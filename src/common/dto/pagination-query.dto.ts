import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  skip: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  take: number;
}
