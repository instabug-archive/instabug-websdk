/* eslint-disable no-console */

describe('Logger Module', () => {
  const logs = require('../../src/logs');

  describe('Loggers', () => {
    it('should record the console log message', () => {
      const log = logs.getConsoleLog();
      expect(log.length).toBe(0);

      console.log('TEST_CONSOLE');
      expect(log.length).toBe(1);
      expect(log[0].message).toBe('TEST_CONSOLE');
    });
  });

  describe('Parsing log object', () => {
    it('should convert log object to string', () => {
      const parsedLog = logs.parseLogObj([{
        message: 'test message',
        timestamp: '1490802217231',
      }]);

      expect(parsedLog).toBe('1490802217231test message\n');
    });
  });
});
