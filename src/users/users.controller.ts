import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  LoginDto,
  updatePasswordDto,
} from './dto/create-user.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorators';
import { Role } from 'src/enums/roles.enum';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.registerUser(createUserDto);
  }
  @Post('/login')
  login(@Body() loginData: LoginDto) {
    return this.usersService.loginUser(loginData);
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get()
  findAll() {
    return this.usersService.getAllUser();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: updatePasswordDto) {
    return this.usersService.updatePassword(id, updateUserDto);
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
