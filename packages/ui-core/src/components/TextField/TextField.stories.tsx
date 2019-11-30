import React from 'react';
import { storiesOf } from '@storybook/react';
import { StateDecorator, Store } from '@sambego/storybook-state';

import './TextField.css';
import TextField from './TextField';
import { Validator } from '../../framework/validator';

const store = new Store({
  value: '',
});

storiesOf('TextField', module)
  .addDecorator(StateDecorator(store) as any)
  .add('default', () => (
    <TextField
      label="Text here!"
      onChange={state => store.set({ value: state })}
      validators={[Validator.required()]}
      inputProps={{ 'aria-label': 'test' }}
    />
  ));
