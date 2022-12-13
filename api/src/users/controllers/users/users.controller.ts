import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../../services/users/users.service';
import { AddUser } from 'src/users/dtos/User.dtos';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  addUser(@Body() payload: AddUser) {
    return this.usersService.addUser(payload);
  }
}
