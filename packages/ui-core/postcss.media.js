module.exports = variables => ({
  /* BREAKPOINTS */
  '--b_xs': `screen and (max-width: ${variables.base['--d_xs']})`,
  '--b_sm': `screen and (min-width: ${variables.base['--d_sm']})`,
  '--b_md': `screen and (min-width: ${variables.base['--d_md']})`,
  '--b_lg': `screen and (min-width: ${variables.base['--d_lg']})`,
  '--b_xl': `screen and (min-width: ${variables.base['--d_xl']})`,
  '--b_sm_max': `screen and (max-width: ${variables.base['--d_sm_max']})`,
  '--b_md_max': `screen and (max-width: ${variables.base['--d_md_max']})`,
  '--b_lg_max': `screen and (max-width: ${variables.base['--d_lg_max']})`,
});
