import React, {useState} from "react";
import {Header} from "../../Components/Header/Header";
import {UserPageCnt} from "./userPage.style";
import {structureMenu} from "../../Components/Header/structureMenu";
import {HomeTab} from "../../Components/Tabs/HomeTab/HomeTab";
import {TopChart} from "../../Components/Tabs/TopChartTab/TopChartTab";
import {FavoriteTab} from "../../Components/Tabs/FavoriteTab/FavoriteTab";

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
            />
            {
                ( userViewContent.view === structureMenu[0].label && <HomeTab /> )
            }
            {
                (userViewContent.view === structureMenu[1].label && <TopChart /> )
            }
            {
                (userViewContent.view === structureMenu[1].label && <FavoriteTab /> )
            }
        </UserPageCnt>
    )
}