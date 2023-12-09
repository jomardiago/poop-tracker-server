import { IsDate } from "class-validator";

export class CreatePoopDto {
  @IsDate()
  entryDate: string;
}
