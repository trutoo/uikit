const exponent = (base, exponent, level) => Math.round(base * Math.pow(exponent, level));

module.exports = (variables) => ({
  iconBase: (mixin) => {
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

  genVariables: (mixin) => {
    return {
      ':root': {
        ...variables.base,
      },
      ':root[data-theme=dark]': {
        ...variables.dark,
      },
    };
  },

  genIcons: (mixin) => {
    const icons = Object.keys(variables.base).filter((key) => key.startsWith('--i'));
    const generated = {};
    icons.forEach((icon) => {
      const className = icon.replace('--i_', '.icon-').replace('_', '-');
      generated[`${className}::before`] = {
        content: variables.base[icon],
      };
    });
    return generated;
  },

  /* CLEARFOCUS */

  clearfocus: (mixin) => {
    return {
      '&:focus': {
        color: 'inherit',
        'background-color': 'transparent',
      },
    };
  },

  /* CLEARFIX */

  clearfix: (mixin) => {
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

  /* ELEVATION */

  elevation: (mixin, level) => {
    return {
      transition: 'background-color var(--t_animation), box-shadow var(--t_animation)',
      'background-color': 'rgba(255, 255, 255, 1)',
      'box-shadow': `0 ${exponent(1, 1.38, level)}px ${exponent(1, 1.44, level)}px ${exponent(
        1,
        1.1,
        level,
      )}px rgba(0,0,0,0.07), 0 ${exponent(1, 1.25, level)}px ${exponent(1, 1.46, level)}px ${exponent(
        1,
        1.25,
        level,
      )}px rgba(0,0,0,0.06), 0 ${exponent(1, 1.28, level)}px ${exponent(3, 1.18, level)}px ${exponent(
        -1,
        1.22,
        level,
      )}px rgba(0,0,0,0.1)`,

      '[data-theme=dark] &': {
        'background-color': `rgba(255, 255, 255, ${exponent(4, 1.15, level) / 100})`,
      },
    };
  },

  /* GRID */

  columns: (mixin, device) => {
    const columns = {};
    for (let i = 1; i <= 12; i++) {
      columns[`&[tu-columns${device ? '-' + device : ''}="${i}"] > *`] = {
        width: `calc(${100 / i}% - var(--d_columns_gap) - 0.01rem)`,

        '&.tu-grid': {
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
