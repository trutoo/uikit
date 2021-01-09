import './TextField.css';

import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Validator } from '../../framework/validator';
import TextField, { TextFieldProps } from './TextField';

export default {
  title: 'UI-Core/TextField',
  component: TextField,
} as Meta;

const Template: Story<TextFieldProps> = (props: TextFieldProps) => (
  <TextField
    {...props}
    //onChange={(state) => store.set({ value: state })}
    validators={[Validator.required()]}
  />
);

export const Basic = Template.bind({});
Basic.args = {
  label: 'Text here!',
  helpText: 'Libero alias voluptatem ipsa nemo facilis veritatis ab soluta et.',
};
