import React from 'react';
import { StateDecorator, Store } from '@sambego/storybook-state';

import './Select.css';
import Select from './Select';
import { Validator } from '../../framework/validator';

const store = new Store({
  value: '',
});

const options = [
  {
    key: 0,
    label: 'Eagle',
  },
  {
    key: 1,
    label: 'Hawk',
    disabled: true,
  },
  {
    key: 2,
    label: 'Owl',
  },
  {
    label: 'Parrots',
    options: [
      {
        key: 3,
        label: 'Cockatoo',
      },
      {
        key: 4,
        label: 'Macaw',
      },
      {
        key: 5,
        label: 'Parakeet',
        disabled: true,
      },
    ],
  },
];

export default {
  title: 'Select',
  decorators: [StateDecorator(store)],
};

export const basic = () => (
  <Select
    label="Select me!"
    options={options}
    placeholder={'Choose option in list'}
    onChange={state => store.set({ value: state })}
    validators={[Validator.required()]}
  />
);
