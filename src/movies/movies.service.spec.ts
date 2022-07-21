import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepository: MockRepository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Category),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieRepository = module.get<MockRepository<Movie>>(
      getRepositoryToken(Movie),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when movie with ID exists', () => {
      it('should return the movie object', async () => {
        const movieId = '9a715dec-113b-4ccf-a319-f6c0578db2c8';
        const expectedMovie = {};

        movieRepository.findOne.mockReturnValue(expectedMovie);
        const movie = await service.findOne(movieId);
        expect(movie).toEqual(expectedMovie);
      });
    });

    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const movieId = '9a715dec-113b-4ccf-a319-f6c0578db2c8';
        movieRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(movieId);
          expect(false).toBeTruthy();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Movie with id ${movieId} not found`);
        }
      });
    });
  });
});
