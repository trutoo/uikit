import './RadioButton.css';

import React from 'react';

import { State, Store } from '@sambego/storybook-state';

import RadioButton from './RadioButton';

const store = new Store({
  value: 'value-2',
});

export default {
  title: 'RadioButton',
};

/* Handle differently because radio buttons work as a group and checked must be conditional */
export const basic = () => {
  return (
    <State store={store}>
      {(state) => (
        <>
          <RadioButton
            label="Pick me!"
            name="test"
            value={'value-1'}
            checked={state.value == 'value-1'}
            onChange={(state) => {
              store.set({ value: state });
            }}
          />
          <RadioButton
            label="Pick me!"
            name="test"
            value={'value-2'}
            checked={state.value == 'value-2'}
            onChange={(state) => {
              store.set({ value: state });
            }}
          />
          <RadioButton
            label="Pick me!"
            name="test"
            value={'value-3'}
            checked={state.value == 'value-3'}
            onChange={(state) => {
              store.set({ value: state });
            }}
          />
        </>
      )}
    </State>
  );
};
