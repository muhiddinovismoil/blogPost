import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { checkPassword, generateHash } from 'src/helpers/bcrypt';
import {
  CreateUserDto,
  LoginDto,
  updatePasswordDto,
} from '../dto/create-user.dto';
import { BadRequestException } from 'src/exceptions/badrequest.exception';
import { NotFoundException } from 'src/exceptions/notfound.exception';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constant';
@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('users') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
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
        await newUser.save();
        return {
          msg: 'You are registered successfully',
          userId: newUser._id,
        };
      }
      throw new BadRequestException('User already exists');
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
        throw new NotFoundException('User not found');
      }
      const checkPass = await checkPassword(data.password, getUser.password);
      if (!checkPass) {
        throw new BadRequestException('Your email or password does not match');
      }
      const payload = {
        sub: getUser._id,
        first_name: getUser.first_name,
        last_name: getUser.last_name,
        email: getUser.email,
        role: getUser.role,
      };
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: jwtConstants.access.secret,
        expiresIn: jwtConstants.access.expiresTime,
      });
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: jwtConstants.refresh.secret,
        expiresIn: jwtConstants.refresh.expiresTime,
      });

      return {
        msg: 'You are logged in successfully',
        accessToken,
        refreshToken,
      };
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const getById = await this.userModel.findById(id);
      if (!getById) {
        throw new NotFoundException('User not found');
      }
      const user = getById.toObject();
      delete user.password;
      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateUserDto: updatePasswordDto) {
    try {
      const userPassUpdate = await this.userModel.findById(id);
      if (!userPassUpdate) {
        throw new NotFoundException('User not found');
      }
      const isOldPasswordCorrect = await checkPassword(
        updateUserDto.oldPassword,
        userPassUpdate.password,
      );
      if (!isOldPasswordCorrect) {
        throw new BadRequestException('Your old password is not suit');
      }
      const hashedPassword = await generateHash(updateUserDto.password);
      await this.userModel.findByIdAndUpdate(id, { password: hashedPassword });
      return { message: 'Your password has been updated successfully' };
    } catch (error) {
      return error;
    }
  }

  async getAll() {
    try {
      const allData = await this.userModel.find({}, { password: 0 });
      if (allData.length == 0) {
        throw new NotFoundException('User not found');
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
        throw new NotFoundException('User not found');
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
