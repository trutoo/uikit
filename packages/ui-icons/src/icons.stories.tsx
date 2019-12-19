import React from 'react';
import { withKnobs, number, color } from '@storybook/addon-knobs';

const iconContext = require.context('./icons/', false, /\.svg$/);
const keys = iconContext.keys() as string[];
const paths = keys.map(iconContext) as string[];

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
      {paths.map(icon => (
        <svg
          key={icon}
          fill={color('Color', 'rgba(0,0,0,1)')}
          style={{
            width: size,
            height: size,
          }}>
          <use xlinkHref={`${icon}#Layer_1`} width={size} height={size} />
        </svg>
      ))}
    </div>
  );
};
