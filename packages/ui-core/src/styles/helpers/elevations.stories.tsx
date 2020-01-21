import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import './elevations.css';

export default {
  title: 'Elevation',
  decorators: [withKnobs],
};

export const basic = () => (
  <div className="tu-grid" tu-columns="1" tu-columns-sm="2" tu-columns-lg="4" style={{ paddingTop: 24, paddingBottom: 24 }}>
    {Array.from({ length: 12 }, (_, index) => (
      <p className={`tu-elevation-${index + 1}`} style={{ padding: 24, borderRadius: 4 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima quasi eveniet corporis ipsum impedit nam ab
        culpa necessitatibus quidem, voluptatum veritatis et aut tempore dignissimos vel molestias hic architecto
        accusantium.
      </p>
    ))}
  </div>
);

export const nested = () => (
  <div className="tu-container">
    <p className={`tu-elevation-4`} style={{ padding: 24, borderRadius: 4 }}>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima quasi eveniet corporis ipsum impedit nam ab culpa
      necessitatibus quidem, voluptatum veritatis et aut tempore dignissimos vel molestias hic architecto accusantium.
    </p>
    <p className={`tu-elevation-2`} style={{ padding: 24, borderRadius: 4 }}>
      <p className={`tu-elevation-2`} style={{ padding: 24, borderRadius: 4 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima quasi eveniet corporis ipsum impedit nam ab
        culpa necessitatibus quidem, voluptatum veritatis et aut tempore dignissimos vel molestias hic architecto
        accusantium.
      </p>
    </p>
  </div>
);

export const dynamic = () => (
  <div className="tu-container">
    <p
      className={`tu-elevation-${number('Elevation', 1, {
        range: true,
        min: 1,
        max: 12,
      })}`}
      style={{ padding: 24, borderRadius: 4 }}>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima quasi eveniet corporis ipsum impedit nam ab culpa
      necessitatibus quidem, voluptatum veritatis et aut tempore dignissimos vel molestias hic architecto accusantium.
    </p>
  </div>
);
