import React from 'react';
import { storiesOf } from '@storybook/react';
import { StateDecorator, Store } from '@sambego/storybook-state';

import './CheckBox.css';
import CheckBox from './CheckBox';

const store = new Store({
  checked: false,
});

storiesOf('CheckBox', module)
  .addDecorator(StateDecorator(store) as any)
  .add('default', () => (
    <CheckBox
      label="Check me!"
      onChange={state => store.set({ checked: state })}
      validators={[
        value => {
          return !value ? { required: true } : null;
        },
      ]}
      inputProps={{ 'aria-label': 'test' }}
    />
  ));
