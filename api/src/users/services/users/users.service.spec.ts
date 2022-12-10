import { AddUser } from './../../dtos/User.dtos';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ProductsService } from '../../../products/services/products/products.service';

describe('UsersService', () => {
  let service: UsersService;
  const user: AddUser = {
    name: 'emanuel',
    email: 'emanuel@cosa.com',
    birthday: new Date(1998, 0, 12),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, ProductsService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined addUser', async () => {
    expect(service.addUser).toBeDefined();
  });

  it('should increment id', async () => {
    expect(await service.addUser(user)).toEqual(2);
  });
});
