import './TextField.css';

import React from 'react';

import { Store, withState } from '@sambego/storybook-state';

import { Validator } from '../../framework/validator';
import TextField from './TextField';

const store = new Store({
  value: '',
});

export default {
  title: 'TextField',
  decorators: [withState()],
  parameters: { state: { store } },
};

export const basic = () => (
  <TextField
    label="Text here!"
    onChange={(state) => store.set({ value: state })}
    validators={[Validator.required()]}
    helpText="Libero alias voluptatem ipsa nemo facilis veritatis ab soluta et."
  />
);
