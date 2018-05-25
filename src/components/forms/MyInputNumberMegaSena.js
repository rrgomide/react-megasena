import React from 'react';
import { TextField } from '@material-ui/core';

import PropTypes from 'prop-types';

export const MyInputNumberMegaSena = ({
  autoFocus,
  error,
  defaultValue,
  label,
  onChange,
  max,
  min
}) => (
  <TextField
    error={error}
    autoFocus={autoFocus}
    defaultValue={defaultValue}
    id="name"
    InputProps={{ inputProps: { min, max } }}
    label={label}
    margin="dense"
    onChange={onChange}
    style={{ marginRight: '20px' }}
    type="number"
  />
);

MyInputNumberMegaSena.defaultProps = {
  autoFocus: false,
  defaultValue: 30,
  error: false,
  label: '?',
  max: 60,
  min: 1,
  onChange: () => null
};

MyInputNumberMegaSena.propTypes = {
  autoFocus: PropTypes.bool,
  error: PropTypes.bool,
  defaultValue: PropTypes.number,
  label: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};
