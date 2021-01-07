import React from 'react';

import { Meta, Story } from '@storybook/react';

import Icon from './Icon';

const iconContext = require.context('./icons/', false, /\.svg$/);
const icons = iconContext.keys() as string[];

type StoryProps = {
  size: number;
  color: string;
};

export default {
  title: 'UI-Icons/SVGs',
  argTypes: {
    size: { control: { type: 'range', min: 16, max: 128 } },
    color: { control: 'color' },
  },
} as Meta;

const Template: Story<StoryProps> = ({ size, color }: StoryProps) => (
  <div className="tu-grid style-uniform">
    {icons
      .map((icon) => icon.replace(/.*?([\w-]+).\w+$/, '$1'))
      .map((icon) => (
        <Icon key={icon} id={icon} size={size} color={color} />
      ))}
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  size: 32,
};
