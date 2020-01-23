/* UPDATES TO THIS FILE REQUIRES A FULL REBUILD */

module.exports.base = {
  'color-scheme': 'light dark',

  /* COLOR */
  '--c_alpha': '#a66802', // Quality Gold
  '--c_alpha_light': '#dc963b', // Quality Gold Light
  '--c_alpha_dark': '#723d00', // Quality Gold Dark

  '--c_beta': '#556270', // Might Slate
  '--c_beta_light': '#828f9e', // Might Slate Light
  '--c_beta_dark': '#2b3845', // Might Slate Dark

  '--c_text': 'rgba(0, 0, 0, 0.87)', // Black 87 %
  '--c_text_low': 'rgba(0, 0, 0, 0.6)', // Black 60 %
  '--c_text_disabled': 'rgba(0, 0, 0, 0.38)', // Black 38 %

  '--c_text_alt': 'rgba(255, 255, 255, 0.87)', // White 87 %
  '--c_text_alt_low': 'rgba(255, 255, 255, 0.6)', // White 60 %
  '--c_text_alt_disabled': 'rgba(255, 255, 255, 0.38)', // White 38 %

  '--c_background': 'rgba(255, 255, 255, 1)', // White
  '--c_detail': 'rgba(0, 0, 0, 0.125)', // Black 12.5 %
  '--c_detail_low': 'rgba(0, 0, 0, 0.25)', // Black 25 %
  '--c_detail_medium': 'rgba(0, 0, 0, 0.5)', // Black 50 %
  '--c_detail_high': 'rgba(0, 0, 0, 0.75)', // Black 75 %

  '--c_valid': '#178A00', // Green
  '--c_invalid': '#DA1406', // Red

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
  '--c_alpha': '#d2810e', // Quality Gold
  '--c_alpha_light': '#ffb146', // Quality Gold Light
  '--c_alpha_dark': '#9b5400', // Quality Gold Dark

  '--c_beta': '#556270', // Might Slate
  '--c_beta_light': '#828f9e', // Might Slate Light
  '--c_beta_dark': '#2b3845', // Might Slate Dark

  '--c_text': 'rgba(255, 255, 255, 0.87)', // White 87 %
  '--c_text_low': 'rgba(255, 255, 255, 0.6)', // White 60 %
  '--c_text_disabled': 'rgba(255, 255, 255, 0.38)', // White 38 %

  '--c_text_alt': 'rgba(0, 0, 0, 0.87)', // Black 87 %
  '--c_text_alt_low': 'rgba(0, 0, 0, 0.6)', // Black 60 %
  '--c_text_alt_disabled': 'rgba(0, 0, 0, 0.38)', // Black 38 %

  '--c_background': 'rgb(18, 18, 18, 1)', // Dark Grey
  '--c_detail': 'rgba(255, 255, 255, 0.06)', // White 6 %
  '--c_detail_low': 'rgba(255, 255, 255, 0.12)', // White 12 %
  '--c_detail_medium': 'rgba(255, 255, 255, 0.24)', // White 24 %
  '--c_detail_high': 'rgba(255, 255, 255, 0.48)', // White 48 %

  '--c_valid': '#8BC513', // Green
  '--c_invalid': '#FF3009', // Red
};
