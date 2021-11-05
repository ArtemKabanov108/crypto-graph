import React from "react";
import {Card} from "../../common/Card/Card";
import {MyResponsiveBump} from "../../Charts/ChartNivoBamp/Bamp";
import {Surface} from "../../common/Surfaces/OrderingSurface/OrderingSurface";
import CryptoStore from "../../../store/cryptocurrency/crypto.store"

export const TopChart = () => {
    const arr = CryptoStore.cryptoStore
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
