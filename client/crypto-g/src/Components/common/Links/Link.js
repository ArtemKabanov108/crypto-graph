import React from "react";
import {LinkNeon} from "./link.style";

export const Link = ({textLink, linkTo}) => {
    return (
        <LinkNeon to={`/${linkTo}`}>{textLink}</LinkNeon>
    )
}