import Pino from 'pino';
import { mocked } from 'ts-jest/utils';

import { Logger } from './Logger';

jest.mock('pino');
const pinoMock = mocked(Pino, true);

describe('utils/Logger', () => {
  const pinoDebugMock = jest.fn();
  const pinoInfoMock = jest.fn();
  const pinoWarnMock = jest.fn();
  const pinoErrorMock = jest.fn();

  beforeEach(() => {
    pinoMock.mockReturnValue({
      debug: pinoDebugMock,
      info: pinoInfoMock,
      warn: pinoWarnMock,
      error: pinoErrorMock,
    } as unknown as Pino.Logger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const createAndCallLoggerForLevel = (
    level: 'debug' | 'info' | 'warn' | 'error',
  ) => {
    const logger = Logger.createNew({ enabled: false });

    logger[level]('My message');
    logger[level]('My message with data', { key: 'value' });
  };

  it('should correctly log "debug" level messages', () => {
    createAndCallLoggerForLevel('debug');

    expect(pinoDebugMock.mock.calls).toEqual([
      ['My message'],
      [{ key: 'value' }, 'My message with data'],
    ]);
    expect(pinoInfoMock.mock.calls).toEqual([]);
    expect(pinoWarnMock.mock.calls).toEqual([]);
    expect(pinoErrorMock.mock.calls).toEqual([]);
  });

  it('should correctly log "info" level messages', () => {
    createAndCallLoggerForLevel('info');

    expect(pinoDebugMock.mock.calls).toEqual([]);
    expect(pinoInfoMock.mock.calls).toEqual([
      ['My message'],
      [{ key: 'value' }, 'My message with data'],
    ]);
    expect(pinoWarnMock.mock.calls).toEqual([]);
    expect(pinoErrorMock.mock.calls).toEqual([]);
  });

  it('should correctly log "warning" level messages', () => {
    createAndCallLoggerForLevel('warn');

    expect(pinoDebugMock.mock.calls).toEqual([]);
    expect(pinoInfoMock.mock.calls).toEqual([]);
    expect(pinoWarnMock.mock.calls).toEqual([
      ['My message'],
      [{ key: 'value' }, 'My message with data'],
    ]);
    expect(pinoErrorMock.mock.calls).toEqual([]);
  });

  it('should correctly log "error" level messages', () => {
    createAndCallLoggerForLevel('error');

    expect(pinoDebugMock.mock.calls).toEqual([]);
    expect(pinoInfoMock.mock.calls).toEqual([]);
    expect(pinoWarnMock.mock.calls).toEqual([]);
    expect(pinoErrorMock.mock.calls).toEqual([
      ['My message'],
      [{ key: 'value' }, 'My message with data'],
    ]);
  });
});
