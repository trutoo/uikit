import './RadioButton.css';

import React from 'react';

import { Meta, Story } from '@storybook/react';

import RadioButton, { RadioButtonProps } from './RadioButton';

export default {
  title: 'UI-Core/RadioButton',
  component: RadioButton,
} as Meta;

/* Handle differently because radio buttons work as a group and checked must be conditional */
const Template: Story<RadioButtonProps> = (props: RadioButtonProps) => (
  <>
    <RadioButton
      {...props}
      value={'value-1'}
      //checked={state.value == 'value-1'}
      //onChange={(state) => { store.set({ value: state }); }}
    />
    <RadioButton
      {...props}
      value={'value-2'}
      //checked={state.value == 'value-2'}
      //onChange={(state) => { store.set({ value: state }); }}
    />
    <RadioButton
      {...props}
      value={'value-3'}
      //checked={state.value == 'value-3'}
      //onChange={(state) => { store.set({ value: state }); }}
    />
  </>
);

export const Basic = Template.bind({});
Basic.args = {
  name: 'radio',
  label: 'Pick me!',
};
