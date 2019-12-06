import { configure, addDecorator, addParameters } from '@storybook/react';
import addon from '@storybook/addons';
import { withA11y } from '@storybook/addon-a11y';
import { themes } from '@storybook/theming';
import centered from '@storybook/addon-centered/react';

/* Utilize lerna linking to access src files and hot reload */
const css = require.context('../node_modules/@trutoo/ui-core', true, /src.*(variables|base)\.css$/);
const stories = require.context('../node_modules/@trutoo', true, /src.*\.stories\.(js|ts)x?$/);

addDecorator(withA11y);

addParameters({
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark },
    // Override the default light theme
    light: { ...themes.normal },
  },
});

addDecorator(centered);

// Update preview html with theme attribute on dark mode change
const channel = addon.getChannel();
const setMode = isDark => {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
};
channel.addListener('DARK_MODE', setMode);

// Load Base CSS
css.keys().forEach(filename => css(filename));
configure(stories, module);
