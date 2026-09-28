import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { env } from "./common/env/env.js";
import { GlobalExceptionFilter } from "./common/filters/global-exception.filter.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));

  await app.listen(env.PORT ?? 3000);
}
await bootstrap();
