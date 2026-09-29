import { Priority } from "@/generated/prisma/enums.js";
import { Transform } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @Transform(({ value }) => value.trim())
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  @Transform(({ value }) => value.trim())
  description: string;

  @IsEnum(Priority)
  priority: Priority;
}
