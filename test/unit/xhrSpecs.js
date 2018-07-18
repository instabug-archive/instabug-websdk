// import xhr from '../../src/xhr';

describe('XHR Module', () => {
  const { xhr } = require('../../src/xhr');

  beforeEach(() => {
    jasmine.Ajax.install();

    jasmine.Ajax.stubRequest('/api/1').andReturn({
      status: 400,
      contentType: 'text/plain',
      responseText: '{"id": 123456789}',
    });
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  describe('Shortify Time', () => {
    it('should remove miliseconds from timestamp', () => {
      xhr({
        method: 'POST',
        url: '/api/1',
      }).then((response) => {
        expect(response).toBe('test');
      }).catch((err) => {
        expect(typeof err).toBe('object');
      });
    });
  });
});
