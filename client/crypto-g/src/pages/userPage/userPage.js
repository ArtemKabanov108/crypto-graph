import React, {useState} from "react";
import {Header} from "../../Components/Header/Header";
import {UserPageCnt} from "./userPage.style";
import {userPageRenderMap} from "./UserPageRenderMap";

export const UserPage = () => {
    const [userViewContent, setUserViewContent] = useState({
        view: "Top Chart"
    })
    const handleViewOpen = (labelBtn) => {
        setUserViewContent({view: labelBtn})
    }
    return (
        <UserPageCnt>
            <Header
                viewClick={handleViewOpen}
                userHandleClick={userViewContent}
            />
            {userPageRenderMap[userViewContent.view]}
        </UserPageCnt>
    )
}