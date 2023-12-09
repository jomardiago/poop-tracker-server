import { Module } from "@nestjs/common";

import { PoopsService } from "./poops.service";
import { PoopsController } from "./poops.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [PoopsController],
  providers: [PoopsService, PrismaService, JwtService],
})
export class PoopsModule {}
