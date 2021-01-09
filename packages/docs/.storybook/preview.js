import '@trutoo/ui-core/dist/styles/variables.css';
import '@trutoo/ui-core/dist/styles/base.css';

import icons from '!raw-loader!@trutoo/ui-icons/dist/symbols.svg';
import cssVars from 'css-vars-ponyfill';

import addon from '@storybook/addons';
import { themes } from '@storybook/theming';

cssVars({
  preserveVars: true,
  watch: true,
});

export const parameters = {
  layout: 'centered',
  controls: { expanded: true },
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    values: [
      { name: 'light', value: '#f5f2f0' },
      { name: 'dark', value: '#121212' },
    ],
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark },
    // Override the default light theme
    light: { ...themes.normal },
  },
};

export const decorators = [
  (storyFn, context) => {
    return (
      <div className="tu-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="tu-elevation-1" style={{ padding: '1rem' }}>
          <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: icons }}></div>
          <h1 style={{ fontSize: '1.5em' }}>{context.kind}</h1>
          <strong style={{ color: 'var(--c_text_low)' }}>{context.name}</strong>
          <hr />
          {storyFn()}
        </div>
      </div>
    );
  },
];

const channel = addon.getChannel();
const setMode = (isDark) => {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
};
channel.addListener('DARK_MODE', setMode);
