import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { IUser } from '../users/interfaces/user.interface';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginUserDto } from '../users/dtos/login-user.dto';
import { PasswordService } from '@core/services/password.service';
import to from 'await-to-js';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(userDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(userDto.email, true);
    if (!user) {
      throw { message: 'LOGIN_ERR', status: HttpStatus.UNAUTHORIZED };
    }

    const { hash } = this.passwordService.hash(userDto.password, user.salt);
    if (user.password !== hash) {
      throw { message: 'LOGIN_ERR', status: HttpStatus.UNAUTHORIZED };
    }

    const tokenCode = this.passwordService.generateRandomString(32); // tokenCode to invalidate jwt if needed
    this.usersService.addTokenCode(user._id, tokenCode);

    delete user.password; delete user.salt;
    return { user, token: this.signUserToken(user, tokenCode, 'login') };
  }

  public async register(userDto: CreateUserDto) {
    let error: any; let user: IUser;

    const { salt, hash } = this.passwordService.hash(userDto.password);
    const tokenCode = this.passwordService.generateRandomString(32); // tokenCode to invalidate jwt if needed

    [error, user] = await to(this.usersService.create({ ...userDto, salt, password: hash }));

    if (error || (error && error.code === 11000)) {
      throw { message: 'EMAIL_IN_USE', status: HttpStatus.FORBIDDEN };
    }

    [user] = await Promise.all([
      this.usersService.findById(user._id),
      this.usersService.addTokenCode(user._id, tokenCode),
    ]);

    return { user, token: this.signUserToken(user, tokenCode, 'register') };
  }

  public async validateUser(payload: IJwtPayload): Promise<IUser> {
    const user = await this.usersService.findById(payload.id, true);
    if (!user) { return user; }

    if (!user.tokenCodes.includes(payload.tokenCode)) {
      return null;
    }

    delete user.tokenCodes;
    return user;
  }

  private signUserToken(user: IUser, tokenCode: string, iss = 'unknown'): string {
    const payload: IJwtPayload = { iss, id: user._id, email: user.email, tokenCode };
    return this.jwtService.sign(payload);
  }
}
