import React from "react";
import {SurfaceCnt} from "./OrderingSurface.style";

export const Surface = ({children, centring, wrapping}) => {
    return (
        <SurfaceCnt
            centeringEnable={centring}
            wrapEnable={wrapping}
        >
            {children}
        </SurfaceCnt>
    )
}