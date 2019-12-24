import React from 'react';

import './Button.css';
import Button from './Button';

export default {
  title: 'Button',
};

export const basic = () => <Button onClick={console.log}>Click me!</Button>;

export const link = () => (
  <Button type="link" onClick={console.log}>
    <div>Click me!</div>
  </Button>
);

export const primary = () => (
  <Button className="primary" onClick={console.log}>
    Click me!
  </Button>
);

export const secondary = () => (
  <Button className="secondary" onClick={console.log}>
    Click me!
  </Button>
);

export const disabledButton = () => (
  <Button disabled={true} onClick={console.log}>
    Click me!
  </Button>
);

export const disabledLink = () => (
  <Button type="link" disabled={true} onClick={console.log}>
    Click me!
  </Button>
);
