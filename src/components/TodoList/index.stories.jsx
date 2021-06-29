/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import Component from '.';
import countries from '../../../__mocks__/data/countries.json';

const MainComponent = (args) => <Component {...args} />;

// Loading state
const useAxiosInstantResponse = () => ({
  response: countries,
  error: null,
  loading: false,
});

export const Default = MainComponent.bind({});
Default.args = {
  useAxios: useAxiosInstantResponse,
};
Default.argTypes = {
  useAxios: { table: { disable: true } },
};

export default {
  title: 'Default',
  component: Component,
};

export const DefaultWithPersistedSelected = MainComponent.bind({});
DefaultWithPersistedSelected.args = {
  useAxios: useAxiosInstantResponse,
};
DefaultWithPersistedSelected.argTypes = {
  useAxios: { table: { disable: true } },
};
DefaultWithPersistedSelected.parameters = {
  localStorage: {
    selectedCountryCodes: ['CAF', 'FRO', 'NOR'],
  },
};

// Loading state
const useAxiosLoadingInfinite = () => ({
  response: undefined,
  error: null,
  loading: true,
});

export const Loading = MainComponent.bind({});
Loading.args = {
  useAxios: useAxiosLoadingInfinite,
};
Loading.argTypes = {
  useAxios: { table: { disable: true } },
};

export const LoadingWhileTyping = MainComponent.bind({});
LoadingWhileTyping.args = {
  useAxios: useAxiosLoadingInfinite,
  defaultSearchValue: 'Loading',
};
LoadingWhileTyping.argTypes = {
  useAxios: { table: { disable: true } },
  defaultSearchValue: { table: { disable: true } },
};

export const LoadingWithPersistedSelected = MainComponent.bind({});
LoadingWithPersistedSelected.args = {
  useAxios: useAxiosLoadingInfinite,
};
LoadingWithPersistedSelected.argTypes = {
  useAxios: { table: { disable: true } },
};
LoadingWithPersistedSelected.parameters = {
  localStorage: {
    selectedCountryCodes: ['CAF', 'FRO', 'NOR'],
  },
};
