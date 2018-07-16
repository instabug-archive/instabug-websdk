describe('Bug Reporting Module', function(){
  const bugReport = require('../../src/bugReport');
  const elem = require('../../src/element');

  const response = {
    'status': 200,
    'contentType': 'text/plain',
    'responseText': '{"id": 123456789}'
  };

  let fakeElement, fakeForm, fakeEmail, elementShow, elementHide, fakeComment, request, canvasDraw,
  upLoadRequest;

  beforeEach(function() {
    let bugReport;
    jasmine.Ajax.install();

    elementShow = spyOn(elem, 'show');
    elementHide = spyOn(elem, 'hide');

    fakeElement = document.createElement('div');
    fakeForm = document.createElement('form');
    fakeEmail = document.createElement('input');
    fakeComment = document.createElement('input');
    canvasDraw = document.createElement('div');

    fakeEmail.type = 'email';
    fakeEmail.name = 'email';
    fakeEmail.value = 'test@instabug.com';
    fakeComment.type = 'text';
    fakeComment.name = 'comment';
    fakeComment.value = 'fake comment';

    fakeForm.appendChild(fakeEmail);
    fakeForm.appendChild(fakeComment);
    spyOn(document, 'getElementById').and.returnValues(fakeForm, false, fakeElement);
    request = jasmine.Ajax.stubRequest('/api/1').andReturn(response);

    upLoadRequest = jasmine.Ajax.stubRequest('https://api.cloudinary.com/v1_1/fakeId/upload')
    .andReturn(response);
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  describe('Collect user browser infromation', function() {
    beforeEach(function() {
      navigator.__defineGetter__('language', function(){
          return 'foo' // customized user agent
      });
      bugReport.getBrowserData();
    });
    it('should return user object', function() {
      const userInfo = bugReport.getBrowserData();
      expect(typeof userInfo).toBe('object');
    });
  });

  describe('Memory Information', function() {
    it('should set Zapier webhook url correctly', function() {
      bugReport.setZapierHookUrl('https://zapier.com');
      expect(bugReport.getZapierHookUrl()).toBe('https://zapier.com');
    });

    it('should submit report', function() {
      jasmine.Ajax.stubRequest('https://zapier.com').andReturn(response);
      bugReport.submitBugReport();

      expect(elem.hide).toHaveBeenCalled();
    });
  });
});
