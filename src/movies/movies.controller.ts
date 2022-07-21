import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@Controller('movies')
@ApiTags('Movies')
@ApiSecurity('access-key')
@ApiForbiddenResponse({ description: 'Forbidden' })
@UseGuards(ApiKeyGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationQueryDto): Promise<Movie[]> {
    return this.moviesService.findAll(pagination);
  }

  @Get(':id')
  @ApiResponse({ status: 404, description: 'Movie not found' })
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  @ApiNotFoundResponse({ description: 'Movie not found' })
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.moviesService.remove(id);
  }
}
