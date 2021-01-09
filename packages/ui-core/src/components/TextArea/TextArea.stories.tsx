import './TextArea.css';

import React from 'react';

import { Store, withState } from '@sambego/storybook-state';

import { Validator } from '../../framework/validator';
import TextArea from './TextArea';

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
    onChange={(state) => store.set({ value: state })}
    validators={[Validator.required()]}
    inputProps={{ 'aria-label': 'test' }}
  />
);
