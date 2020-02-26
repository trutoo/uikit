import React from 'react';
import { Store, withState } from '@sambego/storybook-state';

import './RangeSlider.css';
import RangeSlider from './RangeSlider';
import { Validator } from '../../framework/validator';
import { withKnobs, number } from '@storybook/addon-knobs';

const store = new Store({
  value: 52,
});

export default {
  title: 'RangeSlider',
  decorators: [withKnobs, withState()],
  parameters: { state: { store } },
};

export const basic = () => (
  <RangeSlider
    label="Text here!"
    min={number('Min', 0, {
      range: true,
      min: 0,
      max: 100,
    })}
    max={number('Max', 55, {
      range: true,
      min: 0,
      max: 100,
    })}
    step={number('Step', 5, {
      range: true,
      min: 1,
      max: 10,
    })}
    onChange={state => store.set({ value: state })}
    validators={[Validator.required()]}
  />
);
