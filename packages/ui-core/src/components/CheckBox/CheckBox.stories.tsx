import './CheckBox.css';

import React from 'react';

import { Meta, Story } from '@storybook/react';

import CheckBox, { CheckBoxProps } from './CheckBox';

export default {
  title: 'UI-Core/CheckBox',
  component: CheckBox,
} as Meta;

const Template: Story<CheckBoxProps> = (props: CheckBoxProps) => (
  <CheckBox
    {...props}
    validators={[
      (value) => {
        return !value ? { required: true } : null;
      },
    ]}
  />
);

export const Basic = Template.bind({});
Basic.args = {
  label: 'Check me!',
};
