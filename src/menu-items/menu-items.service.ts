import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepo: Repository<MenuItem>,
  ) {}

  findAll(): Promise<MenuItem[]> {
    return this.menuItemRepo.find();
  }

  create(dto: CreateMenuItemDto): Promise<MenuItem> {
    const item = this.menuItemRepo.create(dto);
    return this.menuItemRepo.save(item);
  }
}
