import './Grid.css';

import React from 'react';

import { Meta, Story } from '@storybook/react';

import Grid, { GridProps } from './Grid';

export default {
  title: 'UI-Core/Grid',
  component: Grid,
} as Meta;

const Template: Story<GridProps> = (props: GridProps) => (
  <Grid {...props}>
    <article>Article One</article>
    <article>Article Two</article>
    <article>Article Three</article>
    <article>Article Four</article>
    <article>Article Five</article>
  </Grid>
);

const TemplateNested: Story<GridProps> = (props: GridProps) => (
  <Grid {...props}>
    <article>Article One</article>
    <Grid columns={1}>
      <article>Nested Two</article>
      <article>Nested Three</article>
    </Grid>
    <article>Article Four</article>
    <Grid columns={1}>
      <Grid columns={1}>
        <article>Double Five</article>
        <article>Double Six</article>
      </Grid>
    </Grid>
    <article>Article Seven</article>
  </Grid>
);

export const Basic = Template.bind({});
Basic.args = {
  columns: 1,
  columnsSM: 2,
  columnsMD: 3,
  columnsLG: 4,
  columnsXL: 5,
};

export const Array = Template.bind({});
Array.args = {
  columns: [2, 5],
};

export const Override = Template.bind({});
Override.args = {
  columns: [1, 2, 2, 2, 1],
  columnsLG: 5,
};

export const Nested = TemplateNested.bind({});
Nested.args = {
  columns: [2, 5],
};
