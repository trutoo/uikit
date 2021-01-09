import './Datepicker.css';

import React from 'react';

import { Meta, Story } from '@storybook/react';

import Datepicker, { DatepickerProps } from './Datepicker';

const date = new Date();
date.setDate(date.getDate() + 2);
const secondaryDate = new Date();
secondaryDate.setDate(secondaryDate.getDate() + 5);

export default {
  title: 'UI-Datepicker/Datepicker',
} as Meta;

const Template: Story<DatepickerProps> = (props: DatepickerProps) => (
  <Datepicker
    {...props}
    label="Datepicker"
    weekday="short"
    //onChange={(state) => store.set({ value: state })}
    validators={[(value) => (!value || !value.date ? { required: true } : null)]}
  />
);

export const Basic = Template.bind({});
Basic.args = {
  weekday: 'short',
};

export const Past = Template.bind({});
Past.args = {
  ...Basic.args,
  enablePastDates: true,
};

export const Span = Template.bind({});
Span.args = {
  ...Basic.args,
  span: true,
};
