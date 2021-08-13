import React from "react";
import {GlassButton} from "./glassButton.style";


export const Glassbtn = ({text, padding, background, fontSize, handleClick }) => {
    return (
        <GlassButton
            paddingOption={padding}
            backgroundOption={background}
            fontSize={fontSize}
            onClick={() => handleClick(text)}
        >
          {text}
        </GlassButton>
    )
}