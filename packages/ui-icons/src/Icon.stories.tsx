import React from 'react';
import { withKnobs, number, color } from '@storybook/addon-knobs';

import Icon from './Icon';

const iconContext = require.context('./icons/', false, /\.svg$/);
const icons = iconContext.keys() as string[];

export default {
  title: 'Icons',
  decorators: [withKnobs],
};

export const basic = () => {
  const size = number('Size', 32, {
    range: true,
    min: 16,
    max: 128,
  });
  return (
    <div className="e-grid style-uniform">
      {icons
        .map(icon => icon.replace(/.*?([\w-]+).\w+$/, 'icon-$1'))
        .map(icon => (
          <Icon key={icon} icon={icon} size={size} color={color('Color', '')} />
        ))}
    </div>
  );
};
