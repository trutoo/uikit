/* UPDATES TO THIS FILE REQUIRES A FULL REBUILD */

module.exports.base = {
  /* COLOR */
  '--c_color_alpha': '#b27100', // Quality Gold
  '--c_color_beta': '#ffab19', // Shiny Gold
  '--c_light_alpha': '#556270', // Might Slate
  '--c_light_beta': '#666666', // Soft Grey
  '--c_text': '#121212', // Dark Grey
  '--c_background': '#ffffff', // White
  '--c_valid': '#95c11f', // Green
  '--c_warning': '#ea5b0c', // Orange
  '--c_invalid': '#c43b0a', // Red

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
  '--c_color_beta': '#b27100', // Quality Gold
  '--c_light_alpha': '#556270', // Might Slate
  '--c_light_beta': '#666666', // Soft Grey
  '--c_text': '#f0f0f0', // Bone White
  '--c_background': '#121212', // Dark Grey
  '--c_valid': '#95c11f', // Green
  '--c_warning': '#ea5b0c', // Orange
  '--c_invalid': '#c43b0a', // Red
};
