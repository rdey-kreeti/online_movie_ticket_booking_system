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

const Input = Styled.input`
  height: 24px;
  padding: 0 8px;
`;

const TextFieldGroup = ({label, type, placeholder, name, value, onChange}) => {
  return (
    <FieldGroup>
      <Label>{label}</Label>
      <Input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange}/>
    </FieldGroup>
  )
}

export default TextFieldGroup;