import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { env } from "./common/env/env.js";
import { GlobalExceptionFilter } from "./common/filters/global-exception.filter.js";
import { Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.enableCors();
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));

  await app.listen(env.PORT);

  const logger = new Logger("Bootstrap");
  logger.log(`Server is running on port ${env.PORT}`);
}
await bootstrap();
