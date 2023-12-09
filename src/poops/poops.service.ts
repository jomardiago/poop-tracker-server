import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { CreatePoopDto } from "./dtos/create-poop.dto";

@Injectable()
export class PoopsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePoopDto, userId: string) {
    try {
      const poop = await this.findPoopByCurrentDate(data.entryDate);

      if (poop) {
        return {
          message: "You already pooped for today.",
        };
      }

      await this.prisma.poop.create({
        data: {
          entryDate: new Date(data.entryDate),
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

  async findPoopByCurrentDate(entryDate: string) {
    const currentDate = new Date(entryDate);

    try {
      const poop = await this.prisma.poop.findFirst({
        where: {
          entryDate: {
            gte: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate(),
              0,
              0,
              0
            ),
            lt: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() + 1,
              0,
              0,
              0
            ),
          },
        },
      });

      return poop;
    } catch (error) {
      console.log("PoopsService findPoopByCurrentDate:", error);
      throw error;
    }
  }

  async findAll(userId: string) {
    try {
      const poops = await this.prisma.poop.findMany({
        where: {
          userId,
        },
      });

      return poops;
    } catch (error) {
      console.log("PoopsService findAll:", error);
      throw error;
    }
  }

  async remove(id: string, userId: string) {
    try {
      await this.prisma.poop.delete({
        where: {
          id,
          userId,
        },
      });

      return {
        message: "Poop entry deleted.",
      };
    } catch (error) {
      console.log("PoopsService remove:", error);
      throw error;
    }
  }
}
