import React, {useState} from "react";
import {Header} from "../../Components/Header/Header";
import {UserPageCnt} from "./userPage.style";
import {renderTabFactory} from "./UserPageTabFactory";
import {structureMenu} from "../../Components/Header/structureMenu";

export const UserPage = () => {
    const [userViewType, setUserViewType] = useState('Top Chart')
    const handleViewOpen = (labelBtn) => {
        console.log(labelBtn)
        setUserViewType(labelBtn)
    }

    const render = renderTabFactory({key: userViewType === structureMenu.logout ? structureMenu.topChart : userViewType})

    return (
        <UserPageCnt>
            <Header
                viewClick={handleViewOpen}
                viewContent={userViewType}
            />
            {render}
        </UserPageCnt>
    )
}