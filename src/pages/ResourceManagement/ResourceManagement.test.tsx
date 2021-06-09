import React from 'react';
import ReactDOM from 'react-dom';
import ResourceManagement from './ResourceManagement';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResourceManagement />, div);
  ReactDOM.unmountComponentAtNode(div);
});