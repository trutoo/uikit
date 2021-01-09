import './elevations.css';

import React from 'react';

import { Meta, Story } from '@storybook/react';

type StoryProps = {
  elevation: number;
};

export default {
  title: 'UI-Core/Elevation',
  argTypes: {
    elevation: { control: { type: 'range', min: 1, max: 12 } },
  },
} as Meta;

const Template: Story<StoryProps> = () => (
  <div
    className="tu-grid"
    tu-columns="1"
    tu-columns-sm="2"
    tu-columns-lg="4"
    style={{ paddingTop: 24, paddingBottom: 24 }}>
    {Array.from({ length: 12 }, (_, index) => (
      <p className={`tu-elevation-${index + 1}`} style={{ padding: 24, borderRadius: 4 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima quasi eveniet corporis ipsum impedit nam ab
        culpa necessitatibus quidem, voluptatum veritatis et aut tempore dignissimos vel molestias hic architecto
        accusantium.
      </p>
    ))}
  </div>
);

export const Basic = Template.bind({});
Basic.args = {};

const TemplateNested: Story<StoryProps> = () => (
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

export const Nested = TemplateNested.bind({});
Basic.args = {};

const TemplateDynamic: Story<StoryProps> = ({ elevation }: StoryProps) => (
  <div className="tu-container">
    <p className={`tu-elevation-${elevation}`} style={{ padding: 24, borderRadius: 4 }}>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima quasi eveniet corporis ipsum impedit nam ab culpa
      necessitatibus quidem, voluptatum veritatis et aut tempore dignissimos vel molestias hic architecto accusantium.
    </p>
  </div>
);

export const Dynamic = TemplateDynamic.bind({});
Basic.args = {
  elevation: 2,
};
