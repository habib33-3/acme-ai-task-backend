import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { ConfigModule } from "@nestjs/config";
import { validateEnv } from "./common/env/env.js";
import { PrismaModule } from "./common/prisma/prisma.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => validateEnv(config),
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
