import React from "react";
import {GlassButton} from "./glassButton.style";
import {observer} from "mobx-react-lite";


export const Glassbtn = observer(
    ({text, padding, background, fontSize, handleClick, buttonType }) => {
        return (
            <GlassButton
                type={buttonType}
                paddingOption={padding}
                backgroundOption={background}
                fontSize={fontSize}
                onClick={() => handleClick?.(text)}
            >
                {text}
            </GlassButton>
        )
    }
)