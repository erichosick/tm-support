// import Cookies from 'js-cookie';
import { WpContextConfigs, WpContextConfig } from '../src/types';

import tm from '../src';

describe('wp-context-build', () => {
  describe('defaults', () => {
    it(`should build an object when multiple default sources are
            provided and support string, number and arrays`, () => {
      const defaultOnlyMultiple: WpContextConfigs = [
        {
          mapTo: 'user.age',
          default: 23,
          source: {
            type: 'cookie',
            name: 'referer',
          },

        },
        {
          mapTo: 'user.name',
          default: 'Named',
          source: {
            type: 'cookie',
            name: 'referer',
          },

        },
        {
          mapTo: 'user.likes',
          default: ['summer', 'blue', 4],
          source: {
            type: 'cookie',
            name: 'referer',
          },

        },
      ];

      expect(tm.wpContextBuild(defaultOnlyMultiple)).toEqual({
        user: {
          age: 23,
          name: 'Named',
          likes: [
            'summer', 'blue', 4,
          ],
        },
      });

      // Heads up that object order is not tested and doesn't matter.
      // this test shows that.
      expect(tm.wpContextBuild(defaultOnlyMultiple)).toEqual({
        user: {
          likes: [
            'summer', 'blue', 4,
          ],
          name: 'Named',
          age: 23,
        },
      });
    });

    it('shouldn\'t care if a value is overwritten', () => {
      const defaultOnlyMultiple: WpContextConfigs = [
        {
          mapTo: 'user.age',
          default: 23,
          source: {
            type: 'cookie',
            name: 'referer',
          },
        },
        {
          mapTo: 'user.age',
          default: 24,
          source: {
            type: 'cookie',
            name: 'referer',
          },
        },
      ];

      expect(tm.wpContextBuild(defaultOnlyMultiple)).toEqual({
        user: {
          age: 24,
        },
      });
    });
  });

  // describe('cookies', () => {
  //   it(`should return an object with context pulled
  //         from cookies: no default was used`, () => {
  //     const expectedString = 'https://camefrom.com';

  //     Cookies.get = jest.fn().mockImplementationOnce(() => expectedString);

  //     const cookieConfig: WpContextConfig = {
  //       mapTo: 'cookies.referer',
  //       source: [
  //         {
  //           type: 'cookie',
  //           name: 'referer',
  //         },
  //       ],
  //     };
  //     const result = wpContextBuild(cookieConfig);
  //     expect(result).toEqual({
  //       cookies: {
  //         referer: expectedString,
  //       },
  //     });
  //   });

  //   it(`should return an object with context pulled
  //         from cookies: default was used as cookies were not found`, () => {
  //     const expectedString = 'notfound';

  //     const cookieConfig: WpContextConfig = {
  //       mapTo: 'cookies.referer',
  //       default: expectedString,
  //       source: [
  //         {
  //           type: 'cookie',
  //           name: 'referer',
  //         },
  //       ],
  //     };
  //     const result = wpContextBuild(cookieConfig);
  //     expect(result).toEqual({
  //       cookies: {
  //         referer: expectedString,
  //       },
  //     });
  //   });

  //   it(`should return an object with context being undefined
  //         because it was not required and no default was provided`, () => {
  //     const cookieConfig: WpContextConfig = {
  //       mapTo: 'cookies.referer',
  //       source: [
  //         {
  //           type: 'cookie',
  //           name: 'referer',
  //         },
  //       ],
  //     };
  //     const result = wpContextBuild(cookieConfig);
  //     expect(result).toEqual({
  //       cookies: {
  //         referer: undefined,
  //       },
  //     });
  //   });

  //   it(`should return an object with context being undefined and an
  //         error message logged because no default was provided`, () => {
  //     // TODO: Move this to a unit test and/or setup tests that run both
  //     // in a browser and on client.
  //     // const consoleError = jest.spyOn(global.console, 'error').mockReturnValue();
  //     const cookieConfig: WpContextConfig = {
  //       mapTo: 'cookies.referer',
  //       required: true,
  //       source: [
  //         {
  //           type: 'cookie',
  //           name: 'referer',
  //         },
  //       ],
  //     };
  //     const result = wpContextBuild(cookieConfig);
  //     expect(result).toEqual({
  //       cookies: {
  //         referer: undefined,
  //       },
  //     });
  //     // expect(consoleError).toBeCalledTimes(1);
  //     // consoleError.mockRestore();
  //   });
  // });

  describe('params', () => {
    it(`should return an object with context pulled
          from params: no default was used`, () => {
      // const expectedString = 'value';

      // const paramConfigs: WpContextConfigs = [
      //   // let paramConfigs = [
      //   {
      //     mapTo: 'utm.source',
      //     source:
      //     {
      //       type: 'param',
      //       name: 'utm_source',
      //     },
      //   },
      //   {
      //     mapTo: 'utm.medium',
      //     source:
      //     {
      //       type: 'param',
      //       name: 'utm_medium',
      //     },
      //   },
      //   {
      //     mapTo: 'utm.campaign',
      //     source:
      //     {
      //       type: 'param',
      //       name: 'utm_campaign',
      //     },
      //   },
      //   {
      //     mapTo: 'utm.term',
      //     source:
      //     {
      //       type: 'param',
      //       name: 'utm_term',
      //     },
      //   },
      //   {
      //     mapTo: 'utm.utm_content',
      //     source:
      //     {
      //       type: 'param',
      //       name: 'utm_content',
      //     },
      //   },
      //   {
      //     mapTo: 'utm.id',
      //     source:
      //     {
      //       type: 'param',
      //       name: 'utm_id',
      //     },
      //   },
      //   {
      //     mapTo: 'add.adset_id',
      //     source:
      //     {
      //       type: 'param',
      //       name: 'adset_id',
      //     },
      //   },
      //   {
      //     mapTo: 'add.ad_id',
      //     source:
      //     {
      //       type: 'param',
      //       name: 'ad_id',
      //     },
      //   },
      //   {
      //     mapTo: 'document.referrer',
      //     source:
      //     {
      //       type: 'referrer',
      //       name: 'referrer',
      //     },
      //   },
      //   {
      //     mapTo: 'document.origin',
      //     source:
      //     {
      //       type: 'location',
      //       name: 'origin',
      //     },
      //   },
      //   {
      //     mapTo: 'document.search',
      //     source:
      //     {
      //       type: 'location',
      //       name: 'search',
      //     },
      //   },
      //   {
      //     mapTo: 'event.event_id',
      //     source:
      //     {
      //       type: 'uuid',
      //       name: 'uuid',
      //     },
      //   },
      // ];
      // const result = wpContextBuild(paramConfigs);
      // expect(result).toEqual({
      //   cookies: {
      //     referer: expectedString,
      //   },
      // });
    });
  });
});
