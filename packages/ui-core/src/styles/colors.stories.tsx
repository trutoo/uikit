import React from 'react';

import { Icon } from '@trutoo/ui-icons';

import { base } from '../../postcss.variables.js';

export default {
  title: 'Colors',
};

export const basic = () => (
  <div className="tu-grid style-uniform" tu-columns="2" tu-columns-sm="3" tu-columns-md="4" tu-columns-lg="5">
    {Object.keys(base)
      .filter((key) => key.startsWith('--c_'))
      .map((key) => (
        <figure key={key} className="tu-elevation-1" style={{ padding: 24 }}>
          <div style={{ height: 128, padding: 12, background: `var(${key})` }}>
            <Icon id="ghost" size={32} color="black" />
            <Icon id="ghost" size={32} color="white" />
          </div>
          <figcaption style={{ paddingTop: 24 }}>{key}</figcaption>
        </figure>
      ))}
  </div>
);
