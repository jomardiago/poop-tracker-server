import { ConflictException, Injectable } from "@nestjs/common";
import { hash } from "bcrypt";

import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService
  ) {}

  async create(data: CreateUserDto) {
    try {
      const hashedPassword = await hash(data.password, 10);

      const user = await this.findUserByUsernameOrEmail(
        data.username,
        data.email
      );

      if (user) throw new ConflictException("User already exists.");

      const createdUser = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      delete createdUser.password;
      const accessToken = await this.authService.generateAccessToken(
        createdUser
      );

      return {
        ...createdUser,
        accessToken,
      };
    } catch (error) {
      console.log("UsersService create:", error);
      throw error;
    }
  }

  async findUserByUsernameOrEmail(username: string, email: string) {
    try {
      return this.prisma.user.findFirst({
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      });
    } catch (error) {
      console.log("UsersService findUserByUsernameOrEmail:", error);
      throw error;
    }
  }
}
