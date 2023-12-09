import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { compare } from "bcrypt";

import { jwtSecret } from "./constants";
import { LoginUserDto } from "./dtos/login-user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async generateAccessToken(payload: Omit<User, "password">) {
    try {
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: jwtSecret,
      });
      return accessToken;
    } catch (error) {
      console.log("AuthService generateAccessToken:", error);
      throw error;
    }
  }

  async login(data: LoginUserDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          username: data.username,
        },
      });

      if (!user) throw new NotFoundException("User not found.");

      const matched = compare(data.password, user.password);
      if (!matched) throw new UnauthorizedException("Invalid credentials");

      delete user.password;
      const accessToken = await this.generateAccessToken(user);

      return {
        ...user,
        accessToken,
      };
    } catch (error) {
      console.log("AuthService login:", error);
      throw error;
    }
  }
}
