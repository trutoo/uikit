import React from 'react';
import { storiesOf } from '@storybook/react';
import { StateDecorator, Store } from '@sambego/storybook-state';

import './Datepicker.css';
import Datepicker, { DateValue } from './Datepicker';

const date = new Date();
date.setDate(date.getDate() + 2);
const secondaryDate = new Date();
secondaryDate.setDate(secondaryDate.getDate() + 5);
const store = new Store({
  value: { date, secondaryDate } as DateValue,
});

storiesOf('Datepicker', module)
  .addDecorator(StateDecorator(store) as any)
  .add('default', () => (
    <Datepicker
      label="Datepicker"
      weekday="short"
      onChange={state => store.set({ value: state })}
      validators={[value => (!value || !value.date ? { required: true } : null)]}
    />
  ))
  .add('past', () => (
    <Datepicker
      label="Datepicker"
      weekday="short"
      enablePastDates={true}
      onChange={state => store.set({ value: state })}
      validators={[value => (!value || !value.date ? { required: true } : null)]}
    />
  ))
  .add('span', () => (
    <Datepicker
      label="Datepicker"
      weekday="short"
      span={true}
      onChange={state => store.set({ value: state })}
      validators={[value => (!value || !value.date ? { required: true } : null)]}
    />
  ));
