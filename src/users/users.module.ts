import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "src/auth/auth.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AuthService, JwtService],
})
export class UsersModule {}
