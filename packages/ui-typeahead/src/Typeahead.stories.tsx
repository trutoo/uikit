import './Typeahead.css';

import React from 'react';

import { Meta, Story } from '@storybook/react';

import mock from './mock.json';
import Typeahead, { TypeaheadProps, TypeaheadResult, TypeaheadService } from './Typeahead';

const typeaheadMock: TypeaheadService = {
  search(query: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mock.filter((result: TypeaheadResult) => result.view.toLowerCase().startsWith(query.toLowerCase())));
      }, 1000 * Math.random());
    });
  },
};

export default {
  title: 'UI-Typeahead/Typeahead',
  component: Typeahead,
} as Meta;

const Template: Story<TypeaheadProps> = (props: TypeaheadProps) => (
  <Typeahead
    {...props}
    service={typeaheadMock}
    //onChange={(state) => store.set({ value: state })}
    validators={[(value) => (!value || !value.id ? { required: true } : null)]}
  />
);

export const Basic = Template.bind({});
Basic.args = {
  label: 'Typeahead',
};

export const Inline = Template.bind({});
Inline.args = {
  ...Basic.args,
  inline: true,
};

export const SearchOnFocus = Template.bind({});
Inline.args = {
  ...Basic.args,
  searchOnFocus: true,
};
