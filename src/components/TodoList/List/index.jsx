import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import usePersistedState from 'hooks/persistedState';
import styles from './index.scss';

const List = ({ allCountries, searchValue, loading }) => {
  const [selectedCountryCodes, setSelectedCountryCodes] = usePersistedState(
    'selectedCountryCodes',
    []
  );
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const selectedCountries = allCountries.filter((country) =>
      selectedCountryCodes.includes(country.alpha3Codegit)
    );
    if (searchValue.length) {
      setCountries([
        ...selectedCountries,
        ...allCountries.filter(
          (country) =>
            (country.name.toUpperCase().startsWith(searchValue.toUpperCase()) ||
              country.alpha3Code.toUpperCase().startsWith(searchValue.toUpperCase())) &&
            !selectedCountryCodes.includes(country.alpha3Code)
        ),
      ]);
    } else {
      setCountries(selectedCountries);
    }
  }, [allCountries, searchValue, selectedCountryCodes]);

  const handleSelectCountry = (countryCode) => {
    if (!selectedCountryCodes.includes(countryCode)) {
      setSelectedCountryCodes((countryCodes) => [...countryCodes, countryCode]);
    } else {
      setSelectedCountryCodes((countryCodes) => countryCodes.filter((c) => c !== countryCode));
    }
  };

  return (
    <section className={styles.main}>
      <ul className={styles.todoListContainer}>
        {/*
          We show the loading skeleton only when the user has already selected countries,
          or started typing before the country list has been resolved
        */}
        {loading && (selectedCountryCodes.length || searchValue.length) ? (
          <>
            {[...Array(selectedCountryCodes.length || 5)].map((_el, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>
                <div className={[styles.skeletonButton].join(' ')} />
                <div className={styles.label}>
                  <div className={styles.skeletonLabel} />
                </div>
              </li>
            ))}
          </>
        ) : (
          <>
            {countries.map(({ name, alpha3Code }) => (
              <li key={alpha3Code}>
                <button
                  id={alpha3Code}
                  aria-label="Add or remove country from my list"
                  className={`${styles.complete} ${
                    selectedCountryCodes.includes(alpha3Code) ? styles.selected : ''
                  }`}
                  onClick={() => handleSelectCountry(alpha3Code)}
                  type="button"
                />
                <label htmlFor={alpha3Code} className={styles.label}>
                  {name}
                </label>
              </li>
            ))}
          </>
        )}
      </ul>
    </section>
  );
};

List.defaultProps = {
  allCountries: [],
};

List.propTypes = {
  allCountries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      alpha3Code: PropTypes.string.isRequired,
    })
  ),
  searchValue: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default List;
