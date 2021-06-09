import React from 'react';
import ReactDOM from 'react-dom';
import ConfirmationDialog from './ConfirmationDialog';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConfirmationDialog />, div);
  ReactDOM.unmountComponentAtNode(div);
});