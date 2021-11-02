import React, {useEffect, useState} from "react";
import {Header} from "../../Components/Header/Header";
import {observer} from "mobx-react-lite";
import {Card} from "../../Components/common/Card/Card";
import {MyResponsiveBump} from "../../Components/Charts/ChartNivoBamp/Bamp";
import {Surface} from "../../Components/common/Surfaces/OrderingSurface/OrderingSurface";
import CryptoStore from "../../store/cryptocurrency/crypto.store"
export const arr = [
    {
        "id": "Bitcoin",
        "data": [
            {
                "x": 'Mo',
                "y": 10 + '$'
            },
            {
                "x": 'Tu',
                "y": 5 + '$'
            },
            {
                "x": 'We',
                "y": 11 + '$'
            },
            {
                "x": 'Thu',
                "y": 6 + '$'
            },
            {
                "x": 'Fr',
                "y": 10 + '$'
            },
            {
                "x": 'Sun',
                "y": 10 + '$'
            },
            {
                "x": 'Sat',
                "y": 10 + '$'
            }
        ]
    },
]

export const MainPage = observer(
    () => {

        const [cryptoGraphData, setCryptoGraphData] = useState([
            {
                "id": "Bitcoin",
                "data": [
                    {
                        "x": 2000,
                        "y": 10
                    },
                ]
            }
            ])

        // useEffect(() => {
        //
        //     CryptoStore.getCryptoList().then(({data}) => {
        //         console.log("00000000000000", data)
        //         setCryptoGraphData([{"id": data.id, "data": [{"x": data.id, "y": ''}]}])
        //     })
        //
        // }, [])

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