import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";

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

  @Get()
  findAll(@Request() req: { user: { id: string } }) {
    return this.poopsService.findAll(req.user.id);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Request() req: { user: { id: string } }) {
    return this.poopsService.remove(id, req.user.id);
  }
}
