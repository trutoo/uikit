import './Select.css';

import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Validator } from '../../framework/validator';
import Select, { SelectProps } from './Select';

const options = [
  {
    key: 0,
    label: 'Eagle',
  },
  {
    key: 1,
    label: 'Hawk',
    disabled: true,
  },
  {
    key: 2,
    label: 'Owl',
  },
  {
    label: 'Parrots',
    options: [
      {
        key: 3,
        label: 'Cockatoo',
      },
      {
        key: 4,
        label: 'Macaw',
      },
      {
        key: 5,
        label: 'Parakeet',
        disabled: true,
      },
    ],
  },
];

export default {
  title: 'UI-Core/Select',
  component: Select,
} as Meta;

const Template: Story<SelectProps> = (props: SelectProps) => (
  <Select
    {...props}
    //onChange={(state) => store.set({ value: state })}
    validators={[Validator.required()]}
  />
);

export const Basic = Template.bind({});
Basic.args = {
  label: 'Select me!',
  options: options,
  placeholder: 'Choose option in list',
};
