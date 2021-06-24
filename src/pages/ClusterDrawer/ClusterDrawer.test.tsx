import React from 'react';
import ReactDOM from 'react-dom';
import ClusterDrawer from './ClusterDrawer';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClusterDrawer />, div);
  ReactDOM.unmountComponentAtNode(div);
});