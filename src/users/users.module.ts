import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { USERS } from '@schemas';

const Schemas = [USERS];

@Module({
  imports: [MongooseModule.forFeature(Schemas)],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
