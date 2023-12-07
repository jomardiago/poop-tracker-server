import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

import { jwtSecret } from "./constants";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

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
}
