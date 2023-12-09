import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";

import { PoopsService } from "./poops.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { CreatePoopDto } from "./dtos/create-poop.dto";

@UseGuards(AuthGuard)
@Controller("poops")
export class PoopsController {
  constructor(private readonly poopsService: PoopsService) {}

  @Post()
  create(
    @Body() data: CreatePoopDto,
    @Request() req: { user: { id: string } }
  ) {
    return this.poopsService.create(data, req.user.id);
  }
}