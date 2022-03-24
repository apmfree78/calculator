import React from 'react';

//Buttons on calculator specifically for [1-9] and [*/-+] +
//PLUS other operations we add in future
const KeyPadOps = ({ grid, onClickFunction, children }) => {
  return (
    <button
      className={grid}
      type='submit'
      id={children}
      index={children}
      onClick={() => onClickFunction(children)}>
      {children}
    </button>
  );
};

export default KeyPadOps;
