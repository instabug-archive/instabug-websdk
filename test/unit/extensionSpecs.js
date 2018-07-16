describe('Extension Module', function(){
  const extension = require('../../src/extension');
  beforeEach(function(){
    var fakeElement = document.createElement('div');
    fakeElement.setAttribute('plugin', true);
    spyOn(document, 'getElementById').and.returnValue(fakeElement);
    spyOn(document, 'dispatchEvent');
  });

  it('should check if web Extension is installed', function() {
    expect(extension.isInstalled()).toBe('true');
  });

  it('should fire the screenshot taking event', function(){
    extension.takeScreenShot();
    expect(document.dispatchEvent).toHaveBeenCalled();
  });
});
