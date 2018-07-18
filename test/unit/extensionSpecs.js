describe('Extension Module', () => {
  const extension = require('../../src/extension');

  beforeEach(() => {
    const fakeElement = document.createElement('div');

    fakeElement.setAttribute('plugin', true);

    spyOn(document, 'getElementById').and.returnValue(fakeElement);
    spyOn(document, 'dispatchEvent');
  });

  it('should check if web Extension is installed', () => {
    expect(extension.isInstalled()).toBe('true');
  });

  it('should fire the screenshot taking event', () => {
    extension.takeScreenShot();

    expect(document.dispatchEvent).toHaveBeenCalled();
  });
});
