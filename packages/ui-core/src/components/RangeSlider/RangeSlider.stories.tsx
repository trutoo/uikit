import './RangeSlider.css';

import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Validator } from '../../framework/validator';
import RangeSlider, { RangeSliderProps } from './RangeSlider';

export default {
  title: 'UI-Core/RangeSlider',
  component: RangeSlider,
} as Meta;

const Template: Story<RangeSliderProps> = (props: RangeSliderProps) => (
  <RangeSlider
    {...props}
    label="Text here!"
    validators={[Validator.required()]}
    //onChange={state => store.set({ value: state })}
  />
);

export const Basic = Template.bind({});
Basic.args = {};
