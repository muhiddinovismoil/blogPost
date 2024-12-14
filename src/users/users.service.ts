import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  LoginDto,
  updatePasswordDto,
} from './dto/create-user.dto';
import { UserRepository } from './repository/user.repositroy';
@Injectable()
export class UsersService {
  constructor(@Inject() private readonly userRepository: UserRepository) {}
  async registerUser(createUserDto: CreateUserDto) {
    try {
      return this.userRepository.register(createUserDto);
    } catch (error) {
      return error;
    }
  }

  async loginUser(data: LoginDto) {
    try {
      return this.userRepository.login(data);
    } catch (error) {
      return error;
    }
  }

  async findById(id: string) {
    try {
      return this.userRepository.findOne(id);
    } catch (error) {
      return error;
    }
  }

  async updatePassword(id: string, updateUserDto: updatePasswordDto) {
    try {
      return this.userRepository.update(id, updateUserDto);
    } catch (error) {
      return error;
    }
  }

  async getAllUser() {
    try {
      return this.userRepository.getAll();
    } catch (error) {
      return error;
    }
  }
  async deleteUserById(id: string) {
    try {
      return this.userRepository.deleteUserById(id);
    } catch (error) {
      return error;
    }
  }
}
