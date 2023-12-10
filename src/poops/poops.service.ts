import { Injectable } from "@nestjs/common";
import { isSameDay } from "date-fns";

import { PrismaService } from "src/prisma/prisma.service";
import { CreatePoopDto } from "./dtos/create-poop.dto";

@Injectable()
export class PoopsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePoopDto, userId: string) {
    try {
      const poop = await this.findPoopByCurrentDate();

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

  async findPoopByCurrentDate() {
    try {
      const poop = await this.prisma.poop.findFirst({
        orderBy: {
          entryDate: "desc",
        },
      });

      if (poop && isSameDay(poop.entryDate, new Date())) {
        return poop;
      } else {
        return null;
      }
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
        orderBy: {
          entryDate: "desc",
        },
        take: 7,
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
