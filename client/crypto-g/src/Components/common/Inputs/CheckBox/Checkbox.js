import React from "react";
import {CheckboxNeon} from "./checkbox.style";

export const Checkbox = ({checkboxText}) => {
    return (
        <CheckboxNeon>
            <input type={'checkbox'} id={'cb1'}/>
            <label htmlFor="cb1">{checkboxText}</label>
        </CheckboxNeon>
    )
}