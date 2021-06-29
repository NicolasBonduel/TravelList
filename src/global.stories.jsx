/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import Component from './index';

const MainComponent = (args) => <Component {...args} />;

export const Global = MainComponent.bind({});

export default {
  title: 'Global',
  component: Component,
};
