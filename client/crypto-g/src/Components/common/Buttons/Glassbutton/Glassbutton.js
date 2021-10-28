import React from "react";
import {GlassButton} from "./glassButton.style";


export const Glassbtn = ({text, padding, background, fontSize, handleClick, buttonType }) => {
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