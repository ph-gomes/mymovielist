import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  releaseDate: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  @Max(5)
  rating: number;

  @IsUrl()
  imageUrl: string;
}
