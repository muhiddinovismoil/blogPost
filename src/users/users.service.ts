import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UsersModule } from './users.module';
import

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private readonly userModel: UsersModule) {}
  register(createUserDto: CreateUserDto) {
    
  }

  login() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  updatePassword(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  getAll() {
    return ``;
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
