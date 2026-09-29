import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service.js";
import { CreateTaskDto } from "./dto/create-task.dto.js";
import { Priority, Status } from "@/generated/prisma/enums.js";
import { UpdateTaskDto } from "./dto/update-task.dto.js";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto.js";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() payload: CreateTaskDto) {
    return this.tasksService.createTask(payload);
  }

  @Get()
  async getAllTasks(
    @Query("search") search?: string,
    @Query(
      "priority",
      new ParseEnumPipe(Priority, {
        optional: true,
      })
    )
    priority?: Priority,
    @Query(
      "status",
      new ParseEnumPipe(Status, {
        optional: true,
      })
    )
    status?: Status,
    @Query("page", new ParseIntPipe({ optional: true })) page = 1,
    @Query("limit", new ParseIntPipe({ optional: true })) limit = 20
  ) {
    return this.tasksService.getAllTasks(
      search,
      { priority, status },
      page,
      limit
    );
  }

  @Get(":id")
  async getTaskById(@Param("id") id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Patch("status/:id")
  async updateTaskStatus(
    @Param("id") id: string,
    @Body() payload: UpdateTaskStatusDto
  ) {
    return this.tasksService.updateTaskStatus(id, payload.status);
  }

  @Patch(":id")
  async updateTask(@Param("id") id: string, @Body() payload: UpdateTaskDto) {
    return this.tasksService.updateTask(id, payload);
  }

  @Delete(":id")
  async deleteTask(@Param("id") id: string) {
    return this.tasksService.deleteTask(id);
  }
}
