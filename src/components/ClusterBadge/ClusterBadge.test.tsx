import React from 'react';
import ReactDOM from 'react-dom';
import ClusterBadge from './ClusterBadge';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClusterBadge />, div);
  ReactDOM.unmountComponentAtNode(div);
});