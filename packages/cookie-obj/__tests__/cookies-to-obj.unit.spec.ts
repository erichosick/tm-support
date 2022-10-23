import { cookiesToObj } from '../src/index';

const toLowerCase = (input: string) => {
  return input.toLowerCase();
}

describe('cookies to object (cookiesToObj)', () => {
  describe('valid scenarios', () => {
    it('should get cookies correctly: decoding safely', () => {
      const cookieObj = cookiesToObj(
        'ENcoded%3B%3Dprop-name=encoded%3B%3Dprop-value;simple=value'
      );
      expect(cookieObj).toEqual(
        { 'ENcoded;=prop-name': 'encoded;=prop-value', simple: 'value' }
      )

    });

    it('should ignore empty cookies', () => {
      const cookieObj = cookiesToObj('');
      expect(cookieObj).toEqual({})
    });

    it('should ignore cookie with cookies but some are empty.', () => {
      const cookieObj = cookiesToObj(';;;simple=value;;;another=value2;;;');
      expect(cookieObj).toEqual({ simple: 'value', another: 'value2' })
    });

    it('should support converting property names to lower case.', () => {
      const cookieObj = cookiesToObj('UPPER=case', toLowerCase);
      expect(cookieObj).toEqual({ upper: 'case' })
    });

    it('should support properties of same name but different case.', () => {
      const cookieObj = cookiesToObj('UPPER=case1;upper=case2');
      expect(cookieObj).toEqual({ upper: 'case2', UPPER: 'case1' })
    });

    it('should ignore invalid cookie definitions', () => {
      const cookieObj = cookiesToObj('extra==equal;good=cookie');
      expect(cookieObj).toEqual({ good: 'cookie' })
    });

    it('should ignore invalid cookie definitions', () => {
      const cookieObj = cookiesToObj('missing equal;');
      expect(cookieObj).toEqual({})
    });


  });

  describe('invalid scenarios', () => {

    it('should throw an error when the two cookies have the same name', () => {
      expect(() => cookiesToObj('duplicate=value;duplicate=value'))
        .toThrow('Cookies had more than one cookie with a property named \'duplicate\'.');

      expect(() => cookiesToObj('SIMPLE=value;simple=value', toLowerCase))
        .toThrow('Cookies had more than one cookie with a property named \'simple\'.');

    });
  });
});

