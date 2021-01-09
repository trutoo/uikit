import './TextArea.css';

import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Validator } from '../../framework/validator';
import TextArea, { TextAreaProps } from './TextArea';

export default {
  title: 'UI-Core/TextArea',
  component: TextArea,
} as Meta;

const Template: Story<TextAreaProps> = (props: TextAreaProps) => (
  <TextArea
    {...props}
    //onChange={(state) => store.set({ value: state })}
    validators={[Validator.required()]}
  />
);

export const Basic = Template.bind({});
Basic.args = {
  label: 'Paragraph here!',
};
