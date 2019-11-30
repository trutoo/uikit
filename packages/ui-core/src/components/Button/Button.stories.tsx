import React from 'react';
import { storiesOf } from '@storybook/react';

import './Button.css';
import Button from './Button';

storiesOf('Button', module)
  .add('default', () => <Button onClick={console.log}>Click me!</Button>)
  .add('link', () => (
    <Button type="link" onClick={console.log}>
      <div>Click me!</div>
    </Button>
  ))
  .add('disabled button', () => (
    <Button disabled={true} onClick={console.log}>
      Click me!
    </Button>
  ))
  .add('disabled link', () => (
    <Button type="link" disabled={true} onClick={console.log}>
      Click me!
    </Button>
  ));
