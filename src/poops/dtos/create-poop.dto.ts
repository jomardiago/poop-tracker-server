import { IsString } from "class-validator";

export class CreatePoopDto {
  @IsString()
  entryDate: string;
}
