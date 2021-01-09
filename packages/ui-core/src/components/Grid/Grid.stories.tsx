import './Grid.css';

import React from 'react';

import Grid from './Grid';

export default {
  title: 'Grid',
};

export const basic = () => (
  <div>
    <Grid className="test" columns={1} columnsSM={2} columnsMD={3} columnsLG={4} columnsXL={5}>
      <article>Article One</article>
      <article>Article Two</article>
      <article>Article Three</article>
      <article>Article Four</article>
      <article>Article Five</article>
    </Grid>
  </div>
);

export const array = () => (
  <div>
    <Grid columns={[2, 5]}>
      <article>Article One</article>
      <article>Article Two</article>
      <article>Article Three</article>
      <article>Article Four</article>
      <article>Article Five</article>
    </Grid>
  </div>
);

export const override = () => (
  <div>
    <Grid columns={[1, 2, 2, 2, 1]} columnsLG={5}>
      <article>Article One</article>
      <article>Article Two</article>
      <article>Article Three</article>
      <article>Article Four</article>
      <article>Article Five</article>
    </Grid>
  </div>
);

export const nested = () => (
  <div>
    <Grid columns={[2, 5]}>
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
  </div>
);
