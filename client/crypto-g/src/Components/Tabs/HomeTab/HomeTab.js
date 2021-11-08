import React from "react";
import {Card} from "../../common/Card/Card";
import {MyResponsiveBump} from "../../Charts/ChartNivoBamp/Bamp";
import {Surface} from "../../common/Surfaces/OrderingSurface/OrderingSurface";
import CryptoStore from "../../../store/cryptocurrency/crypto.store"
import {Loader} from "../../common/Loader/Loader";
import {WrapperLoader} from "../../common/wrapperLoader/WrapperLoader";


export const HomeTab = () => {
const cryptoArrForHome = CryptoStore.cryptoStore
    return (
        <Surface
            wrapping={true}
        >
            <WrapperLoader
                data={cryptoArrForHome}
                children={
                    cryptoArrForHome.map(({id, data}) => {
                        return (
                            <Card
                                cryptoName={id}
                                key={id}
                            >
                                <MyResponsiveBump data={[{id, data}]}/>
                            </Card>
                        )
                    })
                }
            />
        </Surface>
    )

}