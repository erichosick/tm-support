import { insertIntoObject, getFromObject } from '../src/index';

describe('should only run during integration testing', () => {
  it('should only run during an integration test', () => {
    expect(1).toEqual(1);
  });
});
