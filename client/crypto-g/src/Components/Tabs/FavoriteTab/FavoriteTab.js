import {Card} from "../../common/Card/Card";
import {MyResponsiveBump} from "../../Charts/ChartNivoBamp/Bamp";
import {arr} from "../../../pages/mainPage/mainPage";
import {Surface} from "../../common/Surfaces/OrderingSurface/OrderingSurface";
import React from "react";

export const FavoriteTab = () => {
    return (
        <Surface
            wrapping={true}
        >
            <Card>
                <MyResponsiveBump data={arr}/>
            </Card>
        </Surface>
    )

}