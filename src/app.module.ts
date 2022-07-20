import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'my-movie-list',
      autoLoadEntities: true,
      synchronize: true, // this is for development only
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
