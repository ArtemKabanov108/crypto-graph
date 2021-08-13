import React from "react";
import {Glassbtn} from "../Glassbutton/Glassbutton";
import {colors} from "../../../../styles-common/common.style";
import {ButtonGroup} from "./buttonsGrup.style";

export const ButtonsGroup = ({structure, menuClick}) => {
    return (
        <ButtonGroup>
            { (structure.length) && (structure.map( ({label}) => (
                    <Glassbtn
                        key={label}
                        padding={"0 10px 0 10px"}
                        background={colors.transparentBackgroundZero}
                        text={label}
                        fontSize={'1.2'}
                        handleClick={menuClick}
                    />
            ))) }
        </ButtonGroup>
    )
}