describe('Utils Module', () => {
  const utils = require('../../src/utils');

  describe('Shortify Time', () => {
    it('should remove miliseconds from timestamp', () => {
      expect(utils.shortifyTime(1488356483680)).toBe(1488356483);
    });
  });

  describe('Sanitize Email', () => {
    it('should remove miliseconds from timestamp', () => {
      expect(utils.sanitizeEmail('email@adress.com')).toBe('email@adress.com');
    });
  });

  describe('Mobile viewport detection', () => {
    it('should pass if matchMedia API is supported and media matches the mobile screen size', () => {
      expect(utils.isMobile()).toBe(true);
    });

    it('should fail if matchMedia API is not supported', () => {
      window.matchMedia = undefined;
      expect(utils.isMobile()).toBe(false);
    });
  });

  describe('Image Conversion', () => {
    it('should convert base64 image to Blob object', () => {
      const testImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
      const binaryImage = utils.dataURItoBlob(testImage);

      expect(binaryImage.type).toBe('image/gif');
      expect(binaryImage.size).toBe(14);
    });
  });
});
