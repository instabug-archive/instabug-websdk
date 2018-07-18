describe('Elements Module', () => {
  const element = require('../../src/element');
  describe('HTML elements manipulation', () => {
    beforeEach(() => {
      const fakeElement = document.createElement('div');

      spyOn(document, 'querySelector').and.returnValue(fakeElement);
    });

    it('should hide given element', () => {
      element.hide('#fakeId');

      expect(document.querySelector('#fakeId').style.display).toBe('none');
    });

    it('should make given element visible', () => {
      element.show('#fakeId');

      expect(document.querySelector('#fakeId').style.display).toBe('inline-block');
    });

    it('should check if element existed', () => {
      expect(element.isExisted('#fakeId')).toBe(true);
    });

    it('should add class to element then remove it', () => {
      element.addClass('#fakeId', 'fake-class');
      expect(document.querySelector('#fakeId').classList.contains('fake-class')).toBe(true);

      element.removeClass('#fakeId', 'fake-class');
      expect(document.querySelector('#fakeId').classList.contains('fake-class')).toBe(false);
    });

    it('should toggle the class existance for an element', () => {
      expect(document.querySelector('#fakeId').classList.contains('fake-class')).toBe(false);

      element.toggleClass('#fakeId', 'fake-class');
      expect(document.querySelector('#fakeId').classList.contains('fake-class')).toBe(true);
    });
  });
});
