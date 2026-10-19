import { z } from 'zod';

export const environmentSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  NEXT_PUBLIC_APP_URL: z.string().default('http://localhost:3000'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

export type Environment = z.infer<typeof environmentSchema>;

export function parseEnvironment(source: Record<string, string | undefined>): Environment {
  return environmentSchema.parse(source);
}

export function getEnvironment(): Environment {
  return parseEnvironment(process.env);
}
