import Pino from 'pino';

type ContextData = Record<string, any>;

interface Options {
  data?: ContextData;
  enabled?: boolean;
  prettyPrint?: boolean;
}

export class Logger {
  private readonly enabled: boolean;
  private readonly prettyPrint: boolean;
  private readonly data: ContextData;

  private readonly logger: Pino.Logger;

  constructor(options: Options) {
    this.data = options.data || {};
    this.enabled = options.enabled !== undefined ? options.enabled : true;
    this.prettyPrint = !!options.prettyPrint;

    this.logger = Pino({
      base: this.data,
      prettyPrint: this.prettyPrint,
      enabled: this.enabled,
      timestamp: true,
    });
  }

  public child(data: ContextData) {
    return new Logger({
      enabled: this.enabled,
      prettyPrint: this.prettyPrint,
      data: {
        ...this.data,
        ...data,
      },
    });
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
