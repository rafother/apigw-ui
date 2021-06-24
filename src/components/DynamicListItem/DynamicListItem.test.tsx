import React from 'react';
import ReactDOM from 'react-dom';
import DynamicListItem from './DynamicListItem';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DynamicListItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});