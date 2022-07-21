import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: string) {
    const found = await this.categoryRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Category ${id} not found`);
    }

    return found;
  }
}
