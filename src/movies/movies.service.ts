import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger('MoviesService');

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    this.logger.log(`Creating a new movie: ${createMovieDto.title}`);
    const movie = this.movieRepository.create(createMovieDto);
    const created = await this.movieRepository.save(movie);

    this.logger.log(`Movie with title ${createMovieDto.title} created`);
    return created;
  }

  findAll(): Promise<Movie[]> {
    this.logger.log(`Getting all movies`);
    return this.movieRepository.find();
  }

  async findOne(id: string): Promise<Movie> {
    this.logger.log(`Getting a movie: ${id}`);
    const found = await this.movieRepository.findOne({ where: { id } });

    if (!found) {
      this.logger.log(`Movie with id ${id} not found`);
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    this.logger.log(`Movie with id ${id} found`);
    return found;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    this.logger.log(`Updating a movie: ${id}`);
    const found = await this.movieRepository.preload({ ...updateMovieDto, id });

    if (!found) {
      this.logger.log(`Movie with id ${id} not found`);
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    const updated = await this.movieRepository.save(found);

    this.logger.log(`Movie with id ${id} updated`);
    return updated;
  }

  async remove(id: string): Promise<boolean> {
    this.logger.log(`Removing a movie: ${id}`);
    await this.movieRepository.delete({ id });

    this.logger.log(`Movie with id ${id} removed`);
    return true;
  }
}
