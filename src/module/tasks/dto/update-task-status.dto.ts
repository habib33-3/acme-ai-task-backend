import { IsEnum } from "class-validator";
import { Status } from "@/generated/prisma/enums.js";

export class UpdateTaskStatusDto {
  @IsEnum(Status)
  status: Status;
}
