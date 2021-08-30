import React from "react";
import {Header} from "../../Components/Header/Header";
import {observer} from "mobx-react-lite";
import {Card} from "../../Components/common/Card/Card";
import {MyResponsiveBump} from "../../Components/Charts/ChartNivoBamp/Bamp";
import {Surface} from "../../Components/common/Surfaces/OrderingSurface/OrderingSurface";

export const arr = [
    {
        "id": "Bitcoin",
        "data": [
            {
                "x": 2000,
                "y": 10
            },
            {
                "x": 2001,
                "y": 5
            },
            {
                "x": 2002,
                "y": 11
            },
            {
                "x": 2003,
                "y": 6
            },
            {
                "x": 2004,
                "y": 10
            }
        ]
    },
    {
        "id": "Binance Coin",
        "data": [
            {
                "x": 2000,
                "y": 11
            },
            {
                "x": 2001,
                "y": 5
            },
            {
                "x": 2002,
                "y": 11
            },
            {
                "x": 2003,
                "y": 4
            },
            {
                "x": 2004,
                "y": 9
            }
        ]
    },
    {
        "id": "Tether",
        "data": [
            {
                "x": 2000,
                "y": 3
            },
            {
                "x": 2001,
                "y": 10
            },
            {
                "x": 2002,
                "y": 1
            },
            {
                "x": 2003,
                "y": 12
            },
            {
                "x": 2004,
                "y": 1
            }
        ]
    },

]

export const MainPage = observer(
    () => {
        console.log("HomeTab", document.cookie)

        return (
            <>
                <Header />
                <Surface
                    wrapping={true}
                >
                    <Card>
                        <MyResponsiveBump data={arr}/>
                    </Card>
                    <Card>
                        <MyResponsiveBump data={arr}/>
                    </Card>
                    <Card>
                        <MyResponsiveBump data={arr}/>
                    </Card>
                    <Card>
                        <MyResponsiveBump data={arr}/>
                    </Card>
                    <Card>
                        <MyResponsiveBump data={arr}/>
                    </Card>
                    <Card>
                        <MyResponsiveBump data={arr}/>
                    </Card>
                    <Card>
                        <MyResponsiveBump data={arr}/>
                    </Card>
                </Surface>
            </>
        )
    }
)