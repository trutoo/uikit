import React from 'react';
import { storiesOf } from '@storybook/react';
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
    label: 'The Incredibles',
  },
  {
    key: 1,
    label: 'Kick-Ass',
    disabled: true,
  },
  {
    key: 2,
    label: 'Hellboy',
  },
  {
    label: 'Avengers',
    options: [
      {
        key: 3,
        label: 'Thor',
      },
      {
        key: 4,
        label: 'Iron Man',
      },
      {
        key: 5,
        label: 'Black Widow',
        disabled: true,
      },
    ],
  },
];

storiesOf('Select', module)
  .addDecorator(StateDecorator(store) as any)
  .add('default', () => (
    <Select
      label="Select me!"
      options={options}
      placeholder={'Choose option in list'}
      onChange={state => store.set({ value: state })}
      validators={[Validator.required()]}
    />
  ));
