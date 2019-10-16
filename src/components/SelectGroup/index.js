import React from 'react';
import Styled from 'styled-components';

const FieldGroup = Styled.section`
  display: flex;
  margin-bottom: 10px;
`;

const Label = Styled.label`
  display: inline-block;
  width: 150px;
`;

const Select = Styled.select`
  height: 24px;
  padding: 0 8px;
`;

const SelectGroup = ({label, name, onChange, options, defaultOption}) => {
  return (
    <FieldGroup>
      <Label>{label}</Label>
      <Select name={name} onChange={onChange}>
      {defaultOption && <option>{defaultOption}</option>}
        {options.map((option, index) => <option key={index} value={parseInt(option[1], 10)}>{option[0]}</option>)}
      </Select>
    </FieldGroup>
  )
}

export default SelectGroup;