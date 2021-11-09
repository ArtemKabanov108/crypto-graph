import React from "react";
import {Card} from "../../common/Card/Card";
import {MyResponsiveBump} from "../../Charts/ChartNivoBamp/Bamp";
import {Surface} from "../../common/Surfaces/OrderingSurface/OrderingSurface";
import CryptoStore from "../../../store/cryptocurrency/crypto.store"
import {WrapperLoader} from "../../common/wrapperLoader/WrapperLoader";
import {toJS} from "mobx";

export const TopChart = ({tabType}) => {
    const crypto_storeTopChart = toJS(CryptoStore?.cryptoStore)
    return (
        <Surface
            centring={true}
        >
            <WrapperLoader
                data={crypto_storeTopChart}
                children={
                    <Card
                        pageType={tabType}
                        width={'100rem'}
                        height={'45rem'}
                    >
                        <MyResponsiveBump data={crypto_storeTopChart}/>
                    </Card>

                }
            />
        </Surface>
    )
}
