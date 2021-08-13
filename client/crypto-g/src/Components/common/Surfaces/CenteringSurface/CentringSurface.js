import React from "react";
import {CentringSurfaceCnt} from "./CentringSurface.style";

export const CentringSurface = ({children}) => {
    return (
        <CentringSurfaceCnt>
            {children}
        </CentringSurfaceCnt>
    )
}