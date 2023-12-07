import { ConflictException, Injectable } from "@nestjs/common";
import { hash } from "bcrypt";

import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    try {
      const hashedPassword = await hash(data.password, 10);

      const user = await this.findUserByUsernameOrEmail(
        data.username,
        data.email
      );

      if (user) throw new ConflictException("User already exists.");

      await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      return {
        message: "User created.",
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
      throw error;
    }
  }
}
