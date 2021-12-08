import React from "react";
import {toJS} from "mobx";
import {Card} from "../../common/Card/Card";
import {Surface} from "../../common/Surfaces/OrderingSurface/OrderingSurface";
import CryptoStore from "../../../store/cryptocurrency/crypto.store"
import {WrapperLoader} from "../../common/wrapperLoader/WrapperLoader";
import {MyResponsiveBar} from "../../Charts/chartNivoBar/ResponsiveBar";

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
                        <MyResponsiveBar data={crypto_storeTopChart}/>
                    </Card>

                }
            />
        </Surface>
    )
}
