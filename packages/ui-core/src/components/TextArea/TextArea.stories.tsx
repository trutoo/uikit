import React from 'react';
import { Store, withState } from '@sambego/storybook-state';

import './TextArea.css';
import TextArea from './TextArea';
import { Validator } from '../../framework/validator';

const store = new Store({
  value: '',
});

export default {
  title: 'TextArea',
  decorators: [withState(store)],
  parameters: { state: { store } },
};

export const basic = () => (
  <TextArea
    label="Paragraph here!"
    onChange={state => store.set({ value: state })}
    validators={[Validator.required()]}
    inputProps={{ 'aria-label': 'test' }}
  />
);
