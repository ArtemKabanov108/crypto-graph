import React from "react";
import {Loader} from "../Loader/Loader";

export const WrapperLoader = ({children, data}) => {
    return (
        <>
            {data?.length ? children : <Loader />}
        </>
    )
}