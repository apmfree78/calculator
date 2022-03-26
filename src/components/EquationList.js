import React from 'react';

const EquationList = ({ formulas, removeFormula }) => {
  return (
    <div
      id='formulas'
      className='d-flex flex-column justify-content-around align-items-center'>
      <span className='inputstring formulalist' key='0'>
        Equation List
      </span>
      {formulas.map((formula, index) => {
        return (
          <span
            className='inputstring formulalist d-flex flex-row justify-content-between align-items-center'
            key={index}>
            <div id='formula'>{formula}</div>
            <i className='fa fa-close' onClick={() => removeFormula(index)}></i>
          </span>
        );
      })}
    </div>
  );
};

export default EquationList;
