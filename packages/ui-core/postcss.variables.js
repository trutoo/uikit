/* UPDATES TO THIS FILE REQUIRES A FULL REBUILD */

module.exports.base = {
  'color-scheme': 'light dark',

  /* COLOR */
  '--c_color_alpha': '#b27100', // Quality Gold
  '--c_color_beta': '#556270', // Might Slate

  '--c_text': 'rgba(0, 0, 0, 0.87)',
  '--c_text_low': 'rgba(0, 0, 0, 0.6)',
  '--c_text_disabled': 'rgba(0, 0, 0, 0.38)',

  '--c_background': '#ffffff',
  '--c_light': 'rgba(0, 0, 0, 0.125)',
  '--c_light_alpha': 'rgba(0, 0, 0, 0.25)',
  '--c_light_beta': 'rgba(0, 0, 0, 0.5)',
  '--c_light_gamma': 'rgba(0, 0, 0, 0.75)',

  '--c_valid': '#95c11f', // Green
  '--c_warning': '#f3a118', // Orange
  '--c_invalid': '#c10d08', // Red

  /* Z-INDEX */
  '--z_floating': '1000',
  '--z_context_menu': '1500',
  '--z_popup': '2000',

  /* FONT STACK */
  '--f_stack': 'sans-serif',
  '--f_stack_icons': 'sans-serif',

  /* TIMINGS */
  '--t_animation': '200ms',

  /* DIMENSIONS */
  '--d_fs': '16px',
  '--d_fs_delta': '2',
  '--d_lh': '24px',
  '--d_lh_delta': '4',

  /* Grid */
  '--d_columns_gap': '1rem',

  /* Devices */
  '--d_xs': '575px',
  '--d_sm': '576px',
  '--d_md': '768px',
  '--d_lg': '1024px',
  '--d_xl': '1176px',
  '--d_sm_max': '767px' /* One less than counter part */,
  '--d_md_max': '1023px' /* One less than counter part */,
  '--d_lg_max': '1175px' /* One less than counter part */,

  /* ICONS */
  '--i_info': '"?"',
  '--i_warning': '"!"',
  '--i_prev': '"<"',
  '--i_next': '">"',
  '--i_close': '"x"',
  '--i_expand': '"+"',
  '--i_collapse': '"-"',
  '--i_refresh': '"↻"',
  '--i_list_item': '">"',
  '--i_ascending': '"\\25B2"',
  '--i_descending': '"\\25BC"',
  '--i_menu': '"\\22EF"',
  '--i_checkbox': '"\\2610"',
  '--i_checkbox_checked': '"\\2611"',
  '--i_radio': '"\\25EF"',
  '--i_radio_checked': '"\\25C9"',
};

module.exports.dark = {
  /* COLOR */
  '--c_color_alpha': '#ffab19', // Shiny Gold
  '--c_color_beta': '#556270', // Might Slate

  '--c_text': 'rgba(255, 255, 255, 0.87)',
  '--c_text_low': 'rgba(255, 255, 255, 0.6)',
  '--c_text_disabled': 'rgba(255, 255, 255, 0.38)',

  '--c_background': '#121212',
  '--c_light': 'rgba(255, 255, 255, 0.06)',
  '--c_light_alpha': 'rgba(255, 255, 255, 0.12)',
  '--c_light_beta': 'rgba(255, 255, 255, 0.24)',
  '--c_light_gamma': 'rgba(255, 255, 255, 0.48)',

  '--c_valid': '#95c11f', // Green
  '--c_warning': '#f3a118', // Orange
  '--c_invalid': '#c10d08', // Red
};
