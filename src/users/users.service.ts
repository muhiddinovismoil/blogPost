import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  LoginDto,
  updatePasswordDto,
} from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { checkPassword, generateHash } from './helpers/bcrypt';
import * as fs from 'fs/promises';
import * as path from 'path';
const filePath = path.join(process.cwd(), 'src', 'json', 'userId.json');
@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private readonly userModel: Model<User>) {}
  async register(createUserDto: CreateUserDto) {
    try {
      const isUserExists = await this.userModel.findOne({
        email: createUserDto.email,
      });
      const hashPass = await generateHash(createUserDto.password);
      if (!isUserExists) {
        const newUser = new this.userModel({
          ...createUserDto,
          password: hashPass,
        });
        newUser.save();
        return {
          msg: 'You are registered successfully',
          userId: newUser._id,
        };
      }
    } catch (error) {
      return error;
    }
  }

  async login(data: LoginDto) {
    try {
      const getUser = await this.userModel.findOne({
        email: data.email,
      });
      if (!getUser) {
        return {
          msg: 'User not found',
        };
      }
      const checkPass = await checkPassword(data.password, getUser.password);
      if (!checkPass) {
        return {
          msg: 'Your password or email is incorrect',
        };
      }
      await fs.writeFile(filePath, JSON.stringify(getUser._id));
      return {
        msg: 'You are logged in successfully',
      };
    } catch (error) {
      return {
        msg: 'An error occurred during login',
        error: error.message,
      };
    }
  }

  async findOne(id: string) {
    try {
      const getById = await this.userModel.findById(id);
      if (!getById) {
        return `User not found`;
      }
      return getById;
    } catch (error) {
      return error;
    }
  }

  async updatePassword(id: string, updateUserDto: updatePasswordDto) {
    const userPassUpdate = await this.userModel.findById(id);
    if (!userPassUpdate) {
      return `User not found`;
    }
    const isOldPasswordCorrect = await checkPassword(
      updateUserDto.oldPassword,
      userPassUpdate.password,
    );
    if (!isOldPasswordCorrect) {
      return 'Your old password does not match';
    }
    const hashedPassword = await generateHash(updateUserDto.password);
    await this.userModel.findByIdAndUpdate(id, { password: hashedPassword });
    return { message: 'Your password has been updated successfully' };
  }

  async getAll() {
    try {
      const allData = await this.userModel.find();
      if (allData.length == 0) {
        return `Users not found`;
      }
      return allData;
    } catch (error) {
      return error;
    }
  }
  async deleteUserById(id: string) {
    try {
      const findUser = await this.userModel.findById(id);
      if (!findUser) {
        return `User not found`;
      }
      await this.userModel.deleteOne({ _id: id });
      return {
        msg: 'Deleted',
        userId: id,
      };
    } catch (error) {
      return error;
    }
  }
}
