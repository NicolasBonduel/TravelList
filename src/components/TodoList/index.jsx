import { useState } from 'react';
import PropTypes from 'prop-types';
import useAxiosDI from 'hooks/axios';
import List from './List';
import styles from './index.scss';

// TODO: Move to .env file?
const countryApiUrl = 'https://restcountries.eu/rest/v2/all?fields=name;alpha3Code';

const TodoList = ({ useAxios, defaultSearchValue }) => {
  const [searchValue, setSearchValue] = useState(defaultSearchValue);
  const { response: countries, loading } = useAxios(countryApiUrl);

  return (
    <>
      <input
        className={styles.main}
        placeholder="Country I want to visit"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        type="search"
        // TODO: consider pros and cons with removing autofocus and improving a11y
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
      <List allCountries={countries} searchValue={searchValue} loading={loading} />
    </>
  );
};

TodoList.defaultProps = {
  useAxios: useAxiosDI,
  defaultSearchValue: '',
};

TodoList.propTypes = {
  useAxios: PropTypes.func,
  defaultSearchValue: PropTypes.string,
};

export default TodoList;
