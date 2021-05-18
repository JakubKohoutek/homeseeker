import { createContext } from 'react';

type Context = Record<string, unknown>;

export const defaultStore: Context = {};

export const context = createContext<{
  store: Context;
  setStore: (user: Context) => void;
}>({
  store: defaultStore,
  setStore: () => {
    return;
  }
});
