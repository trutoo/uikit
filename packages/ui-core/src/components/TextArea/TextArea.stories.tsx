import React from 'react';
import { storiesOf } from '@storybook/react';
import { StateDecorator, Store } from '@sambego/storybook-state';

import './TextArea.css';
import TextArea from './TextArea';
import { Validator } from '../../framework/validator';

const store = new Store({
  value: '',
});

storiesOf('TextArea', module)
  .addDecorator(StateDecorator(store) as any)
  .add('default', () => (
    <TextArea
      label="Paragraph here!"
      onChange={state => store.set({ value: state })}
      validators={[Validator.required()]}
      inputProps={{ 'aria-label': 'test' }}
    />
  ));
