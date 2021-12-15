import { config } from './config';

export enum Events {
  search = 'search',
  devDraft = 'devDraft',
  devNew = 'devNew',
  devModify = 'devModify',
  metaClick = 'metaClick',
  tagClick = 'tagClick',
  tagView = 'tagView',
}

export const trackEvent = (event: Events, label?: string, value?: number) => {
  window._hmt?.push(['_trackEvent', 'all', event, label, value]);
  if (config.env !== 'production') {
    console.log(`event: ${event}, label: ${label}, value: ${value}`);
  }
};
