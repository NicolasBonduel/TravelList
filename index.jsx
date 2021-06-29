import ReactDOM from 'react-dom';
import App from 'src/index';

const init = (selector) => {
  ReactDOM.render(<App />, selector);
};

// eslint-disable-next-line import/prefer-default-export
export { init };
