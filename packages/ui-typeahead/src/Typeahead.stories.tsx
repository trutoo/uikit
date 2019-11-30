import React from 'react';
import { storiesOf } from '@storybook/react';
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

storiesOf('Typeahead', module)
  .addDecorator(StateDecorator(store) as any)
  .add('default', () => (
    <Typeahead
      service={typeaheadMock}
      label="Typeahead"
      onChange={state => store.set({ value: state })}
      validators={[value => (!value || !value.id ? { required: true } : null)]}
    />
  ))
  .add('inline', () => (
    <Typeahead
      service={typeaheadMock}
      label="Typeahead"
      inline={true}
      onChange={state => store.set({ value: state })}
      validators={[value => (!value || !value.id ? { required: true } : null)]}
    />
  ))
  .add('search on focus', () => (
    <Typeahead
      service={typeaheadMock}
      label="Typeahead"
      searchOnFocus={true}
      onChange={state => store.set({ value: state })}
      validators={[value => (!value || !value.id ? { required: true } : null)]}
    />
  ));
