import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { UserRepository } from './repository/user.repositroy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constant';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.access.secret,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [UsersController],
  providers: [UserRepository, UsersService],
})
export class UsersModule {}
