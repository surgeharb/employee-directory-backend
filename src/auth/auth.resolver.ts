import { Resolver, Args, Mutation } from "@nestjs/graphql";
import { LoginReq } from "./dtos/login-req.dto";
import { AuthService } from "./auth.service";
import { Login } from "./dtos/login.dto";

@Resolver('Login')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Mutation(returns => Login)
  async login(@Args('loginReq') loginReq: LoginReq) {
    return this.authService.login(loginReq);
  }
}