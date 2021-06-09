import React from 'react';
import ReactDOM from 'react-dom';
import ResourceList from './ResourceList';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResourceList />, div);
  ReactDOM.unmountComponentAtNode(div);
});