import './Button.css';

import React from 'react';

import { Meta, Story } from '@storybook/react';

import Button, { ButtonProps } from './Button';

export default {
  title: 'UI-Core/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (props: ButtonProps) => <Button {...props}>Click Me!</Button>;

export const Primary = Template.bind({});
Primary.args = {
  className: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  className: 'secondary',
};

export const Link = Template.bind({});
Link.args = {
  type: 'link',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const LinkDisabled = Template.bind({});
LinkDisabled.args = {
  type: 'link',
  disabled: true,
};
