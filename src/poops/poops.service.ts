import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { CreatePoopDto } from "./dtos/create-poop.dto";

@Injectable()
export class PoopsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePoopDto, userId: string) {
    try {
      await this.prisma.poop.create({
        data: {
          ...data,
          userId,
        },
      });

      return {
        message: "Poop entry created.",
      };
    } catch (error) {
      console.log("PoopsService create:", error);
      throw error;
    }
  }
}
