import React from "react";
import {SurfaceCnt} from "./surface.style";

export const Surface = ({children}) => {
    return (
        <SurfaceCnt>
            {children}
        </SurfaceCnt>
    )
}