import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import {loaderStyles} from "./loader.styles";


export const Loader = () => {
    return (
        <PacmanLoader
            size='60'
            color='#faff03'
            css={loaderStyles}
        />
    )
}