import React from 'react';
import KeyPad from './KeyPad';
import KeyPadOps from './KeyPadOps';

//Generic reusable button for calculator
const KeyBoard = ({ clearState, handleInput, calculateInput }) => {
  return (
    <>
      {/* top row below main screen */}
      <div id='left-pad' className='col-9'>
        <div className='row'>
          <KeyPad grid='col-8' index='clear' onClickFunction={clearState}>
            AC
          </KeyPad>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            cos
          </KeyPadOps>
        </div>
        {/* ********************************************* */}
        {/* ********************************************* */}
        {/* row of commands (2nd row) */}
        <div className='row'>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            (
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            )
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            sin
          </KeyPadOps>
        </div>
        {/* ********************************************* */}
        {/* ********************************************* */}
        {/* 3st row of numbers  */}
        <div className='row'>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            1
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            2
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            3
          </KeyPadOps>
        </div>
        {/* ********************************************* */}
        {/* ********************************************* */}

        {/* 4th row of numbers */}
        <div className='row'>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            4
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            5
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            6
          </KeyPadOps>
        </div>
        {/* ********************************************* */}
        {/* ********************************************* */}
        {/* 5th row of numbers */}
        <div className='row'>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            7
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            8
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            9
          </KeyPadOps>
        </div>
        {/* ********************************************* */}
        {/* ********************************************* */}
        {/* 6th row of numbers + period */}
        <div className='row'>
          <KeyPadOps grid='col-8' onClickFunction={handleInput}>
            0
          </KeyPadOps>
          <KeyPadOps grid='col-4' onClickFunction={handleInput}>
            .
          </KeyPadOps>
        </div>
      </div>
      {/*end of left-pad, left side of key pad
        now beginning right pad that includes remaining operations
        and '=' */}
      <div id='right-pad' className='col-3'>
        <div className='row'>
          <KeyPadOps grid='col-12' onClickFunction={handleInput}>
            /
          </KeyPadOps>
          <KeyPadOps grid='col-12' onClickFunction={handleInput}>
            ^
          </KeyPadOps>
          <KeyPadOps grid='col-12' onClickFunction={handleInput}>
            *
          </KeyPadOps>
          <KeyPadOps grid='col-12' onClickFunction={handleInput}>
            -
          </KeyPadOps>
          <KeyPadOps grid='col-12' onClickFunction={handleInput}>
            +
          </KeyPadOps>
          <KeyPad grid='col-12' index='clear' onClickFunction={calculateInput}>
            =
          </KeyPad>
        </div>
      </div>
      {/* end of right pad */}
    </>
  );
};

export default KeyBoard;
