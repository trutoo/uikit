import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import addon from '@storybook/addons';
import { withA11y } from '@storybook/addon-a11y';
import { themes } from '@storybook/theming';

import icons from '!raw-loader!@trutoo/ui-icons/dist/symbols.svg';

/* Utilize lerna linking to access src files and hot reload */
const css = require.context('../node_modules/@trutoo/ui-core', true, /src.*(variables|base)\.css$/);
const stories = require.context('../node_modules/@trutoo', true, /src.*\.stories\.(js|ts)x?$/);

addDecorator(withA11y);

addParameters({
  options: {
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark },
    // Override the default light theme
    light: { ...themes.normal },
  },
});

addDecorator((storyFn, context) => {
  return (
    <div className="e-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="e-elevation-1" style={{ padding: '1rem' }}>
        <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: icons }}></div>
        <h1 style={{ fontSize: '1.5em' }}>{context.kind}</h1>
        <strong style={{ color: 'var(--c_text_low)' }}>{context.name}</strong>
        <hr />
        {storyFn()}
      </div>
    </div>
  );
});

// Update preview html with theme attribute on dark mode change
const channel = addon.getChannel();
const setMode = isDark => {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
};
channel.addListener('DARK_MODE', setMode);

// Load Base CSS
css.keys().forEach(filename => css(filename));
configure(stories, module);
