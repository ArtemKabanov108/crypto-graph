import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import {loaderStyles, LoaderContainer } from "./loader.styles";

export const Loader = () => {
    return (
        <LoaderContainer>
            <PacmanLoader
                size='8vw'
                color='#faff03'
                css={loaderStyles}
            />
        </LoaderContainer>
    )
}