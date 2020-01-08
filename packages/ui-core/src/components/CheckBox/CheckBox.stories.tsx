import React from 'react';
import { StateDecorator, Store } from '@sambego/storybook-state';

import './CheckBox.css';
import CheckBox from './CheckBox';

const store = new Store({
  checked: false,
});

export default {
  title: 'CheckBox',
  decorators: [StateDecorator(store)],
};

export const basic = () => (
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
);