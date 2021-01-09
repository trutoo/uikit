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
  layout: 'fullscreen',
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
        <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: icons }}></div>
        <span style={{ textTransform: 'lowercase', color: 'var(--c_text_low)' }}>@{context.kind.split('/')[0]}</span>
        <h1 style={{ marginTop: 0, fontSize: '1.5em' }}>
          <span style={{ color: 'var(--c_beta)' }}>{context.kind.split('/')[1]} </span>
          <span>{context.name}</span>
        </h1>
        <hr />
        {storyFn()}
      </div>
    );
  },
];

const channel = addon.getChannel();
const setMode = (isDark) => {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
};
channel.addListener('DARK_MODE', setMode);
