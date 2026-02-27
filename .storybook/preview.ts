import type { Preview } from '@storybook/web-components-vite'
import '../scss/style.scss';
import '../scss/storybook.scss';

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
      const { theme, scheme } = context.globals;
      const body = document.querySelector('body');
      if (body) {
        // Handle Theme
        body.classList.remove('fanfare', 'lava-falls');
        if (theme === 'fanfare') {
          body.classList.add('fanfare');
        } else if (theme === 'lava-falls') {
          body.classList.add('lava-falls');
        }

        // Handle Color Scheme
        body.classList.remove('light', 'dark');
        if (scheme === 'light') {
          body.classList.add('light');
        } else if (scheme === 'dark') {
          body.classList.add('dark');
        }
      }
      return story();
    },
  ],
  parameters: {
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