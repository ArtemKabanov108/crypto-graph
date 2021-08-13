import React from "react";
import {FillableSurfaceCnt} from "./FillableSurface.style";

export const FillableSurface = ({children}) => {
    return (
        <FillableSurfaceCnt>
            {children}
        </FillableSurfaceCnt>
    )
}