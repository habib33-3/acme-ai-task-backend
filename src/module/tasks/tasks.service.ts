import { PrismaService } from "@/common/prisma/prisma.service.js";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto.js";
import { Priority, Status } from "@/generated/prisma/enums.js";
import { Prisma } from "@/generated/prisma/client.js";
import { UpdateTaskDto } from "./dto/update-task.dto.js";

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(payload: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: payload,
    });

    return { task, message: "Task created successfully" };
  }

  async getAllTasks(
    search?: string,
    filter?: { priority?: Priority; status?: Status },
    page = 1,
    limit = 20
  ) {
    limit = Math.min(limit, 100);
    page = Math.max(page, 1);

    const where: Prisma.TaskWhereInput = {};

    if (search) {
      search = search.trim();

      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (filter?.priority) {
      where.priority = filter.priority;
    }

    if (filter?.status) {
      where.status = filter.status;
    }

    const [tasks, count, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      this.prisma.task.count({
        where,
      }),
      this.prisma.task.count(),
    ]);

    const result = {
      tasks,
      pagination: {
        page,
        limit,
        count,
        totalPages: Math.ceil(count / limit),
      },
      totalTasks: total,
    };

    return { result, message: "Tasks retrieved successfully" };
  }

  async getTaskById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task not found`);
    }

    return { task, message: "Task retrieved successfully" };
  }

  async updateTaskStatus(id: string, status: Status) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task not found`);
    }

    const updatedTask = await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return { updatedTask, message: "Task status updated successfully" };
  }

  async updateTask(id: string, payload: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task not found`);
    }

    const updatedTask = await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        priority: payload.priority ?? task.priority,
        title: payload.title ?? task.title,
        description: payload.description ?? task.description,
      },
    });

    return { updatedTask, message: "Task updated successfully" };
  }

  async deleteTask(id: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task not found`);
    }

    await this.prisma.task.delete({
      where: {
        id,
      },
    });

    return { message: "Task deleted successfully" };
  }
}
