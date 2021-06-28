import { useEffect, useState } from 'react';

let store = {};
const veryLocalStorage = {
  getItem: (key) => store[key],
  setItem: (key, value) => {
    store[key] = value;
  },
  clear: () => {
    store = {};
  },
};

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => veryLocalStorage.getItem(key) || defaultValue);
  useEffect(() => {
    veryLocalStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
}

export default usePersistedState;

export function decorator(story, { parameters }) {
  store = parameters.localStorage || {};
  return story();
}
