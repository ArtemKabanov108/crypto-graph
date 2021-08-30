import React, {useState} from "react";
import {Input, Label} from "./neonInput.style";

export const NeonInput = ({labelText, placeholderText, onFormHandle}) => {
    return (
        <Label>{labelText}<br/>
            <Input
                placeholder={placeholderText}
                onChange={e => onFormHandle(e.target.value) }
            />
        </Label>
    )
}