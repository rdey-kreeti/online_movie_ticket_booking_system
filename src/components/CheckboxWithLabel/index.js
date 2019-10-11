import React from 'react';
import Styled from 'styled-components';

const CheckboxWithLabel = ({label, value, checked, handleCheck, dataObj, disabled}) => {
  return (
    <label>
      <input 
        type="checkbox"
        value={value} 
        checked={checked} 
        onChange={() => handleCheck(dataObj)}
        disabled={disabled}
      />
      {label}
    </label>
  )
}

export default CheckboxWithLabel;