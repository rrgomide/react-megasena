import React from 'react';

import './numero.css';

const pickedStyle = {
  background: 'lightgreen'
};

const notPickedStyle = {
  background: 'lightgoldenrodyellow'
};

export const Numero = ({ value, picked }) => {
  const style = !!picked ? pickedStyle : notPickedStyle;
  return (
    <div className="numero" style={style}>
      {value}
    </div>
  );
};
