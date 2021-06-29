/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import {
  Default,
  Loading,
  LoadingWithPersistedSelected,
} from 'src/components/TodoList/index.stories';

test('Search for country and see country in list', () => {
  render(<Default {...Default.args} />);
  const input = screen.getByRole('searchbox');
  fireEvent.change(input, { target: { value: 'Fr' } });
  expect(input.value).toBe('Fr');
  const countryExists = screen.queryByText('France');
  expect(countryExists).toBeInTheDocument();
  const countryDoesntExist = screen.queryByText('Norway');
  expect(countryDoesntExist).not.toBeInTheDocument();
});

test('Search for country while the country list is loading', () => {
  render(<Loading {...Loading.args} />);
  const labelList = screen.queryAllByRole('label');
  expect(labelList).toHaveLength(0);
  const skeletonLoadingDoesntExist = screen.queryByTestId('loading');
  expect(skeletonLoadingDoesntExist).not.toBeInTheDocument();
  const input = screen.getByRole('searchbox');
  fireEvent.change(input, { target: { value: 'Anything' } });
  const skeletonLoading = screen.queryByTestId('loading');
  expect(skeletonLoading).toBeInTheDocument();
});

// I could not find a way to have the decorator working correctly
test.skip('Load countries when some list elements are already saved in localStorage', () => {
  render(<LoadingWithPersistedSelected {...LoadingWithPersistedSelected.args} />);
  const labelList = screen.queryAllByRole('label');
  expect(labelList).toHaveLength(0);
  const skeletonLoading = screen.getByTestId('loading');
  expect(skeletonLoading).toBeInTheDocument();
});
