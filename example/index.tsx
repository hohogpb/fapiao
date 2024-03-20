import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fapiao } from '../.';

const App = () => {
  return (
    <div>
      <Fapiao />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
