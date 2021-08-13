import React from "react";
import {Header} from "../../Components/Header/Header";
import {UserPageCnt} from "./userPage.style";
import {CentringSurface} from "../../Components/common/Surfaces/CenteringSurface/CentringSurface";

export const UserPage = () => {
    return (
        <UserPageCnt>
            <Header />
            <CentringSurface>
                <div>
                    <h1>
                        USER PAGE!!!!
                    </h1>
                </div>
            </CentringSurface>

        </UserPageCnt>
    )
}