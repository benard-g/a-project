import Pino from 'pino';

type ContextData = Record<string, any>;

interface Options {
  data?: ContextData;
  enabled?: boolean;
  minLevel?: 'debug' | 'info' | 'warn' | 'error';
  prettyPrint?: boolean;
}

export class Logger {
  private readonly logger: Pino.Logger;

  /**
   * @deprecated Logger should be created using `Logger.createNew({})`
   */
  constructor(pinoLogger: Pino.Logger) {
    this.logger = pinoLogger;
  }

  public static createNew(options: Options) {
    const {
      data = {},
      enabled = true,
      minLevel = 'debug',
      prettyPrint = false,
    } = options;

    return new Logger(
      Pino({
        base: data,
        enabled,
        level: minLevel,
        prettyPrint,
        timestamp: true,
      }),
    );
  }

  public child(data: ContextData) {
    return new Logger(this.logger.child(data));
  }

  public debug(message: string, context?: ContextData): void {
    this.log('debug', message, context);
  }

  public info(message: string, context?: ContextData): void {
    this.log('info', message, context);
  }

  public warn(message: string, context?: ContextData): void {
    this.log('warn', message, context);
  }

  public error(message: string, context?: ContextData): void {
    this.log('error', message, context);
  }

  private log(
    level: 'debug' | 'info' | 'warn' | 'error',
    message: string,
    context?: ContextData,
  ): void {
    if (context) {
      this.logger[level](context, message);
    } else {
      this.logger[level](message);
    }
  }
}
