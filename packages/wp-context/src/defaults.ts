import { WpContextConfigs } from './types';

export const tmContextConfigDefault: WpContextConfigs = [
  // let paramConfigs = [
  {
    mapTo: 'utm.source',
    source:
    {
      type: 'param',
      name: 'utm_source',
    },
  },
  {
    mapTo: 'utm.medium',
    source:
    {
      type: 'param',
      name: 'utm_medium',
    },
  },
  {
    mapTo: 'utm.campaign',
    source:
    {
      type: 'param',
      name: 'utm_campaign',
    },
  },
  {
    mapTo: 'utm.term',
    source:
    {
      type: 'param',
      name: 'utm_term',
    },
  },
  {
    mapTo: 'utm.utm_content',
    source:
    {
      type: 'param',
      name: 'utm_content',
    },
  },
  {
    mapTo: 'utm.id',
    source:
    {
      type: 'param',
      name: 'utm_id',
    },
  },
  {
    mapTo: 'ad.adset_id',
    source:
    {
      type: 'param',
      name: 'adset_id',
    },
  },
  {
    mapTo: 'ad.ad_id',
    source:
    {
      type: 'param',
      name: 'ad_id',
    },
  },
  {
    mapTo: 'document.referrer',
    source:
    {
      type: 'referrer',
      name: 'referrer',
    },
  },
  {
    mapTo: 'document.origin',
    source:
    {
      type: 'location',
      name: 'origin',
    },
  },
  {
    mapTo: 'document.search',
    source:
    {
      type: 'location',
      name: 'search',
    },
  },
  {
    mapTo: 'event.event_id',
    source:
    {
      type: 'uuid',
      name: 'uuid',
    },
  },
];
