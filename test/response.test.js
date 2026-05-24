const { success, error } = require('../src');

describe('Response Formatters', () => {
  test('success wraps data correctly', () => {
    const result = success({ users: [] });
    expect(result.status).toBe('ok');
    expect(result.data).toEqual({ users: [] });
  });

  test('error formats error response', () => {
    const result = error('Not found', 404);
    expect(result.status).toBe('error');
    expect(result.message).toBe('Not found');
    expect(result.code).toBe(404);
  });

  test('success handles null data', () => {
    const result = success(null);
    expect(result.status).toBe('ok');
    expect(result.data).toBeNull();
  });
});