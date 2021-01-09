import './Container.css';

import React from 'react';

import { Meta, Story } from '@storybook/react';

import Container, { ContainerProps } from './Container';

export default {
  title: 'UI-Core/Container',
  component: Container,
} as Meta;

const Template: Story<ContainerProps> = (_props: ContainerProps) => (
  <Container>
    Vero ipsa ut maxime aspernatur. Officia quibusdam voluptatum voluptatem dolorem provident dolores minus. Ut soluta
    facere consectetur.
  </Container>
);

export const Basic = Template.bind({});
Basic.args = {};
