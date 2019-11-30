import React from 'react';
import { storiesOf } from '@storybook/react';

import './Grid.css';
import Grid from './Grid';

storiesOf('Grid', module)
  .add('default', () => (
    <div>
      <Grid className="test" columns={1} columnsSM={2} columnsMD={3} columnsLG={4} columnsXL={5}>
        <article>Article One</article>
        <article>Article Two</article>
        <article>Article Three</article>
        <article>Article Four</article>
        <article>Article Five</article>
      </Grid>
    </div>
  ))
  .add('array', () => (
    <div>
      <Grid columns={[2, 5]}>
        <article>Article One</article>
        <article>Article Two</article>
        <article>Article Three</article>
        <article>Article Four</article>
        <article>Article Five</article>
      </Grid>
    </div>
  ))
  .add('override', () => (
    <div>
      <Grid columns={[1, 2, 2, 2, 1]} columnsLG={5}>
        <article>Article One</article>
        <article>Article Two</article>
        <article>Article Three</article>
        <article>Article Four</article>
        <article>Article Five</article>
      </Grid>
    </div>
  ));
