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
      // Get all possible theme values from the global types if we want to be very dynamic,
      // but for now we'll just remove classes that are definitely themes.
      // Since we know all our themes, we can collect them.
      const themeItems = preview.globalTypes?.theme?.toolbar?.items || [];
      const allThemeClasses = themeItems
        .map((item: any) => item.value)
        .filter((val: string) => val !== 'default');

      body.classList.remove(...allThemeClasses);
      if (theme !== 'default') {
        body.classList.add(theme);
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
          { value: 'winterberry', icon: 'circle', title: 'Winterberry' },
          { value: 'hot-chocolate', icon: 'circle', title: 'Hot Chocolate' },
          { value: 'desert-sun', icon: 'circle', title: 'Desert Sun' },
          { value: 'burnished-lilac', icon: 'circle', title: 'Burnished Lilac' },
          { value: 'teaberry', icon: 'circle', title: 'Teaberry' },
          { value: 'pale-banana', icon: 'circle', title: 'Pale Banana' },
          { value: 'mandarin-orange', icon: 'circle', title: 'Mandarin Orange' },
          { value: 'tickled-pink', icon: 'circle', title: 'Tickled Pink' },
          { value: 'amethyst-orchid', icon: 'circle', title: 'Amethyst Orchid' },
          { value: 'caramel', icon: 'circle', title: 'Caramel' },
          { value: 'dutch-canal', icon: 'circle', title: 'Dutch Canal' },
          { value: 'shale-green', icon: 'circle', title: 'Shale Green' },
          { value: 'muskmelon', icon: 'circle', title: 'Muskmelon' },
          { value: 'alexandrite', icon: 'circle', title: 'Alexandrite' },
          { value: 'dusty-rose', icon: 'circle', title: 'Dusty Rose' },
          { value: 'tea-rose', icon: 'circle', title: 'Tea Rose' },
          { value: 'burnt-sienna', icon: 'circle', title: 'Burnt Sienna' },
          { value: 'lavender-blue', icon: 'circle', title: 'Lavender Blue' },
          { value: 'poppy-red', icon: 'circle', title: 'Poppy Red' },
          { value: 'salted-lime', icon: 'circle', title: 'Salted Lime' },
          { value: 'chili-oil', icon: 'circle', title: 'Chili Oil' },
          { value: 'fig', icon: 'circle', title: 'Fig' },
          { value: 'bronze-mist', icon: 'circle', title: 'Bronze Mist' },
          { value: 'lemon-grass', icon: 'circle', title: 'Lemon Grass' },
          { value: 'brandied-melon', icon: 'circle', title: 'Brandied Melon' },
          { value: 'lyons-blue', icon: 'circle', title: 'Lyons Blue' },
          { value: 'damson', icon: 'circle', title: 'Damson' },
          { value: 'primrose-pink', icon: 'circle', title: 'Primrose Pink' },
          { value: 'bronze-brown', icon: 'circle', title: 'Bronze Brown' },
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