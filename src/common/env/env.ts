import z from "zod";
import "dotenv/config";

export const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
  DATABASE_URL: z.string(),
});

export const validateEnv = (env = process.env) => {
  return envSchema.parse(env);
};

export const env = validateEnv();
