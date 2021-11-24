import React from "react";
import {Input, Label} from "./neonInput.style";

export const NeonInput = ({labelText, placeholderText, onFormHandle, typeInput}) => {
  return (
    <Label>{labelText}<br/>
      <Input
        typeForCss={typeInput}
        type={typeInput}
        placeholder={placeholderText}
        onChange={e => onFormHandle(e.target.value)}
      />
    </Label>
  )
}