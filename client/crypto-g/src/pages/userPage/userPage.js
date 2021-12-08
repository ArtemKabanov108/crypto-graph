import React, {useEffect, useState} from "react";
import {Header} from "../../Components/Header/Header";
import {UserPageCnt} from "./userPage.style";
import {renderTabFactory} from "./UserPageTabFactory";
import {structureMenu} from "../../Components/Header/structureMenu";
import {observer} from "mobx-react-lite";
import UserRequestStore from "../../store/userRequest/userReques.store";
import GlobalStore from "../../store/GlobalStore/global.store";

export const UserPage = observer(
    () => {
        const isLoginedUser = GlobalStore.globalStorageForAuth
        const [userViewType, setUserViewType] = useState('Top Chart')

        const handleViewOpen = (labelBtn) => {
            setUserViewType(labelBtn)
        }

        useEffect(() => {
            ( async () => {
                try {
                    await UserRequestStore.getFavoritesList()
                } catch (err) {
                    console.log(err)
                }
            })()
        }, [isLoginedUser.nickName])

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
)