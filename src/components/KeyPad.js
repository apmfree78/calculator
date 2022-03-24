import React from 'react';

//Generic reusable button for calculator
const KeyPad = ({ grid, index, onClickFunction, children }) => {
  return (
    <button
      className={grid}
      type='submit'
      id={index}
      index={index}
      onClick={onClickFunction}>
      {children}
    </button>
  );
};

export default KeyPad;
