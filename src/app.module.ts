import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@core/core.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@core/config/config.module';
import { ConfigService } from '@core/config/config.service';
import { EmployeesModule } from './employees/employees.module';

const MongooseConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.getEnv('MONGODB_URI'),
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  }),
};

const GqlConfig = {
  debug: false,
  autoSchemaFile: true,
  context: ({ req }) => ({ req }),
};

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync(MongooseConfig),
    GraphQLModule.forRoot(GqlConfig),
    CoreModule.forRoot(),

    AuthModule,
    UsersModule,
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
