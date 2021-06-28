export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

import { decorator as persistedStateDecorator } from '../__mocks__/hooks/persistedState';

export const decorators = [persistedStateDecorator];
