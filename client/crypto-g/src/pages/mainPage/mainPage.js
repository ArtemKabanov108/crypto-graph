import React from "react";
import {Header} from "../../Components/Header/Header";
import {observer} from "mobx-react-lite";
import {Card} from "../../Components/common/Card/Card";
import {MyResponsiveBump} from "../../Components/Charts/ChartNivoBamp/Bamp";
import {FillableSurface} from "../../Components/common/Surfaces/FillableSurface/FillableSurface"
const arr = [
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
]

export const MainPage = observer(
    () => {
        return (
            <>
                <Header />
                <FillableSurface>
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
                </FillableSurface>
            </>
        )
    }
)