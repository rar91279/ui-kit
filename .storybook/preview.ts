import type { Preview } from '@storybook/web-components-vite'
import React from 'react';
import { addons } from 'storybook/preview-api';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import '../scss/style.scss';
import '../scss/storybook.scss';

// Event name for updating globals
const UPDATE_GLOBALS = 'updateGlobals';

// Function to apply theme and color scheme to the body element
const applyThemeAndScheme = (theme: string, scheme: string) => {
  const body = document.querySelector('body');
  if (body) {
    console.log(`Applying theme: ${theme}, scheme: ${scheme}`);

    // Handle Theme
    if (theme) {
      body.classList.remove('fanfare', 'lava-falls');
      if (theme === 'fanfare') {
        body.classList.add('fanfare');
      } else if (theme === 'lava-falls') {
        body.classList.add('lava-falls');
      }
    }

    // Handle Color Scheme
    if (scheme) {
      body.classList.remove('light', 'dark');
      if (scheme === 'light') {
        body.classList.add('light');
      } else if (scheme === 'dark') {
        body.classList.add('dark');
      }
    }
  } else {
    console.warn('Body element not found');
  }
};

// Global subscription to the Storybook channel for theme/scheme changes
addons.getChannel().on(UPDATE_GLOBALS, ({ globals }) => {
  if (globals) {
    const { theme, scheme } = globals;
    applyThemeAndScheme(theme, scheme);
  }
});

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'default',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'default', icon: 'circlehollow', title: 'Default' },
          { value: 'fanfare', icon: 'circle', title: 'Fanfare' },
          { value: 'lava-falls', icon: 'circle', title: 'Lava Falls' },
        ],
        showName: true,
      },
    },
    scheme: {
      description: 'Color scheme (light/dark)',
      defaultValue: 'system',
      toolbar: {
        title: 'Color Scheme',
        icon: 'mirror',
        items: [
          { value: 'system', icon: 'mirror', title: 'System' },
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const { theme, scheme } = context.globals || {};
      applyThemeAndScheme(theme, scheme);
      return story();
    },
  ],
  parameters: {
    docs: {
      source: {
        state: 'open',
      },
      // Use the standard DocsContainer
      container: DocsContainer,
    },
    backgrounds: {
      disable: true,
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;