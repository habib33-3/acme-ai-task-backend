import z from "zod";

export const envSchema = z.object({
  PORT: z.string().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
  DATABASE_URL: z.string(),
});

export const validateEnv = (env = process.env) => {
  return envSchema.parse(env);
};

export const env = validateEnv();
