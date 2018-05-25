import React from 'react';

import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';

export const MyButton = ({ title, onClick, disabled }) => {
  return (
    <Button
      style={{ marginRight: '10px' }}
      color="primary"
      variant="raised"
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

MyButton.defaultProps = {
  title: '?',
  onClick: () => null,
  disabled: false
};

MyButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
