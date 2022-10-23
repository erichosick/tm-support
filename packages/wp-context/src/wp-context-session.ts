import { WP_CONTEXT_SESSION_KEY } from './types';
import merge from 'ts-deepmerge';

/**
 * Initializes and or writes over the current webpage session context.
 */
export const wpSessionInit = (): void => {
  sessionStorage.setItem(WP_CONTEXT_SESSION_KEY, JSON.stringify({}));
};

/**
 * Returns the current webpage session context.
 */
export const wpSessionGet = (): object => {
  const context = sessionStorage.getItem(WP_CONTEXT_SESSION_KEY);
  return context ? JSON.parse(context) : {};
};

/**
 * Stores a configuration in a session, merging in the newContext
 * with any existing context in the session with id WP_SESSION_KEY.
 * @param config The configuration we are storing in the session.
 */
export const wpSessionSet = (context: object): object => {
  const mergedContext = merge(wpSessionGet(), context);
  sessionStorage.setItem(
    WP_CONTEXT_SESSION_KEY,
    JSON.stringify(mergedContext)
  );
  return mergedContext;
};
