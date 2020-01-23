import React from 'react';
import { StateDecorator, Store } from '@sambego/storybook-state';

import './TextField.css';
import TextField from './TextField';
import { Validator } from '../../framework/validator';

const store = new Store({
  value: '',
});

export default {
  title: 'TextField',
  decorators: [StateDecorator(store)],
};

export const basic = () => (
  <TextField
    label="Text here!"
    onChange={state => store.set({ value: state })}
    validators={[Validator.required()]}
    helpText="Libero alias voluptatem ipsa nemo facilis veritatis ab soluta et."
  />
);
