import React from 'react';
import { StateDecorator, Store } from '@sambego/storybook-state';

import './Typeahead.css';
import mock from './mock.json';
import Typeahead, { TypeaheadResult, TypeaheadService } from './Typeahead';

const store = new Store({
  value: { id: '', view: '' } as TypeaheadResult,
});

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
  title: 'Typeahead',
  decorators: [StateDecorator(store)],
};

export const basic = () => (
  <Typeahead
    service={typeaheadMock}
    label="Typeahead"
    onChange={state => store.set({ value: state })}
    validators={[value => (!value || !value.id ? { required: true } : null)]}
  />
);

export const inline = () => (
  <Typeahead
    service={typeaheadMock}
    label="Typeahead"
    inline={true}
    onChange={state => store.set({ value: state })}
    validators={[value => (!value || !value.id ? { required: true } : null)]}
  />
);

export const searchOnFocus = () => (
  <Typeahead
    service={typeaheadMock}
    label="Typeahead"
    searchOnFocus={true}
    onChange={state => store.set({ value: state })}
    validators={[value => (!value || !value.id ? { required: true } : null)]}
  />
);