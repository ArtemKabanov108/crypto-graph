import React from "react";
import {Input, Label} from "./neonInput.style";

export const NeonInput = ({labelText, placeholderText}) => {
    return (
        <Label>{labelText}<br/>
            <Input placeholder={placeholderText}/>
        </Label>
    )
}