import React from 'react';
import { State, Store } from '@sambego/storybook-state';

import './RadioButton.css';
import RadioButton from './RadioButton';

const store = new Store({
  value: 'value-2',
});

export default {
  title: 'RadioButton',
};

/* Handle differently because radio buttons work as a group and checked must be conditional */
let index = 0;
export const basic = () => {
  const value = 'value-' + index++;
  return (
    <State store={store}>
      {state => (
        <RadioButton
          label="Pick me!"
          name="test1"
          value={value}
          checked={state.value == value}
          onChange={state => {
            store.set({ value: state });
          }}
        />
      )}
    </State>
  );
};
