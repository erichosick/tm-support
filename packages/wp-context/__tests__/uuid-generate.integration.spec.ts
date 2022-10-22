import tm from '../src/index';
import { validate } from 'uuid';

describe('wp-context uuid', () => {
  it('should generate a uuid', () => {
    const uuid = tm.uuidGenerate();
    expect(validate(uuid)).toEqual(true);
  });
});
