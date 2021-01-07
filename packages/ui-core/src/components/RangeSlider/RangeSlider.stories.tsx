import React from 'react';
import { Story, Meta } from '@storybook/react';

import './RangeSlider.css';
import RangeSlider, { RangeSliderProps } from './RangeSlider';
import { Validator } from '../../framework/validator';

export default {
  title: 'UI-Core/RangeSlider',
  component: RangeSlider,
} as Meta;

const Template: Story<RangeSliderProps> = (props: RangeSliderProps) => (
  <RangeSlider
    {...props}
    label="Text here!"
    validators={[Validator.required()]}
  />
);
//onChange={state => store.set({ value: state })}

export const Basic = Template.bind({});
Basic.args = {};
