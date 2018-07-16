describe('Logger Module', function(){
  const logs = require('../../src/logs');

  describe('Loggers', function() {
    it('should record the console log message', function() {
      var log = logs.getConsoleLog();
      expect(log.length).toBe(0);
      console.log('TEST_CONSOLE');
      expect(log.length).toBe(1);
      expect(log[0].message).toBe('TEST_CONSOLE');
    });

    it('should set userData then get it', function() {
      spyOn(logs, 'parseLogObj');
      logs.setUserData('test');
      logs.getUserData();
      expect(logs.getUserData().length).toBe(18);
      expect(logs.getAllLogs().userData.length).toBe(1);
    });
  });

  describe('Parsing log object', function() {
    it('should convert log object to string', function() {
      var parsedLog = logs.parseLogObj([{
        message: 'test message',
        timestamp: '1490802217231'
      }]);
      expect(parsedLog).toBe('1490802217231test message\n');
    });
  });
});
