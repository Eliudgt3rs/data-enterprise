import { afterEach, describe, expect, it, vi } from 'vitest';
import { getEnvironment, parseEnvironment } from '@/lib/environment';

const databaseUrl = 'mongodb://127.0.0.1:27017/datafactor?replicaSet=rs0';

describe('environment validation', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('accepts MongoDB configuration and applies safe defaults', () => {
    expect(parseEnvironment({ DATABASE_URL: databaseUrl })).toEqual({
      DATABASE_URL: databaseUrl,
      NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
      NODE_ENV: 'development',
    });
  });

  it('accepts MongoDB Atlas SRV URLs and configured app settings', () => {
    expect(
      parseEnvironment({
        DATABASE_URL: 'mongodb+srv://cluster.example.mongodb.net/datafactor',
        NEXT_PUBLIC_APP_URL: 'https://datafactor.example',
        NODE_ENV: 'production',
      }).NODE_ENV
    ).toBe('production');
  });

  it('rejects a missing database URL', () => {
    expect(() => parseEnvironment({})).toThrow();
  });

  it('rejects non-MongoDB URLs and invalid app URLs', () => {
    expect(() => parseEnvironment({ DATABASE_URL: 'postgresql://localhost/datafactor' })).toThrow();
    expect(() =>
      parseEnvironment({ DATABASE_URL: databaseUrl, NEXT_PUBLIC_APP_URL: 'not-a-url' })
    ).toThrow();
  });

  it('parses the active process environment', () => {
    vi.stubEnv('DATABASE_URL', databaseUrl);
    vi.stubEnv('NEXT_PUBLIC_APP_URL', 'https://datafactor.example');
    vi.stubEnv('NODE_ENV', 'test');

    expect(getEnvironment()).toEqual({
      DATABASE_URL: databaseUrl,
      NEXT_PUBLIC_APP_URL: 'https://datafactor.example',
      NODE_ENV: 'test',
    });
  });
});
