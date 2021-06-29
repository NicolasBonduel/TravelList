import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import usePersistedState from 'hooks/persistedState';
import styles from './index.scss';

const defaultSkeletonQty = 5;

const List = ({ allCountries, searchValue, loading }) => {
  const [selectedCountryCodes, setSelectedCountryCodes] = usePersistedState(
    'selectedCountryCodes',
    []
  );
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const selectedCountries = allCountries.filter((country) =>
      selectedCountryCodes.includes(country.alpha3Code)
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

  // We show the loading skeleton only when the user has already selected countries (localStorage),
  // or started typing before the country list has been resolved
  if (loading && !(selectedCountryCodes.length || searchValue.length)) {
    return null;
  }

  // Optimize the DOM -- NOT necessary.
  if (!loading && !countries.length) {
    return null;
  }

  return (
    <section className={styles.main}>
      <ul className={styles.todoListContainer}>
        {loading ? (
          <div aria-busy data-testid="loading">
            {[...Array(selectedCountryCodes.length || defaultSkeletonQty)].map((_el, index) => (
              // eslint-disable-next-line react/no-array-index-key -- All elements are the same
              <li key={index}>
                <div className={styles.skeletonButton} />
                <div className={styles.label}>
                  <div className={styles.skeletonLabel} />
                </div>
              </li>
            ))}
          </div>
        ) : (
          <>
            {countries.map(({ name, alpha3Code }) => (
              <li key={alpha3Code}>
                <button
                  id={alpha3Code}
                  aria-label="Add or remove country from my list"
                  className={[
                    styles.complete,
                    selectedCountryCodes.includes(alpha3Code) ? styles.selected : null,
                  ].join(' ')}
                  onClick={() => handleSelectCountry(alpha3Code)}
                  tabIndex={0}
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
