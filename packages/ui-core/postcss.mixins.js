module.exports = variables => ({
  iconBase: mixin => {
    return {
      'line-height': 1,
      'font-weight': 'normal',
      'font-style': 'normal',
      'font-variant': 'normal',

      /* use !important to prevent issues with browser extensions that change fonts */

      'font-family': `var(--f_stack_icons), var(--f_stack) !important`,
      'text-transform': 'none',

      /* Better Font Rendering =========== */

      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      speak: 'none',
    };
  },

  /* GENERATORS */
  genVariables: mixin => {
    return {
      ':root': {
        ...variables.base,
      },
      '[data-theme=dark]': {
        ...variables.dark,
      },
    };
  },

  genIcons: mixin => {
    const icons = Object.keys(variables.base).filter(key => key.startsWith('--i'));
    const generated = {};
    icons.forEach(icon => {
      const className = icon.replace('--i_', '.icon-').replace('_', '-');
      generated[`${className}::before`] = {
        content: variables.base[icon],
      };
    });
    return generated;
  },

  /* CLEARFOCUS */

  clearfocus: mixin => {
    return {
      '&:focus': {
        color: 'inherit',
        'background-color': 'transparent',
      },
    };
  },

  /* CLEARFIX */

  clearfix: mixin => {
    return {
      '&::after': {
        display: 'block',
        content: '""',
        clear: 'both',
      },
    };
  },

  /* FONT SCALING */

  fontScaling: (mixin, base, delta) => {
    const width = parseInt(variables.base['--d_lg'], 10) - parseInt(variables.base['--d_sm'], 10);
    return {
      'font-size': base,

      '@media (--b_sm)': {
        'font-size': `calc(${base} + ${delta} * ((100vw - ${variables.base['--d_sm']}) / ${width}))`,
      },

      '@media (--b_lg)': {
        'font-size': `calc(${base} + 1px * ${delta})`,
      },
    };
  },

  lineScaling: (mixin, base, delta) => {
    const width = parseInt(variables.base['--d_lg'], 10) - parseInt(variables.base['--d_sm'], 10);
    return {
      'line-height': base,

      '@media (--b_sm)': {
        'line-height': `calc(${base} + ${delta} * ((100vw - ${variables.base['--d_sm']}) / ${width}))`,
      },

      '@media (--b_lg)': {
        'line-height': `calc(${base} + 1px * ${delta})`,
      },
    };
  },

  /* GRID COLUMNS */

  columns: (mixin, device) => {
    const columns = {};
    for (let i = 1; i <= 12; i++) {
      columns[`&[e-columns${device ? '-' + device : ''}="${i}"] > *`] = {
        width: `calc(${100 / i}% - var(--d_columns_gap) - 0.01rem)`,

        '&.e-grid': {
          width: `calc(${100 / i}% - 0.01rem)`,
        },
      };
    }
    return columns;
  },

  colspan: (mixin, count) => {
    return {
      width: `calc(${100 / 12}% * ${count} - var(--d_columns_gap) - 0.01rem) !important`,
      'flex-grow': '0 !important',
    };
  },
});
