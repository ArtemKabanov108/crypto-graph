import {Card} from "../../common/Card/Card";
import {MyResponsiveBump} from "../../Charts/ChartNivoBamp/Bamp";
import {arr} from "../../../pages/mainPage/mainPage";
import {Surface} from "../../common/Surfaces/OrderingSurface/OrderingSurface";
import React from "react";

export const TopChart = () => {
    return (
        <Surface
            centring={true}
        >
            <Card
                width={'100rem'}
                height={'45rem'}
            >
                <MyResponsiveBump data={arr}/>
            </Card>
        </Surface>
    )
}
