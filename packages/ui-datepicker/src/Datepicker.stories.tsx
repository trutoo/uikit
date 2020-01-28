import React from 'react';
import { Store, withState } from '@sambego/storybook-state';

import './Datepicker.css';
import Datepicker, { DateValue } from './Datepicker';

const date = new Date();
date.setDate(date.getDate() + 2);
const secondaryDate = new Date();
secondaryDate.setDate(secondaryDate.getDate() + 5);
const store = new Store({
  value: { date, secondaryDate } as DateValue,
});

export default {
  title: 'Datepicker',
  decorators: [withState()],
  parameters: { state: { store } },
};

export const basic = () => (
  <Datepicker
    label="Datepicker"
    weekday="short"
    onChange={state => store.set({ value: state })}
    validators={[value => (!value || !value.date ? { required: true } : null)]}
  />
);

export const past = () => (
  <Datepicker
    label="Datepicker"
    weekday="short"
    enablePastDates={true}
    onChange={state => store.set({ value: state })}
    validators={[value => (!value || !value.date ? { required: true } : null)]}
  />
);

export const span = () => (
  <Datepicker
    label="Datepicker"
    weekday="short"
    span={true}
    onChange={state => store.set({ value: state })}
    validators={[value => (!value || !value.date ? { required: true } : null)]}
  />
);
