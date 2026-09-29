import { Priority } from "@/generated/prisma/enums.js";
import { Transform } from "class-transformer";
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Transform(({ value }) => value.trim())
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  @Transform(({ value }) => value.trim())
  description?: string;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;
}
