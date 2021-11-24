import React from "react";
import {SurfaceCnt, SurfaceBox} from "./OrderingSurface.style";

export const Surface = ({children, centring, wrapping}) => {
  return (
    <SurfaceCnt>
      <SurfaceBox
        centeringEnable={centring}
        wrapEnable={wrapping}
      >
        {children}
      </SurfaceBox>
    </SurfaceCnt>
  )
}