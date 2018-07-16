describe('Utils Module', function(){
  const utils = require('../../src/utils');

  describe('Shortify Time', function() {
    it('should remove miliseconds from timestamp', function() {
      expect(utils.shortifyTime(1488356483680)).toBe(1488356483);
    });
  });

  describe('Sanitize Email', function() {
    it('should remove miliseconds from timestamp', function() {
      expect(utils.sanitizeEmail('email@adress.com')).toBe('email@adress.com');
    });
  });

  describe('Mobile viewport detection', function() {
    it('should pass if matchMedia API is supported and media matches the mobile screen size', function() {
      expect(utils.isMobile()).toBe(true);
    });
    it('should fail if matchMedia API is not supported', function() {
      window.matchMedia = undefined;
      expect(utils.isMobile()).toBe(false);
    });
  });
});
