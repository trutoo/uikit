import React from 'react';
import { storiesOf } from '@storybook/react';

import './elevations.css';

storiesOf('Elevation', module)
  .add('default', () => (
    <div
      className="e-grid"
      e-columns="1"
      e-columns-sm="2"
      e-columns-lg="4"
      style={{ paddingTop: 24, paddingBottom: 24 }}>
      {Array.from({ length: 12 }, (_, index) => (
        <p className={`e-elevation-${index + 1}`} style={{ padding: 24, borderRadius: 4 }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima quasi eveniet corporis ipsum impedit nam ab
          culpa necessitatibus quidem, voluptatum veritatis et aut tempore dignissimos vel molestias hic architecto
          accusantium.
        </p>
      ))}
    </div>
  ))
  .add('nested', () => (
    <div className="e-container">
      <p className={`e-elevation-4`} style={{ padding: 24, borderRadius: 4 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima quasi eveniet corporis ipsum impedit nam ab
        culpa necessitatibus quidem, voluptatum veritatis et aut tempore dignissimos vel molestias hic architecto
        accusantium.
      </p>
      <p className={`e-elevation-2`} style={{ padding: 24, borderRadius: 4 }}>
        <p className={`e-elevation-2`} style={{ padding: 24, borderRadius: 4 }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima quasi eveniet corporis ipsum impedit nam ab
          culpa necessitatibus quidem, voluptatum veritatis et aut tempore dignissimos vel molestias hic architecto
          accusantium.
        </p>
      </p>
    </div>
  ));
