import { loadConfig } from './index';

describe('config', () => {
  let envSave: NodeJS.ProcessEnv;

  beforeEach(() => {
    envSave = process.env;
    process.env = {};
  });

  afterEach(() => {
    process.env = envSave;
  });

  describe('development', () => {
    it('should use default values', () => {
      process.env.NODE_ENV = 'development';

      const config = loadConfig();

      expect(config).toMatchSnapshot();
    });
  });

  describe('test', () => {
    it('should use default values', () => {
      process.env.NODE_ENV = 'test';

      const config = loadConfig();

      expect(config).toMatchSnapshot();
    });
  });

  describe('production', () => {
    it('should use the values from the environment', () => {
      process.env = {
        NODE_ENV: 'production',
        ACCESS_TOKEN_DURATION: '123456',
        DATABASE_URL: 'some-database-url',
        JWT_SECRET_KEY: 'some-jwt-secret',
        PORT: '4242',
      };

      const config = loadConfig();

      expect(config).toBeDefined();
    });

    it('should throw if ACCESS_TOKEN_DURATION is missing', () => {
      process.env = {
        NODE_ENV: 'production',
        DATABASE_URL: 'some-database-url',
        JWT_SECRET_KEY: 'some-jwt-secret',
        PORT: '4242',
      };

      expect(() => {
        loadConfig();
      }).toThrowError(
        'EnvironmentVariableError: Missing environment variable "ACCESS_TOKEN_DURATION"',
      );
    });

    it('should throw if DATABASE_URL is missing', () => {
      process.env = {
        NODE_ENV: 'production',
        ACCESS_TOKEN_DURATION: '123456',
        JWT_SECRET_KEY: 'some-jwt-secret',
        PORT: '4242',
      };

      expect(() => {
        loadConfig();
      }).toThrowError(
        'EnvironmentVariableError: Missing environment variable "DATABASE_URL"',
      );
    });

    it('should throw if JWT_SECRET_KEY is missing', () => {
      process.env = {
        NODE_ENV: 'production',
        ACCESS_TOKEN_DURATION: '123456',
        DATABASE_URL: 'some-database-url',
        PORT: '4242',
      };

      expect(() => {
        loadConfig();
      }).toThrowError(
        'EnvironmentVariableError: Missing environment variable "JWT_SECRET_KEY"',
      );
    });

    it('should throw if PORT is missing', () => {
      process.env = {
        NODE_ENV: 'production',
        ACCESS_TOKEN_DURATION: '123456',
        DATABASE_URL: 'some-database-url',
        JWT_SECRET_KEY: 'some-jwt-secret',
      };

      expect(() => {
        loadConfig();
      }).toThrowError(
        'EnvironmentVariableError: Missing environment variable "PORT"',
      );
    });
  });
});
