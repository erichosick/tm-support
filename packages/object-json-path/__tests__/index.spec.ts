import { insertIntoObject, getFromObject } from '../src/index';

describe('object-json-path insertIntoObject', () => {
  describe('unit tests', () => {
    describe('invalid call', () => {
      it('should throw an error when an empty path is provided', () => {
        expect(
          () => {
            insertIntoObject({}, { path: '', value: 'joe' });
          },
        ).toThrow('Path can not be empty.');
      });
    });
    describe('building an object', () => {
      it('should add an item to the root of the object', () => {
        expect(
          insertIntoObject({}, { path: 'user', value: 'joe' }),
        ).toEqual({ user: 'joe' });
      });

      it('should add an item deep within the object the object', () => {
        expect(
          insertIntoObject({}, { path: 'user.name', value: 'joe' }),
        ).toEqual({ user: { name: 'joe' } });
      });

      it('should add multiple items at the same time', () => {
        expect(
          insertIntoObject({}, [
            { path: 'user.name', value: 'joe' },
            { path: 'user.age', value: 3 },
          ]),
        ).toEqual({ user: { name: 'joe', age: 3 } });
      });
    });
    describe('error', () => {
      it(`should throw an error when an item is added to a path
        that resolves to a primitive`, () => {
        const user = {};
        insertIntoObject(user, { path: 'user', value: 'joe' });
        expect(
          () => {
            insertIntoObject(user, { path: 'user.name', value: 'joe' });
          },
        ).toThrow('Unable to add a value to path \'user.name\' because the value at \'user\' is a primitive when an object was expected.');
      });
    });
  });
});

describe('object-json-path getFromObject', () => {
  describe('unit tests', () => {
    describe('invalid call', () => {
      it('should throw an error when the path does not resolve to an object', () => {
        expect(
          () => {
            getFromObject({ user: 'joe' }, 'user.name');
          },
        ).toThrow('Unable to get a value from path \'user.name\' because the value at \'user\' is a primitive when an object was expected.');
      });

      it('should throw an error when the path at the last value was not found', () => {
        expect(
          () => {
            getFromObject({ user: { name: 'joe' } }, 'user.age');
          },
        ).toThrow('Unable to get a value from path \'user.age\' because the object at \'user\' did not have property age.');
      });

      it('should throw an error when the path was not found', () => {
        expect(
          () => {
            getFromObject({ admin: { user: { name: 'joe' } } }, 'admin.customer.age');
          },
        ).toThrow('Unable to resolve path. Object did not have a property \'customer\' at path \'admin\'.');
      });

      it('should throw an error path is totally different from object', () => {
        expect(
          () => {
            getFromObject({ admin: { user: { name: 'joe' } } }, 'nope.user.name');
          },
        ).toThrow('Unable to resolve path. Object did not have a property \'nope\' at path \'\'.');
      });
    });
    describe('invalid call', () => {
      it('should successfully get a value', () => {
        expect(getFromObject({ admin: 'joe' }, 'admin')).toEqual('joe');
        expect(getFromObject({ admin: { age: 32 } }, 'admin.age')).toEqual(32);
        expect(
          getFromObject({ admin: { privileges: ['a', 'b'] } }, 'admin.privileges'),
        ).toEqual(['a', 'b']);
        expect(
          getFromObject({ admin: { privileges: ['a', 'b'] } }, 'admin'),
        ).toEqual({ privileges: ['a', 'b'] });
      });
    });
  });
});
