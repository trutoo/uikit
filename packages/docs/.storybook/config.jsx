import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import addon from '@storybook/addons';
import { withA11y } from '@storybook/addon-a11y';
import { themes } from '@storybook/theming';
import centered from '@storybook/addon-centered/react';

import icons from '!raw-loader!@trutoo/ui-icons/dist/symbols.svg';

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

addDecorator(storyFn => (
  <div className="e-container">
    <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: icons }}></div>
    {storyFn()}
  </div>
));

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
