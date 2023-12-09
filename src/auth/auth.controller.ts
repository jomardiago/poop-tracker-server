import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dtos/create-user.dto";
import { UsersService } from "src/users/users.service";
import { LoginUserDto } from "./dtos/login-user.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post("register")
  register(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Post("login")
  login(@Body() data: LoginUserDto) {
    return this.authService.login(data);
  }
}
